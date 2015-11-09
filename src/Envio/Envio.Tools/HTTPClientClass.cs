using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using log4net;
using Envio.Tools;
using Envio.ViewModel;
using Newtonsoft.Json;

namespace Envio.Tools
{
    /// <summary>
    /// HttpClientClass est une classe pour facilité l'envoie de requêtes HTTP en post ou en get
    /// </summary>
    public class HTTPClientClass
    {
        private static readonly ILog log = LogManager.GetLogger(typeof(HTTPClientClass));

        private string _uri;
        private HttpClient _httpClient;
        private string _user;
        private string _password;

        /// <summary>
        /// Constructeur
        /// </summary>
        /// <param name="url">url ou ip du serveur sans http:// et sans le port</param>
        /// <param name="port">port du serveur à contacter. Par defaut : 80</param>
        /// <param name="timeout">temps avant d'annulé la requête en secondes. Par defaut : 60 </param>
        /// <param name="user">nom d'utilisateur en cas d'authentification</param>
        /// <param name="password">mot de passe en cas d'authentification</param>
        public HTTPClientClass(string url, ushort port = 80, uint timeout = 60, string user = null, string password = null)
        {
            try
            {
                var sb = new StringBuilder("http://");
                if (String.IsNullOrEmpty(url))
                    throw new Exception("Url is null or empty");
                sb.Append(url);
                sb.Append(":");
                sb.Append(port);
                sb.Append("/");
                this._uri = sb.ToString();
                this._httpClient = new HttpClient { Timeout = Tools.Convert.ConvertUIntSecondToTimeSpan(timeout) };
                this._user = user;
                this._password = password;
            }
            catch (Exception e)
            {
                log.Fatal(e.Message);
            }
        }

        /// <summary>
        /// Applique l'authentification basic au client HTTP
        /// </summary>
        HttpClient basicAuthSetup()
        {
            if (String.IsNullOrEmpty(this._user) || String.IsNullOrEmpty(this._password))
                throw new Exception("Error authentification can't created, control user name and password");
            var byteArray = Encoding.ASCII.GetBytes(this._user + ":" + this._password);
            this._httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Basic", System.Convert.ToBase64String(byteArray));
            return this._httpClient;
        }

        /// <summary>
        /// Supprime l'authentification basic au client HTTP
        /// </summary>
        HttpClient authRemove()
        {
            this._httpClient.DefaultRequestHeaders.Authorization = null;
            return this._httpClient;
        }

        public Task<string> GetResponseContentOnString(HttpResponseMessage response)
        {
            return response.Content.ReadAsStringAsync();
        }

        /// <summary>
        /// Envoie de requêtes en get
        /// </summary>
        /// <param name="content">contenue à envoyer en get sans le http://server:port/</param>
        /// <param name="auth">preciser si besoin d'authentification</param>
        /// <returns>le resultat de la requête avec message, code, ...</returns>
        public HttpResponseMessage SendByGet(string content, bool auth = false)
        {
            var request = this._uri;
            request += content;
            try
            {
                if (auth)
                    basicAuthSetup();
                var response = this._httpClient.GetAsync(request);
                if (auth)
                    authRemove();
                return response.Result;
            }
            catch (Exception e)
            {
                log.Error(e.Message);
                throw new Exception(e.Message);
            }
        }

        /// <summary>
        /// Envoie des requêtes en post
        /// </summary>
        /// <param name="route">route sans le http://server:port/</param>
        /// <param name="content">contenue à envoyer, aucun parsing n'est fait dessus</param>
        /// <param name="application">selectionner l'application parmis les choix proposés</param>
        /// <param name="auth">preciser si besoin d'authentification</param>
        /// <returns></returns>
        public HttpResponseMessage SendByPost(string route, string content, ViewModel.Enums.HttpPostApplication application, bool auth = false)
        {
            var request = this._uri;
            request += route;
            try
            {
                if (auth)
                    basicAuthSetup();
                HttpContent contentPost = new StringContent(content, Encoding.UTF8, application.ToString());
                if (auth)
                    authRemove();
                var response = this._httpClient.PostAsync(request, contentPost);
            }
            catch (Exception e)
            {
                log.Error(e.Message);
                throw new Exception(e.Message);
            }
            return null;
        }
    }
}
