// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyA0f72LUkQv653RDF1cvggtvp8YspZqGrM",
    authDomain: "manager-96391.firebaseapp.com",
    projectId: "manager-96391",
    storageBucket: "manager-96391.firebasestorage.app",
    messagingSenderId: "631701701097",
    appId: "1:631701701097:web:2a1eeaa2bf4f0805378b78",
    measurementId: "G-G9YRH454XD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app)

export const generateToken = async () => {
    const supported = await isSupported();
  if (!supported) {
    return null; // Hoặc xử lý fallback
  }
    const permission = await Notification.requestPermission();
    if(permission === 'granted'){
        const token = await getToken(messaging, {
            vapidKey: "BP9UCYeiBdTpKpN_HKL9iH7QQRmdvzE6jG8wn7nXXHqs8KqGFByqjHF3K9ijKi3gFTuYkbLvhUr0d9t-emdOPdI"
        })
        conosle.log(token);
        // const dataRequest = {
        //   device_token: token,
        //   device_type: WEB_APP_TYPE_ENUM.WEB
        // }
        // ApiService('device_token','POST',dataRequest)
    }
}
