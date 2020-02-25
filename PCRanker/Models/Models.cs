using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace PCRanker.Models
{
    public class Build
    {
        public long ID { get; set; }
        public string Name { get; set; }

    }

    public class BuildPart
    {
        public long ID { get; set; }
        public long BuildID { get; set; }
        public long PartID { get; set; }

    }

    public class Part
    {
        public long ID { get; set; }
        public long TypeID { get; set; }
        public string Name { get; set; }
        public long Rank { get; set; }
        public float BenchmarkScore { get; set; }
        public ICollection<PartPartType> PartPartType { get; set; }


    }
    public class PartType
    {
        public long ID { get; set; }
        public string Name { get; set; }
        public int SortOrder { get; set; }
        public ICollection<PartPartType> PartPartType { get; set; }

    }
    public class PartPartType
    {
        public long PartID { get; set; }
        public Part Part { get; set; }
        public long PartTypeID { get; set; }
        public PartType PartType { get; set; }
    }
}
