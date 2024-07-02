using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DataBaseProject.Models;

[Table("activity")]
public partial class Activity
{
    [Key]
    [Column("ac_id")]
    public int AcId { get; set; }

    [Column("uid")] 
    public int? Uid { get; set; }

    [Column("action")]
    public string? Action { get; set; }

    [Column("date")]
    public DateTime? Date { get; set; }

    [Column("toid")]
    public int? Toid { get; set; }
    [NotMapped]
    [ForeignKey("Toid")]
    [InverseProperty("ActivityTos")]
    public virtual User? To { get; set; }
    [NotMapped]
    [ForeignKey("Uid")]
    [InverseProperty("ActivityUidNavigations")]
    public virtual User? UidNavigation { get; set; }
}
