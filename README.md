# web-push-notification

A custom implementation of Web Push Notifications using the Push API, Notification API, and Web Push Protocol. This project focuses on building a self-hosted push notification service without relying on Firebase or third-party providers.

## Packages Used

- [web-push](https://www.npmjs.com/package/web-push)

## Generate VAPID Keys

- Run the following command to generate VAPID keys

```bash
npx web-push generate-vapid-keys
```
- Copy the generated keys and update the public and private keys.
- **Public Key**: is used in the frontend to subscribe to push notifications.
- **Private Key**: is used in the backend to send push notifications.
- Because when we are sending messages to a user later,we will sign the package with our private key.
- The **push server** will store our public key to add to,


## Steps For Notification

1. **Subscribe to Push Notifications**: When the user visits the website, they will be prompted to subscribe to push notifications. The frontend will generate a subscription object and send it to the backend. 
  - `requestPermission` method is used to request permission from the user to show notifications.
1. **Register Service Worker**: The service worker will be registered in the browser to listen for push events.

1. **Subscribe Notification**: The frontend will subscribe to push notifications and send the subscription object to the backend.

1. **Send Push Notification**: The backend will send a push notification to the frontend using the subscription object.