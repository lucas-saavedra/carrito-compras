let listaProd = document.querySelector("#listadoProductos");
let listaProdCarrito = document.querySelector("#listProductsCart");
let carrito = {};


////////

const listProducts = document.getElementById('listProducts');
const templateCard = document.getElementById('template-card').content;

const listProductsCart = document.getElementById('listProductsCart');
const templateCart = document.getElementById('template-cart').content;

const categoryRadioButton = document.getElementById('categoryRadioButton');
const templateRadio = document.getElementById('template-radio').content;

const input = document.getElementById('searchProducts');

const fragment = document.createDocumentFragment();
/*implementé template para reducir la cantidad de codigo al renderizar */


/* rendirezo la lista de productos */
const printListProducts = (productos) => {
  while (listProducts.firstChild) {
    listProducts.removeChild(listProducts.firstChild);
  }
  if (productos !== null) {
    productos.forEach(e => {
      templateCard.querySelector('h5').textContent = e.title
      templateCard.querySelector('.price').textContent = `$${e.price}`
      templateCard.querySelector('.category').textContent = `${e.category.charAt(0).toUpperCase() + e.category.substr(1)}`
      templateCard.querySelector('.button-item').dataset.id = e.id;
      templateCard.querySelector('.button-item').setAttribute('onclick', `addProd(${e.id})`);
      const clone = templateCard.cloneNode(true);
      fragment.appendChild(clone)
    })
    listProducts.appendChild(fragment);
  }
}

/* renderizo el carrito en un off canvas */
const printCart = (carrito) => {
  while (listProductsCart.firstChild) {
    listProductsCart.removeChild(listProductsCart.firstChild);
  }
  if (carrito !== null) {
    Object.values(carrito).forEach(e => {

      templateCart.querySelector('h5').textContent = e.title;
      templateCart.querySelector('span').textContent = `Cantidad: ${e.amount}`;
      templateCart.querySelector('p').textContent = `$${e.price * e.amount}`;
      templateCart.querySelector('h6').textContent = `${e.category.charAt(0).toUpperCase() + e.category.substr(1)}`;
      templateCart.querySelector('.btnAddProd').dataset.id = e.id;
      templateCart.querySelector('.btnDeleteProd').dataset.id = e.id;

      const clone = templateCart.cloneNode(true);
      fragment.appendChild(clone)
    })

    listProductsCart.appendChild(fragment);
  }

  document.getElementById('mostrarTotal').textContent = `Total: $${showTotal(carrito)}`;
  document.getElementById('showAmount').textContent = `${showAmount(carrito)}`;

}
/* me devuelve el valor total de todas las compras */
const showTotal = carrito => {
  const nTotal = Object.values(carrito).reduce((acc, {
    amount,
    price
  }) => acc + price * amount, 0);
  return nTotal

}
/* me devuelve la cantidad total de productos y lo renderizo en el icono del carrito */
const showAmount = carrito => {
  const nAmount = Object.values(carrito).reduce((acc, {
    amount
  }) => acc + amount, 0);
  return nAmount;
}
/* agrego el producto */
const addProd = (idProducto) => {
  let producto = productos.find((e) => e.id === idProducto);
  if (carrito.hasOwnProperty(producto.id)) {
    producto.amount = carrito[producto.id].amount + 1;
  } else {
    producto.amount = 1;
  }
  carrito[producto.id] = {
    ...producto
  };
  printCart(carrito);
}
/* renderizo las categorias para hacer el filtro(no esta terminado todavia) */
const renderCategory = () => {
  for (const e of categorias) {
    templateRadio.querySelector('input').setAttribute('value', e);
    templateRadio.querySelector('input').setAttribute('id', e);
    templateRadio.querySelector('label').textContent = `${e.charAt(0).toUpperCase() + e.substr(1)}`;
    const clone = templateRadio.cloneNode(true);
    fragment.appendChild(clone)

  }
  categoryRadioButton.appendChild(fragment)
}

/* un live search para bucar el producto con solo ir escribiendo */
input.addEventListener('keyup', () => {
  const filterProducts = productos.filter(e => e.title.toLowerCase().indexOf(input.value.toLowerCase()) !== -1);
  printListProducts(filterProducts);
  console.log(filterProducts);
})



document.addEventListener('DOMContentLoaded', () => {
  printListProducts(productos);
  renderCategory();
})