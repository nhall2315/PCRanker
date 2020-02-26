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
        private List<string> _parttypes = new List<string> { "CPU", "GPU", "RAM", "HDD", "SSD" };
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
        private void AddTypePart()
        {
            foreach(string type in _parttypes)
            {
                PartType PartType = new PartType { Name = type };
                _db.Add(PartType);
                _db.SaveChanges();
            }
        }
        private void AddParts()
        {
            Console.WriteLine("Populating database, please wait...")
            List<RowData> records = ParseAllSheets();
            foreach (RowData record in records)
            {
                Part Part = new Part
                {
                    TypeID = _db.PartTypes.Single(pt => pt.Name == record.Type).ID,
                    Name = record.Name,
                    Rank = record.Rank,
                    BenchmarkScore = record.BenchmarkScore
                };
                _db.Add(Part);
                _db.SaveChanges();
            }
            Console.WriteLine("Finished!");
        }
        public void PopulateDatabase()
        {
            AddTypePart();
            AddParts();
        }
    }
}
