const URL = `https://japceibal.github.io/emercado-api/products/${localStorage.getItem('prod-id')}.json`
const URLC = `https://japceibal.github.io/emercado-api/products_comments/${localStorage.getItem('prod-id')}.json`
var nombreUsuario = "";
var currentProductsArray = [];


document.addEventListener("DOMContentLoaded", function (e){
    getJSONData(URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            showProductsList(resultObj);
            arrayImg(resultObj.data.images);
        }
    })

    document.getElementById("enviar").addEventListener("click", comentarioNuevo)
})

async function fetchComentarios(){
    const respuesta = await fetch(URLC);
    const dato = await respuesta.json();
    const arrayComentarios = dato;
    showComments(arrayComentarios);
}
fetchComentarios();

function showProductsList(item){
    let info = item.data
    let htmlContentToAppend = "";
        htmlContentToAppend += `
            <div class="row">
                <div>
                    <h1 class="col text-center">${info.name}</h1>
                    <hr>
                </div>
                <div>
                    <p class="mb-1"><Strong>Precio</Strong></p>
                    <p>UYU ${info.cost}</p>
                </div>
                <div>
                    <p class="mb-1"><Strong>Descripción</Strong></p>
                    <p>${info.description}</p>
                </div>
                <div>
                    <p class="mb-1"><Strong>Categoria</Strong></p>
                    <p>${info.category}</p>
                </div>
                <div>
                    <p class="mb-1"><Strong>Cantidad de vendidos</Strong></p>
                    <p>${info.soldCount}</p>
                </div>
                
            </div>
        `
    document.getElementById("main").innerHTML += htmlContentToAppend;
}

function arrayImg(array){
    // console.log(array)
    let htmlContentToAppend2 = ""
    //     htmlContentToAppend2 += `
    //     <div class="carousel-item">
    //         <img src="${document.getElementById("imgs").innerhtml += array[0]}" class="img-thumbnail">
    //     </div> 
    // `
    array.forEach(element => {
        htmlContentToAppend2 += `
        <div class="col">
                    <img src="${element}" class="img-thumbnail">
        </div>
        `
    });
    document.getElementById("imgs").innerHTML += htmlContentToAppend2;
}

function showComments(arrayC){
    let comentariosJson = "";
    arrayC.forEach(element => {

        let numero = parseInt(element.score)
        // console.log(element.score)
        let estrellas = "";
        for(i=0; i<numero; i++){
        estrellas += `<span class="fa fa-star checked"></span>`
        }
        for(i=numero; i<5; i++){
            estrellas += `<span class="fa fa-star"></span>`
        }

        comentariosJson += `
            <div class="text-bg-light p-3 border border-secondary rounded-start">
                <div class="row">
                    <div class="col"><p class="teaxt-break">${element.description}</p></div>
                </div>
                <div class="row">
                    <div class="col">
                        <p class="text-end text-muted">${estrellas} Escrito por ${element.user}, Publicado el ${element.dateTime}</p>
                    </div>
                </div>
            </div>
        `
    })
    document.getElementById("comentarios").innerHTML += comentariosJson;

}

function comentarioNuevo(){
    alert("hola");
    let comentarioN = document.getElementById("nuevoComentario").value
    let numeroC = parseInt(comentarioN);
    let cantidadEstrellas ="";
    let comentarioEstrellas ="";
    for(i=0; i<numeroC; i++){
        cantidadEstrellas += `<span class="fa fa-star checked"></span>`
        }
        for(i=numero; i<5; i++){
            cantidadEstrellas += `<span class="fa fa-star"></span>`
        }
        comentarioEstrellas += `
        <div class="text-bg-light p-3 border border-secondary rounded-start">
            <div class="row">
                <div class="col">
                    <p class="text-end text-muted">${estrellas}</p>
                </div>
            </div>
        </div>
    `
    document.getElementById("comentarios").innerHTML += comentarioEstrellas;
}

