export default function barraProgreso(porcentaje) {
  if (document.querySelector('.progreso')) {
    document.querySelector('.progreso').remove();
  }

  const div = document.createElement('div');

  div.id = 'progreso';
  div.classList.add('progreso');
  div.style.width = `${porcentaje}%`;
  div.textContent = porcentaje !== 100 ? 'Subiendo...' : '¡Listo!';

  document
    .querySelector('#form-escribir-post')
    .insertBefore(div, document.querySelector('.modal-buttons'));
}
