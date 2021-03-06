package com.example.bbdcommunicator; //Edit this to match the name of your application

import com.google.android.gcm.*;
import org.json.JSONException;
import org.json.JSONObject;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import com.plugin.GCM.GCMPlugin;
import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;


public class GCMIntentService extends GCMBaseIntentService {

  public static final String ME="GCMReceiver";

  public GCMIntentService() {	  
    super("GCMIntentService");    
  }
  private static final String TAG = "GCMIntentService";

  @Override
  public void onRegistered(Context context, String regId) {	
    Log.v(ME + ":onRegistered", "Registration ID arrived!");
    Log.v(ME + ":onRegistered", regId);

    JSONObject json;

    try
    {
      json = new JSONObject().put("event", "registered");
      json.put("regid", regId);

      Log.v(ME + ":onRegisterd", json.toString());

      // Send this JSON data to the JavaScript application above EVENT should be set to the msg type
      // In this case this is the registration ID
      GCMPlugin.sendJavascript( json );

    }
    catch( JSONException e)
    {
      // No message to the user is sent, JSON failed
      Log.e(ME + ":onRegisterd", "JSON exception");
    }
  }

  @Override
  public void onUnregistered(Context context, String regId) {
    Log.d(TAG, "onUnregistered - regId: " + regId);
  }

  
  
  
  /**
   * This is were the problem is
   */
  @Override
  protected void onMessage(Context context, Intent intent) {		  
    Log.d(TAG, "onMessage - context: " + context);

    // Extract the payload from the message
    Bundle extras = intent.getExtras();    
    if (extras != null) {    
      try
      {
        Log.v(ME + ":onMessage extras ", extras.getString("message"));

        JSONObject json;
        json = new JSONObject().put("event", "message");
        

        // My application on my host server sends back to "EXTRAS" variables message and msgcnt
        // Depending on how you build your server app you can specify what variables you want to send

        json.put("message", extras.getString("message"));
        json.put("subject", extras.getString("subject"));
        json.put("image", extras.getString("image"));
        json.put("rsvp", extras.getString("rsvp_type"));
        json.put("type", extras.getString("notification_type"));
        json.put("date", extras.getString("date"));        
        
        //I commented this out becuase I don't think we need this
        //json.put("msgcnt", extras.getString("msgcnt"));
        
        String message = extras.getString("message");
        String subject = extras.getString("subject");
        Notification notif = new Notification(R.drawable.ic_launcher, message, System.currentTimeMillis());
        
        notif.flags = Notification.FLAG_AUTO_CANCEL;
        notif.defaults |= Notification.DEFAULT_SOUND;
        notif.defaults |= Notification.DEFAULT_VIBRATE; 
        
            
        Intent notificationIntent = new Intent(context, MainActivity.class);
        notificationIntent.putExtra ("url","file:///android_asset/www/index.html");
        notificationIntent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
        PendingIntent contentIntent = PendingIntent.getActivity(context, 0, notificationIntent, 0);       
        notif.setLatestEventInfo(context, subject, message, contentIntent);
        String ns = Context.NOTIFICATION_SERVICE;
        NotificationManager mNotificationManager = (NotificationManager) context.getSystemService(ns);
        mNotificationManager.notify(1, notif);            
        
        while (GCMPlugin.gwebView == null || !GCMPlugin.gwebView.isEnabled()) {
            // Wait until webView is enabled
        }
        GCMPlugin.sendJavascript(json);
        
        Log.v(ME + ":onMessage ", json.toString());                
        // Send the MESSAGE to the Javascript application 
      }
      catch( JSONException e)
      {
        Log.e(ME + ":onMessage", "JSON exception");
      }        	
    }
  }

  @Override
  public void onError(Context context, String errorId) {
    Log.e(TAG, "onError - errorId: " + errorId);
  }

}
