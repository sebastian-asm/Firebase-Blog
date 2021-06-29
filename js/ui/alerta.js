export default function alerta(msg, tipo = 'ok') {
  const div = document.createElement('div');
  const p = document.createElement('p');

  if (tipo === 'error') {
    div.style.backgroundColor = '#ef4444';
  } else {
    div.style.backgroundColor = '#10B981';
  }

  div.classList.add('alerta');
  p.textContent = msg;
  div.appendChild(p);
  document.body.appendChild(div);

  setTimeout(() => div.remove(), 4000);
}
