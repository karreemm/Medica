using DataBaseProject.Data;
using DataBaseProject.Models;
using DataBaseProject.Services.Classes;
using DataBaseProject.Services.Interfaces;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static DataBaseProject.Services.Classes.AppointmentService;

namespace DataBaseProject.Controllers
{
    [Microsoft.AspNetCore.Components.Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase {

        private readonly IAccountService _account;
        private readonly IUserService _user;
        private readonly IPatientService _patient;
        private readonly IAppointmentService _appointment;
        private readonly IScanService _scan;
        private readonly IPhistoryService _history;
        private readonly AppDbContext _db;


        public PatientController(IAccountService account, IUserService user, IPatientService patient, IAppointmentService appointment, IScanService scan, IPhistoryService history, AppDbContext db) {
            _account = account;
            _user = user;
            _patient = patient;
            _appointment = appointment;
            _scan = scan;
            _db = db;
            _history = history;
        }
        //patient related endpoints
        [HttpGet("AllPatients")]
        public IActionResult GetAllPatients() {
            var res = _patient.GetAllPatients();
            if (res.Count != 0) {
                return Ok(res);
            }
            return BadRequest("No Patients were found!");
        }
        [HttpGet("GetPatient")]
        public IActionResult GetPatient(int uid)
        {
            var res = _patient.GetPatient(uid);
            if (res != null)
            {
                if (res.Role == "patient")
                {
                    return Ok(res);
                }
                return BadRequest("User is not a patient!");
            }
            return BadRequest("Patient not found!");
        }
        [HttpGet("AllPatientActivities")]
        public IActionResult GetAllActivities(int uid)
        {
            var res = _patient.GetAllPActivities(uid);
            if (res.Count != 0)
            {
                return Ok(res);
            }
            return BadRequest("No Activity recorded for this patient yet!");
        }
        [HttpDelete("DeletePatient")]
        public IActionResult DeletePatient(int uid) {
            var res = _patient.DeletePatient(uid);
            if (res != 0)
            {
                return Ok("Patient deleted successfully!");

            }
            return BadRequest("Error deleting patient!");
        }
        //Appointment related endpoints
        [HttpGet("GetAppointment")]
        public IActionResult GetAppointment(int apid)
        {
            var res = _appointment.GetAppointment(apid);
            if (res != null)
            {
                return Ok(res);
            }
            return BadRequest("Appointment not found!");

        }

        [HttpGet("AppointmentsCount")]
        public IActionResult GetPappointmentsCount(int pid, int did)
        {
            var count = _appointment.GetPappointmentsCount(pid, did);
            return Ok(count);
        }
        [HttpGet("AllAppointments")]
        public IActionResult GetAllPappointments(int pid, int did)
        {
            var appointments = _appointment.GetAllPappointments(pid, did);
            return Ok(appointments);
        }

        [HttpPost("RequestAppointment")]
        public IActionResult MakeAppointment(AppointmentREC ap)
        {
            var res = _appointment.MakeAppointment(ap);
            if (res == 1)
            {
                return Ok("Appointment request sent successfully!");
            }else if(res == 0)
            {
                return BadRequest("Invalid doctor ID!");
            }
            return BadRequest("Invalid patient ID!");
            
        }

        [HttpDelete("DeleteAppointment")]
        public IActionResult DeleteAppointment(int apid)
        {
            var res = _appointment.DeleteAppointment(apid);
            if(res == 0)
            {
                return BadRequest("Error deleting Appointment Request!!!");
            }
            return Ok(res);
        }
        [HttpGet("GetAppointmentResponse")]
        public IActionResult GetAppointmentResponse(int apid)
        {
            var response = _appointment.GetAppointmentResponse(apid);
            if (response.HasValue)
            {
                if (response.Value)
                {
                    return Ok("Appointment Accepted");
                }
                return Ok("Appointment Rejected");
            }
            return BadRequest("Error! Appointment doesn't exist or still pending!!");
        }
        //scan related endpoints
        [HttpPost("AddScan")]
        public IActionResult AddScan([FromBody]Scan scan) {
            var res = _scan.AddScan(scan);
            if(res != 0)
            {
                return Ok("Scan added successfully!");
            }
            return BadRequest("Cannot add scan, appointment not accepted or does not exist!");
        }
        [HttpGet("GetScan")]
        public IActionResult GetScan(int scanid)
        {
            var res = _scan.GetScan(scanid);
            if(res != null)
            {
                return Ok(res);
            }
            return NotFound();
        }
        [HttpGet("AllScans")]
        public IActionResult GetAllPscans(int p_id, int doc_id)
        {
            var res = _scan.GetAllPscans(p_id, doc_id);
            return Ok(res);
        }
        [HttpGet("GetScanResponse")]
        public IActionResult GetScanResponse(int scanid)
        {
            var res = _scan.GetScanResponse(scanid);
            return Ok(res);
        }
        //Surgery related endpoints
        [HttpGet("GetSurgery")]
        public IActionResult GetSurgery(int pid, int did)
        {
            var res = _db.Database.SqlQuery<Surgery>(@$"SELECT * FROM ""surgery"" WHERE pid = {pid} and did={did}").ToList();
            if (res.Count != 0)
            {
                return Ok(res[0]);
            }
            return BadRequest("Surgery does not exist!!");
        }

        public record SurgeryDocRecord(
            int Sid,
            int? Did,
            int? Pid,
            string Name,
            DateTime? Sdate,
            int? Cost,
            int? OpRoom,
            float? Duration,

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

        [HttpGet("AllSurgeries")]
        public IActionResult GetALLPsurgeries(int pid, int did)
        {
            var res = new List<SurgeryDocRecord>();
            if(did == 0)
            {
                 res = _db.Database.SqlQuery<SurgeryDocRecord>(@$"
            SELECT 
                s.sid as Sid,
                s.did as Did,
                s.pid as Pid,
                s.name as Name,
                s.sdate as Sdate,
                s.cost as Cost,
                s.op_room as OpRoom,
                s.duration as Duration,
                d.firstname as DocFirstName,
                d.lastname as DocLastName,
                d.email as DocEmail,
                d.phone as DocPhone,
                d.address as DocAddress,
                d.gender as DocGender,
                d.bdate as DocBdate,
                d.profileimage as DocProfileImage,
                d.role as DocRole
            FROM surgery s
            LEFT JOIN ""User"" d ON s.did = d.uid
            WHERE s.pid = {pid} ").ToList();

            }
            else { 
                 res = _db.Database.SqlQuery<SurgeryDocRecord>(@$"
            SELECT 
                s.sid as Sid,
                s.did as Did,
                s.pid as Pid,
                s.name as Name,
                s.sdate as Sdate,
                s.cost as Cost,
                s.op_room as OpRoom,
                s.duration as Duration,
                d.firstname as DocFirstName,
                d.lastname as DocLastName,
                d.email as DocEmail,
                d.phone as DocPhone,
                d.address as DocAddress,
                d.gender as DocGender,
                d.bdate as DocBdate,
                d.profileimage as DocProfileImage,
                d.role as DocRole
            FROM surgery s
            LEFT JOIN ""User"" d ON s.did = d.uid
            WHERE s.pid = {pid} and s.did = {did} ").ToList();
            }
            if (res.Count != 0)
            {
                return Ok(res);
            }
            return BadRequest("No surgeries were found!!");
        }
        // disease related endpoints

        [HttpGet("AllDiseases")]
        public IActionResult GetDiseases(int pid)
        {
            var res = _history.GetDiseases(pid);
            if (res.Count != 0)
            {
                return Ok(res);
            }
            return BadRequest("No diseases found for this patient!!");
        }

        [HttpPost("AddDisease")]
        public IActionResult AddDisease([FromBody] Disease disease)
        {
            var res = _history.AddDisease(disease);
            if(res == 0)
            {
                return BadRequest("Error adding disease!! Check patient_id");
            }
            return Ok(res);
        }
        [HttpDelete("DeleteDisease")]
        public IActionResult DeleteDisease([FromBody] Disease disease)
        {
            var res = _history.DeleteDisease(disease);
            if (res == 0)
            {
                return BadRequest("Error deleting disease!!");
            }
            return Ok(res);

        }

        //Phistory related endpoints

        [HttpGet("GetPhistory")]
        public IActionResult GetPatientHistory(int pid)
        {
            var res = _history.GetPatientHistory(pid);
            if(res != null)
            {
                return Ok(res); 
            }
            return BadRequest("No history was found for this patient!!");
        }

        [HttpPost("AddPhistory")]
        public IActionResult SetPatientHistory([FromBody] Phistory history)
        {
            var res = _history.SetPatientHistory( history);
            if(res == 0)
            {
                return BadRequest("Error adding patient history!!");
            }
            return Ok(res);
        }
        [HttpPut("EditPhistory")]
        public IActionResult EditPatientHistory(int patient_id, [FromBody] Phistory history)
        {
            var res = _history.EditPatientHistory(patient_id, history);
            if(res == 0)
            {
                return BadRequest("Error editing patient history!!");
            }
            return Ok(res);
        }

    }
}
