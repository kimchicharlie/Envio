using System;

using System.Text;

using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http.Results;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Envio.WebApi;
using Envio.WebApi.Controllers;
using Envio.WebApi.Models;

namespace Envio.Test.Unit.Envio.testWebAPI
{
    [TestClass]
    public class UnitTestdotNetApi
    {
        public UnitTestdotNetApi()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        [TestMethod]
        public void TestMethodGetValEq()
        {
            var controller = new ValEqController();
            ValEq tmp = new ValEq();
            tmp.idEq = 1;
            tmp.name = "glass";
            tmp.val = 5.2;

            ValEq tmp2 = new ValEq();
            tmp2.idEq = 2;
            tmp2.name = "lum";
            tmp2.val = 65.4;

            List<ValEq> valEq = new List<ValEq>
            {
                tmp,
                tmp2
            };
            valEq.ToJSON();

            var result = controller.GetValEq();
            Assert.AreEqual(valEq.ToJSON(), result);
        }

        [TestMethod]
        public void TestMethodGetCustValEq()
        {
            var controller = new ValEqController();
            ValEq tmp = new ValEq();
            tmp.idEq = 1;
            tmp.name = "glass";
            tmp.val = 5.2;

            ValEq tmp2 = new ValEq();
            tmp2.idEq = 2;
            tmp2.name = "lum";
            tmp2.val = 65.4;

            List<ValEq> valEq = new List<ValEq>
            {
                tmp,
                tmp2
            };
            valEq.ToJSON();

            var result = controller.GetCustValEq(1);
            Assert.AreEqual(valEq.ToJSON(), result);
        }

        [TestMethod]
        public void TestMethodGetValEqById()
        {
            var controller = new ValEqController();
            ValEq tmp = new ValEq();
            tmp.idEq = 1;
            tmp.name = "glass";
            tmp.val = 5.2;

            var result = controller.GetValEqById(1);
            Assert.AreEqual(tmp.ToJSON(), result);
        }

        [TestMethod]
        public void TestMethodGetCustValEqById()
        {
            var controller = new ValEqController();
            ValEq tmp = new ValEq();
            tmp.idEq = 1;
            tmp.name = "glass";
            tmp.val = 5.2;

            var result = controller.GetCustValEqById(1, 1);
            Assert.AreEqual(tmp.ToJSON(), result);
        }
    }
}
