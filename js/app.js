const fragment = document.createDocumentFragment();
let carrito = {};

/* rendirezo la lista de productos */
const printListProducts = (productos) => {
  const listProducts = document.getElementById('listProducts');
  const templateCard = document.getElementById('template-card').content;

  while (listProducts.firstChild) {
    listProducts.removeChild(listProducts.firstChild);
  }
  if (productos !== null) {

    productos.forEach(e => {
      templateCard.querySelector('h5').textContent = e.title
      templateCard.querySelector('.price').textContent = `$${e.price}`
      templateCard.querySelector('img').setAttribute('src', `${e.url}`);
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
const listProductsCart = document.getElementById('listProductsCart');
const templateCart = document.getElementById('template-cart').content;

const printCart = (carrito) => {

  while (listProductsCart.firstChild) {
    listProductsCart.removeChild(listProductsCart.firstChild);
  }
  if (carrito !== null) {
    Object.values(carrito).forEach(e => {
      templateCart.querySelector('img').setAttribute('src', `${e.url}`);
      templateCart.querySelector('h5').textContent = e.title;
      templateCart.querySelector('span').textContent = `Cantidad: ${e.amount}`;
      templateCart.querySelector('p').textContent = `$${e.price * e.amount}`;
      templateCart.querySelector('h6').textContent = `${e.category.charAt(0).toUpperCase() + e.category.substr(1)}`;
      templateCart.querySelector('.btnAddProd').setAttribute('onclick', `addProd(${e.id})`);
      templateCart.querySelector('.btnDeleteProd').setAttribute('onclick', `deleteProd(${e.id})`);

      const clone = templateCart.cloneNode(true);
      fragment.appendChild(clone)
    })
    listProductsCart.appendChild(fragment);
  }

  showIconCart(carrito);
  localStorage.setItem('carrito', JSON.stringify(carrito));

}

const showIconCart = (carrito) => {
  if (showAmount(carrito) == 0) {
    /* jquery para animaciones*/
    $('#cartIcon').hide();
    $('.btnConfirm').hide();
    document.getElementById('mostrarTotal').textContent = `Agregue algun producto de su interés...`;
  } else {
    $('#cartIcon').fadeIn();
    $('#mostrarTotal').show();
    $('.btnConfirm').show();
    document.getElementById('mostrarTotal').textContent = `Total: $${showTotal(carrito)}`;
    document.getElementById('showAmount').textContent = `${showAmount(carrito)}`;
  }
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
  //muestro el toast de boostrap
  let toastLiveExample = document.getElementById('liveToast')
  let toast = new bootstrap.Toast(toastLiveExample)
  document.querySelector('#toastMsg').textContent = `Genial! Agregaste: ${producto.title} a tu carrito!`
  toast.show()
  //
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
//funcion para quitar productos de carrito
const deleteProd = (idProducto) => {
  let producto = productos.find((e) => e.id === idProducto);
  carrito[producto.id].amount--;

  if (carrito[producto.id].amount == 0) {
    delete carrito[producto.id];
  }
  printCart(carrito);
}

/* renderizo las categorias para hacer el filtro*/
const renderCategory = (productos) => {
  const categoryRadioButton = document.getElementById('radioCatFilter');
  const templateRadio = document.getElementById('template-radio').content;
  let categorias = [];
  productos.forEach(e => {
    categorias.push(e.category)
  });
  categorias = categorias.filter((item, index) => {
    return categorias.indexOf(item) === index;
  })

  for (const e of categorias) {
    templateRadio.querySelector('input').setAttribute('value', e);
    templateRadio.querySelector('input').setAttribute('id', e);
    templateRadio.querySelector('input').setAttribute('name', 'category');
    templateRadio.querySelector('label').textContent = `${e.charAt(0).toUpperCase() + e.substr(1)}`;
    const clone = templateRadio.cloneNode(true);
    fragment.appendChild(clone)
  }
  categoryRadioButton.appendChild(fragment)
}

//funcion que devuelve la cantidad de productos en un rango de precios
const showAmountByPrice = (productos, priceBottom, priceTop) => {
  const productosFilter = Object.values(productos).filter(e => e.price >= priceBottom && e.price <= priceTop)
  return productosFilter.length;
}

//renderizo el filtro de los rangos de precios, que ademas cuenta los productos en cada rango
const renderPricesFilter = (productos) => {
  const bodyfilterPrice = document.getElementById('bodyfilterPrice');
  const template = document.getElementById('bodyfilterPriceTemplate').content;
  let productosPrices = [];
  Object.values(productos).forEach(e => {
    productosPrices.push(e.price)
  });
  productosPrices = productosPrices.sort((a, b) => {
    return a - b;
  })

  //distribuyo los productos en rangos de precios calculados por un porcentaje
  //luego cuento cada grupo para motsralo en el filtro
  const priceBottom = productosPrices[Math.ceil(productosPrices.length * 0.3)];
  const priceMiddle = productosPrices[Math.ceil(productosPrices.length * 0.5)];
  const priceTop = productosPrices[Math.ceil(productosPrices.length * 0.7)];
  const last = productosPrices[productosPrices.length - 1];
  //

  template.querySelectorAll('label')[0].textContent = `Hasta $${priceBottom}`;
  template.querySelectorAll('label')[1].textContent = `$${priceBottom} a $${priceMiddle}`;
  template.querySelectorAll('label')[2].textContent = `$${priceMiddle} a $${priceTop}`;
  template.querySelectorAll('label')[3].textContent = `De $${priceTop} en adelante`;
  template.querySelectorAll('label')[4].textContent = `Todos`;

  template.querySelectorAll('span')[0].textContent = showAmountByPrice(productos, 0, priceBottom);
  template.querySelectorAll('span')[1].textContent = showAmountByPrice(productos, priceBottom, priceMiddle);
  template.querySelectorAll('span')[2].textContent = showAmountByPrice(productos, priceMiddle, priceTop);
  template.querySelectorAll('span')[3].textContent = showAmountByPrice(productos, priceTop, last);
  template.querySelectorAll('span')[4].textContent = productos.length;


  template.querySelectorAll('input')[0].setAttribute('value', `0-${priceBottom }`)
  template.querySelectorAll('input')[1].setAttribute('value', `${priceBottom}-${priceMiddle }`)
  template.querySelectorAll('input')[2].setAttribute('value', `${priceMiddle}-${priceTop }`)
  template.querySelectorAll('input')[3].setAttribute('value', `${priceTop}-${last}`)
  template.querySelectorAll('input')[4].setAttribute('value', `all`)


  const clone = template.cloneNode(true);
  fragment.appendChild(clone)
  bodyfilterPrice.appendChild(fragment)
}

document.addEventListener('DOMContentLoaded', () => {
  // la llamada a la api falsa
  $.get('../js/productosFakeApi.json', (res, estado) => {
    if (estado === "success") {
      printListProducts(res.productos);
      localStorage.setItem('productos', JSON.stringify(res.productos))
      renderCategory(res.productos);
    }
  });
  //mantengo en memoria local los elemntos agregados al carrito
  renderPricesFilter(JSON.parse(localStorage.getItem('productos')));
  if (localStorage.getItem('carrito')) {
    carrito = JSON.parse(localStorage.getItem('carrito'))
    printCart(carrito);
  }
  showIconCart(carrito);

})