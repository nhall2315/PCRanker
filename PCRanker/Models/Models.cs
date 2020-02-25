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
        [ForeignKey("Build")]
        public long BuildID { get; set; }
        [ForeignKey("Part")]
        public long PartID { get; set; }
    }

    public class Part
    {
        public long ID { get; set; }
        [ForeignKey("PartType")]
        public long TypeID { get; set; }
        public string Name { get; set; }
        public long Rank { get; set; }
        public float BenchmarkScore { get; set; }
    }

    public class PartType
    {
        public long ID { get; set; }
        public string Name { get; set; }
        public int SortOrder { get; set; }
    }
}
