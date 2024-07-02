using DataBaseProject.Data;
using DataBaseProject.Models;
using DataBaseProject.Services.Classes;
using DataBaseProject.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using static System.Net.Mime.MediaTypeNames;

namespace DataBaseProject.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ProfileController : ControllerBase
	{
		private readonly IUserService _user;
		private readonly IAccountService _account;
       
        public ProfileController(IAccountService account,IUserService user)
		{
			_account = account;
			_user = user;
            
        }
        // Create account

        [HttpPost("CreateAccount")]
        public IActionResult CreateAccount([FromBody] User user)
        {
			var result = _account.CreateAccount(user); 
            if (result == State.Success)
            {
                return Ok("Account created successfully");
            }
            else
            {
                return BadRequest(result);
            }
        }

        // Login account

        [HttpPost("Login")]
        public IActionResult Login([FromBody] LoginRequest loginRequest)
        {
            // Call the Validate method from your user service
            var result = _account.Validate(loginRequest.Email, loginRequest.Password);

            // Return appropriate response based on the validation result
            switch (result)
            {
                case State.Success:
					return Ok(_account.GetUser(loginRequest.Email));
				case State.NotFound:
                    return NotFound("User not found");
                case State.AuthenticationFailed:
                    return BadRequest("Authentication failed");
                case State.InvalidInput:
                    return BadRequest("Invalid input");
                default:
                    return StatusCode(500, "Internal server error");
            }
        }

        // Delete user

        [HttpDelete("DeleteUser")]
        public IActionResult DeleteUser([FromBody] User user)
        {
            var result = _account.DeleteUser(user);
            if (result != null)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest("Failed to delete user");
            }
        }

        // Add Post


        // Edit User

        [HttpPut ("EditUser")]
        public IActionResult EditUser([FromBody] User user)
        {
            var result = _user.EditUser(user);
            if (result != null)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest("Failed to edit user");
            }
        }
        // Get all users


        [HttpGet ("GetAllUsers")]
        public IActionResult GetAllUsers()
        {
            var result = _user.GetAllUsers();
            if (result != null)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest("Failed to get users");
            }
        }
        [HttpDelete]
        public IActionResult DeleteAllUsers()
		{
			var result = _account.DeleteAllUsers();
			return Ok(result);
		}
	}
   

}
