package com.trackmyuser.reactnativesdk;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import java.util.Collections;
import java.util.List;

public class TrackMyUserPackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(com.facebook.react.bridge.ReactApplicationContext reactContext) {
        return Collections.singletonList(new TrackMyUserSDK(reactContext));
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
