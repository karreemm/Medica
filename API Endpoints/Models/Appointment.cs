using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DataBaseProject.Models;

[Table("appointment")]
public partial class Appointment
{
    [Key]
    [Column("apid")]
    public int Apid { get; set; }

    [Column("did")]
    public int? Did { get; set; }

    [Column("pid")]
    public int Pid { get; set; }

    [Column("apdate")]
    public DateTime? Apdate { get; set; }

    [Column("accept")]
    public bool? Accept { get; set; }
    [Column ("notes")]
    public string? notes { get; set; }
    [Column("status")]
    public string ? Status { get; set; }
    [NotMapped]
    [ForeignKey("Did")]
    [InverseProperty("AppointmentDidNavigations")]
    public virtual User? DidNavigation { get; set; }
    [NotMapped]
    [ForeignKey("Pid")]
    [InverseProperty("AppointmentPidNavigations")]
    public virtual User PidNavigation { get; set; } = null!;
}
