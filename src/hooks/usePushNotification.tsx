"use client";

import { WEB_PUSH_NOTIFICATION_API } from "@/lib/constants/apiEndpoint";
import { arrayBufferToBase64 } from "@/lib/utils/helper";
import { toast } from "sonner";

/**
 * usePushNotification  : Hook to handle push notification
 */

type NotificationPermission = "granted" | "denied" | "default";

const usePushNotification = () => {
  /**
   * requestPermission  : Request permission for push notification
   * @returns             : NotificationPermission type (granted | denied | default)
   */
  const requestPermission = async (): Promise<NotificationPermission> => {
    try {
      // also check with = "Notification" in ServiceWorkerRegistration.prototype
      // also check with = "Notification" in window
      // also check with = "Notification" in globalThis
      // also check with  = "PushManager" in window

      if ("Notification" in window) {
        const permission = await Notification.requestPermission();
        return permission;
      } else {
        throw new Error("Notification not supported in this browser");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(
          "An error occurred while requesting permission for push notification"
        );
      }
      return "default";
    }
  };

  //  if pushManager in  window then subscribe to push notification
  const subscribe = async () => {
    const status = await requestPermission();
    if (status !== "granted") {
      toast.error(
        "Permission denied for push notification. Please allow the permission to subscribe to push notification"
      );
      return;
    }

    const subscribeOptions: PushSubscriptionOptionsInit = {
      userVisibleOnly: true,
      applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    };

    if ("serviceWorker" in navigator && "PushManager" in window) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.pushManager
          .subscribe(subscribeOptions)
          .then((subscription) => {
            console.log("Subscribed to push notification", subscription);
            // Send the subscription to the server
            updatePushStatus(subscription);

            toast(
              <>
                <h1 className="text-md font-bold">
                  Subscribed to push notification
                </h1>
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 overflow-x-scroll">
                  <code className="text-white">
                    {JSON.stringify(subscription, null, 3)}
                  </code>
                </pre>
              </>
            );
          })
          .catch((error) => {
            console.error(
              "An error occurred while subscribing to push notification",
              error
            );
          });
      });
    } else {
      console.error(
        "Service worker or Push manager not supported in this browser"
      );
    }
  };

  function updatePushStatus(subscription: PushSubscription) {
    if (subscription) {
      var endpoint = subscription.endpoint;
      var key = "";
      var auth = "";
      if ("getKey" in subscription) {
        // Key to encode payload data later
        key = arrayBufferToBase64(subscription.getKey("p256dh") as ArrayBuffer);
        auth = arrayBufferToBase64(subscription.getKey("auth") as ArrayBuffer);
      } else {
        // It's a very old browser, it doesn't support payload
        // Are we managing this situation?
      }

      console.log(subscription);
      fetch(WEB_PUSH_NOTIFICATION_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          endpoint: endpoint,
          keys: {
            auth: auth,
            p256dh: key,
          },
        }),
      })
        .then(function () {
          console.log("The push subscription was saved on the server");
        })
        .catch(function () {
          console.log("The push subscription wasn't saved on the server");
        });
    } else {
      console.log("Subscription data is null");
    }
  }

  return {
    requestPermission,
    subscribe,
  };
};

export default usePushNotification;
