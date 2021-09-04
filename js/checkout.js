const fragment = document.createDocumentFragment();

const notifBody = document.getElementById('notif');
const templateNotif = document.getElementById('template-notif').content;

const listProductsCart = document.getElementById('listCart');
const templateCart = document.getElementById('template-checkout').content;

const printCartCheckout = (carrito) => {

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

const showTotal = carrito => {
  if (carrito == null){
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
})