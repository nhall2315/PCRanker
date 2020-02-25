using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using System.IO;
using System.Globalization;
using CsvHelper;
using PCRanker.Models;

namespace CSVParser
{
    class Parser
    {
        private string DEFAULT_PATH = "./Data";
        private PCRankerContext _db = new PCRankerContext();


        private IDictionary<string, int> TYPEID = new Dictionary<string, int>()
                                            {
                                                {"CPU",0},
                                                {"GPU", 1},
                                                {"RAM",2},
                                                {"HDD", 3},
                                                {"SSD", 4}
                                            };
        public string Path { get; set; }
        public string[] FileList { get; set; }

        //Reads in all the necessary data from the csvs found in ./data or a specified directory
        public Parser()
        {
            Path = DEFAULT_PATH;
            FileList = Directory.GetFiles(Path, "*.csv");
        }
        public Parser(string PathString)
        {        
            Path = PathString;
            FileList = Directory.GetFiles(Path, "*.csv");
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
        private void AddTypeParts()
        {

        }
        private void AddParts()
        {
            List<RowData> records = ParseAllSheets();
            foreach (RowData record in records)
            {
                Part part = new Part
                {
                    //TypeID = TYPEID[record.Type],
                    Name = record.Name,
                    Rank = record.Rank,
                    BenchmarkScore = record.BenchmarkScore
                };
                _db.Add(part);
                _db.SaveChanges();
            }
        }
        public void PopulateDatabase()
        {
            //AddTypeParts();
            AddParts();
        }
    }
}
