export function modalEscribirPost() {
  const div = document.createElement('div');

  div.classList.add('modal');
  div.id = 'modal-escribir-post';
  div.innerHTML = `
    <h3>Escribir nuevo post</h3>
    <form id="form-escribir-post">
      <input type="text" id="escribir-titulo" placeholder="Título" />
      <textarea
        id="escribir-descripcion"
        rows="4"
        placeholder="Descripción"
      ></textarea>
      <input
        type="text"
        id="escribir-enlace-video"
        placeholder="Enlace a video"
      />
      <input type="file" class="custom-file-upload" id="subir-imagen-post" />

      <div class="modal-buttons">
        <button type="button" id="cancelar-escribir-post">
          Cancelar
        </button>
        <button type="submit" class="registrar">Publicar</button>
      </div>
    </form> 
  `;

  document.body.appendChild(div);
}

export function modalIngresarSesion() {
  const div = document.createElement('div');

  div.classList.add('modal');
  div.id = 'modal-ingresar';
  div.innerHTML = `
    <h3>Iniciar sesión</h3>
    <form id="form-ingresar">
      <input type="email" id="email-ingresar" placeholder="Email" />
      <input
        type="password"
        id="password-ingresar"
        placeholder="Contraseña"
      />

      <div class="otras-cuentas">
        <p>o ingresar con</p>
        <button type="button" class="google" id="btn-google-ingresar">
          Google
        </button>
      </div>

      <div class="modal-buttons">
        <button type="button" id="cancelar-ingresar">
          Cancelar
        </button>
        <button type="submit" class="registrar">Ingresar</button>
      </div>
    </form>
  `;

  document.body.appendChild(div);
}

export function modalRegistrarCuenta() {
  const div = document.createElement('div');

  div.classList.add('modal');
  div.id = 'modal-registrar';
  div.innerHTML = `
    <h3>Registrarse</h3>
    <form id="form-registrar">
      <input type="text" id="nombre-registrar" placeholder="Nombre" />
      <input type="email" id="email-registrar" placeholder="Email" />
      <input
        type="password"
        id="password-registrar"
        placeholder="Contraseña"
      />

      <div class="otras-cuentas">
        <p>o registrar con</p>
        <button type="button" class="google" id="btn-google">Google</button>
      </div>

      <div class="modal-buttons">
        <button type="button" id="cancelar-registrar">
          Cancelar
        </button>
        <button type="submit" class="registrar">Registrar</button>
      </div>
    </form>
  `;

  document.body.appendChild(div);
}
