using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace Envio.WebApi
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            config.Routes.MapHttpRoute("GetValEq", "api/ValEq/",
            new { controller = "ValEq", action = "GetValEq" });

            config.Routes.MapHttpRoute("GetValEq", "api/ValEq/{productId:int}",
            new { controller = "ValEq", action = "GetValEq" });

            config.Routes.MapHttpRoute("CustValEq", "api/ValEq/{idCust:int}",
            new { controller = "ValEq", action = "GetCustValEq" });

            config.Routes.MapHttpRoute("GetCustValEq", "api/ValEq/{idCust:int, idEq:int}",
            new { controller = "ValEq", action = "GetCustValEq" });

            config.Routes.MapHttpRoute("RoomValEq", "api/ValEq/{idRoom:int}",
            new { controller = "ValEq", action = "GetRoomValEq" });

            config.Routes.MapHttpRoute("StairValEq", "api/ValEq/{idStair:int}",
            new { controller = "ValEq", action = "GetStairValEq" });

            config.Routes.MapHttpRoute("BuildValEq", "api/ValEq/{idBuild:int}",
            new { controller = "ValEq", action = "GetBuildValEq" });

            config.Routes.MapHttpRoute("TimeValEq", "api/ValEq/{min:int, hour:int, day:int, month:int}",
            new { controller = "ValEq", action = "GetTimeValEq" });


            config.Routes.MapHttpRoute("Compute", "api/Compute/",
            new { controller = "Compute", action = "Compute" });


/*
                config.Routes.MapHttpRoute(
                name: "ValEq",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );


            config.Routes.MapHttpRoute(
                name: "Compute",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
*/
        }
    }
}
