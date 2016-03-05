package com.example.ilyesabdlillah.envio00114;

import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.location.Location;
import android.location.LocationManager;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;
import android.support.annotation.LayoutRes;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.NavigationView;
import android.support.design.widget.Snackbar;
import android.support.v4.app.FragmentActivity;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.RelativeLayout;
import android.widget.ScrollView;
import android.widget.TextView;
import android.widget.ViewFlipper;

import com.survivingwithandroid.weather.lib.client.okhttp.WeatherDefaultClient;
import com.survivingwithandroid.weather.lib.exception.WeatherProviderInstantiationException;
import com.survivingwithandroid.weather.lib.provider.openweathermap.OpenweathermapProviderType;
import com.survivingwithandroid.weather.lib.WeatherClient;
import com.survivingwithandroid.weather.lib.WeatherConfig;
import com.survivingwithandroid.weather.lib.exception.WeatherLibException;
import com.survivingwithandroid.weather.lib.model.CurrentWeather;
import com.survivingwithandroid.weather.lib.provider.forecastio.ForecastIOProviderType;
import com.survivingwithandroid.weather.lib.request.WeatherRequest;

import org.adw.library.widgets.discreteseekbar.DiscreteSeekBar;
import org.w3c.dom.Text;

import java.util.zip.Inflater;


public class MainActivity extends AppCompatActivity
        implements NavigationView.OnNavigationItemSelectedListener {
    private LocationManager locationManager;
    private LocationAdress locationAddress;
    private String provider;
    protected ScrollView mainLayout;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);

        // Save the main screen
        mainLayout = (ScrollView)this.findViewById(R.id.scrollView);
        // GPS location for weather condition @// TODO: 04/02/16 replace this code by the externals sensors.
        locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
        // User preferences conditions
        final Location Util = UtilLocation.getLastKnownLocation(isNetworkAvailable(), getBaseContext());

        final DiscreteSeekBar SeekBarTemp = (DiscreteSeekBar) findViewById(R.id.SeekbarTemp);
        final DiscreteSeekBar SeekBarLum = (DiscreteSeekBar) findViewById(R.id.SeekbarLum);

        final TextView TextTemp = (TextView) findViewById(R.id.Temperature);
        final TextView TextLuminosity = (TextView) findViewById(R.id.Luminosity);
        final TextView CityName = (TextView) findViewById(R.id.locationCity);
        final UtilLocation Loc = new UtilLocation();
        assert Util != null;

        final TextView CurrTemp = (TextView) findViewById(R.id.currentTemp);
        final TextView CurrUv = (TextView) findViewById(R.id.uvLevel);
        final TextView CurrCond = (TextView) findViewById(R.id.currCondtions);
        // GPS location for weather condition @// TODO: 04/02/16 replace this code by the externals sensors.
        CityName.setText(String.format("%s %s %s", String.valueOf("Location: " + "Lat." + Util.getLatitude()), "Lon. " + String.valueOf(Util.getLongitude()), Loc.getAddressString(Util.getLatitude(), Util.getLongitude())));
        // Sample WeatherLib client init

        WeatherClient.ClientBuilder builder = new WeatherClient.ClientBuilder();
        WeatherConfig config = new WeatherConfig();
        config.ApiKey = "4d59e4bf7f4cff2886da5340194d96f9";
        try {
            WeatherClient client = new WeatherClient.ClientBuilder().attach(this)
                    .provider(new ForecastIOProviderType())
                    .httpClient(WeatherDefaultClient.class)
                    .config(config)
                    .build();
            client.getCurrentCondition(new WeatherRequest(Util.getLongitude(), Util.getLatitude()), new WeatherClient.WeatherEventListener() {
                @Override
                public void onWeatherRetrieved(CurrentWeather currentWeather) {
                    float currentTemp = currentWeather.weather.temperature.getTemp();
                    Log.d("WL", "City ["+currentWeather.weather.location.getCity()+"] Current temp ["+currentTemp+"]");
                    // Print results
                    CurrTemp.setText(String.valueOf(currentTemp) + "°");
                    CurrUv.setText(String.valueOf(currentWeather.weather.currentCondition.getUV()) + "");
                    CurrCond.setText(currentWeather.weather.currentCondition.getDescr());
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

        // Init User Configuration
        TextTemp.setText(String.format("%s°", Integer.toString(SeekBarTemp.getProgress())));
        TextLuminosity.setText(String.format("%s%%", Integer.toString(SeekBarLum.getProgress())));
        TextTemp.setTextColor(Color.rgb(255, 145 - (SeekBarTemp.getProgress() - SeekBarTemp.getMin()) * 5, 34));
        setSupportActionBar(toolbar);
        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Envio Mods: (WIP)", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });
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

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.setDrawerListener(toggle);
        toggle.syncState();

        NavigationView navigationView = (NavigationView) findViewById(R.id.nav_view);
        navigationView.setNavigationItemSelectedListener(this);

    }


    @Override
    public void onBackPressed() {
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        if (drawer.isDrawerOpen(GravityCompat.START)) {
            mainLayout.setVisibility(DrawerLayout.VISIBLE);
        } else {
            super.onBackPressed();
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }


    @SuppressWarnings("StatementWithEmptyBody")
    @Override
    public boolean onNavigationItemSelected(MenuItem item) {
        // Handle navigation view item clicks here.
        int id = item.getItemId();

        if (id == R.id.nav_camera) {
            // Handle the camera action
        } else if (id == R.id.nav_slideshow) {
            Intent myIntent = new Intent(MainActivity.this, Planner.class);
            MainActivity.this.startActivity(myIntent);
        } else if (id == R.id.nav_manage) {

        } else if (id == R.id.nav_share) {

        } else if (id == R.id.nav_send) {

        }

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        drawer.closeDrawer(GravityCompat.START);
        return true;
    }


    public boolean isNetworkAvailable() {
        ConnectivityManager connectivityManager
                = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo activeNetworkInfo = connectivityManager.getActiveNetworkInfo();
        return activeNetworkInfo != null && activeNetworkInfo.isConnected();

    }
}
