package com.example.ilyesabdlillah.envio00114;
import android.animation.ValueAnimator;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.location.Location;
import android.location.LocationManager;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;

/**
 * Created by ilyes on 03/03/16.
 */

import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.SeekBar;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.survivingwithandroid.weather.lib.WeatherClient;
import com.survivingwithandroid.weather.lib.WeatherConfig;
import com.survivingwithandroid.weather.lib.client.okhttp.WeatherDefaultClient;
import com.survivingwithandroid.weather.lib.exception.WeatherLibException;
import com.survivingwithandroid.weather.lib.exception.WeatherProviderInstantiationException;
import com.survivingwithandroid.weather.lib.model.CurrentWeather;
import com.survivingwithandroid.weather.lib.provider.forecastio.ForecastIOProviderType;
import com.survivingwithandroid.weather.lib.request.WeatherRequest;

import org.adw.library.widgets.discreteseekbar.DiscreteSeekBar;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.w3c.dom.Text;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;
import android.os.Handler;


public class EnvioStart extends Fragment {

    // Save Fragment View
    private View MainView;
    private LocationManager locationManager;
    private boolean isLaunched = false;
    // Var. Members of the main fragment class
    private int frequencyUpdate = 1000;
    private int delayUpdate = 0;
    private TextView TextTemp;
    private TextView TextLuminosity;
    private DiscreteSeekBar SeekBarTemp;
    private DiscreteSeekBar SeekBarLum;
    private TextView CityName;
    private TextView CurrTemp;
    private TextView CurrUv;
    private TextView CurrCond;
    private float currentTemp;
    private double currentUV;
    private String conditionNow;
    private RequestQueue requestQueue;
    private static String URL = "http://192.168.1.16:1337/api";
    private StringRequest request;
    private JSONArray roomList;
    private HashMap<String, Object> userInfo;
    private static int selectedRoom;
    private int currentTemperature = 16;
    private int currentLum = 0;
    private int animationDuration = 800;
    private ValueAnimator animatorTemp = new ValueAnimator();
    private ValueAnimator animatorLum = new ValueAnimator();

    // Spinner (Item selector) in the top of the view which contains all the rooms
    private Spinner spinnerRoom;
    // Threads
    private Handler handler = new Handler();
    private Runnable runnable = new Runnable() {
        @Override
        public void run() {
            getRooms();
            handler.postDelayed(this, 5000);
        }
    };

    @Override
    public void onCreate(Bundle savedInstanceState) {
        // Init and put in a thread the function responsible of the room management each second (real-time)
        super.onCreate(savedInstanceState);
        // Location instantiation
        // GPS location for weather condition @// TODO: 04/02/16 replace this code by the externals sensors.
        locationManager = (LocationManager) getActivity().getSystemService(Context.LOCATION_SERVICE);
        // User preferences conditions

        final Location Util = UtilLocation.getLastKnownLocation(isNetworkAvailable(), getActivity().getApplicationContext());
        final UtilLocation Loc = new UtilLocation();
        final JsonUtilities jsonUtilities = new JsonUtilities();

        assert Util != null;
        userInfo = (HashMap<String, Object>)  getActivity().getIntent().getSerializableExtra("UserInfo");

        // GPS location for weather condition @// TODO: 04/02/16 replace this code by the externals sensors.
        // CityName.setText(String.format("%f %f", String.valueOf("Location: " + "Lat." + Util.getLatitude()), "Lon. " + Util.getLongitude()));
        // Sample WeatherLib client init
        WeatherClient.ClientBuilder builder = new WeatherClient.ClientBuilder();
        WeatherConfig config = new WeatherConfig();
        config.ApiKey = "4d59e4bf7f4cff2886da5340194d96f9";
        try {
            WeatherClient client = new WeatherClient.ClientBuilder().attach(getActivity().getApplicationContext())
                    .provider(new ForecastIOProviderType())
                    .httpClient(WeatherDefaultClient.class)
                    .config(config)
                    .build();
            client.getCurrentCondition(new WeatherRequest(Util.getLongitude(), Util.getLatitude()), new WeatherClient.WeatherEventListener() {
                @Override
                public void onWeatherRetrieved(CurrentWeather currentWeather) {
                    currentTemp = currentWeather.weather.temperature.getTemp();
                    currentUV = (currentWeather.weather.currentCondition.getVisibility() / 9.99) * 100;
                    conditionNow = currentWeather.weather.currentCondition.getDescr();

                    Log.d("WL", "City [" + currentWeather.weather.location.getCity() + "] Current temp [" + currentTemp + "]");
                    // Print results
                    CurrTemp.setText(String.valueOf(currentTemp) + "°");
                    CurrUv.setText(String.valueOf(String.format("%.2f", currentUV) + "%"));
                    CurrCond.setText(conditionNow);
                }

                @Override
                public void onWeatherError(WeatherLibException e) {
                    Log.d("WL", "Weather Error - parsing data");
                    e.printStackTrace();
                }

                @Override
                public void onConnectionError(Throwable throwable) {
                    Log.d("WL", "Connection error");
                    throwable.printStackTrace();
                }
            });

        } catch (WeatherProviderInstantiationException e) {
            e.printStackTrace();
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        super.onCreate(savedInstanceState);

        // Invoke the thread for this view
        handler.postDelayed(runnable, 0);

        // Save Fragment Object
        MainView = inflater.inflate(R.layout.envio_start, container, false);
        SeekBarTemp = (DiscreteSeekBar) MainView.findViewById(R.id.SeekbarTemp);
        SeekBarLum = (DiscreteSeekBar)  MainView.findViewById(R.id.SeekbarLum);
        TextTemp = (TextView) MainView.findViewById(R.id.Temperature);
        TextLuminosity = (TextView) MainView.findViewById(R.id.Luminosity);
        CityName = (TextView) MainView.findViewById(R.id.locationCity);
        CurrTemp = (TextView) MainView.findViewById(R.id.currentTemp);
        CurrUv = (TextView) MainView.findViewById(R.id.uvLevel);
        CurrCond = (TextView) MainView.findViewById(R.id.currCondtions);

        // Persistant Action Bar
        ((AppCompatActivity) getActivity()).getSupportActionBar().show();
        return MainView;
    }

    @Override
    public void onStart(){
        super.onStart();
        // Refresh the rooms

        // Initialize the spinner;
        spinnerRoom = (Spinner) MainView.findViewById(R.id.spinnerRooms);


        // Get the room selected by the user
        spinnerRoom.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                try {
                    //Log.v("temperature:", roomList.getJSONObject(position).getString("temperature"));
                    //Log.v("light:", roomList.getJSONObject(position).getString("light"));
                    // Some UI Animation

                    animatorTemp.setObjectValues(currentTemperature, Integer.valueOf(roomList.getJSONObject(position).getString("temperature")));
                    animatorLum.setObjectValues(currentLum, Integer.valueOf(roomList.getJSONObject(position).getString("light")));
                    animatorTemp.setDuration(animationDuration);
                    animatorLum.setDuration(animationDuration);
                    animatorTemp.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {
                        public void onAnimationUpdate(ValueAnimator animation) {
                            TextTemp.setText("" + (int) animation.getAnimatedValue() + "°");
                            SeekBarTemp.setProgress((int) animation.getAnimatedValue());
                        }
                    });

                    animatorLum.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {
                        public void onAnimationUpdate(ValueAnimator animation) {
                            TextLuminosity.setText("" + (int) animation.getAnimatedValue() + "%");
                            SeekBarLum.setProgress((int) animation.getAnimatedValue());
                        }
                    });

                    if (selectedRoom != position || isLaunched == false)
                    {
                        animatorTemp.start();
                        animatorLum.start();
                        isLaunched = true;
                    }
                    if (currentTemperature != Integer.valueOf(roomList.getJSONObject(position).getString("temperature"))) {
                        currentTemperature = Integer.valueOf(roomList.getJSONObject(position).getString("temperature"));
                        TextTemp.setText(currentTemperature + "°");
                        SeekBarTemp.setProgress(currentTemperature);
                    }
                    if (currentLum != Integer.valueOf(roomList.getJSONObject(position).getString("light"))){
                        currentLum = Integer.valueOf(roomList.getJSONObject(position).getString("light"));
                        TextLuminosity.setText(currentLum + "%");
                        SeekBarLum.setProgress(currentLum);
                    }
                    selectedRoom = position;
                    if (getActivity() != null) {
                        getActivity().getIntent().putExtra("RoomN", roomList.getJSONObject(selectedRoom).getString("name"));
                        getActivity().getIntent().putExtra("Events",  roomList.getJSONObject(selectedRoom).getString("planning"));
                    }
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
            public void onNothingSelected(AdapterView<?> parent) {
            }
        });

        // Log.v("Update", "True");

        // Init User Configuration
        TextTemp.setText(String.format("%s°", Integer.toString(SeekBarTemp.getProgress())));
        TextLuminosity.setText(String.format("%s%%", Integer.toString(SeekBarLum.getProgress())));
        TextTemp.setTextColor(Color.rgb(255, 145 - (SeekBarTemp.getProgress() - SeekBarTemp.getMin()) * 5, 34));

        // Change format of the popup of the bubble in the seek bar (depreciated)
        // Connect the current value to the string
        // Temperature
        SeekBarTemp.setOnProgressChangeListener(new DiscreteSeekBar.OnProgressChangeListener() {
            @Override
            public void onProgressChanged(DiscreteSeekBar seekBar, int value, boolean fromUser) {
                //TextTemp.setText(Integer.toString(SeekBarTemp.getProgress()) + "°");
                SeekBarTemp.setIndicatorFormatter(Integer.toString(SeekBarTemp.getProgress()) + "°");
                SeekBarTemp.setScrubberColor(Color.rgb(255, 145 - (SeekBarTemp.getProgress() - SeekBarTemp.getMin()) * 5, 83));
                TextTemp.setText(String.valueOf(SeekBarTemp.getProgress() + "°"));
                TextTemp.setTextColor(Color.rgb(255, 145 - (SeekBarTemp.getProgress() - SeekBarTemp.getMin()) * 5, 83));
                // Disable the animation when the user choose a value
              }

            @Override
            public void onStartTrackingTouch(DiscreteSeekBar seekBar) {
                SeekBarTemp.setIndicatorFormatter(Integer.toString(SeekBarTemp.getProgress()) + "°");
                SeekBarTemp.setScrubberColor(Color.rgb(255, 145 - (SeekBarTemp.getProgress() - SeekBarTemp.getMin()) * 5, 83));
                TextTemp.setTextColor(Color.rgb(255, 145 - (SeekBarTemp.getProgress() - SeekBarTemp.getMin()) * 5, 83));
            }

            @Override
            public void onStopTrackingTouch(DiscreteSeekBar seekBar) {
                // Send the request of changing temperature in real time
                try {
                    setTemperatureRooms(String.valueOf(SeekBarTemp.getProgress()), roomList.getJSONObject(selectedRoom).getString("_id"));
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        });
        // Luminosity
        SeekBarLum.setOnProgressChangeListener(new DiscreteSeekBar.OnProgressChangeListener() {
            @Override
            public void onProgressChanged(DiscreteSeekBar seekBar, int value, boolean fromUser) {
                int c = (SeekBarLum.getProgress() - SeekBarLum.getMin());
                SeekBarLum.setIndicatorFormatter(Integer.toString(SeekBarLum.getProgress()));
                SeekBarLum.setScrubberColor(Color.rgb(0, 55 + c * 2, 55 + c * 2));
                TextLuminosity.setText(String.valueOf(SeekBarLum.getProgress() + "%"));
                TextLuminosity.setTextColor(Color.rgb(0, 55 + c * 2, 55 + c * 2));
            }

            @Override
            public void onStartTrackingTouch(DiscreteSeekBar seekBar) {
                int c = (SeekBarLum.getProgress() - SeekBarLum.getMin());
                SeekBarLum.setIndicatorFormatter(Integer.toString(SeekBarLum.getProgress()));
                SeekBarLum.setScrubberColor(Color.rgb(0, 55 + c * 2, 55 + c * 2));
                TextLuminosity.setTextColor(Color.rgb(0, 55 + c * 2, 55 + c * 2));
            }

            @Override
            public void onStopTrackingTouch(DiscreteSeekBar seekBar) {
                // Send the request of changing temperature in real time
                try {
                    setLuminosityRooms(String.valueOf(SeekBarLum.getProgress()), roomList.getJSONObject(selectedRoom).getString("_id"));
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        });


    }

    // Request to get the rooms to the envio's API
    private void getRooms() {
        if(getActivity() == null)
            return;
        requestQueue = Volley.newRequestQueue(getActivity());
        request = new StringRequest(Request.Method.POST, URL + "/getRooms?api_key=f8c5e1xx5f48e56s4x8", new Response.Listener<String>() {
            @Override
            public void onResponse(String response) {
                try {
                    JSONObject jsonObject = new JSONObject(response);
                    if (jsonObject.getString("error").equals("null")) {
                        List<String> roomNames = new ArrayList<>();
                        roomList = jsonObject.getJSONArray("rooms");
                        // Put the envio's user room in the list of the room (list<String>)
                        for (int i = 0; i < roomList.length(); i++) {
                            roomNames.add(i, roomList.getJSONObject(i).getString("name"));
                        }
                        if (roomNames.size() > 0)
                        {
                            ArrayAdapter<String> adapter = new ArrayAdapter<String>(getActivity(), R.layout.spinner_style, roomNames);
                            adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                            spinnerRoom.setAdapter(adapter);
                            spinnerRoom.setSelection(selectedRoom);
                        }
                        else
                        {
                            List<String> emptyRoom = new ArrayList<>();
                            emptyRoom.add(0, "Aucune salle existante");
                            ArrayAdapter<String> adapter = new ArrayAdapter<String>(getActivity(), R.layout.spinner_style, emptyRoom);
                            adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                            spinnerRoom.setAdapter(adapter);
                            Toast.makeText(getActivity().getApplicationContext(), "Aucune salle créée, procédez a la création d'une salle via l'application-web Envio", Toast.LENGTH_SHORT).show();
                        }

                    } else {
                        Toast.makeText(getActivity().getApplicationContext(), "Echec de la récuperation des salles. Impossible de se connecter au serveur", Toast.LENGTH_LONG).show();
                    }
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                if(getActivity() == null)
                    return;
                Toast.makeText(getActivity().getApplicationContext(), "Echec de la récupération des salles vérifiez la connectivité de votre appareil. ", Toast.LENGTH_LONG).show();
                onDestroy();
            }
        }) {
            @Override // Forming the request to the envio's API
            protected Map<String, String> getParams() throws AuthFailureError {
                HashMap<String, String> hashMap = new HashMap<String, String>();
                hashMap.put("organisation", userInfo.get("organisation").toString());
                return hashMap;
            }
        };
        requestQueue.add(request);
    }


    // Request to set the temperature of the user's room to the envio's API
    public void setTemperatureRooms(final String temperature, final String idRoom) {
        if(getActivity() == null)
            return;
        requestQueue = Volley.newRequestQueue(getActivity());
        request = new StringRequest(Request.Method.POST, URL + "/changeTemperature?api_key=f8c5e1xx5f48e56s4x8", new Response.Listener<String>() {
            @Override
            public void onResponse(String response) {
                try {
                    JSONObject jsonObject = new JSONObject(response);
                    if (jsonObject.getString("error").equals("null")) {
                        Toast.makeText(getActivity().getApplicationContext(), "La température à été modifiée à " + SeekBarTemp.getProgress() + "°." , Toast.LENGTH_SHORT).show();
                    } else {
                        //Log.v("Error", idRoom + " " + temperature);
                        Toast.makeText(getActivity().getApplicationContext(), "Echec de la modification de la température de la salle, impossible de se connecter au serveur.", Toast.LENGTH_LONG).show();
                    }
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                if(getActivity() == null)
                    return;
                Toast.makeText(getActivity().getApplicationContext(), "Echec de la modification de la température de la salle, vérifiez la connectivité de votre appareil. ", Toast.LENGTH_LONG).show();
            }
        }) {
            @Override // Forming the request to the envio's API
            protected Map<String, String> getParams() throws AuthFailureError {
                HashMap<String, String> hashMap = new HashMap<String, String>();
                hashMap.put("roomID", idRoom);
                hashMap.put("temperature", temperature);
                return hashMap;
            }
        };
        requestQueue.add(request);
    }


    // Request to set the temperature of the user's room to the envio's API
    public void setLuminosityRooms(final String luminosity, final String idRoom) {
        if(getActivity() == null)
            return;
        requestQueue = Volley.newRequestQueue(getActivity());
        request = new StringRequest(Request.Method.POST, URL + "/changeLight?api_key=f8c5e1xx5f48e56s4x8", new Response.Listener<String>() {
            @Override
            public void onResponse(String response) {
                try {
                    JSONObject jsonObject = new JSONObject(response);
                    if (jsonObject.getString("error").equals("null")) {
                        final String[] lightLevel = {"Obscurité", "Faible lumière", "Éclairement moyen", "Bon éclairement", "Éclairement élevé" ,"Éclairement maximal"};
                        if (getActivity() == null)
                            return ;
                        Toast.makeText(getActivity().getApplicationContext(), "La luminosité à été modifiée à " + SeekBarLum.getProgress() + "% (" + lightLevel [SeekBarLum.getProgress() / 20] + ")." , Toast.LENGTH_SHORT).show();
                    } else {
                        //Log.v("Error", idRoom + " " + luminosity);
                        if (getActivity() == null)
                            return ;
                        Toast.makeText(getActivity().getApplicationContext(), "Echec de la modification de la luminosité de la salle, impossible de se connecter au serveur.", Toast.LENGTH_LONG).show();
                    }
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                if(getActivity() == null)
                    return;
                Toast.makeText(getActivity().getApplicationContext(), "Echec de la modification de la luminosité de la salle, vérifiez la connectivité de votre appareil. ", Toast.LENGTH_LONG).show();
            }
        }) {
            @Override // Forming the request to the envio's API
            protected Map<String, String> getParams() throws AuthFailureError {
                HashMap<String, String> hashMap = new HashMap<String, String>();

                // Hack TODO: Hotfixe api to reach the "100%" lumonisity lvl

                hashMap.put("roomID", idRoom);
                if (luminosity.matches("100"))
                    hashMap.put("light", "99");
                else if (luminosity.matches("0"))
                    hashMap.put("light", "1");
                else
                    hashMap.put("light", luminosity);
                return hashMap;
            }
        };
        requestQueue.add(request);
    }

    // Check Network
    public boolean isNetworkAvailable() {
        ConnectivityManager connectivityManager
                = (ConnectivityManager) getActivity().getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo activeNetworkInfo = connectivityManager.getActiveNetworkInfo();
        return activeNetworkInfo != null && activeNetworkInfo.isConnected();

    }
}