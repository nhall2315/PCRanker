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
        public ICollection<BuildPart> BuildPart { get; set; }

    }
}