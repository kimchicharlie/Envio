using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EnvioApp
{
    class Room
    {
        [JsonProperty(PropertyName = "name")]
        public string name { get; set; }
        [JsonProperty(PropertyName = "_id")]
        public string _id { get; set; }
        [JsonProperty(PropertyName = "organisation")]
        public string organisation { get; set; }

//        [JsonProperty(PropertyName = "planning")]
        public List<Planning>   planning { get; set; }
        [JsonProperty(PropertyName = "temperature")]
        public string temperature { get; set; }
        [JsonProperty(PropertyName = "realTemperature")]
        public string realTemperature { get; set; }
        [JsonProperty(PropertyName = "light")]
        public string light { get; set; }
        [JsonProperty(PropertyName = "realLight")]
        public string realLight { get; set; }

        public override string ToString()
        {
            return (name);
/*            return ("ID: " + _id + " - Name: " + name + " - Organisation: " + organisation +
                " - temperature: " + temperature + " - Light: " + light);
*/
        }
    }
}
