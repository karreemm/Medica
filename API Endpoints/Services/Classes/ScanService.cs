using DataBaseProject.Data;
using DataBaseProject.Models;
using DataBaseProject.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Numerics;

namespace DataBaseProject.Services.Classes
{
    public class ScanService : IScanService
    {
        private readonly AppDbContext _db;
        private readonly IAppointmentService _appointment;
        private readonly IPatientService _patient;
        public ScanService(AppDbContext db, IAppointmentService appointment, IPatientService patient)
        {
            _db = db;
            appointment = _appointment;
            _patient = patient;
        }
        public int AddScan(Scan sc)
        {
            var ap = _db.Database.SqlQuery<Appointment>($@"SELECT * FROM ""appointment"" WHERE did={sc.DocId} and pid={sc.PId} ").ToList();
            if(ap.Count != 0)
            {
                if (ap[0].Accept == true)
                {
                    string patientName = _patient.GetUsername((int)sc.PId);
                    string doctorName = _patient.GetUsername((int)sc.DocId);
                    string patientLogMessage = $"Scan sent to Dr. {doctorName}";
                    string doctorLogMessage = $"You received a scan from Mr./Ms. {patientName}";
                    _patient.LogActivity((int)sc.PId, (int)sc.DocId, patientLogMessage);
                    _patient.LogActivity((int)sc.PId ,(int)sc.PId, doctorLogMessage);

                    return _db.Database.ExecuteSqlRaw($"INSERT INTO \"scan\" (doc_id,p_id,image,image2) VALUES ('{sc.DocId}','{sc.PId}','{sc.Image}','{sc.Image2}')");

                }
               
            } 
            return 0;
            
        }
        public record ScanDocRecord(
        int ScanId,
        int? DocId,
        int? PId,
        string? Image,
        string? Image2,
        int DoctorId,
        string DocFirstName,
        string DocLastName,
        string Docmail,
        string Docphone,
        string Docaddress,
        string Docgender,
        DateTime? Docbdate,
        string Docprofileimage,
        string Docrole,
		string? Description ,
		bool? Accept ,
		string? Response
);
        public List<ScanDocRecord> GetAllPscans(int p_id, int doc_id)
        {

            if (doc_id == 0)
                return _db.Database.SqlQuery<ScanDocRecord>(@$"
            SELECT 
                s.scan_id as ScanId,
                s.doc_id as DocId,
                s.p_id as PId,
                COALESCE(s.description, '') as Description,
                s.image as Image,
                s.image2 as Image2,
                s.accept as Accept,
                COALESCE(s.response, '') as Response,
                d.uid as DoctorId,
                d.firstname as DocFirstName,
                d.lastname as DocLastName,
                d.email as Docmail,
                d.phone as Docphone,
                d.address as Docaddress,
                d.gender as Docgender,
                d.bdate as Docbdate,
                d.profileimage as Docprofileimage,
                d.role as Docrole
            FROM ""scan"" s
            JOIN ""User"" d ON s.doc_id = d.uid
            WHERE s.p_id = {p_id}").ToList();

            return _db.Database.SqlQuery<ScanDocRecord>(@$"
            SELECT 
                s.scan_id as ScanId,
                s.doc_id as DocId,
                s.p_id as PId,
                s.description as Description,
                s.image as Image,
                s.image2 as Image2,
                s.accept as Accept,
                s.response as Response,
                d.uid as DoctorId,
                d.firstname as DocFirstName,
                d.lastname as DocLastName,
                d.email as Docmail,
                d.phone as Docphone,
                d.address as Docaddress,
                d.gender as Docgender,
                d.bdate as Docbdate,
                d.profileimage as Docprofileimage,
                d.role as Docrole
            FROM ""scan"" s
            JOIN ""User"" d ON s.doc_id = d.uid
            WHERE s.p_id = {p_id} and s.doc_id = {doc_id}").ToList();

        }

        public Scan GetScan(int scanid)
        {
            if (scanid == 0)
                return null;

            return _db.Database.SqlQuery<Scan>($@"SELECT * FROM ""scan"" WHERE scan_id={scanid}").ToList()[0];

        }

        public string GetScanResponse(int scanid)
        {
            if (scanid == 0) return "Scan does not exist!";

            var scan = GetScan(scanid);
            if (scan == null)
            {
                throw new ArgumentException("Scan does not exist!");
            }

            string? response = scan.Response;
            return response;
        }
    }
}
