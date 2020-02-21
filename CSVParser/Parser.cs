using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using System.IO;
using System.Globalization;
using CsvHelper;

namespace CSVParser
{
    class Parser
    {
        public string path { get; set; }
        public string[] FileList { get; set; }

        //Reads in all the necessary data from the csvs found in ./data
        public Parser(string PathString)
        {        
            path = PathString;
            FileList = Directory.GetFiles(path, "*.csv");
        }
        public List<RowData> ParseAllSheets()
        {
            List<RowData> FinalRecord = new List<RowData>();
            foreach(string file in FileList)
            {
                StreamReader reader = new StreamReader(file);
                CsvReader csv = new CsvReader(reader, CultureInfo.InvariantCulture);
                csv.Configuration.BadDataFound = null;
                IEnumerable<RowData> csvdata = csv.GetRecords<RowData>();
                FinalRecord.AddRange(csvdata.ToList());
            }
            return FinalRecord;
        }
      
    }
}
