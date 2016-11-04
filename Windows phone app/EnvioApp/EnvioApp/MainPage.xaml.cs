using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Text;
using System.Threading.Tasks;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Windows.UI.Popups;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Controls.Primitives;
using Windows.UI.Xaml.Data;
using Windows.UI.Xaml.Input;
using Windows.UI.Xaml.Media;
using Windows.UI.Xaml.Navigation;

// The Blank Page item template is documented at http://go.microsoft.com/fwlink/?LinkId=391641

namespace EnvioApp
{
    /// <summary>
    /// An empty page that can be used on its own or navigated to within a Frame.
    /// </summary>
    public sealed partial class MainPage : Page
    {

        //network part
//        private string url = "http://176.31.127.14:1337/api/login";
//        private string url = "http://127.0.0.1:1337/api/login";
        private string url = "http://137.74.40.245:1337/api/login";

        public MainPage()
        {
            this.InitializeComponent();

            this.NavigationCacheMode = NavigationCacheMode.Required;
        }

        /// <summary>
        /// Invoked when this page is about to be displayed in a Frame.
        /// </summary>
        /// <param name="e">Event data that describes how this page was reached.
        /// This parameter is typically used to configure the page.</param>
        protected override void OnNavigatedTo(NavigationEventArgs e)
        {
            // TODO: Prepare page for display here.

            // TODO: If your application contains multiple pages, ensure that you are
            // handling the hardware Back button by registering for the
            // Windows.Phone.UI.Input.HardwareButtons.BackPressed event.
            // If you are using the NavigationHelper provided by some templates,
            // this event is handled for you.
            this.PwdTextBox.Password = "";
        }

        private async void button_Click(object sender, RoutedEventArgs e)
        {
            await this.Connect(e);
        }

        private async Task Connect(RoutedEventArgs e)
        {
            // set the values for the request's body
            //var values = new List<KeyValuePair<string, string>>
            List<KeyValuePair<string, string>> values = new List<KeyValuePair<string, string>>
                    {
                        new KeyValuePair<string, string>("email", this.AccountTxtBox.Text),
                        new KeyValuePair<string, string>("password", this.PwdTextBox.Password)
                    };

            try
            {
                var httpClient = new HttpClient(new HttpClientHandler());
                HttpResponseMessage response = await httpClient.PostAsync(url, new FormUrlEncodedContent(values));
                response.EnsureSuccessStatusCode();
                var responseString = await response.Content.ReadAsStringAsync();
                UserInfo user = null;
                user = JsonConvert.DeserializeObject<UserInfo>(responseString);
//                Debug.WriteLine(responseString);
//                Debug.WriteLine(user.ToString());
                if (user == null)
                {
                    MessageDialog msgbox = new MessageDialog("Wrong Email and/or password");
                    await msgbox.ShowAsync();
                    return;
                }

                try
                {
                    Frame.Navigate(typeof(PivotPage), user);
                }
                catch (TypeLoadException ex)
                {
                    Debug.WriteLine(ex.ToString());
                }
            }
            catch (System.NullReferenceException ex)
            {
                Debug.WriteLine(ex.ToString());
                MessageDialog msgbox = new MessageDialog("Wrong Email and/or password");
                await msgbox.ShowAsync();
            }
            catch
            {
                // catch an exception if the API gave no response
                // and display a dialog box
                MessageDialog msgbox = new MessageDialog("An error has occured. Please try again in a moment.");
                await msgbox.ShowAsync();
            }
        }
    }
}
