using DataBaseProject.Data;
using DataBaseProject.Models;
using DataBaseProject.Services;
using DataBaseProject.Services.Interfaces;
using Microsoft.AspNetCore.Razor.TagHelpers;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using System.Data;
using System.Data.SqlClient;

namespace DataBaseProject.Services.Classes
{
    public class AdminServices : IAdminServices
    {
        // Create Data Base Object We Will use in methods.
        private readonly AppDbContext _db;

        // Build the constructor of the class.
        public AdminServices (AppDbContext db) {
            _db = db;
        }

        // Implement the End Points.
        public State AddNurse(User user) {
            // Check If the user isn't exit
            var check = _db.Database.SqlQuery<User>($@"Select * from ""User"" where email={user.Email} ");
            if (check.Count() != 0){ // It's means the user is exist.
                return State.AuthenticationFailed;
            }
            
            else {
                // INSERT QUERY
                var results = _db.Database.ExecuteSqlRaw($@"insert into ""User"" (firstname, lastname , password, email , 
                role,date ,phone,address,profileimage,linkedin,github , insta, facebook, twitter, gender , bdate) 
                values ('{user.Firstname}' , '{user.Lastname}' , '{user.Password}' , '{user.Email}' , 'nurse',
                '{DateTime.Now}','{user.Phone}', '{user.Address}' , '{user.Profileimage}','{user.Linkedin}','{user.Github}' 
                , '{user.Insta}' ,  '{user.Facebook}' ,  '{user.Twitter}' , '{user.Gender}' , '{(user.Bdate is null? DateTime.Now: user.Bdate)}')");


                return State.Success;
            }
        
        }


        public State AddDoctor(User user)
        {
            // Check If the user isn't exit
            var check = _db.Database.SqlQuery<User>($@"Select * from ""User"" where email={user.Email} ");
            if (check.Count() != 0)
            { // It's means the user is exist.
                return State.AuthenticationFailed;
            }

            else
            {
                // INSERT QUERY
                var results = _db.Database.ExecuteSqlRaw($@"insert into ""User"" (firstname, lastname , password, email , 
                role,date ,phone,address,profileimage,linkedin,github , insta, facebook, twitter, gender , bdate) 
                values ('{user.Firstname}' , '{user.Lastname}' , '{user.Password}' , '{user.Email}' , 'doctor',
                '{DateTime.Now}','{user.Phone}', '{user.Address}' , '{user.Profileimage}','{user.Linkedin}','{user.Github}' 
                , '{user.Insta}' ,  '{user.Facebook}' ,  '{user.Twitter}' , '{user.Gender}' , '{(user.Bdate is null ? DateTime.Now:user.Bdate)}')");



                return State.Success;
            }
        }

        public State AddPatient(User user)
        {
            // Check If the user isn't exit
            var check = _db.Database.SqlQuery<User>($@"Select * from ""User"" where email={user.Email} ");
            if (check.Count() != 0)
            { // It's means the user is exist.
                return State.AuthenticationFailed;
            }

            else
            {
                // INSERT QUERY
                
                var results = _db.Database.ExecuteSqlRaw($@"insert into ""User"" (firstname, lastname , password, email , 
                role,date ,phone,address,profileimage,linkedin,github , insta, facebook, twitter, gender , bdate) 
                values ('{user.Firstname}' , '{user.Lastname}' , '{user.Password}' , '{user.Email}' , 'patient',
                '{DateTime.Now}','{user.Phone}', '{user.Address}' , '{user.Profileimage}','{user.Linkedin}','{user.Github}' 
                , '{user.Insta}' ,  '{user.Facebook}' ,  '{user.Twitter}' , '{user.Gender}' , '{(user.Bdate is null ? DateTime.Now : user.Bdate)}')");


                return State.Success;
            }

        }


        public List<int> NoDoctorSurgeries(int did) {
            var check = _db.Database.SqlQuery<User>($@"select * from ""User"" where uid={did}").FirstOrDefault();

            //if (check.Role != "doctor" || check == null) {
            //    throw new NotFoundException($"No doctor found with Uid {did}");
            //}
            var result = _db.Database.SqlQuery<int>(@$"
                                                        select  count(DISTINCT sid)
                                                        from ""surgery"" 
                                                        where surgery.did = {did}
                                                        group by surgery.did
                                                      ").ToList();

            return result;
        }


        public List<int> NoPatientSurgeries(int pid)
        {
            var check = _db.Database.SqlQuery<User>($@"select * from ""User"" where uid={pid}").FirstOrDefault();

            if (check.Role != "patient" || check == null)
            {
                throw new NotFoundException($"No patient found with Uid {pid}");
            }
            var result = _db.Database.SqlQuery<int>(@$"
                                                        select  count(DISTINCT sid)
                                                        from ""surgery"" 
                                                        where surgery.pid = {pid}
                                                        group by surgery.pid
                                                      ").ToList();
             
            return result;
        }



        public List<int> NoNurseSurgeries(int nid)
        {
            var check = _db.Database.SqlQuery<User>($@"select * from ""User"" where uid={nid}").FirstOrDefault();

            if (check.Role != "nurse" || check == null)
            {
                throw new NotFoundException($"No nurse found with Uid {nid}");
            }
            var result = _db.Database.SqlQuery<int>(@$"
                                                        select  count(DISTINCT sid)
                                                        from ""sugery_nurses"" 
                                                        where sugery_nurses.nid = {nid}
                                                        group by sugery_nurses.Nid
                                                      ").ToList();
            return result;
        }



        public List<Surgery> SurgeriesNurseDoctor(int nid, int did) {
            var _doc = _db.Database.SqlQuery<User>($@"select * from ""User"" where uid= {did}").FirstOrDefault();
            var _nurse = _db.Database.SqlQuery<User>($@"select * from ""User"" where uid= {nid}").FirstOrDefault();
            
            if (_nurse.Role != "nurse") {
                throw new NotFoundException($"No nurse found with Uid {nid}");
            }
            if (_doc.Role != "doctor") {
                throw new NotFoundException($"No doctor found with Uid {did}");

            }
            else { 
                var result = _db.Database.SqlQuery<Surgery>($@"select *
                                                            from ""surgery""
                                                            where did={did} and sid IN (select sid
                                                                                    from ""sugery_nurses""
                                                                                    where nid={nid});").ToList();
                return result;
            }
        }


        public State updateStatus(int app_id , string status) {
            // Check if the appointment is exist
            var _check = _db.Database.SqlQuery<Appointment>($@"select * from ""appointment"" where apid={app_id}").FirstOrDefault();
            if (_check == null) { // Appointment isn't exist! 
                throw new NotFoundException($"There's no appointment with this ID");
            }

            else {
                _db.Database.ExecuteSqlRaw($@"UPDATE ""appointment"" SET ""status"" = '{status}' WHERE ""apid"" = {app_id}");
                return State.Success;
            }
        }

        public int addSurgery(Surgery surgery)
        {
            _db.Database.ExecuteSqlRaw(@"
                insert into ""surgery"" ( did, pid, name, sdate, cost, op_room , duration)
                values (@did, @pid, @name, @sdate, @cost, @op_room, @duration)",

                new[] {
                        new NpgsqlParameter("@did", surgery.Did),
                        new NpgsqlParameter("@pid", surgery.Pid),
                        new NpgsqlParameter("@name", surgery.Name),
                        new NpgsqlParameter("@sdate", surgery.Sdate),
                        new NpgsqlParameter("@cost", surgery.Cost),
                        new NpgsqlParameter("@op_room", surgery.OpRoom),
                        new NpgsqlParameter("@duration", surgery.Duration)
                });

            return _db.Surgeries
			  .OrderByDescending(s => s.Sid)
			  .FirstOrDefault()
			  .Sid;

		}


        public List<Surgery> DoctorSurgeries(int did)
        {
            var check = _db.Database.SqlQuery<User>($@"select * from ""User"" where uid={did}").FirstOrDefault();

            if (check.Role != "doctor" || check == null)
            {
                throw new NotFoundException($"No doctor found with Uid {did}");
            }
            var result = _db.Database.SqlQuery<Surgery>(@$"
                                                        select  *
                                                        from ""surgery"" 
                                                        where surgery.did = {did}
                                                        group by surgery.sid
                                                      ").ToList();

            return result;
        }


        public List<Surgery> PatientSurgeries(int pid)
        {
            var check = _db.Database.SqlQuery<User>($@"select * from ""User"" where uid={pid}").FirstOrDefault();

            if (check.Role != "patient" || check == null)
            {
                throw new NotFoundException($"No patient found with Uid {pid}");
            }
            var result = _db.Database.SqlQuery<Surgery>(@$"
                                                        select  *
                                                        from ""surgery"" 
                                                        where surgery.pid = {pid}
                                                        group by surgery.sid
                                                      ").ToList();

            return result;
        }



        public List<Surgery> NurseSurgeries(int nid)
        {
            var check = _db.Database.SqlQuery<User>($@"select * from ""User"" where uid={nid}").FirstOrDefault();

            if (check.Role != "nurse" || check == null)
            {
                throw new NotFoundException($"No nurse found with Uid {nid}");
            }
            var result = _db.Database.SqlQuery<Surgery>(@$"
                                                            select *
                                                            from ""surgery""
                                                            where sid IN(
                                                                select  sugery_nurses.sid
                                                                from ""sugery_nurses""
                                                                where nid = {nid}
                                                                group by sid); ").ToList();
            return result;
        }


    }
}
