import alerta from '../ui/alerta.js';

const POSTS = 'posts';
// Creación de la instancia a la base de datos
const db = firebase.firestore();

export function crearPost({ titulo, descripcion, imagenUrl, videoUrl }) {
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
      videoUrl,
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

export function obtenerPosts() {
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

        const main = document.querySelector('main');
        const div = document.createElement('div');

        div.classList.add('sin-posts');
        div.id = 'sin-posts';
        div.innerHTML = `<p>Aun no hay post, escribe uno.</p>`;

        main.appendChild(div);
      } else {
        // Eliminando el mensaje sin posts
        if (document.querySelector('#sin-posts'))
          document.querySelector('#sin-posts').remove();

        const main = document.querySelector('main');
        const div = document.createElement('div');
        const h1 = document.createElement('h1');
        const templatePost = document.querySelector('#template-post').content;
        const fragment = document.createDocumentFragment();

        div.id = 'grid-posts';
        div.classList.add('grid-posts');
        h1.textContent = 'Todos los post publicados';

        // Limpiando la grid para volver a renderizar con los nuevos posts
        if (document.querySelector('#grid-posts')) {
          document.querySelector('#grid-posts').remove();
          document.querySelector('h1').remove();
        }

        snapshot.forEach((post) => {
          h1.remove();
          const { titulo, descripcion, fecha } = post.data();
          const dia = new Date(fecha).getDate();
          const mes = new Date(fecha).getMonth() + 1;
          const anio = new Date(fecha).getFullYear();

          templatePost.querySelector('h2').textContent = titulo;
          templatePost.querySelector('p').textContent = descripcion;
          templatePost.querySelector(
            '#fecha-post'
          ).textContent = `${dia}/${mes}/${anio}`;

          const clone = templatePost.cloneNode(true);
          fragment.appendChild(clone);
        });

        div.appendChild(fragment);
        main.append(h1, div);
      }
    });
}
