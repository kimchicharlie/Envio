package com.example.ilyesabdlillah.envio00114;

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.location.Address;
import android.location.Geocoder;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.support.v4.app.ActivityCompat;
import android.util.Log;

import com.example.ilyesabdlillah.envio00114.MainActivity;

import java.util.List;
import java.util.Locale;

public class UtilLocation extends MainActivity {
    protected static LocationManager locationManager;
    protected static Location location;

    private static final long MIN_DISTANCE_FOR_UPDATE = 10;
    private static final long MIN_TIME_FOR_UPDATE = 1000 * 60 * 2;

    public static Location getLastKnownLocation(boolean enabledProvidersOnly, Context context) {
        LocationManager manager = (LocationManager) context.getSystemService(Context.LOCATION_SERVICE);
        Location utilLocation = null;
        List<String> providers = manager.getProviders(enabledProvidersOnly);
        for (String provider : providers) {

            utilLocation = manager.getLastKnownLocation(provider);
            if (utilLocation != null) return utilLocation;
        }
        return null;
    }
    public String getAddressString(double latitude, double longitude) {
        String strAddress = "";
        Geocoder geocoder = new Geocoder(this, Locale.getDefault());
        try {
            List<Address> addresses = geocoder.getFromLocation(latitude,
                    longitude, 1);
            if (addresses != null) {
                Address returnAddress = addresses.get(0);
                StringBuilder strReturnAddress = new StringBuilder("");

                for (int i = 0; i < returnAddress.getMaxAddressLineIndex(); i++) {
                    strReturnAddress
                            .append(returnAddress.getAddressLine(i)).append(
                            "\n");
                }
                strAddress = strReturnAddress.toString();
                Log.w("address",
                        "" + strReturnAddress.toString());
            } else {
                Log.w("address", "No Address found!");
            }
        } catch (Exception e) {
            e.printStackTrace();
            Log.w("address", "Can't get Address!");
        }
        return strAddress;
    }
}