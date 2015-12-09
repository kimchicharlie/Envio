using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Envio.WebApi.Models;
using System.Runtime.Serialization.Json;
using System.Web.Script.Serialization;

namespace Envio.WebApi.Controllers
{

    public class ValEqController : ApiController
    {
        //valeurs de tous les equipements d'un client
        // GET api/ValEq
        [Route("api/ValEq")]
        public string GetValEq()
        {
            List<ValEq> valEq = new List<ValEq>
            {

            };
            return (valEq.ToJSON());
        }

        //valeurs de tous les équipements d'un clients qui serait heberge chez nous avec precision de son id
        [Route("api/CustValEq/idCust:int")]
        public string  GetCustEqVal(int idCust)
        {
            List<ValEq> valEq = new List<ValEq>
            {

            };
            return (valEq.ToJSON());
        }

        //valeur d'un equipement particulier d'un client
        // GET api/ValEq/5
        [Route("api/ValEq/id:int")]
        public string GetValEq(int id)
        {
            ValEq valEq = new ValEq();
            return (valEq.ToJSON());
        }

        //valeur d'un equipement particulier pour un client qui serait heberge chez nous avec precision de l'id de l'equipement et celle du client
        [Route("api/CustValEq/{idEq:int, idCust:int}")]
        public string GetCustValEq(int idCust, int idEq)
        {
            ValEq valEq = new ValEq();
            return (valEq.ToJSON());
        }

        //valeurs de tous les equipements d'une salle d'un client
        [Route("api/RoomValEq/{idRoom:int}")]
        public string GetRoomValEq(int idRoom)
        {
            //appeler la méthode GetValEq(id) pour les equipements de la salle
            List<ValEq> valEq = new List<ValEq>
            {

            };
            return (valEq.ToJSON());
        }

        //valeurs de tous les equipements d'une étage d'un client
        [Route("api/StairValEq/{idStair:int}")]
        public string GetStairValEq(int idStair)
        {
            //appeler la méthode GetRoomValEq pour les salles de l'étage
            List<ValEq> valEq = new List<ValEq>
            {

            };
            return (valEq.ToJSON());
        }

        //valeurs de tous les equipements d'un immeuble d'un client
        [Route("api/BuildValEq/{idBuild:int}")]
        public string GetBuildingValEq(int idBuild)
        {
            //appeler la méthode GetStairValEq pour les étages du batiment
            List<ValEq> valEq = new List<ValEq>
            {

            };
            return (valEq.ToJSON());
        }

        // retourne les valeurs prises par l'équipement durant une période donnée
        [Route("api/TimeValEq/{min:int, hour:int, day:int, month:int}")]
        public string GetTimeValEq(int min, int hour, int day, int month)
        {
            List<ValEq> valEq = new List<ValEq>
            {

            };
            return (valEq.ToJSON());
        }

        // POST api/users
        public void Post([FromBody]string value)
        {
        }

        // PUT api/users/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/users/5
        public void Delete(int id)
        {
        }

        //JSONHelper serializer;
    }
}
