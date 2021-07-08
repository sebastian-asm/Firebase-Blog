importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-messaging.js');

// Se vuelve a llamar la configuración
// Los SW corren en un hilo diferente a la app
firebase.initializeApp({
  apiKey: 'AIzaSyA2An0ht4teUYo-t7mTz2HE0PrBYkAGv1o',
  authDomain: 'proyecto-blog-230b8.firebaseapp.com',
  projectId: 'proyecto-blog-230b8',
  storageBucket: 'proyecto-blog-230b8.appspot.com',
  messagingSenderId: '203735088447',
  appId: '1:203735088447:web:c229a1f15bd2ded649678a',
});

const messaging = firebase.messaging();

// Capturando la notificación que nos envía el servidor
messaging.setBackgroundMessageHandler((payload) => {
  console.log(payload);
  const notificationTitle = '🌟 ¡Hay un nuevo post disponible!';
  const notificationOption = {
    body: payload.data.titulo,
    icon: '/assets/images/notification.png',
    click_action: 'https://proyecto-blog-230b8.web.app/',
  };

  // self es window en SW
  return self.ServiceWorkerRegistration.showNotification(
    notificationTitle,
    notificationOption
  );
});
