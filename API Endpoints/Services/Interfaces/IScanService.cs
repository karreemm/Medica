using DataBaseProject.Models;
using static DataBaseProject.Services.Classes.ScanService;

namespace DataBaseProject.Services.Interfaces
{
    public interface IScanService
    {
        List<ScanDocRecord> GetAllPscans(int p_id, int doc_id);
        int AddScan(Scan scan);
        Scan GetScan(int scanid);
        string GetScanResponse(int scanid);
    }

}
