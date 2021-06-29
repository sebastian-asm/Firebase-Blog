export default function navbar(tipo = null, usuario = null) {
  const nav = document.querySelector('#nav');
  const header = document.querySelector('header');

  if (tipo === 'auth') {
    nav.innerHTML = `
      <p style="display: inline-block;">👋 Hola! <strong>${usuario}</strong></p>
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
