const fs = require('fs');

class Contenedor {

    constructor() {}
        /** Guarda el objeto en el archivo */
    save(object) {
        let array_product = []
        let content = fs.readFileSync('./file/producto.txt', 'utf-8')
        if (content) {
            let content_object = JSON.parse(content)
            array_product.push(content_object)
        }

        array_product.push(object);
        let array_product_JSON = JSON.stringify(array_product);

        fs.writeFileSync('./file/producto.txt', array_product_JSON, 'utf-8')
    }

    /** Obtiene el id buscado */
    getById(id) {

    }

    /** Lista todo */
    getAll() {

    }

    /** Elimina la información del id */
    deleteById(id) {

    }

    /** Elimina todo */
    deleteAll() {

    }
}

/** Se define el objeto */
let object = {
    title: 'Eucalipto',
    price: 5500,
    image: 'image/eucalipto.jpg'
}


const container = new Contenedor();
container.save(object);