using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DataBaseProject.Models;

[Table("scan")]
public partial class Scan
{
    [Key]
    [Column("scan_id")]
    public int ScanId { get; set; }

    [Column("doc_id")]
    public int? DocId { get; set; }

    [Column("p_id")]
    public int? PId { get; set; }

    [Column("description")]
    public string? Description { get; set; }

    [Column("image")]
    public string? Image { get; set; }

	[Column("image2")]
	public string? Image2 { get; set; }

	[Column("accept")]
    public bool? Accept { get; set; }

    [Column("response")]
    public string? Response { get; set; }
    [NotMapped]
    [ForeignKey("DocId")]
    [InverseProperty("ScanDocs")]
    public virtual User? Doc { get; set; }
    [NotMapped]
    [ForeignKey("PId")]
    [InverseProperty("ScanPIdNavigations")]
    public virtual User? PIdNavigation { get; set; }
}
