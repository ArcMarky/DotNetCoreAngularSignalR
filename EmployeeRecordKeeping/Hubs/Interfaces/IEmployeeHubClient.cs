using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeRecordKeeping.Hubs.Interfaces
{
    public interface IEmployeeHubClient
    {
        Task EmployeeCreated(string type, string payload);
    }
}
