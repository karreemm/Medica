using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using DataBaseProject.Data;
using DataBaseProject.Models;
using DataBaseProject.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DataBaseProject.Services.Classes
{
    public class DoctorService : IDoctorService
    {
        private readonly AppDbContext _db;

        public DoctorService(AppDbContext db)
        {
            _db = db;
        }

        public List<User> GetAllDocotrs()
        {
            // Retrieve all users using a raw SQL query
            var users = _db.Users.FromSqlRaw(@$"SELECT * FROM ""User"" WHERE role='Doctor' OR role ='doctor' ").ToList();
            List<User> allusers = users;
            return allusers;
        }
       
        public Deleteduser DeleteDoctor(int did)
{
    // Fetch the user details first using raw SQL
    var user = _db.Users.FromSqlRaw($@"SELECT * FROM ""User"" WHERE uid = {did}").FirstOrDefault();
    if (user == null)
    {
        throw new ArgumentException($"Doctor with ID {did} not found.");
    }

    // Insert into "deleteduser" table
    var insertQuery = $@"
        INSERT INTO ""deleteduser"" (uid, firstname, lastname, password, email, role, address, phone, github, linkedin, profileimage, date)
        VALUES ({user.Uid}, '{user.Firstname}', '{user.Lastname}', '{user.Password}', '{user.Email}', '{user.Role}', 
                '{user.Address}', '{user.Phone}', '{user.Github}', '{user.Linkedin}', '{user.Profileimage}', '{DateTime.Now}')";

    _db.Database.ExecuteSqlRaw(insertQuery);

    // Delete from "User" table by ID
    var deleteQuery = $@"
        DELETE FROM ""User"" 
        WHERE uid = {did}";

    _db.Database.ExecuteSqlRaw(deleteQuery);

    // Create a Deleteduser instance to return
    Deleteduser deletedDoctor = new Deleteduser
    {
        Uid = user.Uid,
        Firstname = user.Firstname,
        Lastname = user.Lastname,
        Password = user.Password,
        Address = user.Address,
        Email = user.Email,
        Phone = user.Phone,
        Github = user.Github,
        Linkedin = user.Linkedin,
        Profileimage = user.Profileimage,
        Role = user.Role,
        Date = DateTime.Now
    };

    return deletedDoctor;
}

        public User GetDoctor(int did)
        {
            var doctor = _db.Users.FromSqlRaw(@$"SELECT * FROM ""User"" WHERE uid='{did}' and role ='doctor'").FirstOrDefault();
            return doctor;
        }

        public record SurgeryUserRecord(
            int Sid,
            int? Did,
            int? Pid,
            string Name,
            DateTime? Sdate,
            int? Cost,
            int? OpRoom,
            float? Duration,
            string PatientFirstName,
            string PatientLastName,
            string PatientEmail,
            string PatientPhone,
            string PatientAddress,
            string PatientGender,
            DateTime? PatientBdate,
            string PatientProfileImage,
            string PatientRole
        );

        public List<SurgeryUserRecord> GetAllSurgeries(int did)
        {
            var surgeryRecords = _db.Database
                .SqlQuery<SurgeryUserRecord>(@$"
            SELECT 
                s.sid as Sid,
                s.did as Did,
                s.pid as Pid,
                s.name as Name,
                s.sdate as Sdate,
                s.cost as Cost,
                s.op_room as OpRoom,
                s.duration as Duration,
                p.firstname as PatientFirstName,
                p.lastname as PatientLastName,
                p.email as PatientEmail,
                p.phone as PatientPhone,
                p.address as PatientAddress,
                COALESCE(p.gender, '') as patientgender,
                p.bdate as PatientBdate,
                p.profileimage as PatientProfileImage,
                p.role as PatientRole
            FROM surgery s
            LEFT JOIN ""User"" d ON s.did = d.uid
            LEFT JOIN ""User"" p ON s.pid = p.uid
            WHERE s.did = {did} OR s.pid = {did}")
                .ToList();

            return surgeryRecords;
        }

        public record ScanUserRecord(
        int ScanId,
        int? DocId,
        int? PId,
        string? Image,
        string? Image2,
        int PatientId,
        string PatientFirstName,
        string PatientLastName,
        string patientmail,
        string patientphone,
        string patientaddress,
        string patientgender,
        DateTime? patientbdate,
        string patientprofileimage,
        string patientrole,
		bool? Accept = true,
		string Description ="",
		string Response=""
);
        public List<ScanUserRecord> GetAllScans(int did)
        {
            var scanUserRecords = _db.Database
                .SqlQuery<ScanUserRecord>(@$"
            SELECT 
                s.scan_id as ScanId,
                s.doc_id as DocId,
                s.p_id as PId,
                COALESCE(s.description, '') as Description,
                s.image as Image,
                s.image2 as Image2,
                s.accept as Accept,
                COALESCE(s.response, '') as Response,
                p.uid as PatientId,
                p.firstname as PatientFirstName,
                p.lastname as PatientLastName,
                p.email as patientmail,
                p.phone as patientphone,
                p.address as patientaddress,
                COALESCE(p.gender, '') as patientgender,
                p.bdate as patientbdate,
                p.profileimage as patientprofileimage,
                p.role as patientrole
            FROM ""scan"" s
            JOIN ""User"" p ON s.p_id = p.uid
            WHERE s.doc_id = {did}")
                .ToList();

            return scanUserRecords;
        }
        public record AppointmentUserRecord(
    int Apid,
    int? Did,
    int Pid,
    DateTime? Apdate,
    bool? Accept,
    string? Notes,
    string? status,
    int PatientId,
    string PatientFirstName,
    string PatientLastName,
    string PatientEmail,
    string PatientPhone,
    string PatientAddress,
    string PatientGender,
    DateTime? PatientBdate,
    string PatientProfileImage,
    string PatientRole
);


        public List<AppointmentUserRecord> GetAllAppointments(int did)
        {
            // Implementation for GetAllAppointments
            var appointmentUserRecords = _db.Database
                .SqlQuery<AppointmentUserRecord>(@$"
        SELECT 
            a.apid as Apid,
            a.did as Did,
            a.pid as Pid,
            a.apdate as Apdate,
            a.accept as Accept,
            a.notes as Notes,
            ""a"".""status"" as Status,
            p.uid as PatientId,
            p.firstname as PatientFirstName,
            p.lastname as PatientLastName,
            p.email as PatientEmail,
            p.phone as PatientPhone,
            p.address as PatientAddress,
            COALESCE(p.gender, '') as PatientGender,
            p.bdate as PatientBdate,
            p.profileimage as PatientProfileImage,
            p.role as PatientRole
        FROM appointment a
        JOIN ""User"" d ON a.did = d.uid
        JOIN ""User"" p ON a.pid = p.uid
        WHERE a.did = {did} OR a.pid = {did}")
                .ToList();

            return appointmentUserRecords;
        }


        public List<Activity> GetAllActivities(int did)
        {
            // Retrieve all users using a raw SQL query
            var activities = _db.Activities.FromSqlRaw(@$"SELECT * FROM ""activity"" WHERE uid = {did} ").ToList();
            List<Activity> allactivities = activities;
            return allactivities;
        }


        // log activity for scan
        public void LogActivity(int? uid, int? toid, string action)
        {
            string formattedDate = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
            string query = $"INSERT INTO Activity (uid, toid, action, date) " +
                           $"VALUES ({(uid.HasValue ? uid.ToString() : "NULL")}, {toid}, '{action}', '{formattedDate}')";

            _db.Database.ExecuteSqlRaw(query);
        }
        //log activity for appointment
        public void LogActivity(int? uid, int toid, string action)
        {
            string formattedDate = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
            string query = $"INSERT INTO Activity (uid, toid, action, date) " +
                           $"VALUES ({(uid.HasValue ? uid.ToString() : "NULL")}, {toid}, '{action}', '{formattedDate}')";

            _db.Database.ExecuteSqlRaw(query);
        }
        public void SetScanResponse(int sid, bool accept, string response)
        {
            var scan = _db.Scans.FromSqlRaw(@$"SELECT * FROM ""scan"" WHERE scan_id = {sid} ").FirstOrDefault();
            if (scan == null)
            {
                // Entity with the provided ID doesn't exist
                throw new ArgumentException($"Scan with ID {sid} not found.");
            }

            LogActivity(scan.DocId, scan.PId, $"Responded to scan ID {sid}");
            var query = $@"
                UPDATE scan
                SET accept = {accept}, response = '{response}'
                WHERE scan_id = {sid}";

            _db.Database.ExecuteSqlRaw(query);
           
            if (!accept)
            {
                var deleteQuery = $@"
                    DELETE FROM scan
                    WHERE scan_id = {sid}";

                _db.Database.ExecuteSqlRaw(deleteQuery);
              
            }
            _db.SaveChanges();
        }

        public void SetAppointmentResponse(int aid, bool response, string? notes)
        {
            var appointment = _db.Appointments.FromSqlRaw($@"SELECT * FROM ""appointment"" WHERE apid = {aid}").FirstOrDefault();
            var patient = _db.Users.FirstOrDefault(u => u.Uid == appointment.Pid);
            if (appointment == null)
            {
                throw new ArgumentException($"Appointment with ID {aid} not found.");
            }

            var query = $@"
        UPDATE appointment
        SET accept = {response},
        notes = {(notes != null ? $"'{notes}'" : "NULL")}
        WHERE apid = {aid}";

            _db.Database.ExecuteSqlRaw(query);

            // Log activity
            LogActivity(appointment.Did, appointment.Pid,response ?$"you accepted appointment request from {patient.Firstname}":$"you rejected appointment request from {patient.Firstname}");

            // Check if response is false (appointment rejected)
            if (!response)
            {
                // Delete the appointment
                var deleteQuery = $@"
            DELETE FROM appointment
            WHERE apid = {aid}";

                _db.Database.ExecuteSqlRaw(deleteQuery);
            }

            _db.SaveChanges();
        }
       

        public void AddSurgery(Surgery surgery)
        {
            try
            {
                var query = $@"
                    INSERT INTO ""surgery"" (sid, did, pid, name, sdate, cost, op_room, duration)
                    VALUES ({surgery.Sid}, {surgery.Did}, {surgery.Pid}, '{surgery.Name}', 
                            '{surgery.Sdate}', {surgery.Cost}, {surgery.OpRoom}, 
                            '{surgery.Duration}')";

                _db.Database.ExecuteSqlRaw(query);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error occurred while adding surgery: {ex.Message}");
                throw; // Re-throw the exception to propagate it up the call stack if needed
            }
        }

        //public void AddSurgery(int sid, int? did, int? pid, string? name, DateTime? sdate, int? cost, int? opRoom, TimeSpan? duration, int? nid)
        //{
        //    try
        //    {
        //        var query = $@"
        //    INSERT INTO surgery (sid, did, pid, name, sdate, cost, op_room, duration, nid)
        //    VALUES ({sid}, {did}, {pid}, '{EscapeString(name)}', {FormatDate(sdate)}, {cost}, {opRoom}, {FormatTimeSpan(duration)}, {nid})";

        //        _db.Database.ExecuteSqlRaw(query);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception($"Error occurred while adding surgery: {ex.Message}", ex);
        //    }
        //}





      
       

     


       

    }
}