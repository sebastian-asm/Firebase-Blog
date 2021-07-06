export default function gridPosts(snapshot, msg) {
  const main = document.querySelector('main');
  const div = document.createElement('div');
  const h1 = document.createElement('h1');
  const templatePost = document.querySelector('#template-post').content;
  const fragment = document.createDocumentFragment();

  div.id = 'grid-posts';
  div.classList.add('grid-posts');
  h1.textContent = msg;

  // Limpiando la grid para volver a renderizar con los nuevos posts
  if (document.querySelector('#grid-posts')) {
    document.querySelector('#grid-posts').remove();
    document.querySelector('h1').remove();
  }

  snapshot.forEach((post) => {
    const { titulo, descripcion, fecha, imagen } = post.data();
    const dia = new Date(fecha).getDate();
    const mes = new Date(fecha).getMonth() + 1;
    const anio = new Date(fecha).getFullYear();

    templatePost.querySelector(
      '#fecha-post'
    ).textContent = `${dia}/${mes}/${anio}`;

    templatePost.querySelector('img').src =
      imagen || './assets/images/post.png';
    templatePost.querySelector('img').alt = titulo;

    templatePost.querySelector('#titulo').textContent = titulo;
    templatePost.querySelector('#descripcion').textContent =
      descripcion.substring(0, 250) + '...';

    const clone = templatePost.cloneNode(true);
    fragment.appendChild(clone);
  });

  div.appendChild(fragment);
  main.append(h1, div);
}
