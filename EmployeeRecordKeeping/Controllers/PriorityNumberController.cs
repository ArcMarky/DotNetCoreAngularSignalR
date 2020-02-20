using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployeeRecordKeeping.BLL.Interfaces;
using EmployeeRecordKeeping.Hubs.Interfaces;
using EmployeeRecordKeeping.Models;
using EmployeeRecordKeeping.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace EmployeeRecordKeeping.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PriorityNumberController : ControllerBase
    {
        private IHubContext<QueueHub, IQueueHubClient> _hubContext;
        private readonly IProrityNumberService _prorityNumberService;

        public PriorityNumberController(IHubContext<QueueHub, IQueueHubClient> hubContext, IProrityNumberService prorityNumberService)
        {
            _hubContext = hubContext;
            _prorityNumberService = prorityNumberService;
        }
        [HttpPost]
        [Route("[action]")]
        public string NewPriorityNumber([FromBody]Message msg)
        {
            string retMessage;
            try
            {
                var savePriorityNumber = _prorityNumberService.GenerateNewPriorityNumber();
                retMessage = savePriorityNumber.Data.ToString();
                _hubContext.Clients.All.QueueMessage(msg.Type, retMessage);
            }
            catch (Exception e)
            {
                retMessage = e.ToString();
            }
            return retMessage;
        }

        [HttpDelete]
        [Route("[action]")]
        public async Task<ResponseObject> DeleteAllPriorityNumber()
        {
            return await _prorityNumberService.DeleteAllPriorityNumber();
        }



    }
}