export function arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

 // Snippet from https://www.npmjs.com/package/web-push
export function urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding: string = '='.repeat((4 - base64String.length % 4) % 4);
    const base64: string = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');
    
    const rawData: string = window.atob(base64);
    const outputArray: Uint8Array = new Uint8Array(rawData.length);
    
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}