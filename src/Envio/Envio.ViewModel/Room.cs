using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Envio.ViewModel
{
    public class Room
    {
        public string ID { get; set; }
        public double Volume { get; set; }
        public List<Climatisation> Climatisations { get; set; }
        public List<Window> Windows { get; set; }
        public List<Light> Lights { get; set; }
        public double Tempeture { get; set; }
        public double TempetureNeed { get; set; }
    }
}
