using Microsoft.EntityFrameworkCore;

namespace PCRanker.Models
{
    public class BuildContext : DbContext
    {
        public BuildContext(DbContextOptions<BuildContext> options)
            : base(options)
        {
        }
        public DbSet<Build> Builds { get; set; }
    }
    public class BuildPartContext : DbContext
    {
        public BuildPartContext(DbContextOptions<BuildPartContext> options)
            : base(options)
        {
        }
        public DbSet<BuildPart> BuildParts { get; set; }
    }
    public class PartContext : DbContext
    {
        public PartContext(DbContextOptions<PartContext> options)
            : base(options)
        {
        }
        public DbSet<Part> Parts { get; set; }
    }
    public class PartTypeContext : DbContext
    {
        public PartTypeContext(DbContextOptions<PartTypeContext> options)
            : base(options)
        {
        }
        public DbSet<PartType> PartTypes { get; set; }
    }

}