#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
//NativeModuleInjectionMark-appDelegate-import

#import <UserNotifications/UserNotifications.h>
#import <RNCPushNotificationIOS.h>

#import <Firebase.h>
#import <CodePush/CodePush.h>

#import <React/RCTLinkingManager.h>
#import <FBSDKCoreKit/FBSDKCoreKit.h>

#import "RNSplashScreen.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"ShoutemApp";

  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  //NativeModuleInjectionMark-appDelegate-applicationDidFinishLaunchingWithOptions
  
UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  center.delegate = self;

  
if ([FIRApp defaultApp] == nil) {
  [FIRApp configure];
}

  [FBSDKApplicationDelegate.sharedInstance initializeSDK];

  bool didFinish = [super application:application didFinishLaunchingWithOptions:launchOptions];
  //NativeModuleInjectionMark-appDelegate-applicationDidFinishLaunchingWithOptions-end
  [[FBSDKApplicationDelegate sharedInstance] application:application didFinishLaunchingWithOptions:launchOptions];
  [RNSplashScreen show];

  return didFinish;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [CodePush bundleURL];
#endif
}

//NativeModuleInjectionMark-appDelegate-body

// Required for the register event.
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
 [RNCPushNotificationIOS didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}

// Required for the notification event. You must call the completion handler after handling the remote notification.
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
  [RNCPushNotificationIOS didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}

// Required for the registrationError event.
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
 [RNCPushNotificationIOS didFailToRegisterForRemoteNotificationsWithError:error];
}

// Required for localNotification event
- (void)userNotificationCenter:(UNUserNotificationCenter *)center
didReceiveNotificationResponse:(UNNotificationResponse *)response
         withCompletionHandler:(void (^)(void))completionHandler
{
  [RNCPushNotificationIOS didReceiveNotificationResponse:response];
}

//Called when a notification is delivered to a foreground app.
-(void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler
{
  completionHandler(UNNotificationPresentationOptionSound | UNNotificationPresentationOptionAlert | UNNotificationPresentationOptionBadge);
}


- (BOOL)application:(UIApplication *)app
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  if ([[FBSDKApplicationDelegate sharedInstance] application:app openURL:url options:options]) {
    return YES;
  }

  if ([RCTLinkingManager application:app openURL:url options:options]) {
    return YES;
  }

  return NO;
}


@end
