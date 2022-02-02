const express = require('express')
const app = express()
const PORT = 8080
const container = require('./contenedor.js')
const container_class = new container();
/** Clase 10 */
/** Saludo de bienvenida (opcional) */
app.get('/', (req, res) => {
    let productos = container_class.getAll()
    res.send(`<h1 style="font-family:cursive">Que comience el juego!!!</h1>`)
})

/** Array de productos disponibles */
app.get('/productos', (req, res) => {
    let productos = container_class.getAll()
    res.send(`${productos}`)
})

/** Producto al azar */
app.get('/productos/random', (req, res) => {
    let productos = container_class.getAll()
    let array_productos
    if (productos) {
        array_productos = JSON.parse(productos)
    }
    let producto_html = ''
    let id = Math.floor(Math.random() * (array_productos.length + 1))
    let producto = container_class.getById(id)
    producto_html = `<p><b>Nombre producto:</b> ${producto.title}</p>
    <p><b>Precio:</b> ${producto.total}</p>
    <img src="${producto.image}">`
    res.send(`${producto_html}`)

})

app.listen(PORT, () => {
    console.log(`Salida por puerto ${PORT}`)
})