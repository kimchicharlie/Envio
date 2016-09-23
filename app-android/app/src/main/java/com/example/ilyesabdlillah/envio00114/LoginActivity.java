package com.example.ilyesabdlillah.envio00114;

import android.app.ActionBar;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.FragmentActivity;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;

/**
 * Created by ilyes on 03/03/16.
 */

import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Objects;

public class LoginActivity extends  AppCompatActivity {
    private EditText email, password;
    private Button sign_in;
    private RequestQueue requestQueue;
    private static final String URL = "http://192.168.1.16:1337/api/login";
    private StringRequest request;
    private JSONObject jsonEnvioUser;
    private JsonUtilities jsonUtilities = new JsonUtilities();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        super.onCreate(savedInstanceState);
        setContentView(R.layout.login_view);

        // Hide the status bar
        View decorView = getWindow().getDecorView();
        int uiOptions = View.SYSTEM_UI_FLAG_FULLSCREEN;
        decorView.setSystemUiVisibility(uiOptions);

        email = (EditText) findViewById(R.id.email);
        password = (EditText) findViewById(R.id.password);
        sign_in = (Button) findViewById(R.id.email_sign_in_button);
        requestQueue = Volley.newRequestQueue(this);
        sign_in.setOnClickListener(new View.OnClickListener() {
           @Override
            public void onClick(final View view) {
               request = new StringRequest(Request.Method.POST, URL, new Response.Listener<String>() {
                   @Override
                   public void onResponse(String response) {
                       try {
                           JSONObject jsonObject = new JSONObject(response);

                           if (jsonObject.getString("error").equals("null")){

                               // User Informations saved on this map
                               HashMap<String, Object> UserInfo  = new HashMap<String, Object>();
                               UserInfo = jsonUtilities.getMap(jsonObject, "user");
                               Log.v("UserInfo", UserInfo.get("organisation").toString());
                               Toast.makeText(getApplicationContext(), "Connexion réussie. Bonjour " + '\n' + UserInfo.get("firstname").toString() + " " + UserInfo.get("lastname").toString(), Toast.LENGTH_SHORT).show();
                               Intent intent = new Intent(getApplicationContext(), MainActivity.class);
                               intent.putExtra("GUID_USER", jsonObject.getString("guid"));
                               intent.putExtra("UserInfo", UserInfo);
                               startActivity(intent);
                           }
                           else {
                               Toast.makeText(getApplicationContext(), "Echec de l'authentification, vérifiez vos identifiants Envio.", Toast.LENGTH_SHORT).show();
                           }
                       } catch (JSONException e) {
                           e.printStackTrace();
                       }
                   }
               }, new Response.ErrorListener() {
                   @Override
                   public void onErrorResponse(VolleyError error) {
                       Toast.makeText(getApplicationContext(), "Echec de la connexion, vérifiez la connectivité de votre appareil. ", Toast.LENGTH_LONG).show();
                   }
               }){
                   @Override
                   protected Map<String, String> getParams() throws AuthFailureError {
                       HashMap<String, String> hashMap = new HashMap<String, String>();
                       hashMap.put("email", email.getText().toString());
                       hashMap.put("password", password.getText().toString());
                       return hashMap;
                   }
               };
               requestQueue.add(request);
            }
        });
    }

    // Close the app on back key when you are in the Envio' login screen
    @Override
    public void onBackPressed() {
        Intent intent = new Intent(Intent.ACTION_MAIN);
        intent.addCategory(Intent.CATEGORY_HOME);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        startActivity(intent);
    }
}