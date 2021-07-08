export default function sw() {
  // Trabajando con el Service Worker para el manejos de notificaciones
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/firebase-messaging-sw.js')
      .then((registro) => {
        console.log('SW registrado', registro);
        firebase.messaging().useServiceWorker(registro); // Registrando el SW en Firebase
      })
      .catch((error) => {
        console.log('Error al registrar el SW', error);
      });
  }

  // Obteniendo la instancia de messaging
  const messaging = firebase.messaging();
  messaging.usePublicVapidKey(
    'BHtJlQXJD2_T3r8uAewkUdHdWXYAA6bLCp02iyfbjgrAbx9cvi_OV2qby26-53VkAwavzDxXKYkPykWpBqhuiHc'
  );

  // Solicitando los permisos para las notificaciones
  messaging
    .requestPermission()
    .then(() => {
      console.log('Permiso otorgado');
      return messaging.getToken();
    })
    .then((token) => {
      console.log(token);
      const db = firebase.firestore();

      // Guardando el token obtenido en la db
      db.collection('tokens')
        .doc(token) // el id será el mismo token
        .set({ token })
        .catch((error) => console.log('Error al guardar el token', error));
    })
    .catch(console.log);

  // Generar nuevamente el token al refrescar el sitio
  messaging.onTokenRefresh(() => {
    messaging.getToken().then((token) => {
      console.log('Token renovado', token);
      db.collection('tokens')
        .doc(token)
        .set({ token })
        .catch((error) => console.log('Error al guardar el token', error));
    });
  });

  // Recibir las notificaciones en modo foreground (cuando el usuario esta en la app)
  messaging.onMessage((payload) => {
    console.log(payload);
  });
}
