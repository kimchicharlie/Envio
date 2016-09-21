using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Runtime.InteropServices.WindowsRuntime;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Controls.Primitives;
using Windows.UI.Xaml.Data;
using Windows.UI.Xaml.Input;
using Windows.UI.Xaml.Media;
using Windows.UI.Xaml.Navigation;
using EnvioApp.Common;
using System.Diagnostics;
using Windows.UI.Popups;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Collections.ObjectModel;

// The Blank Page item template is documented at http://go.microsoft.com/fwlink/?LinkID=390556

namespace EnvioApp
{
    /// <summary>
    /// An empty page that can be used on its own or navigated to within a Frame.
    /// </summary>
    public sealed partial class PivotPage : Page
    {
        private NavigationHelper navigationHelper;
        private ObservableDictionary defaultViewModel = new ObservableDictionary();

        private UserInfo _user;
        //        private RoomList _roomList = new RoomList();

        List<Room> rooms;
        private RoomContainer room = null;
        private Boolean _conf = false;
        private int _index;

        private double _tempVal;
        private int _lumVal;

        private DateTime _date;
        private int calOldIndex;

        DispatcherTimer timer;

        //network part
        private string urlSingleRoom = "http://127.0.0.1:1337/api/getRoom";
        private string urlAllRooms = "http://127.0.0.1:1337/api/getRooms";
        private string urlChangeTemp = "http://127.0.0.1:1337/api/changeTemperature";
        private string urlChangeLight = "http://127.0.0.1:1337/api/changeLight";
        private string urlPlanning = "http://127.0.0.1:1337/api/getRoomPlanning";
        private string urlDisco = "http://127.0.0.1:1337/api/logout";
        /*
        private string urlSingleRoom = "http://176.31.127.14:1337/api/getRoom";
        private string urlAllRooms = "http://176.31.127.14:1337/api/getRooms";
        private string urlChangeTemp = "http://176.31.127.14:1337/api/changeTemperature";
        private string urlChangeLight = "http://176.31.127.14:1337/api/changeLight";
        private string urlPlanning = "http://176.31.127.14:1337/api/getRoomPlanning";
        private string urlDisco = "http://176.31.127.14:1337/api/logout";        
        */
        //        private string url = "http://176.31.127.14:1337/api/getRoom";
        //        private string url = "http://176.31.127.14:1337/api/getRoom";

        public PivotPage()
        {
            this.InitializeComponent();

            //            _roomList = new RoomList();
            //            _roomList._rooms = new List<Room>();
            rooms = new List<Room>();
            room = new RoomContainer();

            this.navigationHelper = new NavigationHelper(this);
            this.navigationHelper.LoadState += this.NavigationHelper_LoadState;
            this.navigationHelper.SaveState += this.NavigationHelper_SaveState;

            _date = new DateTime();
            _date = DateTime.Today;
            calOldIndex = 0;

            timer = new DispatcherTimer();
            timer.Tick += dispatcherTimer_Tick;
            timer.Interval = new TimeSpan(0, 0, 10); // every 30 seconds
        }

        /// <summary>
        /// Gets the <see cref="NavigationHelper"/> associated with this <see cref="Page"/>.
        /// </summary>
        public NavigationHelper NavigationHelper
        {
            get { return this.navigationHelper; }
        }

        /// <summary>
        /// Gets the view model for this <see cref="Page"/>.
        /// This can be changed to a strongly typed view model.
        /// </summary>
        public ObservableDictionary DefaultViewModel
        {
            get { return this.defaultViewModel; }
        }

        /// <summary>
        /// Populates the page with content passed during navigation.  Any saved state is also
        /// provided when recreating a page from a prior session.
        /// </summary>
        /// <param name="sender">
        /// The source of the event; typically <see cref="NavigationHelper"/>
        /// </param>
        /// <param name="e">Event data that provides both the navigation parameter passed to
        /// <see cref="Frame.Navigate(Type, Object)"/> when this page was initially requested and
        /// a dictionary of state preserved by this page during an earlier
        /// session.  The state will be null the first time a page is visited.</param>
        private void NavigationHelper_LoadState(object sender, LoadStateEventArgs e)
        {
        }

        /// <summary>
        /// Preserves state associated with this page in case the application is suspended or the
        /// page is discarded from the navigation cache.  Values must conform to the serialization
        /// requirements of <see cref="SuspensionManager.SessionState"/>.
        /// </summary>
        /// <param name="sender">The source of the event; typically <see cref="NavigationHelper"/></param>
        /// <param name="e">Event data that provides an empty dictionary to be populated with
        /// serializable state.</param>
        private void NavigationHelper_SaveState(object sender, SaveStateEventArgs e)
        {
        }

        #region NavigationHelper registration

        /// <summary>
        /// The methods provided in this section are simply used to allow
        /// NavigationHelper to respond to the page's navigation methods.
        /// <para>
        /// Page specific logic should be placed in event handlers for the  
        /// <see cref="NavigationHelper.LoadState"/>
        /// and <see cref="NavigationHelper.SaveState"/>.
        /// The navigation parameter is available in the LoadState method 
        /// in addition to page state preserved during an earlier session.
        /// </para>
        /// </summary>
        /// <param name="e">Provides data for navigation methods and event
        /// handlers that cannot cancel the navigation request.</param>
        protected async override void OnNavigatedTo(NavigationEventArgs e)
        {
            _user = (UserInfo)e.Parameter;
            await this.configureRooms();
            timer.Start();
            this.navigationHelper.OnNavigatedTo(e);
        }

        protected override void OnNavigatedFrom(NavigationEventArgs e)
        {
            timer.Stop();
            this.navigationHelper.OnNavigatedFrom(e);
        }
        #endregion

        // timer to call update method
        private void Page_OnLoaded(object sender, RoutedEventArgs e)
        {
            timer.Start();
        }

        // method which will update the room values every x seconds
        async void dispatcherTimer_Tick(object sender, object e)
        {
            Debug.WriteLine("In the dispatcher!!!");
            await getSingleRoom(comboBox.SelectedIndex);
        }

        private void mainPivot_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (mainPivot.SelectedIndex == 1)
            {
                confFirstView();
                confSecondView();
                confThirdView();
                timer.Stop();
            }
            else if (mainPivot.SelectedIndex == 0)
            {
                timer.Start();
                if (TempLabel != null)
                    TempLabel.Text = "Température\t\t" + _tempVal + "°C";
                if (LumLabel != null)
                    LumLabel.Text = "Luminosité\t\t" + _lumVal + "%";
            }
            else
                timer.Stop();
        }

        private void calendarPivot_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            // change the selected item of the calendar pivot
            int newIdex = calendarPivot.SelectedIndex;
            int tmp;
            if (newIdex == 2 && calOldIndex == 0)
                tmp = -1;
            else if (newIdex == 0 && calOldIndex == 2)
                tmp = 1;
            else
                tmp = newIdex - calOldIndex;
            calOldIndex = calendarPivot.SelectedIndex;
            _date = _date.AddDays(tmp);
            Debug.WriteLine("adding: " + tmp + " to date");

            (calendarPivot.SelectedItem as PivotItem).Header = _date.Date.ToString("d"); ;
            // have to change the title of the items
            if (calOldIndex == 0)
            {
                (calendarPivot.Items.ElementAt(1) as PivotItem).Header = _date.AddDays(1).Date.ToString("d");
                (calendarPivot.Items.ElementAt(2) as PivotItem).Header = _date.AddDays(2).Date.ToString("d");
            }
            else if (calOldIndex == 1) {
                (calendarPivot.Items.ElementAt(2) as PivotItem).Header = _date.AddDays(1).Date.ToString("d");
                (calendarPivot.Items.ElementAt(0) as PivotItem).Header = _date.AddDays(2).Date.ToString("d");
            }
            else {
                (calendarPivot.Items.ElementAt(0) as PivotItem).Header = _date.AddDays(1).Date.ToString("d");
                (calendarPivot.Items.ElementAt(1) as PivotItem).Header = _date.AddDays(2).Date.ToString("d");
            }

            // configure the listBox of the item
            if (calOldIndex == 0)
                confFirstView();
            if (calOldIndex == 1)
                confSecondView();
            else
                confThirdView();
        }

        private async void TempSlider_ValueChanged(object sender, RangeBaseValueChangedEventArgs e)
        {
            try
            {
                if (_conf != false)
                {
                    _tempVal = e.NewValue;
                    if (TempLabel != null)
                        TempLabel.Text = "Température\t\t" + _tempVal + "°C";
                    await System.Threading.Tasks.Task.Delay(1000); // 1s
                    List<KeyValuePair<string, string>> values = new List<KeyValuePair<string, string>>
                    {
                        new KeyValuePair<string, string>("api_key", "f8c5e1xx5f48e56s4x8"),
                        new KeyValuePair<string, string>("roomID", room.room._id),
                        new KeyValuePair<string, string>("temperature", e.NewValue.ToString())
                    };

                    var httpClient = new HttpClient(new HttpClientHandler());
                    HttpResponseMessage response = await httpClient.PostAsync(urlChangeTemp, new FormUrlEncodedContent(values));
                    response.EnsureSuccessStatusCode();
                    var responseString = await response.Content.ReadAsStringAsync();
//                    Debug.WriteLine(responseString.ToString());
                }
            }
            catch
            {
                // catch an exception if the API gave no response
                // and display a dialog box
                MessageDialog msgbox = new MessageDialog("Cannot reach API. Please try again in a moment.");
                await msgbox.ShowAsync();
            }
        }

        private async void LumSlider_ValueChanged(object sender, RangeBaseValueChangedEventArgs e)
        {
            try
            {
                if (_conf != false)
                {
                    _lumVal = (int)e.NewValue;
                    if (LumLabel != null)
                        LumLabel.Text = "Luminosité\t\t" + _lumVal + "%";
                    await System.Threading.Tasks.Task.Delay(1000); // 1s
                    List<KeyValuePair<string, string>> values = new List<KeyValuePair<string, string>>
                    {
                        new KeyValuePair<string, string>("api_key", "f8c5e1xx5f48e56s4x8"),
                        new KeyValuePair<string, string>("roomID", room.room._id),
                        new KeyValuePair<string, string>("light", e.NewValue.ToString())
                    };

                    var httpClient = new HttpClient(new HttpClientHandler());
                    HttpResponseMessage response = await httpClient.PostAsync(urlChangeLight, new FormUrlEncodedContent(values));
                    response.EnsureSuccessStatusCode();
                    var responseString = await response.Content.ReadAsStringAsync();
//                    Debug.WriteLine(responseString.ToString());
                }
            }
            catch
            {
                // catch an exception if the API gave no response
                // and display a dialog box
                MessageDialog msgbox = new MessageDialog("An error has occured. Please try again in a moment.");
                await msgbox.ShowAsync();
            }
        }

        private async Task configureRooms() {
            // récupérer une salle
            await this.getAllRooms();
        }

        private async Task getAllRooms()
        {
            // set the values for the request's body
            //var values = new List<KeyValuePair<string, string>>
            List<KeyValuePair<string, string>> values = new List<KeyValuePair<string, string>>
                    {
                        new KeyValuePair<string, string>("api_key", "f8c5e1xx5f48e56s4x8"),
                        new KeyValuePair<string, string>("organisation", _user.user.organisation)
                    };

            try
            {
                var httpClient = new HttpClient(new HttpClientHandler());
                HttpResponseMessage response = await httpClient.PostAsync(urlAllRooms, new FormUrlEncodedContent(values));
                response.EnsureSuccessStatusCode();
                var responseString = await response.Content.ReadAsStringAsync();

                // take directly the array of rooms
                int ind = responseString.IndexOf("[");
                responseString += ind;
                JArray tmp = JArray.Parse(responseString.Substring(ind, responseString.Length - 3 - ind));
                for (int i = 0; i < tmp.Count; i++) {
                    rooms.Add(JsonConvert.DeserializeObject<Room>(tmp.ElementAt(i).ToString()));
                }
                this.comboBox.ItemsSource = rooms;
                // write the json response
                //                Debug.WriteLine(responseString.ToString());
                if (rooms == null)
                    Debug.WriteLine("rooms est null");
                else
                    Debug.WriteLine("Number of element in the list: " + rooms.Count());
                // there is no room actually set so take the first one
                if (this._conf == false && rooms.Count() > 0)
                {
                    comboBox.SelectedIndex = 0;
                    _index = 0;
                }
            }
            catch
            {
                // catch an exception if the API gave no response
                // and display a dialog box
                MessageDialog msgbox = new MessageDialog("An error has occured. Please try again in a moment.");
                await msgbox.ShowAsync();
            }
        }

        private async Task getSingleRoom(int index)
        {
            // set the values for the request's body
            List<KeyValuePair<string, string>> values = new List<KeyValuePair<string, string>>
                    {
                        new KeyValuePair<string, string>("api_key", "f8c5e1xx5f48e56s4x8"),
                        new KeyValuePair<string, string>("roomID", rooms.ElementAt(index)._id)
                    };

            try
            {
                var httpClient = new HttpClient(new HttpClientHandler());
                HttpResponseMessage response = await httpClient.PostAsync(urlSingleRoom, new FormUrlEncodedContent(values));
                response.EnsureSuccessStatusCode();
                var responseString = await response.Content.ReadAsStringAsync();
                room = JsonConvert.DeserializeObject<RoomContainer>(responseString);
                //response for signle room
//                Debug.WriteLine(responseString.ToString());
                TempSlider.Value = Int32.Parse(room.room.temperature);
                LumSlider.Value = Int32.Parse(room.room.light);
                _tempVal = TempSlider.Value;
                _lumVal = (int)LumSlider.Value;
                if (TempLabel != null)
                    TempLabel.Text = "Température\t\t" + _tempVal + "°C";
                if (LumLabel != null)
                    LumLabel.Text = "Luminosité\t\t" + _lumVal + "%";
                _conf = true;

                /*
                calendarPivot.SelectedIndex = 0;
                _date = DateTime.Today;
                (calendarPivot.SelectedItem as PivotItem).Header = _date.Date.ToString("d"); ;
                (calendarPivot.Items.ElementAt(1) as PivotItem).Header = _date.AddDays(1).Date.ToString("d");
                (calendarPivot.Items.ElementAt(2) as PivotItem).Header = _date.AddDays(2).Date.ToString("d");
                */
                await getPlanning(index);
            }
            catch
            {
                // catch an exception if the API gave no response
                // and display a dialog box
                Debug.WriteLine("SINGLE ROOM CRASH");
                MessageDialog msgbox = new MessageDialog("An error has occured. Please try again in a moment.");
                await msgbox.ShowAsync();
            }
        }

        private async Task getPlanning(int index)
        {
            List<KeyValuePair<string, string>> values = new List<KeyValuePair<string, string>>
                    {
                        new KeyValuePair<string, string>("api_key", "f8c5e1xx5f48e56s4x8"),
                        new KeyValuePair<string, string>("roomID", rooms.ElementAt(index)._id),
                    };

            try {
                var httpClient = new HttpClient(new HttpClientHandler());
                HttpResponseMessage response = await httpClient.PostAsync(urlPlanning, new FormUrlEncodedContent(values));
                response.EnsureSuccessStatusCode();
                var responseString = await response.Content.ReadAsStringAsync();
                Debug.WriteLine(responseString);

                // take directly the array of rooms
                int ind = responseString.IndexOf("[");

                calendarPivot.SelectedIndex = 0;
                _date = DateTime.Today;
                (calendarPivot.Items.ElementAt(0) as PivotItem).Header = _date.Date.ToString("d"); ;
                (calendarPivot.Items.ElementAt(1) as PivotItem).Header = _date.AddDays(1).Date.ToString("d");
                (calendarPivot.Items.ElementAt(2) as PivotItem).Header = _date.AddDays(2).Date.ToString("d");

                if (ind + 1 != responseString.IndexOf("]"))
                {
                    room.room.planning.Clear();
                    JArray tmp = JArray.Parse(responseString.Substring(ind, responseString.Length - ind - 1));
                    for (int i = 0; i < tmp.Count; i++)
                    {
                        Debug.WriteLine(tmp[i].ToString());
                        room.room.planning.Add(JsonConvert.DeserializeObject<Planning>(tmp.ElementAt(i).ToString()));
                        room.room.planning.ElementAt(i).parseStrings();
                    }
                    confFirstView();
                }
            }
            catch
            {
                Debug.WriteLine("Crash dans Planning");
                MessageDialog msgbox = new MessageDialog("An error has occured. Please try again in a moment.");
                await msgbox.ShowAsync();
            }
        }

        private async void comboBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            Debug.WriteLine("SelectionChanged: ");
            try {
                _index = (sender as ComboBox).SelectedIndex;
                await getSingleRoom(_index);
            }
            catch
            {
                // catch an exception if the API gave no response
                // and display a dialog box
                MessageDialog msgbox = new MessageDialog("An error has occured. Please try again in a moment.");
                await msgbox.ShowAsync();
            }
        }

        static public ObservableCollection<Planning> modesFirstList { get; set; }
        static public ObservableCollection<Planning> modesSecondList { get; set; }
        static public ObservableCollection<Planning> modesThirdList { get; set; }

        public void confFirstView()
        {
            modesFirstList = new ObservableCollection<Planning>();
            
            // get the date and add the modes that match
            for (int i = 0; i < room.room.planning.Count(); i++)
            {
                if (room.room.planning.ElementAt(i).dtStart.Date == _date.Date)
                    modesFirstList.Add(room.room.planning.ElementAt(i));
            }
            ListFirstItem.ItemsSource = modesFirstList;
        }
        public void confSecondView()
        {
            modesSecondList = new ObservableCollection<Planning>();
            for (int i = 0; i < room.room.planning.Count(); i++)
            {
                if (room.room.planning.ElementAt(i).dtStart.Date == _date.Date)
                    modesSecondList.Add(room.room.planning.ElementAt(i));
            }
            ListSecondItem.ItemsSource = modesSecondList;
        }

        public void confThirdView()
        {
            modesThirdList = new ObservableCollection<Planning>();
            for (int i = 0; i < room.room.planning.Count(); i++)
            {
                if (room.room.planning.ElementAt(i).dtStart.Date == _date.Date)
                    modesThirdList.Add(room.room.planning.ElementAt(i));
            }
            ListThirdItem.ItemsSource = modesThirdList;
        }

        private async void Button_Click(object sender, RoutedEventArgs e)
        {
            await Disconnect(e);
        }

        private async Task Disconnect(RoutedEventArgs e)
        {
            // set the values for the request's body
            //var values = new List<KeyValuePair<string, string>>
            List<KeyValuePair<string, string>> values = new List<KeyValuePair<string, string>>
                    {
                        new KeyValuePair<string, string>("guid", _user.guid),
                    };

            try
            {
                var httpClient = new HttpClient(new HttpClientHandler());
                HttpResponseMessage response = await httpClient.PostAsync(urlDisco, new FormUrlEncodedContent(values));
                response.EnsureSuccessStatusCode();
                var responseString = await response.Content.ReadAsStringAsync();
                _user = null;
                Debug.WriteLine(responseString);
                try
                {
                    Frame.Navigate(typeof(MainPage));
                }
                catch (TypeLoadException ex)
                {
                    Debug.WriteLine(ex.ToString());
                }
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
