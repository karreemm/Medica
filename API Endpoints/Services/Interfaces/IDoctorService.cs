using DataBaseProject.Models;
using static DataBaseProject.Services.Classes.DoctorService;

namespace DataBaseProject.Services.Interfaces
{
    public interface IDoctorService
    {
        
        public List<User> GetAllDocotrs();  
        public Deleteduser DeleteDoctor(int did);
        public User GetDoctor(int did);

        public List<SurgeryUserRecord> GetAllSurgeries(int did);

        public List<AppointmentUserRecord> GetAllAppointments(int did);

        public List<ScanUserRecord> GetAllScans(int did);

        public List<Activity> GetAllActivities(int did);

        public void SetScanResponse(int sid, bool accept ,string response);

        public void SetAppointmentResponse(int aid, bool response , string? note);

        public void LogActivity(int? uid, int toid, string action);
        public void LogActivity(int? uid, int? toid, string action);

        public void AddSurgery(Surgery surgery);

        // public void AddSurgery(int sid, int? did, int? pid, string? name, int? nid);

        //public void AddSurgery(int sid, int? did, int? pid, string? name, DateTime? sdate, int? cost, int? opRoom, TimeSpan? duration, int? nid);

    }
}
