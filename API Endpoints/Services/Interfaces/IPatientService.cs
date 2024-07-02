using DataBaseProject.Models;

namespace DataBaseProject.Services.Interfaces
{
    public interface IPatientService
    {
        User GetPatient(int uid);
        List<User> GetAllPatients();
        int DeletePatient(int uid);
        void LogActivity(int uid,int toid, string action);
        string GetUsername(int uid);
        List<Activity> GetAllPActivities(int uid);
       
    }
}
