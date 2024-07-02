using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DataBaseProject.Models;

[Table("disease")]
public partial class Disease
{
    [Key]
    [Column("patient_id")]
    public int PatientId { get; set; }

    [Column("disease")]
    [StringLength(255)]
    public string? Disease1 { get; set; }
    [NotMapped]
    [ForeignKey("PatientId")]
    [InverseProperty("Disease")]
    public virtual Phistory Patient { get; set; } = null!;
}
