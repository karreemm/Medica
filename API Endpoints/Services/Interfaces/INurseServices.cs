using Microsoft.Extensions.Diagnostics.HealthChecks;
using DataBaseProject.Models;
using DataBaseProject.Services;
using DataBaseProject.Services.Classes;
using static DataBaseProject.Services.Classes.NurseServices;


namespace DataBaseProject.Services.Interfaces
{
    public interface INurseServices
    {
        public User getNurse(int uid);

        public State deleteNurse(int uid);

        public List<User> GetAllNurses();

        public List<User> surgeryNurses(int sid);

        public List<Activity> getAllActivies(int nid);

        public State addToSurgery(Nurses nurses);
    }
}
