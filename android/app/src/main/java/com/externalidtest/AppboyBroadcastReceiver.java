package com.externalidtest;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import com.RNpublic.neuraintegration.NeuraIntegrationSingleton;
import com.appboy.Constants;
import com.appboy.push.AppboyNotificationUtils;
import com.appboy.support.AppboyLogger;
import com.neura.standalonesdk.engagement.EngagementFeatureAction;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.Set;
import java.util.concurrent.TimeUnit;

public class AppboyBroadcastReceiver extends BroadcastReceiver {
    private static final String TAG = AppboyLogger.getAppboyLogTag(AppboyBroadcastReceiver.class);

    @Override
    public void onReceive(Context context, Intent intent) {
        String packageName = context.getPackageName();
        String pushReceivedAction = packageName + AppboyNotificationUtils.APPBOY_NOTIFICATION_RECEIVED_SUFFIX;
        String notificationOpenedAction = packageName + AppboyNotificationUtils.APPBOY_NOTIFICATION_OPENED_SUFFIX;
        String notificationDeletedAction = packageName + AppboyNotificationUtils.APPBOY_NOTIFICATION_DELETED_SUFFIX;

        String action = intent.getAction();
        Log.d(TAG, String.format("Received intent with action %s", action));

        logNotificationDuration(intent);

        Bundle extras = intent.getBundleExtra(Constants.APPBOY_PUSH_EXTRAS_KEY);
        Integer notificationID = intent.getIntExtra(Constants.APPBOY_PUSH_NOTIFICATION_ID, 0);

        JSONObject json = new JSONObject();
        Set<String> keys = extras.keySet();
        for (String key : keys) {
            try {
                // json.put(key, bundle.get(key)); see edit below
                json.put(key, JSONObject.wrap(extras.get(key)));
            } catch(JSONException e) {
                //Handle exception here
            }
        }

        if (pushReceivedAction.equals(action)) {

            if (NeuraIntegrationSingleton.getInstance().getNeuraApiClient().isLoggedIn()) {
                NeuraIntegrationSingleton.getInstance().getNeuraEngagements().tagEngagementAttempt(context, "push", notificationID.toString(), json.toString());
            }

        } else if (notificationOpenedAction.equals(action)) {
            AppboyNotificationUtils.routeUserWithNotificationOpenedIntent(context, intent);

            if (NeuraIntegrationSingleton.getInstance().getNeuraApiClient().isLoggedIn()) {
                NeuraIntegrationSingleton.getInstance().getNeuraEngagements().tagEngagementFeature(context, "push", notificationID.toString(), EngagementFeatureAction.SUCCESS, json.toString());
            }

        } else if (notificationDeletedAction.equals(action)) {
            if (NeuraIntegrationSingleton.getInstance().getNeuraApiClient().isLoggedIn()) {
                NeuraIntegrationSingleton.getInstance().getNeuraEngagements().tagEngagementFeature(context, "push", notificationID.toString(), EngagementFeatureAction.CLOSE, json.toString());
            }

        } else {
            Log.d(TAG, String.format("Ignoring intent with unsupported action %s", action));
        }
    }

    /**
     * Logs the length of time elapsed since the notification's creation time.
     */
    private void logNotificationDuration(Intent intent) {
        // Log the duration of the push notification
        Bundle extras = intent.getExtras();
        if (extras != null && extras.containsKey(Constants.APPBOY_PUSH_RECEIVED_TIMESTAMP_MILLIS)) {
            long createdAt = extras.getLong(Constants.APPBOY_PUSH_RECEIVED_TIMESTAMP_MILLIS);
            long durationMillis = System.currentTimeMillis() - createdAt;
            long durationSeconds = TimeUnit.MILLISECONDS.toSeconds(durationMillis);
            Log.i(TAG, "Notification active for " + durationSeconds + " seconds.");
        }
    }
}