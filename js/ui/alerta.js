export default function alerta(msg, tipo = 'ok') {
  const div = document.createElement('div');
  const p = document.createElement('p');

  div.style.backgroundColor = tipo === 'error' ? '#ef4444' : '#10B981';
  div.classList.add('alerta');
  p.textContent = msg;

  div.appendChild(p);
  document.body.appendChild(div);

  setTimeout(() => div.remove(), 3000);
}
