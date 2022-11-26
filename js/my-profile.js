let nombre = localStorage.getItem("profileNombre")
let segundoNombre = localStorage.getItem("segundoNombre")
let apellido = localStorage.getItem("apellido")
let segundoApellido = localStorage.getItem("segundoApellido")
let telefono = localStorage.getItem("telefono")
let email = localStorage.getItem("nombre-Usuario")

const inputFile = document.querySelector('#profilePicture');
const image = document.querySelector('#imagenPerfil');


// email fijado
function datosProfile(){
    document.getElementById("emailProfileHtml").value = email
    document.getElementById("perfilUsuario").value = nombre
    document.getElementById("segundoNombreUsuario").value = segundoNombre
    document.getElementById("apellidoUsuario").value = apellido
    document.getElementById("segundoApellidoUsuario").value = segundoApellido
    document.getElementById("telefonoUsuario").value = telefono
    if(localStorage.getItem('profilePicture') !== null){
        image.setAttribute('src', localStorage.getItem('profilePicture'));
    }
    
}
datosProfile();

// funcion de validacion
(function () {
    'use strict'
  
    var forms = document.querySelectorAll('.needs-validation')
  
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
          form.classList.add('was-validated')
        }, false)
      })
  })()

//Guardar datos del formulario
  document.getElementById("submitButton").addEventListener("click", function(){
    if(document.getElementById("formularioPerfilInfo").checkValidity()){
        localStorage.setItem("profileNombre", document.getElementById("perfilUsuario").value)
        localStorage.setItem("segundoNombre", document.getElementById("segundoNombreUsuario").value)
        localStorage.setItem("apellido", document.getElementById("apellidoUsuario").value)
        localStorage.setItem("segundoApellido", document.getElementById("segundoApellidoUsuario").value)
        localStorage.setItem("telefono", document.getElementById("telefonoUsuario").value)
        localStorage.setItem("nombre-Usuario", document.getElementById("emailProfileHtml").value)
    }else{console.log("campos vacios")}

    
    
  })


  // Convertir imagen a 64

async function encodeFileAsBase64URL(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.addEventListener('loadend', () => {
            resolve(reader.result);
        });
        reader.readAsDataURL(file);
    });
};

inputFile.addEventListener('input', async (event) => {
    const base64URL = await encodeFileAsBase64URL(inputFile.files[0]);
    localStorage.setItem('profilePicture', base64URL);

});

