package com.example.ilyesabdlillah.envio00114;

import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.location.Location;
import android.location.LocationManager;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;
import android.support.design.widget.NavigationView;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBar;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.ScrollView;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.survivingwithandroid.weather.lib.client.okhttp.WeatherDefaultClient;
import com.survivingwithandroid.weather.lib.exception.WeatherProviderInstantiationException;
import com.survivingwithandroid.weather.lib.WeatherClient;
import com.survivingwithandroid.weather.lib.WeatherConfig;
import com.survivingwithandroid.weather.lib.exception.WeatherLibException;
import com.survivingwithandroid.weather.lib.model.CurrentWeather;
import com.survivingwithandroid.weather.lib.provider.forecastio.ForecastIOProviderType;
import com.survivingwithandroid.weather.lib.request.WeatherRequest;

import org.adw.library.widgets.discreteseekbar.DiscreteSeekBar;
import org.json.JSONException;
import org.json.JSONObject;
import org.w3c.dom.Text;

import java.util.HashMap;
import java.util.Map;

public class MainActivity extends AppCompatActivity
{
    private LocationAdress locationAddress;
    private LocationManager locationManager;
    private String provider;
    private Toolbar toolbar;
    private DrawerLayout mDrawer;
    protected ScrollView mainLayout;
    private RequestQueue requestQueue;
    private static String URL = "http://192.168.1.16:1337/api";
    private StringRequest request;
    private LoginActivity login = new LoginActivity();
    //private HashMap<String, Object> userInfo = (HashMap<String, Object>)getIntent().getSerializableExtra("UserInfo");

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Set a Toolbar to replace the ActionBar.
        toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        Log.v("UserInfo Json", getIntent().getSerializableExtra("UserInfo").toString());
        // Call the main fragment
        firstFragmentOnStart();

        // Find our drawer view
        mDrawer = (DrawerLayout) findViewById(R.id.drawer_layout);

        // O/I Toolbar
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, mDrawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        mDrawer.setDrawerListener(toggle);
        toggle.syncState();
        // Setup drawer view
        NavigationView navigationView = (NavigationView) findViewById(R.id.nav_view);
        setupDrawerContent(navigationView);
        // Locating Function & Current condition
        //currentCondition(CityName, Loc, Util);
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
        return super.onCreateOptionsMenu(menu);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // The action bar home/up action should open or close the drawer.
        switch (item.getItemId()) {
            case android.R.id.home:
                mDrawer.openDrawer(GravityCompat.START);
                return true;
        }

        return super.onOptionsItemSelected(item);
    }


    @SuppressWarnings("StatementWithEmptyBody")

    private void setupDrawerContent(NavigationView navigationView) {
        navigationView.setNavigationItemSelectedListener(
                new NavigationView.OnNavigationItemSelectedListener() {
                    @Override
                    public boolean onNavigationItemSelected(MenuItem menuItem) {
                        selectDrawerItem(menuItem);
                        return true;
                    }
                });
    }

    public void disconnectUser(MenuItem item)
    {
        requestQueue = Volley.newRequestQueue(this);
        request = new StringRequest(Request.Method.POST, URL + "/logout?api_key=f8c5e1xx5f48e56s4x8", new Response.Listener<String>() {
            @Override
            public void onResponse(String response) {
                try {
                    JSONObject jsonObject = new JSONObject(response);
                    if (jsonObject.getString("error").equals("null")){
                        Toast.makeText(getApplicationContext(), "Déconnexion réussie.", Toast.LENGTH_SHORT).show();
                        startActivity(new Intent(getApplicationContext(), LoginActivity.class));
                        //guidUser = jsonObject.getString("guid");
                    }
                    else {
                        Toast.makeText(getApplicationContext(), "Vous déjà déconnecté.", Toast.LENGTH_SHORT).show();
                        startActivity(new Intent(getApplicationContext(), LoginActivity.class));
                        Log.v("User Disconnected GUID", getIntent().getExtras().getString("GUID_USER"));
                    }
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Toast.makeText(getApplicationContext(), "Echec de la déconnexion, vérifiez la connectivité de votre appareil. ", Toast.LENGTH_LONG).show();
                startActivity(new Intent(getApplicationContext(), LoginActivity.class));
            }
        }){
            @Override
            protected Map<String, String> getParams() throws AuthFailureError {
                HashMap<String, String> hashMap = new HashMap<String, String>();
                hashMap.put("guid", getIntent().getExtras().getString("GUID_USER"));
                return hashMap;
            }
        };
        requestQueue.add(request);
    }


    public void selectDrawerItem(MenuItem menuItem) {
        // Create a new fragment and specify the planet to show based on
        // position
        Fragment fragment = null;

        Class fragmentClass = null;
        switch(menuItem.getItemId()) {
            case R.id.nav_slideshow:
                fragmentClass = Planner.class;
                Log.v("Envio Fragment", "Passed");
                break;
            case R.id.nav_camera:
                fragmentClass = EnvioStart.class;
                Log.v("Envio Fragment", "Default");
                break;
            case R.id.credits:
                fragmentClass = Credit.class;
                break;
            case R.id.disconnect: // Todo: Replace this by using the three dot button on action bar
                requestQueue = Volley.newRequestQueue(this);
                Toast.makeText(getApplicationContext(), "Deconnexion réussie.", Toast.LENGTH_SHORT).show();
                startActivity(new Intent(getApplicationContext(), LoginActivity.class));
        }
        try {
            fragment = (Fragment) fragmentClass.newInstance();
        } catch (Exception e) {
            e.printStackTrace();
        }

        // Insert the fragment by replacing any existing fragment
        FragmentManager fragmentManager = getSupportFragmentManager();
        fragmentManager.beginTransaction().replace(R.id.flContent, fragment).commit();
        // Highlight the selected item, update the title, and close the drawer
        // Highlight the selected item has been done by NavigationView
        // menuItem.setChecked(true);
        setTitle(menuItem.getTitle());
        mDrawer.closeDrawers();
    }

    // Shows the first screen when the app is opened
    public void firstFragmentOnStart()
    {
        Fragment fragment = null;
        Class fragmentClass = null;

        // Here you choose the first fragment you want to display;
        fragmentClass = EnvioStart.class;
        try {
            fragment = (Fragment) fragmentClass.newInstance();
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
        FragmentManager fragmentManager = getSupportFragmentManager();
        fragmentManager.beginTransaction().replace(R.id.flContent, fragment).commit();
        // Highlight the selected item, update the title, and close the drawer
        // Highlight the selected item has been done by NavigationView
        // menuItem.setChecked(true);
        setTitle("Salles");
    }
}
