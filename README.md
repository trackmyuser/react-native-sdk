# @trackmyuser/react-native-sdk

TrackMyUser's Measurement and Attribution SDK

## 1. Add the SDK as a dependency 

```sh
npm install @trackmyuser/react-native-sdk
```

## 2. Initialise the SDK

```dart
import TrackMyUserSDK, { TrackMyUserConfig, TrackMyUserEvent } from '@trackmyuser/react-native-sdk';

const config = new TrackMyUserConfig();
config.setAndroidKey("Android_SDK_KEY");
config.setiOSKey("iOS_SDK_KEY");

// (iOS only): If you are using App Tracking Transparency (ATT),
// Set the amount of time in seconds that the SDK should wait for the user's ATT response.
// The default wait time is 15 seconds.
// (Set the value as 0 if you are not displaying the ATT prompt)
config.setATTUserAuthorizationTimeout(0);

TrackMyUserSDK.init(config);
```

## 3. Event Tracking

```dart
const event = new TrackMyUserEvent("EVENT_CODE");
event.setRevenue("USD", 10);
TrackMyUserSDK.trackEvent(event);
```

## 4. User Tracking

The user Id will be automatically be attached to all events fired in the session. The user Id can also be used in the S2S API to attribute installs to events. 

```dart
TrackMyUserSDK.setUserId("USER_ID")
```
