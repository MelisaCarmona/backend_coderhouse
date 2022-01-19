const express = require('express')
const app = express()
const PORT = 8080


app.get('/productos', (req, res) => {
    res.send(`Número de visitas ${visitas++}`)

})

app.listen(port, () => {
    console.log(`Salida por puerto ${port}`)
})