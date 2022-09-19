//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("singInButton").addEventListener("click", login)

    document.getElementById("singInButton").addEventListener("click", nombreUsuario)
});

function login(){
    let email = document.getElementById('inputEmail').value;
    let password = document.getElementById('inputPassword').value;
    if(email != "" && password != "") {
        window.location.href="index.html";
    } else {
        alert ("campos vacios")
    }
}


function nombreUsuario(){
    localStorage.setItem('nombre-Usuario',document.getElementById('inputEmail').value)
};
