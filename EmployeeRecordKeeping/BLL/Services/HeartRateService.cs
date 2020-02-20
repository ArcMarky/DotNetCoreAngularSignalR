using EmployeeRecordKeeping.BLL.Interfaces;
using EmployeeRecordKeeping.Hubs.Interfaces;
using EmployeeRecordKeeping.Hubs.ServiceHubs;
using EmployeeRecordKeeping.Manager.Services;
using EmployeeRecordKeeping.ViewModel;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace EmployeeRecordKeeping.BLL.Services
{
    public class HeartRateService : IHeartRateService
    {
      
        private IHubContext<HeartRateHub, IHeartRateHubClient> _hubContext;
     
        public HeartRateService(IHubContext<HeartRateHub, IHeartRateHubClient> hubContext)
        {
           
            _hubContext = hubContext;
        
        }
     
        public static List<HeartRateDataDto> GetData()
        {
            var r = new Random();
            return new List<HeartRateDataDto>()
        {
           new HeartRateDataDto { DateTimeValue = DateTime.Now.AddDays(r.Next(1,5)), Data = r.Next(1, 40) },
           new HeartRateDataDto { DateTimeValue = DateTime.Now.AddDays(r.Next(6,10)), Data =r.Next(1, 40) },
           new HeartRateDataDto { DateTimeValue = DateTime.Now.AddDays(r.Next(11,15)), Data = r.Next(1, 40) },
           new HeartRateDataDto { DateTimeValue = DateTime.Now.AddDays(r.Next(16,20)), Data = r.Next(1, 40) },
           new HeartRateDataDto { DateTimeValue = DateTime.Now.AddDays(r.Next(21,25)), Data =r.Next(1, 40) },
           new HeartRateDataDto { DateTimeValue = DateTime.Now.AddDays(r.Next(26,28)), Data = r.Next(1, 40) }
        };
        }
        public int GetHeartRateData()
        {
            var timerManager = new TimeManager(() => _hubContext.Clients.All.GetEcgData("ecgdata", GetData()));
            return 1;
        }
    }
}
