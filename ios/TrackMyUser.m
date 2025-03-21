//
//  TrackMyUser.m
//  ReactNativeSDK
//
//  Created by Vinoth on 21/03/25.
//

//#import <Foundation/Foundation.h>

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(TrackMyUserSDK, NSObject)
RCT_EXTERN_METHOD(initializeSDK:(NSDictionary *)dict)
RCT_EXTERN_METHOD(trackEvent:(NSDictionary *)dict)
RCT_EXTERN_METHOD(setUserId:(NSString *)userId)
@end
