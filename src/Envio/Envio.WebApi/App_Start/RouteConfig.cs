using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Envio.WebApi
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Default", action = "Index", id = UrlParameter.Optional }
            );
            /*
                        routes.MapRoute(
                            name:"GetValEq",
                            url:"api/ValEq/GetValEq"
                            );

                        routes.MapRoute(
                            name: "GetValEqById",
                            url: "api/ValEq/GetValEqById/{id}"
                            );

                        routes.MapRoute(
                            name: "GetCustValEq",
                            url: "api/ValEq/GetCustValEq/{idCust}"
                            );

                        routes.MapRoute(
                            name: "GetCustValEqById",
                            url: "api/ValEq/GetCustValEqById/{idCust}/{idEq}"
                            );

                        routes.MapRoute(
                            name: "RoomValEq",
                            url: "api/ValEq/RoomValEq/{idRoom}"
                            );

                        routes.MapRoute(
                            name: "StairValEq",
                            url: "api/ValEq/RoomValEq/{idStair}"
                            );

                        routes.MapRoute(
                            name: "BuildValEq",
                            url: "api/ValEq/RoomValEq/{idBuild}"
                            );

                        routes.MapRoute(
                            name: "TimeValEq",
                            url: "api/ValEq/RoomValEq/{month:int}/{day:int}/{hour:int}/{min:int}"
                            );
                        /*
                        routes.MapRoute(
                            name: "ValEq",
                            url: "{controller}/{action}/{id}",
                            defaults: new { controller = "ValEq", action = "GetValEq", id = UrlParameter.Optional }
                        );

                        routes.MapRoute(
                            name: "Compute",
                            url: "{controller}/{action}/{id}",
                            defaults: new { controller = "Compute", action = "Index", id = UrlParameter.Optional, customerId = UrlParameter.Optional }
                        );
                         */
        }
    }
}
