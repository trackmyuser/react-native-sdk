import { 
	NativeModules,
	Platform,
  DeviceEventEmitter,
} from 'react-native';

const { TrackMyUserSDK: nativeBridge } = NativeModules;

class TrackMyUserConfig  {
	androidSdkKey = '';
	iOSKey = '';
  hasDeferredDeeplinkCallback = false;

  setAndroidKey(sdkKey: string) {
    this.androidSdkKey = sdkKey
  }  

  setiOSKey(sdkKey: string) {
    this.iOSKey = sdkKey
  }  

  setOnDeeplinkResolveListener(callbackListener: any) {
    this.hasDeferredDeeplinkCallback = true
    if (Platform.OS === "android" || Platform.OS === "ios") {
      const listener  = DeviceEventEmitter.addListener('trackmyuser_deeplink_resolve', (data) => {
        callbackListener(data)
        listener.remove()
      });
    }
  };
}

class TrackMyUserEvent {
	eventCode: string = '';
  currency: string = '';
	revenue = 0;

  TrackMyUserEvent(eventCode: string) {
    this.eventCode = eventCode
  }

  setRevenue(currency: string, revenue: number) {
    this.currency = currency;
    this.revenue = revenue;
  };
}

export const TrackMyUserSDK = {
  init: (config: TrackMyUserConfig)=> {
    nativeBridge.initializeSDK({
      androidSdkKey: config.androidSdkKey,
      iOSKey: config.iOSKey
    }); 
  },
  trackEvent: (event: TrackMyUserEvent)=>{
    nativeBridge.trackEvent({
      eventCode: event.eventCode,
      currency: event.currency,
      revenue: event.revenue
    });
  },
  setUserId: (userId: string)=>{
    nativeBridge.setUserId(userId)
  }
};

export default TrackMyUserSDK;