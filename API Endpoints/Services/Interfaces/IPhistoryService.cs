using DataBaseProject.Models;

namespace DataBaseProject.Services.Interfaces
{
    public interface IPhistoryService
    {
        Phistory GetPatientHistory(int patient_id);
        int EditPatientHistory(int patient_id, Phistory history);
        int SetPatientHistory( Phistory history);
        List<Disease> GetDiseases(int pid);
        int AddDisease(Disease disease);
        int DeleteDisease(Disease disease);
    }

}
