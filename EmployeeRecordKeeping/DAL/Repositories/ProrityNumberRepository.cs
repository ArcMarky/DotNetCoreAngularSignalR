using EmployeeRecordKeeping.DAL.Interfaces;
using EmployeeRecordKeeping.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeRecordKeeping.DAL.Repositories
{
    public class ProrityNumberRepository : IProrityNumberRepository
    {
        private readonly rksContext _context;

        public ProrityNumberRepository(rksContext context)
        {
            _context = context;
        }

        #region Priority Number Related

        /// <summary>
        /// Retrieves all records of all the priority number in an IQueryable state
        /// </summary>
        /// <returns>queryable priority data</returns>
        public IQueryable<PriorityNumber> GetAllPriorityNumber()
        {
            return _context.PriorityNumber;
        }

        /// <summary>
        /// Saves a single data of a priority number in the schema
        /// </summary>
        /// <param name="model">PriorityNumber model</param>
        /// <returns></returns>
        public async Task<int> CreatePriorityNumberAsync(PriorityNumber model)
        {
            _context.PriorityNumber.Add(model);
            return await _context.SaveChangesAsync();
        }

        /// <summary>
        /// Updates the data of the priority number based on the changes that were made by the user
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<int> UpdatePriorityNumberAsync(PriorityNumber model)
        {
            _context.PriorityNumber.Update(model);
            return await _context.SaveChangesAsync();
        }

        public async Task<int> DeleteAllPriorityNumberAsync()
        {
            _context.PriorityNumber.RemoveRange(_context.PriorityNumber);
            return await _context.SaveChangesAsync();
        }
        #endregion
    }
}
