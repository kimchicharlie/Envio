using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Envio.Tools;
using System.Net.Http;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Envio.Test.Unit.Envio.Tools.HTTPClass
{
    [TestClass]
    public class AuthSetupAndRemoveTest
    {
        [TestMethod]
        public void BasicAuthTest()
        {
            var httpClient = new HTTPClientClass(url: "http://tekkharibo.eu", user: "user", password: "password");
            var control = "Basic dXNlcjpwYXNzd29yZA==";
            var basicAuthSetup = httpClient.GetType().GetMethod("basicAuthSetup", BindingFlags.NonPublic | BindingFlags.Instance);
            if (basicAuthSetup == null)
                Assert.Fail("GetMethod failed");
            var httpClientReturn = basicAuthSetup.Invoke(httpClient, null);
            if (((HttpClient) httpClientReturn).DefaultRequestHeaders.GetValues("Authorization").FirstOrDefault() != control)
                Assert.Fail("Error Creation Basic Auth");
            //var authRemove = httpClient.GetType().GetMethod("authRemove", BindingFlags.NonPublic | BindingFlags.Instance);
            //if (authRemove == null)
            //    Assert.Fail("GetMethod failed");
            //httpClientReturn = authRemove.Invoke(httpClient, null);
            //var tmp = ((HttpClient)httpClientReturn).DefaultRequestHeaders.GetValues("Authorization").FirstOrDefault();
            //if (!String.IsNullOrEmpty(((HttpClient)httpClientReturn).DefaultRequestHeaders.GetValues("Authorization").FirstOrDefault()))
            //    Assert.Fail("Authentification is not removed");
        }
    }
}
