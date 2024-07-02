using DataBaseProject.Models;
using DataBaseProject.Services.Classes;
using DataBaseProject.Controllers;
using DataBaseProject.Data;

namespace DataBaseProject.Services.Interfaces
{
    public interface IAdminServices
    {
        // Create users
        public State AddNurse(User user);

        public State AddPatient(User user);

        public State AddDoctor(User user);

        public List<int> NoDoctorSurgeries(int did);

        public List<int> NoNurseSurgeries(int nid);

        public List<int> NoPatientSurgeries(int pid);

        public List<Surgery> SurgeriesNurseDoctor(int nid, int did);

        public State updateStatus(int app_id, string status);

        public int addSurgery(Surgery surgery);

        public List<Surgery> NurseSurgeries(int nid);

        public List<Surgery> PatientSurgeries(int pid);

        public List<Surgery> DoctorSurgeries(int did);


    }
}
