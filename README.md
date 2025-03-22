# @trackmyuser/react-native-sdk

TrackMyUser's Measurement and Attribution SDK

## Installation

```sh
npm install @trackmyuser/react-native-sdk
```

## Usage


```js
import TrackMyUserSDK, { TrackMyUserConfig, TrackMyUserEvent } from '@trackmyuser/react-native-sdk';

const config = new TrackMyUserConfig();
config.setAndroidKey("Android_SDK_KEY");
config.setiOSKey("iOS_SDK_KEY");

TrackMyUserSDK.init(config);

const event = new TrackMyUserEvent("EVENT_CODE");
TrackMyUserSDK.trackEvent(event);
```
