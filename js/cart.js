const JSON = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
var subTotal = ''

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(JSON).then(function(JSON){
        if(JSON.status === "ok"){
            showCart(JSON);
        }
    })
})

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

function dinamicSubTotal(item){
    let cantidad = document.getElementById("count").value;
    let costo = parseInt(item);
    let subTotal2 = cantidad*costo;
    document.getElementById("subTotalHTML").innerHTML = "USD"+subTotal2;
}
