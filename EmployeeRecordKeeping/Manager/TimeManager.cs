using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace EmployeeRecordKeeping.Manager.Services
{
    public class TimeManager
    {
        private Timer _timer;
        private AutoResetEvent _autoResetEvent;
        private Action _action;
        public DateTime TimerStarted { get; }

        public TimeManager(Action action)
        {
            _action = action;
            _autoResetEvent = new AutoResetEvent(false);
            _timer = new Timer(Execute, _autoResetEvent, 1000, 10000);
            TimerStarted = DateTime.Now;
        }
        public void Execute(object stateInfo)
        {
            _action();

            if ((DateTime.Now - TimerStarted).Seconds > 30)
            {
                _timer.Dispose();
            }
        }
    }
}
