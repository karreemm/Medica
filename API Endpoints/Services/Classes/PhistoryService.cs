using DataBaseProject.Models;
using Microsoft.EntityFrameworkCore;
using DataBaseProject.Services.Interfaces;
using DataBaseProject.Data;
using System.Numerics;

namespace DataBaseProject.Services.Classes
{
    public class PhistoryService : IPhistoryService
    {
        private readonly AppDbContext _db;
        private readonly IPatientService _patient;

        public PhistoryService(AppDbContext db, IPatientService patient)
        {
            _db = db;
            _patient = patient;
        }
        public int AddDisease(Disease disease)
        {
            
            string patientLogMessage = $"Disease added: {disease.Disease1}";
            _patient.LogActivity(disease.PatientId, disease.PatientId, patientLogMessage);
           
            return _db.Database.ExecuteSqlRaw($"INSERT INTO disease (patient_id, disease) VALUES ({disease.PatientId}, '{disease.Disease1}')");

        }

        public int DeleteDisease(Disease disease)
        {
            string patientLogMessage = $"Disease deleted: {disease.Disease1}";
            _patient.LogActivity(disease.PatientId, disease.PatientId, patientLogMessage);
            return _db.Database.ExecuteSqlRaw($"DELETE FROM disease WHERE patient_id = {disease.PatientId} AND disease = '{disease.Disease1}'");

        }
        public List<Disease> GetDiseases(int pid)
        {
            return _db.Database.SqlQuery<Disease>($@"SELECT * FROM disease WHERE patient_id = {pid}").ToList();

        }


        public int EditPatientHistory(int pId,Phistory h)
        {
            Phistory oldH = GetPatientHistory(pId);
            var weight = oldH.Weight;
            var height = oldH.Height;
            var smoking = oldH.Smoking;
            var hospital_stay = oldH.HospitalStay;
            if (h.Weight != 0.0)
            {
                weight = h.Weight;
            }
            if (h.Height != 0.0)
            {
                height = h.Height;
            }
            if (h.Smoking != smoking)
            {
                smoking = h.Smoking;
            }
            if (h.HospitalStay != 0)
            {
                hospital_stay = h.HospitalStay;
            }
            string patientLogMessage = $"History updated for patient Id: {h.PatientId}";
            _patient.LogActivity(h.PatientId, h.PatientId, patientLogMessage);
            return _db.Database.ExecuteSqlRaw($"UPDATE phistory SET weight = {weight}, height = {height}, smoking = {smoking}, hospital_stay = '{hospital_stay}' WHERE patient_id = {h.PatientId}");

        }
        public Phistory GetPatientHistory(int patient_id)
        {
            return _db.Database.SqlQuery<Phistory>($"SELECT * FROM phistory WHERE patient_id = {patient_id}").ToList()[0];

        }

        public int SetPatientHistory(Phistory h)
        {
            string patientLogMessage = $"History added for patient Id: {h.PatientId}";
            _patient.LogActivity(h.PatientId, h.PatientId, patientLogMessage);
            return _db.Database.ExecuteSqlRaw($"INSERT INTO phistory (patient_id, weight, height, smoking, hospital_stay) VALUES ({h.PatientId}, {h.Weight}, {h.Height}, {h.Smoking}, '{h.HospitalStay}')");
        }
    }
}
