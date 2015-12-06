using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace Envio.ViewModel
{
    public abstract class AEquipment
    {
        public string ID { get; set; }
        public string RoomId { get; set; }
        public double Level { get; set; }
    }
}
