using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeRecordKeeping.Hubs.Interfaces
{
    public interface IQueueHubClient
    {
        Task QueueMessage(string type, string payload);
    }
}
