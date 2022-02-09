// Se llama a express
const express = require('express')

// Se inicializa app
const app = express()

// Se inicializa objeto express
const { Router } = express

const multer = require('multer')

const products = Router()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = 8000
const container = require('./contenedor.js')
const container_class = new container();

/** Saludo de bienvenida (opcional) */
products.get('/', (req, res) => {
    let productos = container_class.getAll()
    res.send(`<h1 style="font-family:cursive">Que comience el juego!!!</h1>`)
})

/** Array de productos disponibles */
products.get('/productos', (req, res) => {
    let productos = container_class.getAll()
    res.send(`${productos}`)
})

// Obtener por items
products.get('/productos/:id', (req, res) => {
    let id = req.params.id;
    let products = container_class.getById(id)
    res.send(`${products}`)
})

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'image')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname)
    }
})

const fileMiddleware = multer({ storage: storage })
products.post('/productos', fileMiddleware.single('image'), (req, res) => {
    const file = req.image
    let id = req.params.id;
    let products = container_class.getById(id)
    res.send(`${products}`)
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
app.use('/api', products)
app.listen(PORT, () => {
    console.log(`Salida por puerto ${PORT}`)
})