using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployeeRecordKeeping.BLL.Interfaces;
using EmployeeRecordKeeping.Hubs;
using EmployeeRecordKeeping.Hubs.Interfaces;
using EmployeeRecordKeeping.Hubs.ServiceHubs;
using EmployeeRecordKeeping.ViewModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using static EmployeeRecordKeeping.Utilities.Enums;

namespace EmployeeRecordKeeping.Controllers
{
    /**********************************************************************
    * THIS APPLICATION IS A PROOF OF CONCEPT ONLY. THIS WILL NEVER BE DEVELOPED IN PRODUCTION.
    * Author:        Mark Yu
    * Description:   Employee Management API
    *                Commented methods are unused.            
    * History:
    *   01-07-2020  MarkYu    Created. 
    ***********************************************************************/
    [Route("api/[controller]")]
    public class EmployeeController : Controller
    {
        private IHubContext<EmployeeHub, IEmployeeHubClient> _hubContext;
        private readonly IEmployeeService _employeeService;
        public EmployeeController(IEmployeeService employeeService, IHubContext<EmployeeHub, IEmployeeHubClient> hubContext)
        {
            _employeeService = employeeService;
            _hubContext = hubContext;
        }

        [HttpGet]
        [Route("[action]")]
        public async Task<ResponseObject> GetEmployeeList()
        {
            return await _employeeService.GetAllEmployeesAsync();
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<ResponseObject> SaveEmployee([FromBody]EmployeeDto model)
        {
            await _hubContext.Clients.All.EmployeeCreated("true", "true");
            return await _employeeService.SaveEmployee(model);
        }

    }

}