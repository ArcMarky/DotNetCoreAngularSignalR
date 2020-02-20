using System;
using System.Collections.Generic;

namespace EmployeeRecordKeeping.Models
{
    public partial class PriorityNumber
    {
        public int PriorityNumberId { get; set; }
        public int NowServingNumber { get; set; }
        public byte? HasServed { get; set; }
    }
}
