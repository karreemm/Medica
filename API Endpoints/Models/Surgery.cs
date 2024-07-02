using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DataBaseProject.Models;

[Table("surgery")]
public partial class Surgery
{
    [Key]
    [Column("sid")]
    public int Sid { get; set; }

    [Column("did")]
    public int? Did { get; set; }

    [Column("pid")]
    public int? Pid { get; set; }

    [Column("name")]
    [StringLength(255)]
    public string? Name { get; set; }

    [Column("sdate")]
    public DateTime? Sdate { get; set; }

    [Column("cost")]
    public int? Cost { get; set; }

    [Column("op_room")]
    public int? OpRoom { get; set; }

    [Column("duration")]
    public float? Duration { get; set; }

    
    [NotMapped]
    [ForeignKey("Did")]
    [InverseProperty("SurgeryDidNavigations")]
    public virtual User? DidNavigation { get; set; }
    
    [NotMapped]
    [ForeignKey("Pid")]
    [InverseProperty("SurgeryPidNavigations")]
    public virtual User? PidNavigation { get; set; }
    
    [NotMapped]
    [ForeignKey("Sid")]
    [InverseProperty("Sids")]
    public virtual ICollection<User> Nids { get; set; } = new List<User>();
}
