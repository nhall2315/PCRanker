using System;
using System.IO;
using System.Collections.Generic;
using System.Globalization;
using CsvHelper;

namespace CSVParser
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Here");
            Parser parser = new Parser();
            parser.PopulateDatabase();

        }
    }
}
