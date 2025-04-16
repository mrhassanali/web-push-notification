import React from "react";

export const useServiceWorker = () => {
  React.useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => console.log("✅ Service Worker registered"))
        .catch((err) => console.error("❌ SW registration failed", err));
    }
  }, []);
};
