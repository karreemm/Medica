using System;
using System.Collections.Generic;
using DataBaseProject.Models;
using Microsoft.EntityFrameworkCore;

namespace DataBaseProject.Data;

public partial class AppDbContext : DbContext
{
    public AppDbContext()
    {
    }

    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Activity> Activities { get; set; }

    public virtual DbSet<Appointment> Appointments { get; set; }

    public virtual DbSet<Deleteduser> Deletedusers { get; set; }

    public virtual DbSet<Disease> Diseases { get; set; }

    public virtual DbSet<Phistory> Phistories { get; set; }

    public virtual DbSet<Scan> Scans { get; set; }

    public virtual DbSet<Surgery> Surgeries { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Activity>(entity =>
        {
            entity.HasKey(e => e.AcId).HasName("activity_pk");

            entity.HasOne(d => d.To).WithMany(p => p.ActivityTos)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("activity_user_uid_fk_2");

            entity.HasOne(d => d.UidNavigation).WithMany(p => p.ActivityUidNavigations)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("activity_user_uid_fk");
        });

        modelBuilder.Entity<Appointment>(entity =>
        {
            entity.HasKey(e => e.Apid).HasName("appointment_pk");

            entity.HasOne(d => d.DidNavigation).WithMany(p => p.AppointmentDidNavigations)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("appointment_user_uid_fk");

            entity.HasOne(d => d.PidNavigation).WithMany(p => p.AppointmentPidNavigations).HasConstraintName("fk");
        });

        modelBuilder.Entity<Deleteduser>(entity =>
        {
            entity.HasKey(e => e.Uid).HasName("deleteduser_pkey");
        });

        modelBuilder.Entity<Disease>(entity =>
        {
            entity.HasKey(e => e.PatientId).HasName("disease_pk");

            entity.Property(e => e.PatientId).ValueGeneratedNever();

            entity.HasOne(d => d.Patient).WithOne(p => p.Disease).HasConstraintName("disease_phistory_patient_id_fk");
        });

        modelBuilder.Entity<Phistory>(entity =>
        {
            entity.HasKey(e => e.PatientId).HasName("phistory_pk");

            entity.Property(e => e.PatientId).ValueGeneratedNever();

            entity.HasOne(d => d.Patient).WithOne(p => p.Phistory).HasConstraintName("phistory_user_uid_fk");
        });

        modelBuilder.Entity<Scan>(entity =>
        {
            entity.HasKey(e => e.ScanId).HasName("scan_pk");

            entity.HasOne(d => d.Doc).WithMany(p => p.ScanDocs)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("scan_user_uid_fk");

            entity.HasOne(d => d.PIdNavigation).WithMany(p => p.ScanPIdNavigations)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("scan_user_uid_fk_2");
        });

        modelBuilder.Entity<Surgery>(entity =>
        {
            entity.HasKey(e => e.Sid).HasName("sid");

            entity.HasOne(d => d.DidNavigation).WithMany(p => p.SurgeryDidNavigations)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("surgery_user_uid_fk");

            entity.HasOne(d => d.PidNavigation).WithMany(p => p.SurgeryPidNavigations)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("surgery_user_uid_fk_2");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Uid).HasName("User_pkey");

            //entity.HasMany(d => d.Sids).WithMany(p => p.Nids)
            //    .UsingEntity<Dictionary<string, object>>(
            //        "SugeryNurse",
            //        r => r.HasOne<Surgery>().WithMany()
            //            .HasForeignKey("Sid")
            //            .HasConstraintName("sugerynurses_surgery_sid_fk"),
            //        l => l.HasOne<User>().WithMany()
            //            .HasForeignKey("Nid")
            //            .HasConstraintName("sugerynurses_user_uid_fk"),
            //        j =>
            //        {
            //            j.HasKey("Nid", "Sid").HasName("sugery_nurses_pk");
            //            j.ToTable("sugery_nurses");
            //            j.IndexerProperty<int>("Nid").HasColumnName("nid");
            //            j.IndexerProperty<int>("Sid").HasColumnName("sid");
            //        });
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
