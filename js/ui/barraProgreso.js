export default function barraProgreso(porcentaje) {
  if (document.querySelector('.progreso')) {
    document.querySelector('.progreso').remove();
  }

  const div = document.createElement('div');

  if (porcentaje !== 100) {
    div.textContent = 'Subiendo...';
  } else {
    div.textContent = '¡Listo!';
  }

  div.id = 'progreso';
  div.classList.add('progreso');
  div.style.width = `${porcentaje}%`;

  document
    .querySelector('#form-escribir-post')
    .insertBefore(div, document.querySelector('.modal-buttons'));
}
