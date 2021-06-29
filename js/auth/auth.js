import '../config/firebaseConfig.js';
import alerta from '../ui/alerta.js';

export function crearCuentaEmailPass(email, password, nombre) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((resp) => {
      console.log(resp);
      resp.user.updateProfile({
        displayName: nombre,
      });

      // Esto permite una vez verificado el email y presionar continuar vuelve a nuestro home
      const config = {
        url: 'http://localhost:5501',
      };

      // Enviar un email de verificación de cuenta
      resp.user.sendEmailVerification(config).catch(() => {
        alerta('Hubo un problema al enviar el email de confirmación', 'error');
      });

      // No ingresa hasta que confirme el email
      firebase.auth().signOut();

      // Limpiando el formulario
      document.querySelector('#form-registrar').reset();
      document.querySelector('#modal-registrar').classList.add('hidden'); // Ocultando el modal

      alerta(`${nombre}, te enviamos un email para completar el registro.`);
    })
    .catch((error) => {
      console.log(error);
      alerta(
        'Hubo un error al registrarse, vuelve a intentar por favor.',
        'error'
      );
    });
}

export function authEmailPass(email, password) {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((resp) => {
      console.log(resp);
      // Si el email fue verificado
      if (resp.user.emailVerified) {
        document.querySelector('#form-ingresar').reset();
        document.querySelector('#modal-ingresar').classList.add('hidden');

        alerta(`${resp.user.displayName}, has iniciado sesión correctamente.`);
      } else {
        firebase.auth().signOut();
        alerta(
          'No puede iniciar sesión, aun no has confirmado tu email.',
          'error'
        );
      }
    })
    .catch((error) => {
      console.log(error);
      firebase.auth().signOut();
      alerta('Credenciales inválidas, vuelve a intentar por favor.', 'error');
    });
}

export function cerrarSesion(e) {
  e.preventDefault();

  firebase
    .auth()
    .signOut()
    .then(() => alerta('Has cerrado tu sesión.'))
    .catch(() =>
      alerta('Error al cerrar la sesión, vuelve a intentar por favor.', 'error')
    );
}

export function authGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase
    .auth()
    .signInWithPopup(provider)
    .then((resp) => {
      console.log(resp);
      alerta('Operación exitosa con tu cuenta de Google.');

      // Limpiando los modal
      document.querySelector('#modal-registrar').classList.add('hidden');
      document.querySelector('#modal-ingresar').classList.add('hidden');
    })
    .catch((error) => {
      console.log(error);
      alerta('Error al autenticar con Google.', 'error');
    });
}
