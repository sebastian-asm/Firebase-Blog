import alerta from '../ui/alerta.js';
import cargando from '../ui/cargando.js';
import gridPosts from '../ui/gridPosts.js';
import sinPosts from '../ui/sinPosts.js';

const POSTS = 'posts';
// Creación de la instancia a la base de datos
const db = firebase.firestore();

export function crearPost({ titulo, descripcion, imagenUrl }) {
  const { uid, email } = firebase.auth().currentUser;

  db.collection(POSTS)
    .add({
      autor: {
        uid,
        email,
      },
      titulo,
      descripcion,
      // imagenUrl,
      fecha: Date.now(),
    })
    .then((resp) => {
      console.log(resp.id);
      document.querySelector('#form-escribir-post').reset();
      document.querySelector('#modal-escribir-post').remove();

      alerta('Post publicado exitosamente.');
    })
    .catch((error) => {
      console.log(error);
      alerta(
        'Error al publicar el post, vuelve a intentar por favor.',
        'error'
      );
    });
}

export function obtenerPosts(e) {
  if (e) e.preventDefault();

  cargando();

  // onSnapshot permite tener los datos en tiempo real
  db.collection(POSTS)
    .orderBy('fecha', 'desc')
    .onSnapshot((snapshot) => {
      if (snapshot.empty) {
        // Limpiando la grid de los post en caso de existir
        if (document.querySelector('#grid-posts')) {
          document.querySelector('h1').remove();
          document.querySelector('#grid-posts').remove();
        }

        sinPosts('🙃 ¡Anímate! aun no hay post, escribir uno.');
      } else {
        // Eliminando el mensaje sin posts
        if (document.querySelector('#sin-posts')) {
          document.querySelector('#sin-posts').remove();
        }

        gridPosts(snapshot); // Renderizando los posts
      }

      // Eliminando el mensaje de cargando
      if (document.querySelector('#cargando')) {
        document.querySelector('#cargando').remove();
      }
    });
}

export function obtenerPostsUsuario(e) {
  e.preventDefault();
  const { uid } = firebase.auth().currentUser;

  cargando();

  db.collection(POSTS)
    .where('autor.uid', '==', uid) // Filtrando por el id del usuario logueado
    .onSnapshot((snapshot) => {
      if (snapshot.empty) {
        if (document.querySelector('#grid-posts')) {
          document.querySelector('#grid-posts').remove();
          document.querySelector('h1').remove();
        }

        sinPosts('😱 Aun no tienes posts tuyos publicados.');
      } else {
        gridPosts(snapshot);
      }

      if (document.querySelector('#cargando')) {
        document.querySelector('#cargando').remove();
      }
    });
}
