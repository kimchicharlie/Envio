using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Envio.Tools;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Envio.Test.Unit.Envio.Tools.HTTPClass
{
    [TestClass]
    public class SendByGetTest
    {
        [TestMethod]
        public void SendByGetWithoutAuth()
        {
            var httpClient = new HTTPClientClass(domain: "tekkharibo.eu");
            var response = httpClient.SendByGet("true");
            var content = httpClient.GetResponseContentOnString(response.Result);
            Assert.AreEqual(content.Result, "true\n");
        }
    }
}
