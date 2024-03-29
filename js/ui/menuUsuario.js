export default function menuUsuario() {
  const main = document.querySelector('main');
  const section = document.createElement('section');

  if (firebase.auth().currentUser) {
    section.id = 'menu-usuario';
    section.classList.add('menu-usuario');
    section.innerHTML = `
      <a href="#" id="todos-posts">Todos los posts</a>
      <span class="separador">|</span>
      <a href="#" id="escribir-post">Escribir post</a>
      <span class="separador">|</span>
      <a href="#" id="mis-posts">Mis posts</a>
    `;

    // Si existe el mensaje sin posts, se insertará el menú antes de este
    if (document.querySelector('#sin-posts')) {
      main.insertBefore(section, document.querySelector('#sin-posts'));
    } else if (document.querySelector('h1')) {
      main.insertBefore(section, document.querySelector('h1'));
    } else if (document.querySelector('#cargando')) {
      main.insertBefore(section, document.querySelector('#cargando'));
    } else {
      main.appendChild(section);
    }
  } else {
    section.remove();
  }
}
