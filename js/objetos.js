class Producto {
    constructor(id,title,detail, price, category, color) {
        this.id = id;
        this.title = title;
        this.detail = detail;
        this.price = parseFloat(price);
        this.stock =null;
        this.category = category;
        this.color = color;
        this.amount = 0;
    }
    addStock(stock){
        this.stock = stock;
    }
    
}

class Cliente {
    constructor ({id,name,lastName,email,adress}){
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.adress = adress;
        this.shoppingCarts = [];
    }
    
    addShoppingCart(cart){
        this.shoppingCarts.push(cart);
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
        const precios = this.productos.map((prod) => prod.price);
        return precios.length > 0 ? precios.reduce((acc, value) => acc + value) : 0
    }
}

