using DataBaseProject.Services.Interfaces;
using DataBaseProject.Models;
using DataBaseProject.Data;
using Microsoft.AspNetCore.Razor.TagHelpers;
using Microsoft.EntityFrameworkCore;
using System.Data;
using Npgsql;

namespace DataBaseProject.Services.Classes
{
    public class NurseServices : INurseServices 
    {
        // Build the Data Base Object
        private readonly AppDbContext _db;

        //  Build the contructor of the class
        public NurseServices (AppDbContext db)
        {
            _db = db;
        }

        
        // Implement the methods
        public User getNurse(int nid) {
            // Get the nurse by Uid
            var result = _db.Database.SqlQuery<User>($@"SELECT * from ""User"" where uid={nid}").FirstOrDefault();
            
            if (result == null)
            {
                throw new NotFoundException($"No nurse found with Uid {nid}");
            }
         
            return result;
        }

        

        public State deleteNurse(int uid) {
            var _user = _db.Database.SqlQuery<User>($@"select * from ""User"" where uid={uid}").FirstOrDefault();
            if (_user == null || _user.Role != "nurse") {
                return State.NotFound;
            }
            else  {
                // Add This Nurse To The Deleted User
                /* _db.Database.ExecuteSqlRaw($@"insert into ""deleteduser""(firstname, lastname, password, address, email, phone, github, linkedin,
                 profileimage, role, date, deleted_date, gender, bdate, insta, facebook, twitter) values('{_user.Firstname}' , '{_user.Lastname}',
                 '{_user.Password}', '{_user.Address}', '{_user.Email}', '{_user.Phone}' , '{_user.Github}' , '{_user.Linkedin}', '{_user.Profileimage}',
                 '{_user.Role}' , '{_user.Date}' , '{DateTime.Now}' , '{_user.Gender}') , '{_user.Bdate}' , '{_user.Insta}' , '{_user.Facebook}',
                 '{_user.Twitter}'");
                 */


                
                // Delete From The User Table

                        _db.Database.ExecuteSqlRaw($@"INSERT INTO ""deleteduser"" (
                        firstname, lastname, password, address, email, phone, github, linkedin,
                        profileimage, role, date, deleted_date, gender, bdate, insta, facebook, twitter
                        ) VALUES (
                        @FirstName, @LastName, @Password, @Address, @Email, @Phone, @Github, @Linkedin,
                        @ProfileImage, @Role, @Date, @DeletedDate, @Gender, @Bdate, @Insta, @Facebook, @Twitter
                        )",
                            new NpgsqlParameter("FirstName", _user.Firstname),
                            new NpgsqlParameter("LastName", _user.Lastname),
                            new NpgsqlParameter("Password", _user.Password),
                            new NpgsqlParameter("Address", _user.Address),
                            new NpgsqlParameter("Email", _user.Email),
                            new NpgsqlParameter("Phone", _user.Phone),
                            new NpgsqlParameter("Github", _user.Github),
                            new NpgsqlParameter("Linkedin", _user.Linkedin),
                            new NpgsqlParameter("ProfileImage", _user.Profileimage),
                            new NpgsqlParameter("Role", _user.Role),
                            new NpgsqlParameter("Date", _user.Date),
                            new NpgsqlParameter("DeletedDate", DateTime.Now),
                            new NpgsqlParameter("Gender", _user.Gender),
                            new NpgsqlParameter("Bdate", _user.Bdate),
                            new NpgsqlParameter("Insta", _user.Insta),
                            new NpgsqlParameter("Facebook", _user.Facebook),
                            new NpgsqlParameter("Twitter", _user.Twitter)
                        );


                _db.Database.ExecuteSqlRaw($@"delete from ""User"" where uid={_user.Uid}");
                return State.Success;
            }

        }

        public List<User> GetAllNurses() {
            // QUERY
            var _nurses = _db.Database.SqlQuery<User>($@"select * from ""User"" where role='nurse'").ToList();
            return _nurses;
        }

        public List<User> surgeryNurses(int sid) {
            // Get the IDs od nurses of the surgery (List of integer) //
            var result = _db.Database.SqlQuery<User>($@"select * 
                                                        from ""User""
                                                        where uid IN(select nid
                                                                     from ""sugery_nurses"" 
                                                                     where sid={sid})").ToList();

            return result;
        }


        public List<Activity> getAllActivies(int nid) {
            var _result = _db.Database.SqlQuery<Activity>($@"select * from ""activity"" where uid={nid}").ToList();
            return _result;
        }

        record surgery_nurses(int nid , int sid);
        public record Nurses(string nurses, int sid);
    
        public State addToSurgery(Nurses nurses) {
            // Check if already sid is exist.
            var _check_1 = _db.Database.SqlQuery<Surgery>($@"select * from ""surgery"" where sid={nurses.sid}");
            if (_check_1 == null) {
                throw new NotFoundException($"There's no surgery with this ID");
            }
            
            else {
				// Get the IDs of the nurses
				var nid = nurses.nurses.Split(',').Select(int.Parse).ToList();
				for (int i=0; i< nid.Count(); i++) {
                    // Check if the nurse is exist or have role "nurse" 
                    var _check_2 = _db.Database.SqlQuery<User>($@"select * from ""User"" where uid={nid[i]}").FirstOrDefault();
                    if (_check_2 == null || _check_2.Role != "nurse") {
                        continue;
                    }

                    // handle if the nurse is exist already in the table.
                    var _check_3 = _db.Database.SqlQuery<surgery_nurses>($@"select * from ""sugery_nurses"" where (sid={nurses.sid} and nid={nid[i]})").ToList();
                    if (_check_3.Count != 0) {
                        continue;
                    }

                    else {
                        _db.Database.ExecuteSqlRaw($@"insert into ""sugery_nurses""(nid, sid) values('{nid[i]}', '{nurses.sid}')");
                    }
                }
                return State.Success;

            }
        }
    }
}


public class NotFoundException : Exception
{
    public NotFoundException(string message) : base(message) { }
}
