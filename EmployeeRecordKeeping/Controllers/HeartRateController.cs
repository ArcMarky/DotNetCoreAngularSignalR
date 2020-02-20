using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployeeRecordKeeping.BLL.Interfaces;
using EmployeeRecordKeeping.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeRecordKeeping.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HeartRateController : ControllerBase
    {
        private readonly IHeartRateService _heartRateService;

        public HeartRateController(IHeartRateService heartRateService)
        {
            _heartRateService = heartRateService;
        }
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetHeartRate()
        {
            return Ok(_heartRateService.GetHeartRateData());
        }

    }
}