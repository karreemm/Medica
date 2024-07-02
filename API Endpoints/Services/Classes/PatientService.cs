using DataBaseProject.Models;
using Microsoft.EntityFrameworkCore;
using DataBaseProject.Data;
using DataBaseProject.Services.Interfaces;
using DataBaseProject.Services.Classes;
using System.Data.SqlClient;
using Npgsql;

namespace DataBaseProject.Services.Classes
{
   
    public class PatientService:IPatientService
    {
        private readonly AppDbContext _db;
        

        public PatientService(AppDbContext DB)
        {
            _db = DB;
            
        }

        public User GetPatient(int uid)
        {   if (uid != 0 )
            {
            return _db.Database.SqlQuery<User>(@$"SELECT * FROM ""User"" WHERE uid = {uid} ").ToList()[0];
            }
            return null;
        }

        public List<User> GetAllPatients()
        {
            return _db.Database.SqlQuery<User>(@$"SELECT * FROM ""User"" WHERE role= 'patient'").ToList();
            
        }

        public int DeletePatient(int uid)
        {
            var Patient= GetPatient(uid);
            if (Patient.Role == "patient") {
                _db.Database.ExecuteSqlRaw($@"insert into ""deleteduser"" (firstname, lastname , password, email , role) 
            values ('{Patient.Firstname}' , '{Patient.Lastname}' , '{Patient.Password}' , '{Patient.Email}' , '{Patient.Role}' ) ");
            }
            return _db.Database.ExecuteSqlRaw(@$"DELETE FROM ""User"" WHERE uid = {uid} and role='patient'");
        }

        public void LogActivity(int uid, int toid, string action)
        {
            var query = "INSERT INTO activity (uid, toid, action, date) VALUES (@uid, @toid, @action, @date)";
            var date = DateTime.Now;

            _db.Database.ExecuteSqlRaw(query,
                new NpgsqlParameter("@uid", uid),
                new NpgsqlParameter("@toid", toid),
                new NpgsqlParameter("@action", action),
                new NpgsqlParameter("@date", date));
        }

        public List<Activity> GetAllPActivities(int uid)
        {
           return _db.Database.SqlQuery<Activity>($@"Select * FROM activity WHERE uid = {uid}").ToList();
        }

        public string GetUsername(int uid)
        {
            
            var userName = _db.Database.SqlQuery<string>(@$"SELECT ""lastname"" FROM ""User"" WHERE uid = {uid}").ToList();
            if (userName.Count > 0)
            {
                return userName[0];
            }
            else
            {
                return "Unknown User";
            }
        }
    }

}
