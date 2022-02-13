const fs = require('fs');

class Container {

    /** Se guardan los objetos en el archivo */
    save(product) {
        let content = fs.readFileSync('./file/producto.txt', 'utf-8');
        let array_product;
        if (content) {
            array_product = JSON.parse(content)
        } else {
            array_product = [];
        }
        array_product.push(product);
        array_product.forEach((value, index) => {
            value.id = index + 1;
        });
        let array_product_string = JSON.stringify(array_product)
        fs.writeFileSync('./file/producto.txt', array_product_string)
        console.log('Se guardo la información')
    }

    /** Se obtiene un elemento por el ID */
    getById(id) {
        let content = fs.readFileSync('./file/producto.txt', 'utf-8');
        let array_product;
        if (content) {
            array_product = JSON.parse(content)
        }
        let product_filter = array_product.find(element => element.id == id)
        product_filter = JSON.stringify(product_filter)
        return product_filter
    }

    /** Se obtiene toda la información */
    getAll() {
        let content = fs.readFileSync('./file/producto.txt', 'utf-8');
        let array_product;
        if (content) {
            array_product = JSON.parse(content)
        }
        return content
    }

    /** Se elimina por ID */
    async deleteById(id) {
        try {
            let content = fs.readFileSync('./file/producto.txt', 'utf-8');
            let array_product;
            if (content) {
                array_product = JSON.parse(content)
            }
            array_product.splice(id - 1, 1)
            let array_product_string = JSON.stringify(array_product)
            await fs.promises.writeFile('./file/producto.txt', array_product_string)

        } catch (err) {
            console.log(err);
        }
    }

    /** Se elimina todo */
    deleteAll() {
        fs.writeFileSync('./file/producto.txt', '');
        console.log('Se elimina contenido del archivo');
    }

    update(id, product, price) {
        let products = this.getAll()
        products = JSON.parse(products)
        products.map((e) => {
            if (e.id == id) {
                e.title = product
                e.total = price
            }
        })


        products = JSON.stringify(products)
        fs.writeFileSync('./file/producto.txt', products)
        return products

    }
}

module.exports = Container;

// /*** Sección de test */
// const container = new Container();
// // container.save({ title: 'rosas', total: 13000, image: 'image/jazmin.lpg' });
// // container.getById(3)
// // container.getAll()
// container.deleteById(2);
// // container.deleteAll();