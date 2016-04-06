using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Envio.Tools
{
    public static class Convert
    {
        public static TimeSpan ConvertUIntSecondToTimeSpan(uint second)
        {
            var days = second/3600/24;
            second -= days*3600*24;
            var hours = second/3600;
            second -= hours*3600;
            var minutes = second/60;
            second -= minutes*60;
            return new TimeSpan((int)days, (int)hours, (int)minutes, (int)second);
        }
    }
}
