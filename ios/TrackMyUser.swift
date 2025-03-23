//
//  TrackMyUser.swift
//  ReactNativeSDK
//
//  Created by Vinoth on 21/03/25.
//

import Foundation
import React
import TrackMyUser

@objc(TrackMyUserSDK)
class TrackMyUserModule: NSObject, RCTBridgeModule {
  
  static func moduleName() -> String {
      return "TrackMyUserSDK"
    }
  
  @objc func initializeSDK(_ dict: NSDictionary) {
      let appToken = dict["iOSKey"] as! String;   
      let timeoutInterval = (dict["ATTUserAuthorizationTimeoutInterval"] as? Int) ?? 0
      //let deeplinking = dict["hasDeferredDeeplinkCallback"] as! Bool?
      let config = TrackMyUserConfig(appToken: appToken)
      config.setATTUserAuthorizationTimeout(timeoutInterval: timeoutInterval)
//      if (deeplinking != nil) {
//        config.setDeeplinkListerner(listener: self)
//      }
      TrackMyUserSDK.initialize(config: config)
  }
  
  @objc func trackEvent(_ dict: NSDictionary) {
      let eventCode: String = dict["eventCode"] as! String
      let currency: String = dict["currency"] as? String ?? ""
      let revenue: Float64 = (dict["revenue"] as? Float64 ?? 0.0)
      let event = TrackMyUserEvent(eventCode: eventCode)
      event.setRevenue(value: revenue, currency: currency)
      TrackMyUserSDK.trackEvent(event: event)
  }
  
  @objc func setUserId(_ userId: String) {
    TrackMyUserSDK.setUserId(userId: userId)
  }

//  @objc
//  static func requiresMainQueueSetup() -> Bool {
//      return true
//  }
}
