package com.example.ilyesabdlillah.envio00114;

import android.graphics.Color;
import android.os.Bundle;
import android.support.v4.app.FragmentActivity;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;

/**
 * Created by ilyes on 03/03/16.
 */

import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.ViewGroup;
import android.widget.TextView;

import com.alamkanak.weekview.WeekView;
import com.alamkanak.weekview.WeekViewEvent;
import com.github.sundeepk.compactcalendarview.CompactCalendarView;
import com.github.sundeepk.compactcalendarview.domain.Event;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.text.Format;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;

public class Planner extends Fragment {
    private View MainView;
    private TextView RoomNameP;
    private TextView RoomPlanning;
    private String dates = "";
    private String roomPlanner;
    private String roomName = "Aucune salle existante";

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        super.onCreate(savedInstanceState);
        ((AppCompatActivity) getActivity()).getSupportActionBar().show();
        MainView = inflater.inflate(R.layout.planner, container, false);
        RoomNameP = (TextView) MainView.findViewById(R.id.textRoomP);
        RoomPlanning = (TextView) MainView.findViewById(R.id.textViewEvent);
        return MainView;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        if (getActivity() != null) {
            roomPlanner = (String) getActivity().getIntent().getSerializableExtra("Events");
            roomName = getActivity().getIntent().getExtras().getString("RoomN");
        }
        // Inflate the layout for this fragment
        super.onCreate(savedInstanceState);
        Log.v("test", roomName);

    }

    @Override
    public void onStart() {
        List<String> roomNames = new ArrayList<>();
        final CompactCalendarView compactCalendarView = (CompactCalendarView) MainView.findViewById(R.id.compactcalendar_view);

        super.onStart();
        if (roomName != null)
            RoomNameP.setText(roomName);

        JSONArray planner = new JSONArray();
        try {
            planner = new JSONArray(roomPlanner);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        // Time tools
        Date now = new Date();
        List<Event> events = compactCalendarView.getEvents(now.getTime());
        Calendar startTime = Calendar.getInstance();
        Calendar endTime = (Calendar) startTime.clone();
        SimpleDateFormat formatter, FORMATTER;
        formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        FORMATTER = new SimpleDateFormat("dd-MM-yyyy HH:mm");

        dates = "";
        for (int i = 0; i < planner.length(); i++) {
            try {
                String dateStringb = planner.getJSONObject(i).getString("dateBegin");
                String dateStringe = planner.getJSONObject(i).getString("dateEnd");

                String oldDateb = dateStringb;
                Date dateb = formatter.parse(oldDateb.substring(0, 24));
                String oldDatee = dateStringe;
                Date datee = formatter.parse(oldDatee.substring(0, 24));
                startTime.setTime(dateb);
                endTime.setTime(datee);

                Event e = new Event(Color.GREEN, startTime.getTimeInMillis(), FORMATTER.format(dateb) + " au " + FORMATTER.format(datee) + "\n\t" + "  Nom du mode prévu : " + planner.getJSONObject(i).getString("name") + "\n\n");
                compactCalendarView.addEvent(e);

                dates = FORMATTER.format(now.getTime()) + ":\n\n";

                RoomPlanning.setText(dates);
            } catch (JSONException e) {
                e.printStackTrace();
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }

        dates = FORMATTER.format(now.getTime()) + ":\n\n";
        for (int i = 0; i < events.size(); i++) {
            dates += (i + 1) + ". " + events.get(i).getData();
        }
        if (events.size() == 0)
        {
            dates += "Aucun planification de prévue pour ce jour.";
        }

        Log.v("date", dates);
        compactCalendarView.setListener(new CompactCalendarView.CompactCalendarViewListener() {

            @Override
            public void onDayClick(Date dateClicked) {
                dates = "";
                List<Event> events = compactCalendarView.getEvents(dateClicked);
                SimpleDateFormat formatter, FORMATTER;
                formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
                String oldDate = dateClicked.toString();
                try {
                    Date date = formatter.parse(oldDate.substring(0, 24));
                } catch (ParseException e) {
                    e.printStackTrace();
                }
                FORMATTER = new SimpleDateFormat("dd-MM-yyyy");

                dates = FORMATTER.format(dateClicked) + ":\n\n";
                for (int i = 0; i < events.size(); i++) {
                    dates += (i + 1) + ". " + events.get(i).getData();
                }
                if (events.size() == 0)
                {
                    dates += "Aucun planification de prévue pour ce jour.";
                }
                RoomPlanning.setText(dates);
            }

            @Override
            public void onMonthScroll(Date firstDayOfNewMonth) {
                Log.d("Ne", "Month was scrolled to: " + firstDayOfNewMonth);
            }
        });

        if (roomPlanner != null)
            RoomPlanning.setText(dates);
    }

    private String getEventTitle(String title) {
        return title;
    }
}