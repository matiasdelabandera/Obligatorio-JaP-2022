const express = require('express');
const app = express();
const cors = require('cors');


//.JSON servidor
app.get('/', (req, res) => {
    res.send('Hello World Proyect 2022')
});

//Permisos del cors
app.use(cors());

//.JSON Categories
app.get('/cats', (req, res) => {
    res.json(require('./emercado-api-main/cats/cat.json'))
});

//.JSON Cart
app.get('/cart', (req, res) => {
    res.json(require('./emercado-api-main/cart/buy.json'))
});

//.JSON Categories Products
app.get('/cats_products/:categoriesid', (req,res) => {
    res.json(require('./emercado-api-main/cats_products/' + req.params.categoriesid + '.json'))
});

//.JSON Productos
app.get('/products/:productsid', (req, res) => {
    res.json(require("./emercado-api-main/products/" + req.params.productsid + ".json"))
});

//.JSON Comentarios de los Productos
app.get('/products_comments/:productsid', (req, res) =>{
    res.json(require("./emercado-api-main/products_comments/" + req.params.productsid + ".json"))
});

//.JSON Sell
app.get('/sell', (req, res) =>{
    res.json(require("./emercado-api-main/sell/publish.json"))
});

//.JSON User Cart
app.get('/user_cart', (req, res) =>{
    res.json(require("./emercado-api-main/user_cart/25801.json"))
});

//Seleccionado del puerto del servidor y mensaje de feedback
app.listen(3000, () => {
    console.log('Example app listening on port 3000')
});

