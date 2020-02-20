using EmployeeRecordKeeping.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeRecordKeeping.DAL.Interfaces
{
    public interface IProrityNumberRepository
    {
        IQueryable<PriorityNumber> GetAllPriorityNumber();
        Task<int> CreatePriorityNumberAsync(PriorityNumber model);

        Task<int> UpdatePriorityNumberAsync(PriorityNumber model);
        Task<int> DeleteAllPriorityNumberAsync();
    }
}
