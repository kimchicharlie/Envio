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
        [Route("api/ValEq/GetValEq")]
        public string GetValEq()
        {
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
            return (valEq.ToJSON());
        }

        //valeurs de tous les équipements d'un clients qui serait heberge chez nous avec precision de son id
        [Route("api/ValEq/GetCustValEq/{idCust:int}")]
        public string GetCustValEq(int idCust)
        {
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
            return (valEq.ToJSON());
        }

        //valeur d'un equipement particulier d'un client
        // GET api/GetValEqById/5
        [Route("api/ValEq/GetValEqById/{id:int}")]
        public string GetValEqById(int id)
        {
            ValEq valEq = new ValEq();
            valEq.idEq = 1;
            valEq.name = "glass";
            valEq.val = 5.2;

            return (valEq.ToJSON());
        }

        //valeur d'un equipement particulier pour un client qui serait heberge chez nous avec precision de l'id de l'equipement et celle du client
        [Route("api/ValEq/GetCustValEqById/{idCust:int}/{idEq:int}")]
        public string GetCustValEqById(int idCust, int idEq)
        {
            ValEq valEq = new ValEq();
            valEq.idEq = 1;
            valEq.name = "glass";
            valEq.val = 5.2;

            return (valEq.ToJSON());
        }

        //valeurs de tous les equipements d'une salle d'un client
        [Route("api/ValEq/GetRoomValEq/{idRoom:int}")]
        public string GetRoomValEq(int idRoom)
        {
            //appeler la méthode GetValEq(id) pour les equipements de la salle
            List<ValEq> valEq = new List<ValEq>
            {

            };
            return (valEq.ToJSON());
        }

        //valeurs de tous les equipements d'une étage d'un client
        [Route("api/ValEq/GetStairValEq/{idStair:int}")]
        public string GetStairValEq(int idStair)
        {
            //appeler la méthode GetRoomValEq pour les salles de l'étage
            List<ValEq> valEq = new List<ValEq>
            {

            };
            return (valEq.ToJSON());
        }

        //valeurs de tous les equipements d'un immeuble d'un client
        [Route("api/ValEq/GetBuildValEq/{idBuild:int}")]
        public string GetBuildingValEq(int idBuild)
        {
            //appeler la méthode GetStairValEq pour les étages du batiment
            List<ValEq> valEq = new List<ValEq>
            {

            };
            return (valEq.ToJSON());
        }

        // retourne les valeurs prises par l'équipement durant une période donnée
        [Route("api/ValEq/GetTimeValEq/{month:int}/{day:int}/{hour:int}/{min:int}")]
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
