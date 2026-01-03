import { 
	NativeModules,
	Platform,
  DeviceEventEmitter,
} from 'react-native';

const { TrackMyUserSDK: nativeBridge } = NativeModules;

export class TrackMyUserConfig  {
	androidSdkKey = '';
	iOSKey = '';
  hasDeferredDeeplinkCallback = false;
  ATTUserAuthorizationTimeoutInterval = 15;

  setAndroidKey(sdkKey: string) {
    this.androidSdkKey = sdkKey
  }  

  setiOSKey(sdkKey: string) {
    this.iOSKey = sdkKey
  }  

  setATTUserAuthorizationTimeout(timeoutInterval: number) {
    this.ATTUserAuthorizationTimeoutInterval = timeoutInterval
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

export class TrackMyUserEvent {
	eventCode: string = '';
  currency: string = '';
	revenue = 0;

  constructor(eventCode: string) {
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
      iOSKey: config.iOSKey,
      ATTUserAuthorizationTimeoutInterval: config.ATTUserAuthorizationTimeoutInterval
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