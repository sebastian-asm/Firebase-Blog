export default function navbar(tipo = null, usuario = null, img = null) {
  const nav = document.querySelector('#nav');
  const header = document.querySelector('header');

  if (tipo === 'auth') {
    nav.innerHTML = `
      <p style="display: inline-block;">👋 Hola! <strong>${usuario}</strong></p>
      <img src="${
        img || '../../assets/images/avatar.jpg'
      }" class="img-avatar" />
      <a href="#" class="registrar" id="cerrar-sesion">Cerrar sesión</a>
    `;
  } else {
    nav.innerHTML = `
      <a href="#" class="ingresar" id="ingresar">Ingresar</a>
      <a href="#" class="registrar" id="registrar">Registrar</a>
    `;
  }

  header.appendChild(nav);
}
