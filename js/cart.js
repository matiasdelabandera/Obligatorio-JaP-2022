const JSON = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
var subTotal = ''
var costoEnvio = "";
var Total = "";
let validacionForm = document.getElementById("formularioCarro")

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(JSON).then(function(JSON){
        if(JSON.status === "ok"){
            showCart(JSON);
            showCost(JSON);
        }
    })
})

function calcularCosto(precioProducto){
    let costoEnvioCalculado = "";
    let prem = document.getElementById("premium").value;
    let ex = document.getElementById("express").value;
    let stan = document.getElementById("standard").value;
    let elementoActivo = document.querySelector('input[name="Envio"]:checked');
    if(elementoActivo.value === prem) {
        costoEnvioCalculado = precioProducto*0.15
    } else {
        if(elementoActivo.value === ex){
            costoEnvioCalculado = precioProducto*0.07
        } else {
            if(elementoActivo.value === stan){
                costoEnvioCalculado = precioProducto*0.05
            }
        }
    }
    return costoEnvioCalculado;
}


function showCart(array){
    let info = array.data.articles
    let carritoHTML ="";
    let costo = parseInt (info[0].unitCost)
    let unidades = parseInt (info[0].count)
    let subTotal = unidades*costo
        carritoHTML += `
        <th scope="row">1</th>
        <td><img src="${info[0].image}" class="img-thumbnail" style="width: 80px;"></td>
        <td>${info[0].name}</td>
        <td>${info[0].currency+info[0].unitCost}</td>
        <td><input type="number" id="count" name="cantidad" min="1" max="99" value="${info[0].count}" onchange="dinamicSubTotal(${info[0].unitCost})"></input></td>
        <td id="subTotalHTML">${info[0].currency+subTotal}</td>
        `
    document.getElementById("cart").innerHTML += carritoHTML;
}

function showCost(array){
    let info = array.data.articles
    let costoHTML ="";
    let moneda = info[0].currency;
    let costo = parseInt (info[0].unitCost)
    let unidades = parseInt (info[0].count)
    let subTotal = unidades*costo
    let total = calcularCosto(costo) + costo;

    costoHTML +=`
        ${moneda+subTotal}
        `
    document.getElementById("SubtotalC").innerHTML += costoHTML;

    costoEnvio += `
       ${moneda}${calcularCosto(costo)}
        `
    document.getElementById("CostoEnvioF").innerHTML += costoEnvio;

    Total +=`
        ${moneda}${total}
        `
    document.getElementById("TotalHtml").innerHTML += Total;
}

function dinamicCost(){
    costoEnvio = "";
    Total = "";
    let precio =  parseInt(document.getElementById("SubtotalC").value)
    let moneda = "USD"
    calcularCosto(precio)
    costoEnvio += `
       ${moneda}${calcularCosto(precio)}
        `
    document.getElementById("CostoEnvioF").innerHTML += costoEnvio;
    Total +=`
        ${moneda}${Total}
        `
    document.getElementById("TotalHtml").innerHTML += Total;
}

function dinamicSubTotal(item){
    let cantidad = document.getElementById("count").value;
    let costo = parseInt(item);
    let subTotal2 = cantidad*costo;
    document.getElementById("subTotalHTML").innerHTML = "USD"+subTotal2;
    document.getElementById("SubtotalC").innerHTML = "USD"+subTotal2;
}

// validaciones

validacionForm.addEventListener('submit', (event) => {

    var TextoError = `
    <div class="col p-0"><p id="nombreDePago" style="padding: 6px 12px 0px 0px; color: red;">Completar elección de pago</p></div>
    <div class="col d-flex justify-content-end">
        <button type="button" class="btn btn-link" data-bs-toggle="modal" data-bs-target="#formaDePago" style="color: red;">
        Seleccionar
        </button>
    </div>
    `
    var MetodoDePagoIngresado = `
    <div class="col p-0"><p id="nombreDePago" style="padding: 6px 12px 0px 0px;">Metodo de pago ingresado</p></div>
    <div class="col d-flex justify-content-end">
        <button type="button" class="btn btn-link" data-bs-toggle="modal" data-bs-target="#formaDePago">
        Seleccionar
        </button>
    </div>
    `
    // targeta
let numeroTargeta = document.getElementById("numeroTargeta").value
let codigoSeguridad = document.getElementById("codigoSeguridad").value
let vencimiento = document.getElementById("vencimiento").value
let targetaDeCredito = document.getElementById("targetaDeCredito")
    // cuenta bancaria
let numeroCuenta = document.getElementById("numeroCuenta").value
let transferenciaBancaria = document.getElementById("transferenciaBancaria")
    // mensaje validacion
var mensajeDeValidacion = document.getElementById("mensajeDeValidacion")
    // resto del formulario
let direccion = document.getElementById("direccion").value
let numero = document.getElementById("numero").value
let esquina = document.getElementById("esquina").value

if((numeroTargeta !== null) && (codigoSeguridad !== null) && (vencimiento !== null) && (targetaDeCredito.checked)&&(direccion !== null)&&(numero !== null)&&(esquina !== null)){
    mensajeDeValidacion.innerHTML = MetodoDePagoIngresado
        alert("Compra realizada con exito!")
}else { if((numeroCuenta !== null) && (transferenciaBancaria.checked)){
    mensajeDeValidacion.innerHTML = MetodoDePagoIngresado
    if((direccion !== null)&&(numero !== null)&&(esquina !== null)){
        alert("Compra realizada con exito!")
    }
    }else {
        mensajeDeValidacion.innerHTML = TextoError;
        event.preventDefault();
        event.stopPropagation();
    }
}
})

// Validacion de campos
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

