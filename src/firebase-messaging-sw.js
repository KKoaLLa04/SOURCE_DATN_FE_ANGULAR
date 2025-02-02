importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyA0f72LUkQv653RDF1cvggtvp8YspZqGrM",
    authDomain: "manager-96391.firebaseapp.com",
    projectId: "manager-96391",
    storageBucket: "manager-96391.firebasestorage.app",
    messagingSenderId: "631701701097",
    appId: "1:631701701097:web:2a1eeaa2bf4f0805378b78",
    measurementId: "G-G9YRH454XD"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(payload);
    const notificationData = JSON.parse(payload?.data?.body);
    const additionalData = JSON.parse(notificationData?.additionalData);

    // Customize notification here
    const notificationTitle = "Thông báo mới";
    const notificationOptions = {
        body: additionalData.title,
        icon: payload.data.image
    };
    self.registration.showNotification(notificationTitle, notificationOptions);

  });

// // Import Firebase scripts
// importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js');

// firebase.initializeApp({
//   messagingSenderId: "631701701097",
// })

// const message = firebase.messaging();
