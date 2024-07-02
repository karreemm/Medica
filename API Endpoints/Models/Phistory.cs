using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DataBaseProject.Models;

[Table("phistory")]
public partial class Phistory
{
    [Key]
    [Column("patient_id")]
    public int PatientId { get; set; }

    [Column("weight")]
    public float? Weight { get; set; }

    [Column("height")]
    public float? Height { get; set; }

    [Column("smoking")]
    public bool? Smoking { get; set; }

    [Column("hospital_stay")]
    public int? HospitalStay { get; set; }
    [NotMapped]
    [InverseProperty("Patient")]
    public virtual Disease? Disease { get; set; }
    [NotMapped]
    [ForeignKey("PatientId")]
    [InverseProperty("Phistory")]
    public virtual User Patient { get; set; } = null!;
}
