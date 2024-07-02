using DataBaseProject.Models;
using static DataBaseProject.Services.Classes.AppointmentService;

namespace DataBaseProject.Services.Interfaces
{
    public interface IAppointmentService
    {
        List<AppointmentDocRecord> GetAllPappointments(int pid, int did);
        int MakeAppointment(AppointmentREC appointment);
        Appointment GetAppointment(int apid);
        int DeleteAppointment(int apid);
        int GetPappointmentsCount(int pid, int did);
        bool? GetAppointmentResponse(int apid);
    }

}
