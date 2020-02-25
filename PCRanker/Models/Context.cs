using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace PCRanker.Models
{
    public class PCRankerContext : DbContext
    {
        public PCRankerContext(DbContextOptions<PCRankerContext> options)
            : base(options)
        {
        }
        public PCRankerContext()
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PartPartType>()
                .HasKey(ppt => new { ppt.PartID, ppt.PartTypeID });
            modelBuilder.Entity<PartPartType>()
                .HasOne(ppt => ppt.Part)
                .WithMany(p => p.PartPartType)
                .HasForeignKey(ppt => ppt.PartID);
            modelBuilder.Entity<PartPartType>()
                .HasOne(ppt => ppt.PartType)
                .WithMany(pt => pt.PartPartType)
                .HasForeignKey(ppt => ppt.PartTypeID);
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=.\\;Database=PCRanker;Trusted_Connection=True;");
            }
        }

        public DbSet<Build> Builds { get; set; }
        public DbSet<BuildPart> BuildParts { get; set; }
        public DbSet<Part> Parts { get; set; }
        public DbSet<PartType> PartTypes { get; set; }
    }

}
