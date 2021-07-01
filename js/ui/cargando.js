export default function cargando() {
  const main = document.querySelector('main');
  const div = document.createElement('div');

  div.id = 'cargando';
  div.classList.add('cargando');
  div.innerHTML = `
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="25"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="#6B7280"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <circle cx="12" cy="12" r="9" />
    <polyline points="12 7 12 12 15 15" />
    </svg>
    <span>Cargando...</span>
  `;

  main.appendChild(div);
}
