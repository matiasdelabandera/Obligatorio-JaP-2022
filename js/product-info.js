const URL = PRODUCT_INFO_URL + `${localStorage.getItem('prod-id')}`
const URLC = PRODUCT_INFO_COMMENTS_URL + `${localStorage.getItem('prod-id')}`
var nombreUsuario = "";
var currentProductsArray = [];


document.addEventListener("DOMContentLoaded", function (e){
    getJSONData(URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            showProductsList(resultObj);
            arrayImg(resultObj.data.images);
            showRelatedProducts(resultObj);
        }
    })

    // document.getElementById("enviar").addEventListener("click", comentarioNuevo())
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
                    <img src="${element}" class="img-thumbnail" >
        </div>
        `
    });
    document.getElementById("imgs").innerHTML += htmlContentToAppend2;
}

function showComments(arrayC){
    let comentariosJson = "";
    arrayC.forEach(element => {
        let numero = parseInt(element.score)
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
    let comentarioN = document.getElementById("nuevoComentario").value;
    let cantidadEstrellas = document.getElementById("Estrellas").value;
    let user = localStorage.getItem("nombre-Usuario");
    let estrellas = parseInt(cantidadEstrellas);
    let comentarioNuevo ="";

        comentarioNuevo += `
        <div class="text-bg-light p-3 border border-secondary rounded-start">
                <div class="row">
                    <div class="col"><p class="teaxt-break">${comentarioN}</p></div>
                </div>
                <div class="row">
                    <div class="col">
                        <p class="text-end text-muted">${cantidadEstrellas} Escrito por ${user}, Publicado el </p>
                    </div>
                </div>
            </div>
    `
    document.getElementById("comentarios").innerHTML += comentarioNuevo;
}

function showRelatedProducts(data){
    let relProdHtml="";
    let array = data.data.relatedProducts
    array.forEach(element => {
        relProdHtml += `
        <div class="col-md-2">
            <div class="product-card">
                <div class="product-badges" onclick="idRelatedProduct(${element.id})">
                    <a class="product-thumb" href="product-info.html" data-abc="true"><img src="${element.image}" alt="Product" class="img-thumbnail"></a>
                    <h3 class="product-title">${element.name}</h3>
                </div>
            </div>
        </div>
        `
    });
    document.getElementById("prod-relacionados").innerHTML += relProdHtml
}

function idRelatedProduct(id){
    localStorage.setItem("prod-id", id)
}