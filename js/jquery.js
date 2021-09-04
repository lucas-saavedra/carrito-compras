$(document).ready(function () {

});
const filterOrderByPrice = (productos, orderType) => {

    return productos.sort((a, b) => {
        const bool = orderType === 'min' ? true : false

        if (bool ? a.price > b.price : a.price < b.price) {
            return 1;
        }
        if (bool ? a.price < b.price : a.price > b.price) {
            return -1;
        }
        return 0;
    });

}
const filterByPrice = (productos, priceRange) => {
    return productos.filter(e => e.price <= priceRange);
}
const filterByCat = (productos, category) => {
    return productos.filter(e => e.category == category);
}

$('#productForm').submit(saveData = (e) => {
    let listClients = {};
    e.preventDefault();
    const cliente = new Cliente({
        id: Math.floor(Math.random() * 101),
        name: $('#name').val(),
        lastName: $('#lastName').val(),
        phone: $('#phone').val(),
        email: $('#email').val(),
    });
    const carrito = JSON.parse(localStorage.getItem('carrito'));

    if (localStorage.getItem('listClients') !== null) {
        listClients = JSON.parse(localStorage.getItem('listClients'))
    }
    //Agrupo las compras de cada usuario indexado por su email
    if (listClients.hasOwnProperty(cliente.email)) {
        listClients[cliente.email].shoppingCarts.push(carrito)
    } else {

        cliente.addShoppingCart(carrito);
        listClients[cliente.email] = {
            ...cliente
        };
    }

    localStorage.setItem('listClients', JSON.stringify(listClients));
    localStorage.removeItem('carrito');

    Swal.fire(
        'Exito!',
        'Gracias por confiar en nosotros, su pedido le llegará pronto',
        'success'
    )
    const timeout = () => {
        window.location.href = "../index.html"
    }
    setTimeout(timeout, 5000)

});

$('#radioPriceFilter')
    .change(() => {
        printListProducts(filterOrderByPrice(productos, $('input[name="radioPrice"]:checked').val()))
    })
$('#radioCatFilter')
    .change(() => {
        printListProducts(filterByCat(productos, $('input[name="category"]:checked').val()))
    })


$('#priceRangeDiv').change(() => {
    printListProducts(filterByPrice(productos, $('#priceRange').val()))
    $("#labelRange").html(`Rango de precio: $${$('#priceRange').val()} `);
})
$('#btnFilterReset').click(() => {
    printListProducts(productos);
})