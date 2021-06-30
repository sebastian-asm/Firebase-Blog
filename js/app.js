import './firebase/firebaseConfig.js';

import {
  crearCuentaEmailPass,
  authEmailPass,
  cerrarSesion,
  authGoogle,
} from './firebase/auth.js';

import {
  modalEscribirPost,
  modalRegistrarCuenta,
  modalIngresarSesion,
} from './ui/modal.js';

import { crearPost, obtenerPosts } from './firebase/post.js';
import alerta from './ui/alerta.js';
import menuUsuario from './ui/menuUsuario.js';
import navbar from './ui/nav.js';

(() => {
  document.addEventListener('DOMContentLoaded', app);

  // Inicio de app
  function app() {
    const fecha = document.querySelector('#fecha');
    fecha.textContent = new Date().getFullYear();

    autenticado();
    obtenerPosts(); // Obteniendo todos los post
  }

  function autenticado() {
    // Observando si existe un usuario autenticado
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        menuUsuario(); // Menú para el usuario registrado
        navbar('auth', user.displayName, user.photoURL); // Signin

        const escribir = document.querySelector('#escribir-post');
        const cerrar = document.querySelector('#cerrar-sesion');

        escribir.addEventListener('click', escribirPost);
        cerrar.addEventListener('click', cerrarSesion);
      } else {
        navbar(); // Signout
        const ingresar = document.querySelector('#ingresar');
        const registrar = document.querySelector('#registrar');

        registrar.addEventListener('click', modalRegistrar);
        ingresar.addEventListener('click', modalIngresar);
      }
    });
  }

  // Modal de registro
  function modalRegistrar(e) {
    e.preventDefault();
    modalRegistrarCuenta();

    const cancelarModal = document.querySelector('#cancelar-registrar');
    const form = document.querySelector('#form-registrar');
    const btnGoogle = document.querySelector('#btn-google');

    const registro = (e) => {
      e.preventDefault();
      const formData = {
        email: document.querySelector('#email-registrar').value,
        password: document.querySelector('#password-registrar').value,
        nombre: document.querySelector('#nombre-registrar').value,
      };

      // Validación del formulario
      const errorForm = Object.values(formData).some((campo) => campo === '');
      if (errorForm) {
        return alerta('Completa todos los campos por favor.', 'error');
      } else if (formData.password.length < 6) {
        return alerta('La contraseña debe tener mínimo 6 carácteres.', 'error');
      }

      // Creando el registro
      crearCuentaEmailPass(formData.email, formData.password, formData.nombre);
    };

    // Escuchando eventos dentro del formulario de registro
    form.addEventListener('submit', registro);
    btnGoogle.addEventListener('click', registrarConGoogle); // Registrando con cuenta Google
    cancelarModal.addEventListener('click', () => {
      document.querySelector('#modal-registrar').remove();
    });
  }

  // Modal de iniciar sesión
  function modalIngresar(e) {
    e.preventDefault();
    modalIngresarSesion();

    const cancelarModal = document.querySelector('#cancelar-ingresar');
    const form = document.querySelector('#form-ingresar');
    const btnGoogle = document.querySelector('#btn-google-ingresar');

    const ingresar = (e) => {
      e.preventDefault();
      const formData = {
        email: document.querySelector('#email-ingresar').value,
        password: document.querySelector('#password-ingresar').value,
      };

      // Validación del formulario
      const errorForm = Object.values(formData).some((campo) => campo === '');
      if (errorForm) {
        return alerta('Completa todos los campos por favor.', 'error');
      } else if (formData.password.length < 6) {
        return alerta('La contraseña debe tener mínimo 6 carácteres.', 'error');
      }

      // Iniciando sesión
      authEmailPass(formData.email, formData.password);
    };

    form.addEventListener('submit', ingresar);
    btnGoogle.addEventListener('click', registrarConGoogle);
    cancelarModal.addEventListener('click', () => {
      document.querySelector('#modal-ingresar').remove();
    });
  }

  function registrarConGoogle(e) {
    e.preventDefault();
    authGoogle();
  }

  function escribirPost(e) {
    e.preventDefault();

    modalEscribirPost();

    const cancelarModal = document.querySelector('#cancelar-escribir-post');
    const form = document.querySelector('#form-escribir-post');

    const escribir = (e) => {
      e.preventDefault();
      const formData = {
        titulo: document.querySelector('#escribir-titulo').value,
        descripcion: document.querySelector('#escribir-descripcion').value,
        videoUrl: document.querySelector('#escribir-enlace-video').value,
        // imagenUrl: document.querySelector('#subir-imagen-post').value,
      };

      if (formData.titulo.trim() === '' || formData.descripcion.trim() === '')
        return alerta(
          'El título y la descripción son datos necesarios.',
          'error'
        );

      // Guardando el post
      crearPost({ ...formData });
    };

    form.addEventListener('submit', escribir);
    cancelarModal.addEventListener('click', () => {
      document.querySelector('#modal-escribir-post').remove();
    });
  }
})();
