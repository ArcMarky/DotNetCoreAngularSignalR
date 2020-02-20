using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeRecordKeeping.Hubs.Interfaces
{
    public class QueueHub : Hub<IQueueHubClient>
    {
      
    }
}
