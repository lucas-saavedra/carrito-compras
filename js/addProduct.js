const categorias = ['iluminacion', 'muebles', 'futbol', 'joyeria', 'acondicionamiento'];
const colores = ['blanco', 'negro', 'gris', 'amarillo', 'rojo'];

let productForm = document.getElementById('productForm');
let selectCat = document.getElementById('cat');
let selectcolor = document.getElementById('color');
let productList = [];

const saveData = () => {

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
    notif('Exito');
}

const notif = (msg) => {
    div = document.getElementById('notif');
    div.textContent = msg;
    div.setAttribute('class', "alert alert-success alert-dismissible my-3");
    div.setAttribute('role', 'alert')
    div.setAttribute('id', 'liveAlert')

    button = document.createElement('button');
    button.setAttribute("type", "button")
    button.setAttribute("class", "btn-close")
    button.setAttribute("data-bs-dismiss", "alert")
    button.setAttribute("aria-label", "Close")
    div.appendChild(button);

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


productForm.addEventListener('submit', saveData);