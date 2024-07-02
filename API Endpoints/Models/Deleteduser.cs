using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DataBaseProject.Models;

[Table("deleteduser")]
public partial class Deleteduser
{
    [Key]
    [Column("uid")]
    public int Uid { get; set; }

    [Column("firstname")]
    [StringLength(100)]
    public string Firstname { get; set; } = null!;

    [Column("lastname")]
    [StringLength(100)]
    public string Lastname { get; set; } = null!;

    [Column("password")]
    [StringLength(255)]
    public string Password { get; set; } = null!;

    [Column("address")]
    [StringLength(255)]
    public string? Address { get; set; }

    [Column("email")]
    [StringLength(255)]
    public string Email { get; set; } = null!;

    [Column("phone")]
    [StringLength(20)]
    public string? Phone { get; set; }

    [Column("github")]
    [StringLength(255)]
    public string? Github { get; set; }

    [Column("linkedin")]
    [StringLength(255)]
    public string? Linkedin { get; set; }

    [Column("profileimage")]
    public string? Profileimage { get; set; }

    [Column("role")]
    [StringLength(50)]
    public string? Role { get; set; }

    [Column("date")]
    public DateTime? Date { get; set; }

    [Column("deleted_date")]
    public DateTime? DeletedDate { get; set; }

    [Column("gender")]
    [StringLength(10)]
    public string? Gender { get; set; }

    [Column("bdate")]
    public DateTime? Bdate { get; set; }

    [Column("insta")]
    [StringLength(255)]
    public string? Insta { get; set; }

    [Column("facebook")]
    [StringLength(255)]
    public string? Facebook { get; set; }

    [Column("twitter")]
    [StringLength(255)]
    public string? Twitter { get; set; }
}
