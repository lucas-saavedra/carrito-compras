
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


$(".togleCat").click(() => {
    $(".cardCat").toggle('fast');
    $(".catIcon").toggleClass("fa-arrow-up fa-arrow-down")
});

$(".toglePrice").click(() => {
    $(".cardPrice").toggle('fast');
    $(".priceIcon").toggleClass("fa-arrow-up fa-arrow-down")
});