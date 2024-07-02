using DataBaseProject.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DataBaseProject.Models;
using DataBaseProject.Services.Classes;
using System.ComponentModel;

namespace DataBaseProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {

        // Build Interface object to test its methods
        private readonly IAdminServices _iserv;

        // Build the constructor of the controller
        public AdminController(IAdminServices iserv) {
            _iserv = iserv;
        }

        // Test the method.
        [HttpPost("AddNurse")]
        public IActionResult AddNurse(User user) {
                var result = _iserv.AddNurse(user);
                return Ok(result);   
        }



        [HttpPost("AddDoctor")]
        public IActionResult AddDoctor(User user) {
            var result = _iserv.AddDoctor(user);
            return Ok(result);
        }

        [HttpPost("AddPatient")]
        public IActionResult AddPatient(User user) {
            var result = _iserv.AddPatient(user);
            return Ok(result);
        }

        [HttpGet("DoctorSurgeries")]
        public IActionResult doctor(int did) {
            var result = _iserv.NoDoctorSurgeries(did);
            return Ok(result);
        }

        [HttpGet("NurseSurgeries")]
        public IActionResult nurse(int nid)
        {
            var result = _iserv.NoNurseSurgeries(nid);
            return Ok(result);
        }

        [HttpGet("PatientSurgeries")]
        public IActionResult patient(int pid)
        {
            var result = _iserv.NoPatientSurgeries(pid);
            return Ok(result);
        }

        [HttpGet("SurgeriesOfNurse&Doctor")]
        public IActionResult Get(int nid, int did) {
            var result = _iserv.SurgeriesNurseDoctor(nid, did);
            return Ok(result);
        }

        public record UpdateStatus(int apid, string status);
        [HttpPut("updateStatus")]
        public IActionResult Get(UpdateStatus update)
        {
            var result = _iserv.updateStatus(update.apid, update.status);
            return Ok(result);
        }


        [HttpPost("addSurgery")]
        public IActionResult Post(Surgery surgery) {
            var result = _iserv.addSurgery(surgery);
            return Ok(result);
        }


        [HttpGet("DoctorSurgeriesList")]
        public IActionResult doctorList(int did)
        {
            var result = _iserv.DoctorSurgeries(did);
            return Ok(result);
        }

        [HttpGet("NurseSurgeriesList")]
        public IActionResult nurseList(int nid)
        {
            var result = _iserv.NurseSurgeries(nid);
            return Ok(result);
        }

        [HttpGet("PatientSurgeriesList")]
        public IActionResult patientList(int pid)
        {
            var result = _iserv.PatientSurgeries(pid);
            return Ok(result);
        }


    }
}
