using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace EmployeeRecordKeeping.Models
{
    public partial class rksContext : DbContext
    {
        public rksContext()
        {
        }

        public rksContext(DbContextOptions<rksContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Employee> Employee { get; set; }
        public virtual DbSet<PriorityNumber> PriorityNumber { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseMySQL("server=localhost;port=3306;user=root;password=2720572;database=rks");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>(entity =>
            {
                entity.ToTable("employee", "rks");

                entity.Property(e => e.Employeeid).HasColumnName("employeeid");

                entity.Property(e => e.Address)
                    .HasColumnName("address")
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.Age).HasColumnName("age");

                entity.Property(e => e.Department)
                    .HasColumnName("department")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.FullName)
                    .IsRequired()
                    .HasColumnName("full_name")
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.Notes)
                    .HasColumnName("notes")
                    .IsUnicode(false);

                entity.Property(e => e.Position)
                    .HasColumnName("position")
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<PriorityNumber>(entity =>
            {
                entity.ToTable("priority_number", "rks");

                entity.Property(e => e.PriorityNumberId).HasColumnName("priority_number_id");

                entity.Property(e => e.HasServed).HasColumnName("has_served");

                entity.Property(e => e.NowServingNumber).HasColumnName("now_serving_number");
            });
        }
    }
}
