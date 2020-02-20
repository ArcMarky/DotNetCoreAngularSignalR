using EmployeeRecordKeeping.Hubs.Interfaces;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeRecordKeeping.Hubs.ServiceHubs
{
    public class EmployeeHub : Hub<IEmployeeHubClient>
    {
    }
}
