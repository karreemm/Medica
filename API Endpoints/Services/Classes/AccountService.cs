using DataBaseProject.Data;
using DataBaseProject.Models;
using DataBaseProject.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace DataBaseProject.Services.Classes
{
    public class AccountService : IAccountService
    {
        // Get an instance of the database
        private readonly AppDbContext _db;

        //Create a constructor to inject the database
        public AccountService(AppDbContext db) {
            _db = db;
        }


        //Implementing the endpoints.
        public State Validate(string email, string password) {

            //VALIDATE USER INPUT.
            /* EMAIL PATTERN FOR VALIDATION */
            string emailPattern = @"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$";
          
            string[] Invalid_characters = ["'" ,  "#" , ";" ]; //Invalid Characters to prevent SQLi


            /* Make sure it's not contain an invalid characters */
            if (!Regex.IsMatch(email, emailPattern)) {
                return State.InvalidInput;
            }

            foreach (string invChar in Invalid_characters) {
                if (email.Contains(invChar))
                {
                    return State.InvalidInput;
                }
            }

            //###########################################################//


            //MAKE SURE IF EMAIL IS EXISTS.
            
      
            if (!IsUserExists(email)) { //This email not exists.D
				return State.NotFound;
			}
            else {
                //MAKE SURE IF THE EMAIL WITH THE PASSWORD ARE CORRECT.
                var res = _db.Database.SqlQuery<User>(@$"select * from ""User"" where email={email} and password={password}").ToList();
                if (res.Count() == 0) {
                    return State.AuthenticationFailed;
                }
            }

            return State.Success;

        }
		public User GetUser(string email)
		{
			var results = _db.Database.SqlQuery<User>(@$"select * from ""User"" where email={email}").ToList();
			return results[0];
		}

		public State CreateAccount(User user) {
            
            string role = NoUsersExist() ? "admin" : "patient";
			if (IsUserExists(user.Email))
            {
                return State.InvalidInput;
			}


            // ADD THIS USER TO THE USER TABLE WITH THE ATTATCHED DATA. => SQL QUERY
            var results = _db.Database.ExecuteSqlRaw($@"insert into ""User"" (firstname, lastname , password, email , 
            role,date ,phone,address,profileimage,linkedin,github, insta , facebook, twitter) 
            values ('{user.Firstname}' , '{user.Lastname}' , '{user.Password}' , '{user.Email}' , '{role}',
            '{DateTime.Now}','{user.Phone}', '{user.Address}' , '{user.Profileimage}','{user.Linkedin}','{user.Github}' ,'{user.Insta}'
            ,'{user.Facebook}' ,'{user.Twitter}')");
            
            return State.Success;
        }

        public Deleteduser DeleteUser(User user) {
            //ADD THE USER TO DELETED-USER TABLE  => SQL QUERY
            var results = _db.Database.ExecuteSqlRaw($@"insert into ""deleteduser"" (firstname, lastname , password, email , role) 
            values ('{user.Firstname}' , '{user.Lastname}' , '{user.Password}' , '{user.Email}' , '{user.Role}' ) ");

            //SECOND: REMOVE IT FROM USER TABLE  => SQL QUERY
            var _remove = _db.Database.ExecuteSqlRaw($@"delete from ""User"" where email='{user.Email}' ");

            Deleteduser Deleted_User = new Deleteduser
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

            return Deleted_User;
        }

        public bool IsUserExists(string email)
		{
			var results = _db.Database.SqlQuery<User>(@$"select * from ""User"" where email={email}").ToList();
			if (results.Count() == 0)
            { //This email not exists.D
                return false;
            }
            return true;
        }
		public bool NoUsersExist()
		{
			var results = _db.Database.SqlQuery<User>($@"select * from ""User""").ToList();
			if (results.Count() == 0)
			{
				return true;
			}
			return false;
		}
        public int DeleteAllUsers()
		{
			var results = _db.Database.ExecuteSqlRaw($@"delete from ""User"" ");
            return results;
		}
	}
}
