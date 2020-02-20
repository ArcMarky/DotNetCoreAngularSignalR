using AutoMapper;
using EmployeeRecordKeeping.BLL.Interfaces;
using EmployeeRecordKeeping.DAL.Interfaces;
using EmployeeRecordKeeping.Helper;
using EmployeeRecordKeeping.Models;
using EmployeeRecordKeeping.ViewModel;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeRecordKeeping.BLL.Services
{
    public class ProrityNumberService : IProrityNumberService
    {
        private readonly IProrityNumberRepository _priorityNumberRepository;
        private readonly IMapper _mapper;


        public ProrityNumberService(IProrityNumberRepository priorityNumberRepository, IMapper mapper)
        {
            _priorityNumberRepository = priorityNumberRepository;
            _mapper = mapper;
        }

        /// <summary>
        /// Retrieves all records of all the priority number available in the schema
        /// </summary>
        /// <returns>Projected list of all priority</returns>
        public async Task<ResponseObject> GetAllPriorityNumberAsync()
        {
            var response = new ResponseObject(ResponseType.Success, string.Empty);
            try
            {
                var data = await _priorityNumberRepository.GetAllPriorityNumber().AsNoTracking().ToListAsync();
                response.Data = _mapper.Map<List<PriorityNumberDto>>(data);
            }
            catch (Exception e)
            {
                response = ErrorHandling.LogError(e);
            }
            return response;
        }
        /// <summary>
        /// Generates a new priority number
        /// </summary>
        /// <returns>the current number being served</returns>
        public ResponseObject GenerateNewPriorityNumber()
        {
            var response = new ResponseObject(ResponseType.Success, string.Empty);
            try
            {
                var priorityNumberModel = new PriorityNumber();
                priorityNumberModel.NowServingNumber = 1;
                priorityNumberModel.HasServed = 1;
                var lastNumberServed = _priorityNumberRepository.GetAllPriorityNumber().AsNoTracking().OrderByDescending(x => x.NowServingNumber).FirstOrDefault(x => x.HasServed == 1);
                if (lastNumberServed != null)
                {
                    priorityNumberModel.NowServingNumber = lastNumberServed.NowServingNumber + 1;
                }
                _priorityNumberRepository.CreatePriorityNumberAsync(priorityNumberModel);
                response.Data = priorityNumberModel.NowServingNumber;
            }
            catch (Exception e)
            {
                response = ErrorHandling.LogError(e);
            }
            return response;
        }
        /// <summary>
        /// Deletes all priority number
        /// </summary>
        /// <returns>response object</returns>
        public async Task<ResponseObject> DeleteAllPriorityNumber()
        {
            var response = new ResponseObject(ResponseType.Success, string.Empty);
            try
            {
                await _priorityNumberRepository.DeleteAllPriorityNumberAsync();
            }
            catch(Exception e)
            {
                response = ErrorHandling.LogError(e);
            }
            return response;
        }
    }
}
