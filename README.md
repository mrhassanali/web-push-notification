<div align="center">

# 🔔 Web Push Notifications

A self-hosted push notification service built with modern web standards

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Made with Next.js](https://img.shields.io/badge/Made%20with-Next.js-000000?logo=Next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

<p align="center">
  <img src="docs/notification-demo.gif" alt="Demo" width="600px" />
</p>

</div>

## ✨ Features

- 🚀 Built with Next.js and TypeScript
- 🔒 No third-party dependencies (Firebase-free)
- 💪 Uses Web Push Protocol
- 🌐 Cross-browser support
- 🎯 Targeted notifications
- ⚡ Real-time delivery

## 🚀 Quick Start

1. Clone the repository:
```bash
git clone https://github.com/mrhassanali/web-push-notification.git
cd web-push-notification
```

2. Install dependencies:
```bash
npm install
```

3. Generate VAPID keys:
```bash
npx web-push generate-vapid-keys
```

4. Create `.env.local` file:
```env
NEXT_PUBLIC_VAPID_PUBLIC_KEY=your_public_key_here
VAPID_PRIVATE_KEY=your_private_key_here
```

5. Start the development server:
```bash
npm run dev
```

## 🛠️ Technical Implementation

### Key Components

1. **Permission Request** 
   - Uses the Notifications API
   - Handles user consent management
   - Provides clear UI feedback

2. **Service Worker** 
   - Manages background push events
   - Handles notification display
   - Maintains subscription state

3. **Push Subscription**
   - Generates subscription objects
   - Manages VAPID authentication
   - Handles subscription updates

4. **Backend Integration**
   - Stores subscriptions securely
   - Manages notification dispatch
   - Handles delivery status

## 📝 API Documentation

### Subscribe to Notifications

```typescript
const subscription = await pushManager.subscribe({
  userVisibleOnly: true,
  applicationServerKey: vapidPublicKey
});
```

### Send Notification

```typescript
webpush.sendNotification(
  pushSubscription,
  JSON.stringify({
    title: "Hello!",
    body: "This is a push notification",
    icon: "/icon.png"
  })
);
```

## 🔧 Configuration Options

| Option | Description | Default |
|--------|-------------|---------|
| `vapidDetails` | VAPID authentication details | Required |
| `ttl` | Time-to-live for notifications | 24 hours |
| `urgency` | Notification priority level | "normal" |

## 📚 Learning Resources

- [Push API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Push_API)
- [Web Push Protocol](https://datatracker.ietf.org/doc/html/draft-ietf-webpush-protocol)
- [Service Worker Guide](https://developers.google.com/web/fundamentals/primers/service-workers)

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

<div align="center">
  <br />
  <p>
    <sub>Built with ❤️ by [Your Name]</sub>
  </p>
</div>
