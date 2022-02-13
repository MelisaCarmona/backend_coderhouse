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
    res.sendFile(__dirname + '/public/index.html');
    // let productos = container_class.getAll()
    // res.send(`<h1 style="font-family:cursive">Que comience el juego!!!</h1>`)
})

/** Array de productos disponibles */
products.get('/productos', (req, res) => {
    let productos = container_class.getAll()
    if (!products) {
        const error = new Error('No hay productos registrados')
        return next(error)
    }
    res.send(`${productos}`)
})

// Obtener por items
products.get('/productos/:id', (req, res, next) => {
    let id = req.params.id;
    let products = container_class.getById(id)
    if (!products) {
        const error = new Error('El producto no existe')
        return next(error)
    }
    res.send(`${products}`)
})

const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, 'image')
        },
        filename: function(req, file, cb) {
            cb(null, file.originalname)
        }
    })
    /** Agregar producto */
const fileMiddleware = multer({ storage: storage })
products.post('/productos', fileMiddleware.single('image'), (req, res, next) => {
        const file = req.file
        let title = req.body.title
        let price = req.body.price

        if (!file || !title || !price) {
            const error = new Error('Se deben ingresar todos los datos')
            error.httpStatusCode = 400;
            return next(error)
        }
        let route = req.file.destination + '/' + req.file.originalname

        let product = new Object();
        product.title = title
        product.price = price
        product.image = route
        let productos = container_class.getAll()
        productos = JSON.parse(productos)
        product.id = productos.length + 1;
        // productos.push(product);
        container_class.save(product)
        res.send(product)
            // let id = req.params.id;
            // let title = req.params.title
            // let total = req.params.total
            // let products = container_class.getById(id)
            // res.send(`${products}`)
    })
    /** Actualizar un producto */
products.put('/productos', (req, res, next) => {
        let id = req.body.id
        let product = container_class.getById(id)
        if (!product) {
            const error = new Error('El producto no existe')
            return next(error)
        }

        let title = req.body.title
        let price = req.body.price
        let products = container_class.update(id, title, price)
        product = JSON.parse(products)
        res.send(products)


    })
    /** Actualizar un producto */
products.delete('/productos', (req, res, next) => {
    let id = req.body.id
    let product = container_class.getById(id)
    if (!product) {
        const error = new Error('El producto no existe')
        return next(error)
    }

    container_class.deleteById(id)
    product = JSON.parse(product)
    res.send(`Se eliminó el producto ${product.id} - ${product.title}`)


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
app.use('/static', express.static('public'))

app.use('/api', products)
app.listen(PORT, () => {
    console.log(`Salida por puerto ${PORT}`)
})