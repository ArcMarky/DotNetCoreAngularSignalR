using EmployeeRecordKeeping.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeRecordKeeping.BLL.Interfaces
{
    public interface IProrityNumberService
    {
        Task<ResponseObject> GetAllPriorityNumberAsync();
        ResponseObject GenerateNewPriorityNumber();
        Task<ResponseObject> DeleteAllPriorityNumber();
    }
}
