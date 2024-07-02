using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DataBaseProject.Models;
using DataBaseProject.Services.Interfaces;
using static DataBaseProject.Services.Classes.NurseServices;


namespace DataBaseProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NurseController : ControllerBase
    {
        private readonly INurseServices _iserv;

        public NurseController(INurseServices iserv)
        {
            _iserv = iserv;
        }

        [HttpGet("GetNurse")]
        public IActionResult GetNurse(int uid) {
            var result = _iserv.getNurse(uid);

            return Ok(result);
        }

        [HttpDelete("DeleteNurse")]
        public IActionResult deleteUser(int nid) {
            var result = _iserv.deleteNurse(nid);
            return Ok(result);
        }

        [HttpGet("AllNurses")]
        public IActionResult AllNurses()
        {
            var result = _iserv.GetAllNurses();
            return Ok(result);
        }

        [HttpGet("SurgeryNurses")]
        public IActionResult SurgeryNurses(int sid) {
            var result = _iserv.surgeryNurses(sid);

            return Ok(result);
        }


        [HttpGet("getAllActivies")]
        public IActionResult getAllActivies(int nid) {
            var result = _iserv.getAllActivies(nid);
            return Ok(result);
        }

        [HttpPost("addToSurgery")]
        public IActionResult addToSurgery(Nurses nurses)
        {
            var result = _iserv.addToSurgery(nurses);
            return Ok(result);
        }



    }
}
