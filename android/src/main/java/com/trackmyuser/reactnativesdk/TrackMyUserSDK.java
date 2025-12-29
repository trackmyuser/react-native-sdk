package com.trackmyuser.reactnativesdk;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.trackmyuser.sdk.Deeplink;
import com.trackmyuser.sdk.DeeplinkListener;
import com.trackmyuser.sdk.TrackMyUser;
import com.trackmyuser.sdk.TrackMyUserConfig;
import com.trackmyuser.sdk.TrackMyUserEvent;

import java.util.Map;

public class TrackMyUserSDK extends ReactContextBaseJavaModule {

    public TrackMyUserSDK(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "TrackMyUserSDK";
    }

    @ReactMethod
    public void initializeSDK(ReadableMap initializeMap) {
        String sdkKey = initializeMap.getString("androidSdkKey");
        TrackMyUserConfig config = new TrackMyUserConfig(sdkKey);

        if (initializeMap.hasKey("hasDeferredDeeplinkCallback")) {
            config.setDeeplinkListener(new DeeplinkListener() {
                @Override
                public void onDeepLinkResolve(Deeplink deeplink) {

                    WritableMap writableMap = Arguments.createMap();
                    for (Map.Entry<String, String> entry : deeplink.getParams().entrySet()) {
                        writableMap.putString(entry.getKey(), entry.getValue());
                    }

                    getReactApplicationContext()
                            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                            .emit("trackmyuser_deeplink_resolve", writableMap);
                }
            });
        }

        TrackMyUser.init(getReactApplicationContext(), config);
    }

    @ReactMethod
    public void trackEvent(ReadableMap eventMap) {
        TrackMyUserEvent event = new TrackMyUserEvent(eventMap.getString("eventCode"));
        if(eventMap.hasKey("currency") && eventMap.hasKey("revenue")) {
            event.setRevenue(eventMap.getString("currency"),  eventMap.getDouble("revenue"));
        }
        TrackMyUser.trackEvent(getReactApplicationContext(), event);
    }

    @ReactMethod
    public void setUserId(String userId) {
        TrackMyUser.setUserId(getReactApplicationContext(), userId);
    }
}
