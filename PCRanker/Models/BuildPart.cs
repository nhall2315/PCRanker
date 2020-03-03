using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace PCRanker.Models
{
    public class BuildPart
    {
        public long ID { get; set; }
        public long BuildID { get; set; }
        public virtual Build Build { get; set; }
        public long PartID { get; set; }
        public Part Part { get; set; }
    }
}
