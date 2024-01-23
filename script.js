const firebaseConfig = {
    apiKey: "AIzaSyCIoogU7purg11pIWHew8AS7IBqyjxrKT4",
    authDomain: "datos-de-formulario-6708f.firebaseapp.com",
    projectId: "datos-de-formulario-6708f",
    storageBucket: "datos-de-formulario-6708f.appspot.com",
    messagingSenderId: "512841806574",
    appId: "1:512841806574:web:b2bc8daf4db5f0fc7e39ff",
    measurementId: "G-ZGZQ1SJL8R"
  };

// Initialize firebase
firebase.initializeApp(firebaseConfig);

// initialize cloud firestore and get a reference to the service
const db = firebase.firestore();

document.getElementById('formulario').addEventListener('submit', (event) =>{
    event.preventDefault() //para suprimir la actualizacion de la pag 

    //validar campo nombre
    let entradaNombre = document.getElementById('name')
    let errorNombre = document.getElementById('nameError')

    if(entradaNombre.value.trim() == ''){
        errorNombre.textContent = 'Por favor introduci tu nombre'
        errorNombre.classList.add('error-message')
    }else{
        errorNombre.textContent = ''
        errorNombre.classList.remove('error-message')
    }

    //validar correo}
    let emailEntrada = document.getElementById('email')
    let emailError = document.getElementById('emailError')
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // patron de validacion basico
    if(!emailPattern.test(emailEntrada.value)){
        emailError.textContent = 'Por favor introduci un email valido'
        emailError.classList.add('error-message')
    }else{
        emailError.textContent = ''
        emailError.classList.remove('error-message')
    }

    //validar contraseña
    let contrasenaEntrada = document.getElementById('password')
    let contrasenaError = document.getElementById('passwordError')
    let contrasenaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;
    if(!contrasenaPattern.test(contrasenaEntrada.value)){
        contrasenaError.textContent = 'La contraseña debe tener al menos 8 caracteres, numeros, mayusculas y minusculas y caracteres especiales'
        contrasenaError.classList.add('error-message')
    }else{
        contrasenaError.textContent = ''
        contrasenaError.classList.remove('error-message')
    }

    //si todos los campos son validos enviar formulario. backend
    if(!errorNombre.textContent && !emailError.textContent && !contrasenaError.textContent){

        // Add a second document with a generated ID.
        db.collection("users").add({
            nombre: entradaNombre.value,
            email: emailEntrada.value,
            password: contrasenaEntrada.value
        })
        .then((docRef) => {
            alert('El formulario se ha enviado con exito', docRef.id)
            document.getElementById('formulario').reset();
        })
        .catch((error) => {
            alert(error)
        });
    }
})