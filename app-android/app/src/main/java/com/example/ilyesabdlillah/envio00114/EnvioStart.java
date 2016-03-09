package com.example.ilyesabdlillah.envio00114;
import android.content.Context;
import android.graphics.Color;
import android.location.Location;
import android.location.LocationManager;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;

/**
 * Created by ilyes on 03/03/16.
 */

import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.ViewGroup;
import android.widget.SeekBar;
import android.widget.TextView;

import com.survivingwithandroid.weather.lib.WeatherClient;
import com.survivingwithandroid.weather.lib.WeatherConfig;
import com.survivingwithandroid.weather.lib.client.okhttp.WeatherDefaultClient;
import com.survivingwithandroid.weather.lib.exception.WeatherLibException;
import com.survivingwithandroid.weather.lib.exception.WeatherProviderInstantiationException;
import com.survivingwithandroid.weather.lib.model.CurrentWeather;
import com.survivingwithandroid.weather.lib.provider.forecastio.ForecastIOProviderType;
import com.survivingwithandroid.weather.lib.request.WeatherRequest;

import org.adw.library.widgets.discreteseekbar.DiscreteSeekBar;
import org.w3c.dom.Text;

public class EnvioStart extends Fragment {

    // Save Fragment View
    private View MainView;
    private LocationManager locationManager;

    // Var. Members of the main fragment class
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

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Location instantiation
        // GPS location for weather condition @// TODO: 04/02/16 replace this code by the externals sensors.
        locationManager = (LocationManager) getActivity().getSystemService(Context.LOCATION_SERVICE);
        // User preferences conditions
        final Location Util = UtilLocation.getLastKnownLocation(isNetworkAvailable(), getActivity().getApplicationContext());

        final UtilLocation Loc = new UtilLocation();
        assert Util != null;

        // GPS location for weather condition @// TODO: 04/02/16 replace this code by the externals sensors.

//        CityName.setText(String.format("%s %s %s", String.valueOf("Location: " + "Lat." + Util.getLatitude()), "Lon. " + String.valueOf(Util.getLongitude()), Loc.getAddressString(Util.getLatitude(), Util.getLongitude())));
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
        Log.v("Update", "True");
        // Init User Configuration
        TextTemp.setText(String.format("%s°", Integer.toString(SeekBarTemp.getProgress())));
        TextLuminosity.setText(String.format("%s%%", Integer.toString(SeekBarLum.getProgress())));
        TextTemp.setTextColor(Color.rgb(255, 145 - (SeekBarTemp.getProgress() - SeekBarTemp.getMin()) * 5, 34));

        // Change format of the popup of the bubble in the seek bar
        // Connect the current value to the string
        // Temperature
        SeekBarTemp.setOnProgressChangeListener(new DiscreteSeekBar.OnProgressChangeListener() {
            @Override
            public void onProgressChanged(DiscreteSeekBar seekBar, int value, boolean fromUser) {
                TextTemp.setText(Integer.toString(SeekBarTemp.getProgress()) + "°");
                SeekBarTemp.setIndicatorFormatter(Integer.toString(SeekBarTemp.getProgress()) + "°");
                SeekBarTemp.setScrubberColor(Color.rgb(255, 145 - (SeekBarTemp.getProgress() - SeekBarTemp.getMin()) * 5, 83));
                TextTemp.setTextColor(Color.rgb(255, 145 - (SeekBarTemp.getProgress() - SeekBarTemp.getMin()) * 5, 83));
                Log.v("Update", "True");
            }

            @Override
            public void onStartTrackingTouch(DiscreteSeekBar seekBar) {
                SeekBarTemp.setIndicatorFormatter(Integer.toString(SeekBarTemp.getProgress()) + "°");
                SeekBarTemp.setScrubberColor(Color.rgb(255, 145 - (SeekBarTemp.getProgress() - SeekBarTemp.getMin()) * 5, 83));
                TextTemp.setTextColor(Color.rgb(255, 145 - (SeekBarTemp.getProgress() - SeekBarTemp.getMin()) * 5, 83));
            }

            @Override
            public void onStopTrackingTouch(DiscreteSeekBar seekBar) {
                SeekBarTemp.setIndicatorFormatter(Integer.toString(SeekBarTemp.getProgress()) + "°");
                SeekBarTemp.setScrubberColor(Color.rgb(255, 145 - (SeekBarTemp.getProgress() - SeekBarTemp.getMin()) * 5, 83));
                TextTemp.setTextColor(Color.rgb(255, 145 - (SeekBarTemp.getProgress() - SeekBarTemp.getMin()) * 5, 83));
            }
        });
        // Luminosity
        SeekBarLum.setOnProgressChangeListener(new DiscreteSeekBar.OnProgressChangeListener() {
            @Override
            public void onProgressChanged(DiscreteSeekBar seekBar, int value, boolean fromUser) {
                int c = (SeekBarLum.getProgress() - SeekBarLum.getMin());
                TextLuminosity.setText(Integer.toString(SeekBarLum.getProgress()) + "%");
                SeekBarLum.setIndicatorFormatter(Integer.toString(SeekBarLum.getProgress()));
                SeekBarLum.setScrubberColor(Color.rgb(0, 55 + c * 2, 55 + c * 2));
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

            }
        });
    }

    // Check Network
    public boolean isNetworkAvailable() {
        ConnectivityManager connectivityManager
                = (ConnectivityManager) getActivity().getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo activeNetworkInfo = connectivityManager.getActiveNetworkInfo();
        return activeNetworkInfo != null && activeNetworkInfo.isConnected();

    }

}