localStorage.setItem('listaProductos', JSON.stringify(productos));

if (localStorage.getItem('nombre') !== null) {
  nombre = localStorage.getItem('nombre')
} else {
  nombre = prompt('Ingrese su nombre');
  localStorage.setItem('nombre', nombre);
}


let mensaje = document.querySelector('#saludoBienvenida');
let h2 = document.createElement('h2');
h2.textContent = `Bienvenido! ${nombre}, este es el listado de productos disponibles`;
h2.setAttribute('class', 'text-center');
mensaje.appendChild(h2);

let listaProd = document.querySelector("#listadoProductos");
let listaProdCarrito = document.querySelector("#listadoProductosCarrito");

carrito = new Carrito;


productos.forEach(e => {
  let tr = document.createElement("tr")
  tr.setAttribute('idProducto', e.id);
  let td0 = document.createElement("td")
  td0.textContent = e.id;

  let td1 = document.createElement("td")
  td1.textContent = e.titulo;

  let td2 = document.createElement("td")
  td2.textContent = e.cat;

  let td3 = document.createElement("td")
  td3.textContent = `$${e.precio}`;

  let button = document.createElement('button');
  button.textContent = 'Agregar';
  button.setAttribute('class', 'btn btn-success itemProducto');
  button.setAttribute('onclick', `console.log(${e.id})`);

  let td4 = document.createElement("td");
  td4.appendChild(button);

  tr.appendChild(td0);
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  listaProd.appendChild(tr)
})
do {
  idIngresado = Number(prompt(productos.map((e) => `id:${e.id}) ${e.titulo} $${e.precio} `).join('|')));
  producto_nuevo = productos.find((e) => e.id === idIngresado);
  carrito.agregarProductos(producto_nuevo);
  otroProducto = confirm('Desea comprar algo más?')
} while (otroProducto)

carrito.productos.forEach(e => {
  //CREAMOS ELEMENTOS
  let tr = document.createElement("tr")

  let td0 = document.createElement("td")

  td0.textContent = e.id;

  let td1 = document.createElement("td")
  td1.textContent = e.titulo;

  let td2 = document.createElement("td")
  td2.textContent = e.cat;

  let td3 = document.createElement("td")
  td3.textContent = `$${e.precio}`;


  tr.appendChild(td0);
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);


  listaProdCarrito.appendChild(tr);

})

document.getElementById('mostrarTotal').textContent = `$${carrito.obtenerPrecioFinal()}`;

/* const agregarProd = (idProducto) => {
  producto_nuevo = productos.find((e) => e.id === idProducto);
  carrito.agregarProductos(producto_nuevo);
} */

/* let item = document.getElementsByClassName('itemProducto');
for(const e of item)
{
  console.log(e.parentElement.parentElement.getAttribute('idProducto'));
}; */