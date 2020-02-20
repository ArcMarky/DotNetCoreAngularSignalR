using EmployeeRecordKeeping.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeRecordKeeping.Hubs.Interfaces
{
    public interface IHeartRateHubClient
    {
        Task GetEcgData(string type, List<HeartRateDataDto> payload);
    }
}
