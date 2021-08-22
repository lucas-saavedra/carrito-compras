class Producto {
    constructor(id, nombre, precio, stock, categoria, color) {
        this.id = Number(id);
        this.nombre = nombre.toLowerCase();
        this.precio = parseFloat(precio);
        this.stock = Number(stock);
        this.categoria = categoria;
        this.color = color;
    }
}

class Carrito {
    constructor() {
        this.productos = [];
    }
    agregarProductos(producto) {
        this.productos.push(producto);
    }
    obtenerPrecioFinal() {
        const precios = this.productos.map((prod) => prod.precio);
        return precios.length > 0 ? precios.reduce((acc, value) => acc + value) : 0
    }
}