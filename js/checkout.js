const fragment = document.createDocumentFragment();

//renderizo el resumen en una tabla
const printCartCheckout = (carrito) => {
  const listProductsCart = document.getElementById('listCart');
  const templateCart = document.getElementById('template-checkout').content;
  while (listProductsCart.firstChild) {
    listProductsCart.removeChild(listProductsCart.firstChild);
  }
  if (carrito !== null) {
    Object.values(carrito).forEach(e => {
      templateCart.querySelectorAll('td')[0].textContent = e.title;
      templateCart.querySelectorAll('td')[1].textContent = `${e.category.charAt(0).toUpperCase() + e.category.substr(1)}`;
      templateCart.querySelectorAll('td')[2].textContent = `${e.amount}`;
      templateCart.querySelectorAll('td')[3].textContent = `$${e.price}`;
      templateCart.querySelectorAll('td')[4].textContent = `$${e.price * e.amount}`;
      const clone = templateCart.cloneNode(true);
      fragment.appendChild(clone)
    })
    listProductsCart.appendChild(fragment);
  }
  document.getElementById('showTotal').textContent = `Total: $${showTotal(carrito)}`;
}
/* uso jquery para tomar los datos del formulario */

$('#productForm').submit(saveData = (e) => {
  let listClients = {};
  e.preventDefault();
  const cliente = new Cliente({
    id: Math.floor(Math.random() * 101),
    name: $('#name').val(),
    lastName: $('#lastName').val(),
    phone: $('#phone').val(),
    email: $('#email').val(),
    adress: $('#adress').val(),
  });
  const carrito = JSON.parse(localStorage.getItem('carrito'));

  if (localStorage.getItem('listClients') !== null) {
    listClients = JSON.parse(localStorage.getItem('listClients'))
  }

  let shoppingAmount = 0; //cuento la canitdad de veces que un usuario realizó compras

  //Agrupo las compras de cada usuario indexado por su email
  if (listClients.hasOwnProperty(cliente.email)) {
    listClients[cliente.email].shoppingCarts.push(carrito)
    shoppingAmount = listClients[cliente.email].shoppingCarts.length;
  } else {
    shoppingAmount = 1;
    cliente.addShoppingCart(carrito);
    listClients[cliente.email] = {
      ...cliente
    };
  }
  printResume(carrito, cliente, shoppingAmount);
  localStorage.setItem('listClients', JSON.stringify(listClients));
  localStorage.removeItem('carrito');

  Swal.fire(
    'Exito!',
    'Gracias por confiar en nosotros, su pedido le llegará pronto',
    'success'
  )

  //jquery para animaciones
  $('#checkoutForm').fadeOut();
  $('#checkout').fadeIn();
});



//renderizo el resumen de la compra
const printResume = (carrito, cliente, shoppingAmount) => {
  const resumeDiv = document.getElementById('resumeDiv');
  const templateResume = document.getElementById('template-resume').content;
  $('#checkout').show();
  if (carrito !== null) {
    resume.querySelector('#resume h4').textContent = `Compra Realizada! Muchas gracias ${cliente.name} ${cliente.lastName} `;
    resume.querySelector('#msgAdress').textContent =
      `Pronto nos estaremos comunicando con usted para coordinar el envío a ${cliente.adress}, y pronto le estará llegando un mensaje a ${cliente.email}`;
    Object.values(carrito).forEach(e => {
      templateResume.querySelector('p').textContent = ` ${e.title} x ${e.amount} unidad/es, por un valor de: $${e.price} c/u`;
      const clone = templateResume.cloneNode(true);
      fragment.appendChild(clone)
    });
    resumeDiv.appendChild(fragment);
    document.getElementById('showTotalResume').textContent = `Total: $${showTotal(carrito)}`;
    document.getElementById('showTotalshopping').textContent = `Compras realizadas: ${shoppingAmount}`;

  }
}

//me devuelve el total de la copmpra
const showTotal = carrito => {
  if (carrito == null) {
    return 0
  }
  const nTotal = Object.values(carrito).reduce((acc, {
    amount,
    price
  }) => acc + price * amount, 0);
  return nTotal
}

document.addEventListener('DOMContentLoaded', () => {
  const carrito = JSON.parse(localStorage.getItem('carrito'));
  printCartCheckout(carrito);
  /*Jquery para animaciones */
  $('#checkout').hide();
})