using DataBaseProject.Data;
using DataBaseProject.Models;
using DataBaseProject.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using DataBaseProject.Services.Classes;
using System;
using System.Collections.Generic;
using Npgsql;
using System.Numerics;

namespace DataBaseProject.Services.Classes
{
    
    

    public class AppointmentService : IAppointmentService
    {
        private readonly AppDbContext _db;
        private readonly IPatientService _patient;
        private readonly IDoctorService _doctor;
        private readonly IUserService _user;

        public AppointmentService(AppDbContext db, IPatientService patient, IDoctorService doctor)
        {
            _db = db;
            _patient = patient;
            _doctor = doctor;
        }

        public record AppointmentDocRecord(
        int Apid,
        int? Did,
        int Pid,
        DateTime? Apdate,
        bool? Accept,
        string? Notes,
        string? Status,
        int DocId,
        string DocFirstName,
        string DocLastName,
        string DocEmail,
        string DocPhone,
        string DocAddress,
        string DocGender,
        DateTime? DocBdate,
        string DocProfileImage,
        string DocRole
        );

        public List<AppointmentDocRecord> GetAllPappointments(int pid, int did)
        {
            if(did == 0)
               return _db.Database.SqlQuery<AppointmentDocRecord>(@$"
        SELECT 
            a.apid as Apid,
            a.did as Did,
            a.pid as Pid,
            a.apdate as Apdate,
            a.accept as Accept,
            a.notes as Notes,
            ""a"".""status"" as Status,
            d.uid as DocId,
            d.firstname as DocFirstName,
            d.lastname as DocLastName,
            d.email as DocEmail,
            d.phone as DocPhone,
            d.address as DocAddress,
            d.gender as DocGender,
            d.bdate as DocBdate,
            d.profileimage as DocProfileImage,
            d.role as DocRole
        FROM appointment a
        JOIN ""User"" d ON a.did = d.uid
        WHERE a.pid = {pid}").ToList();
            return _db.Database.SqlQuery<AppointmentDocRecord>(@$"
        SELECT 
            a.apid as Apid,
            a.did as Did,
            a.pid as Pid,
            a.apdate as Apdate,
            a.accept as Accept,
            a.notes as Notes,
            a.Status as Status,
            d.uid as DocId,
            d.firstname as DocFirstName,
            d.lastname as DocLastName,
            d.email as DocEmail,
            d.phone as DocPhone,
            d.address as DocAddress,
            d.gender as DocGender,
            d.bdate as DocBdate,
            d.profileimage as DocProfileImage,
            d.role as DocRole
        FROM appointment a
        JOIN ""User"" d ON a.did = d.uid
        WHERE a.pid = {pid} and a.did = {did}").ToList();
        }

        public Appointment GetAppointment(int apid)
        {
            if (apid == 0)
                return null;

            return _db.Database.SqlQuery<Appointment>($@"SELECT * FROM ""appointment"" WHERE apid={apid}").ToList()[0];
        }

        public bool? GetAppointmentResponse(int apid)
        {
            if (apid == 0) return false;

            var appointment = GetAppointment(apid);
            if (appointment == null)
            {
                throw new ArgumentException("Appointment does not exist!");
            }

            bool? response = appointment.Accept;
            string status = response.HasValue ? (response.Value ? "Accepted" : "Rejected") : "Pending";
            int id = apid;
            
            return response;
        }

        public int DeleteAppointment(int apid)
        {
            var ap = GetAppointment(apid);
            string patientName = _patient.GetUsername(ap.Pid);
            string doctorName = _patient.GetUsername((int)ap.Did);
            string patientLogMessage = $"Appointment request with Dr. {doctorName} was deleted";
            string doctorLogMessage = $"Appointment request from Mr./Ms. {patientName} was cancelled";
            _patient.LogActivity(ap.Pid, (int)ap.Did, patientLogMessage);
            _patient.LogActivity((int)ap.Did, ap.Pid, doctorLogMessage);

            return _db.Database.ExecuteSqlRaw($"DELETE FROM appointment WHERE apid = {apid}");
        }

        public int GetPappointmentsCount(int pid, int did)
        {
            return GetAllPappointments(pid, did).Count;
        }

		
        public record AppointmentREC(
			int Apid,
            int? Did,
            int Pid,
            DateTime? Apdate,
            bool? Accept,
            string? Notes);
        public int MakeAppointment(AppointmentREC ap)
        {
            var patient = _db.Database.SqlQuery<User>(@$"SELECT * FROM ""User"" WHERE uid = {ap.Pid}").ToList()[0]; 
            var doctor = _db.Database.SqlQuery<User>(@$"SELECT * FROM ""User"" WHERE uid = {ap.Did}").ToList()[0];
            if (patient.Role == "patient" || patient.Role == "admin")
            {
                if (doctor.Role == "doctor" || patient.Role == "admin")
				{
                   
                    string patientName = _patient.GetUsername(ap.Pid);
                    string doctorName = _patient.GetUsername((int)ap.Did);
                    string patientLogMessage = $"Appointment sent to Dr. {doctorName}";
                    string doctorLogMessage = $"You received an appointment request from Mr./Ms. {patientName}";
                    _patient.LogActivity(ap.Pid, doctor.Uid, patientLogMessage);
                    _patient.LogActivity(doctor.Uid, ap.Pid, doctorLogMessage);

                    return _db.Database.ExecuteSqlRaw($"INSERT INTO \"appointment\" (did,pid,apdate,accept) VALUES ('{ap.Did}','{ap.Pid}','{ap.Apdate}','false')");

                }
                return 0;
            }
                return 2;

        }
    }
        

}
