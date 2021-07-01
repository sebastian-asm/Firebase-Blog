export default function sinPosts(msg) {
  // Eliminar el mensaje anterior
  if (document.querySelector('#sin-posts')) {
    document.querySelector('#sin-posts').remove();
  }

  const main = document.querySelector('main');
  const div = document.createElement('div');

  div.classList.add('sin-posts');
  div.id = 'sin-posts';
  div.innerHTML = `<p>${msg}</p>`;

  main.appendChild(div);
}
