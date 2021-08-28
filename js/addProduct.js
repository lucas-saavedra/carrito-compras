
let productForm = document.getElementById('productForm');
let selectCat = document.getElementById('cat');
let selectcolor = document.getElementById('color');
let productList = [];

const listProducts = document.getElementById('listProducts');
const templateCard = document.getElementById('template-card').content;
const fragment = document.createDocumentFragment();
let productListLocal = JSON.parse(localStorage.getItem('productList'));

const notifBody = document.getElementById('notif');
const templateNotif = document.getElementById('template-notif').content;

const saveData = (e) => {
    e.preventDefault();
    let title = document.getElementById('title').value;
    let detail = document.getElementById('detail').value;
    let color = document.getElementById('color').value;
    let cat = document.getElementById('cat').value;
    let price = document.getElementById('price').value;
    let producto = new Producto(Math.floor(Math.random() * 101), title, detail, price, cat, color);

    if (JSON.parse(localStorage.getItem('productList') !== null)) {
        productList = JSON.parse(localStorage.getItem('productList'));
        productList.push(producto);
        localStorage.setItem('productList', JSON.stringify(productList));
    } else {
        productList.push(producto);
        localStorage.setItem("productList", JSON.stringify(productList));
    }
    
    document.getElementById("productForm").reset();
    printListProductsLocal(productList)
}

const printListProductsLocal = (productos) => {
    while (listProducts.firstChild) {
      listProducts.removeChild(listProducts.firstChild);
    }
    if (productos !== null) {
      productos.forEach(e => {
        templateCard.querySelector('h5').textContent = e.title
        templateCard.querySelector('.price').textContent = `$${e.price}`
        templateCard.querySelector('.detail').textContent = `Detalle: ${e.detail}`
        templateCard.querySelector('.category').textContent = `${e.category.charAt(0).toUpperCase() + e.category.substr(1)}`
        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone)
      })
      listProducts.appendChild(fragment);
    }
  }

for (const e of categorias) {
    option = document.createElement('option');
    option.textContent = `${e.charAt(0).toUpperCase() + e.substr(1)}`;
    option.setAttribute('value', `${e}`)
    selectCat.appendChild(option);
}

for (const e of colores) {
    option = document.createElement('option');
    option.textContent = `${e.charAt(0).toUpperCase() + e.substr(1)}`;
    option.setAttribute('value', `${e}`)
    selectcolor.appendChild(option);
}


productForm.addEventListener('submit', e => {
    saveData(e);
    
});

document.addEventListener('DOMContentLoaded', () => {
    printListProductsLocal(productListLocal);
  })