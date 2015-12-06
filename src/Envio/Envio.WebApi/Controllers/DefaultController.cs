using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Envio.WebApi.Controllers
{
    public class DefaultController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Default Page";

            return View();
        }
    }
}
