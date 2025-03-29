import { NextResponse } from "next/server";
import webpush from "web-push";
import { db } from "@/lib/db";

// GCM is deprecated but you can still have some users out there using it
// Get these keys creating a project in Google Firebase
// var GCMKey = "AIzaSyBuoU-dxhfGuB7geAi4TgqIy4viLxwxJLE";
// webpush.setGCMAPIKey(GCMKey);

// Get these keys using the web-push CLI only once
// run `npx web-push generate-vapid-keys`
var publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!;
var privateKey = process.env.VAPID_PRIVATE_KEY!;

export async function GET() {
  try {
    webpush.setVapidDetails(
      "mailto:youremail@yourdomain.org",
      publicKey,
      privateKey
    );

    var message =
      process.argv[2] || "This is a test push message from the server";

    interface User {
      endpoint: string;
      keys: {
        auth: string;
        p256dh: string;
      };
    }

    interface PushSubscription {
      endpoint: string;
      keys: {
        auth: string;
        p256dh: string;
      };
    }

    interface NotificationPayload {
      text: string;
      customData: string[];
    }

    db.find({}, function (err: Error | null, users: User[]) {
      users.forEach(function (user: User) {
        // Check if the user is subscribed
        const pushSubscription: PushSubscription = {
          endpoint: user.endpoint,
          keys: {
            auth: user.keys.auth,
            p256dh: user.keys.p256dh,
          },
        };
        // Check if the user is subscribed
        const object: NotificationPayload = {
          text: message,
          customData: ["some", "test", "data"],
        };
        // We can send plain text or an object encoded as JSON string
        webpush
          .sendNotification(pushSubscription, JSON.stringify(object))
          .then(function () {
            console.log("Message sent to " + user.endpoint.substring(140));
          })
          .catch(function (error: any) {
            if (error.statusCode >= 400) {
              // delete the user from the DB?
            }
            // console.log(error);
          });
      });
    });

    return NextResponse.json(
      { success: true, message: "Push notification sent" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
