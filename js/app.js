/* clase producto */
class Producto {
  constructor(id, nombre, precio, stock, categoria, color) {
    this.id = Number(id);
    this.nombre = nombre.toLowerCase();
    this.precio = parseFloat(precio);
    this.stock = Number(stock);
    this.categoria = categoria;
    this.color = color;
  }
  /* metodos */
  cambiarNombre(nombre) {
    nombre = prompt('Ingrese el nuevo nombre');
    alert(`Nombre viejo: ${this.nombre}, nuevo nombre ${nombre}`)
    this.nombre = nombre;
  }
  hayStock() {
    return this.stock > 0 ? true : false;
  }
  comprarProducto() {
    if (this.hayStock(this.stock)) {
      this.stock--;
      alert(`Felicitaciones! Compraste ${this.nombre} a $${this.precio},restantes ${this.stock}`);
      return true;
    } else {
      alert('No se puede comprar, no hay stock');
      return false;
    }
  }
}
/* seteo de variables */
salida = false;
carrito = [];

/* instancio los productos */
producto1 = new Producto(1, 'Lampara', 3000, 1, 'iluminacion', 'blanco');
producto2 = new Producto(2, 'Ventilador', 5000, 10, 'acondicionamiento', 'negro');
producto3 = new Producto(3, 'Sillon', 7000, 3, 'muebles', 'gris');
producto4 = new Producto(4, 'Mesa de luz', 3000, 0, 'iluminacion', 'marron');
producto5 = new Producto(5, 'Pelota', 1000, 3, 'futbol', 'marron');

/* funciones para trabajar el carrito */
const agregarCarrito = (producto) => {
  if (producto.comprarProducto()) carrito.push(producto);
}

const busquedaId = (array, id) => {
  return array.find(e => e.id == Number(id));
}

const filtroCat = (array, categoria) => {
  return array.filter(e => e.categoria.includes(categoria));
}
/* menu interactivo de compra */
alert('Seleccione que desea comprar o hacer')
do {
  switch (Number(prompt(`
    [${producto1.id}] ${producto1.nombre} | $ ${producto1.precio} | Cat: ${producto1.categoria}
    [${producto2.id}] ${producto2.nombre} | $ ${producto2.precio} | Cat: ${producto2.categoria}
    [${producto3.id}] ${producto3.nombre} | $ ${producto3.precio} | Cat: ${producto3.categoria}
    [${producto4.id}] ${producto4.nombre} | $ ${producto4.precio} | Cat: ${producto4.categoria}
    [${producto5.id}] ${producto5.nombre} | $ ${producto5.precio} | Cat: ${producto5.categoria}
    [6] Mostrar carrito
    [7] Filtrar carrito por categoria
    [8] Salir
    `))) {
    case 1:
      if (producto1.comprarProducto()) {
        carrito.push(producto1);
      }
      break;
    case 2:
      if (producto2.comprarProducto()) {
        carrito.push(producto2);
      }
      break;
    case 3:
      if (producto3.comprarProducto()) {
        carrito.push(producto3);
      }
      break;
    case 4:
      if (producto4.comprarProducto()) {
        carrito.push(producto4);
      }
      break;
    case 5:
      if (producto5.comprarProducto()) {
        carrito.push(producto5);
      }
      break;
    case 6:
      console.log(`Cantidad de productos: ${carrito.length}`);
      for (const e of carrito) {
        console.log(`Nombre ${e.nombre} |Precio: $${e.precio} |Categoria: ${e.categoria}`)
      }
      break;
    case 7:
      filtroCatString = prompt('Escriba una categoria')
      carritoFiltrado = filtroCat(carrito, filtroCatString.toLowerCase());
      for (const e of carritoFiltrado) {
        console.log(`Nombre ${e.nombre} |Precio: $${e.precio} |Categoria: ${e.categoria}`)
      }
      break;
    case 8:
      alert('Gracias por usar nuetro programa');
      salida = true;
      break;
    default:
      alert('Esa opcion no existe!')
      break;
  }
} while (salida == false);