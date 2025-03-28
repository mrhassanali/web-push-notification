"use client";

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

  return {
    requestPermission,
  };
};

export default usePushNotification;
