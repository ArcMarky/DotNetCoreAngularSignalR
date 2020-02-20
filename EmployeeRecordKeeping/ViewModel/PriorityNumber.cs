using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeRecordKeeping.ViewModel
{
    public class PriorityNumberDto
    {
        public int PriorityNumberId { get; set; }
        public int NowServingNumber { get; set; }
        public bool HasServed { get; set; }
    }
}
