const productos = JSON.parse(localStorage.getItem('productos'));

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
//ejecuto la funcion que combina y filtra la lista
const formFilter = (filters, productos) => {
    let productosFiltered = productos;
    let {
        category,
        priceRange,
        priceOrder
    } = filters;
    let list = [];
    if (priceRange !== undefined && priceRange !== 'all') {
        //separo los valores que cargué en el 'value' por ejemplo '0-5000' en 0 y 5000
        priceRange = priceRange.split(['-']);
        productosFiltered = Object.values(productos).filter(e => e.price >= priceRange[0] && e.price <= priceRange[1])

    }
    const isAll = (category) => {
        category = category.filter(e => e === 'all')
        return category;
    }

    if (category.length !== 0 && isAll(category).length == 0) {

        category.forEach(category => {
            if (category !== 'all') {
                productosFiltered.forEach(e => {
                    if (e.category == category) {
                        list.push(e);
                    }
                });
            }
        });
        productosFiltered = list;

    }
    if (priceOrder !== undefined) {
        productosFiltered = filterOrderByPrice(productosFiltered, priceOrder)
    }

    printListProducts(productosFiltered);

}

//recibo los datos de los filtros
$('#productFilter').change((e) => {
    e.preventDefault();
    let selectedCategory = [];
    $('input[name="category"]:checked').each(function () {
        selectedCategory.push($(this).val());
    });
    const filters = {
        category: selectedCategory,
        priceRange: $('input[name="priceFilter"]:checked').val(),
        priceOrder: $('input[name="priceOrder"]:checked').val()
    }
    formFilter(filters, productos)
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
$(".toglePriceRange").click(() => {
    $(".cardPriceRange").toggle('fast');
    $(".priceRangeIcon").toggleClass("fa-arrow-up fa-arrow-down")
});