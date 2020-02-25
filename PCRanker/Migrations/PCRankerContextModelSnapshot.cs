﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PCRanker.Models;

namespace PCRanker.Migrations
{
    [DbContext(typeof(PCRankerContext))]
    partial class PCRankerContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("PCRanker.Models.Build", b =>
                {
                    b.Property<long>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.ToTable("Builds");
                });

            modelBuilder.Entity("PCRanker.Models.BuildPart", b =>
                {
                    b.Property<long>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<long>("BuildID")
                        .HasColumnType("bigint");

                    b.Property<long>("PartID")
                        .HasColumnType("bigint");

                    b.HasKey("ID");

                    b.ToTable("BuildParts");
                });

            modelBuilder.Entity("PCRanker.Models.Part", b =>
                {
                    b.Property<long>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<float>("BenchmarkScore")
                        .HasColumnType("real");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<long>("Rank")
                        .HasColumnType("bigint");

                    b.Property<long>("TypeID")
                        .HasColumnType("bigint");

                    b.HasKey("ID");

                    b.ToTable("Parts");
                });

            modelBuilder.Entity("PCRanker.Models.PartPartType", b =>
                {
                    b.Property<long>("PartID")
                        .HasColumnType("bigint");

                    b.Property<long>("PartTypeID")
                        .HasColumnType("bigint");

                    b.HasKey("PartID", "PartTypeID");

                    b.HasIndex("PartTypeID");

                    b.ToTable("PartPartType");
                });

            modelBuilder.Entity("PCRanker.Models.PartType", b =>
                {
                    b.Property<long>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("SortOrder")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.ToTable("PartTypes");
                });

            modelBuilder.Entity("PCRanker.Models.PartPartType", b =>
                {
                    b.HasOne("PCRanker.Models.Part", "Part")
                        .WithMany("PartPartType")
                        .HasForeignKey("PartID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PCRanker.Models.PartType", "PartType")
                        .WithMany("PartPartType")
                        .HasForeignKey("PartTypeID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
