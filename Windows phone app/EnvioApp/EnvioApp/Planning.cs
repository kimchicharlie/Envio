using Newtonsoft.Json;
using System;
using System.Diagnostics;

namespace EnvioApp
{
    public class Planning
    {
        [JsonProperty(PropertyName = "name")]
        public string name { get; set; }
        [JsonProperty(PropertyName = "mode")]
        public string mode { get; set; }
        [JsonProperty(PropertyName = "dateBegin")]
        public string dateBegin { get; set; }
        [JsonProperty(PropertyName = "dateEnd")]
        public string dateEnd { get; set; }


        public int yearStart { get; set; }
        public int monthStart { get; set; }
        public int dayStart { get; set; }
        public int hourStart { get; set; }
        public int minStart { get; set; }

        public int yearEnd { get; set; }
        public int monthEnd { get; set; }
        public int dayEnd { get; set; }
        public int hourEnd { get; set; }
        public int minEnd { get; set; }
        public int duration { get; set; }
        public int hourDuration { get; set; }
        public int minDuration { get; set; }

        public DateTime dtStart;
        public DateTime dtEnd;

        public string formatted { get; set; }

        public void parseStrings()
        {
            int index = 0;
            // "dateBegin": "2016-09-10T03:30:00.000Z",
            // Parse start string
            yearStart = Int32.Parse(dateBegin.Substring(index, 4));
            index += 5;
            monthStart = Int32.Parse(dateBegin.Substring(index, 2));
            index += 3;
            dayStart = Int32.Parse(dateBegin.Substring(index, 2));
            index += 3;
            hourStart = Int32.Parse(dateBegin.Substring(index, 2));
            index += 3;
            minStart = Int32.Parse(dateBegin.Substring(index, 2));

            // "dateEnd": "2016-09-10T11:00:00.000Z"
            // Parse end string
            index = 0;
            yearEnd = Int32.Parse(dateEnd.Substring(index, 4));
            index += 5;
            monthEnd = Int32.Parse(dateEnd.Substring(index, 2));
            index += 3;
            dayEnd = Int32.Parse(dateEnd.Substring(index, 2));
            index += 3;
            hourEnd = Int32.Parse(dateEnd.Substring(index, 2));
            index += 3;
            minEnd = Int32.Parse(dateEnd.Substring(index, 2));

            duration = (hourEnd * 60 + minEnd) - (hourStart * 60 + minStart);
            /*
            hourDuration = hourEnd - hourStart;
            minDuration = minEnd - minStart;
            */

            dtStart = new DateTime(yearStart, monthStart, dayStart, hourStart, minStart, 0);
            dtEnd = new DateTime(yearEnd, monthEnd, dayEnd, hourEnd, minEnd, 0);
            formatted = ToString();
        }

        public override string ToString()
        {
            if (duration > 60)
            return (name + "\tStart: " + hourStart + ":" + minStart + " - End: " + hourEnd + ":" + minEnd + "\nDuration: " +
                duration / 60 + " hour and " + duration % 60  + " minutes");
            else
                return (name + "\tStart: " + hourStart + ":" + minStart + " - End: " + hourEnd + ":" + minEnd + "\nDuration: " +
                    duration + " minutes");
        }

        public string testString()
        {
            return ("date: "+ dtStart.Date.ToString() + " - Name:" + name + " - mode: " + mode + " ---\nStart: " + hourStart + ":" + minStart +
                "------- End: " + hourEnd + ":" + minEnd +  "- Duration: " + duration / 60 + ":" + duration % 60);
        }
    }
}

/*
            "dateBegin": "2016-09-10T03:30:00.000Z",
*/
