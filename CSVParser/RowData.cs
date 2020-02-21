using System;
using System.Collections.Generic;
using System.Text;

using CsvHelper.Configuration.Attributes;

namespace CSVParser
{
    class RowData
    {
        [Name("Type")]
        public string Type { get; set; }

        [Name("Model")]
        public string Name { get; set; }

        [Name("Rank")]
        public int Rank { get; set; }

        [Name("Benchmark")]
        public float BenchmarkScore { get; set; }

    }
}
