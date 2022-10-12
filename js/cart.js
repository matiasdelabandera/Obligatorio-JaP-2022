const JSON = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
var subTotal = ''

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(JSON).then(function(JSON){
        if(JSON.status === "ok"){
            showCart(JSON);
            document.getElementById("count").addEventListener("click",dinamicSubTotal)
        }
    })
})

function showCart(array){
    let info = array.data.articles
    let carritoHTML ="";
         costo = parseInt (info[0].unitCost)
    let unidades = parseInt (info[0].count)
    subTotal = unidades*costo

        carritoHTML += `
        <th scope="row">1</th>
        <td><img src="${info[0].image}" class="img-thumbnail" style="width: 80px;"></td>
        <td>${info[0].name}</td>
        <td>${info[0].currency+info[0].unitCost}</td>
        <td><input type="number" id="count" name="count" min="1" max="5" value="${info[0].count}"></input></td>
        <td id="subTotalHTML">${info[0].currency+subTotal}</td>
        `
    
    document.getElementById("cart").innerHTML += carritoHTML;
}

function dinamicSubTotal(){
    let cantidad =parseInt(getElementById(count).value)
    subTotal = costo * cantidad
}
