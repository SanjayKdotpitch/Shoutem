#import <RCTAppDelegate.h>
#import <UIKit/UIKit.h>
//NativeModuleInjectionMark-appDelegateHeader-import
#import <UserNotifications/UNUserNotificationCenter.h>

@interface AppDelegate : RCTAppDelegate <UNUserNotificationCenterDelegate>

@end
