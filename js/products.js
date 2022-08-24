const URL = 'https://japceibal.github.io/emercado-api/cats_products/101.json';


fetch (URL)
.then( result => result.json())
.then( data =>{
    const ArrayDatos = data.products;
    showlist(ArrayDatos);

})

function showlist(array){

    for(let i=0; array.length; i++){

        //document.getElementById("prueba").innerHTML += array[i].id;
        //document.getElementById("prueba").innerHTML += array[i].name;
        //document.getElementById("prueba").innerHTML += array[i].description;
        document.getElementById("prueba").innerHTML += array[i].image;

    }

}



/*function showProductList(){
    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let product = currentProductsArray[i];
        htmlContentToAppend += `
                <div>
                    <div class="row">
                        <div class="col-3">
                            <img src="${product.imgSrc}" alt="${product.description}" class="img-thumbnail">
                        </div>
                        <div class="col">
                         <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">${product.name}</h4>
                                <small class="text-muted">${product.productCount} artículos</small>
                            </div>
                            <p class="mb-1">${product.description}</p>
                        </div>
                    </div>
                </div>
         `

        document.getElementById("cat-prod-container").innerHTML = htmlContentToAppend;
    }
}

showProductList(URL);*/ 