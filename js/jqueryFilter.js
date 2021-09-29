const productos = JSON.parse(localStorage.getItem('productos'));
//ordeno de mayor a menos o viceversa
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
//uso un trigger para poder combinar el search con el formulario de filtro
$('#searchProducts').on('search', () => {
    $('#productFilter').trigger('change')
})

// funcion que combina y filtra la lista
const formFilter = (filters, productos) => {
    console.log(filters);
    let productosFiltered = productos;
    let {
        category,
        priceRange,
        priceOrder,
        search
    } = filters;
    let list = [];
    //filtro con el buscador search
    productosFiltered = productosFiltered.filter(e => e.title.toLowerCase().indexOf(search.toLowerCase()) !== -1);
    //por rango
    if (priceRange !== undefined && priceRange !== 'all') {
        //separo los valores que cargué en el 'value' por ejemplo '0-5000' en 0 y 5000
        priceRange = priceRange.split(['-']);
        productosFiltered = Object.values(productosFiltered).filter(e => e.price >= priceRange[0] && e.price <= priceRange[1])

    }
    const isAll = (category) => {
        category = category.filter(e => e === 'all')
        return category;
    }
    //por categoria
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
    //por mayor o menor precio
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
        priceOrder: $('input[name="priceOrder"]:checked').val(),
        search: $('#searchProducts').val()
    }
    formFilter(filters, productos)
})


$('#btnFilterReset').click(() => {
    printListProducts(productos);
})
// pequeña animacion de acordeon que esconde o hace aparecer la tarjeta de cada filtro
const tCat = (card, icon) => {
    $(`.${card}`).toggle('fast');
    $(`.${icon}`).toggleClass("fa-arrow-up fa-arrow-down")
}
$(".togleCat").click(() => {
    tCat('cardCat', 'catIcon')
});

$(".toglePrice").click(() => {
    tCat('cardPrice', 'priceIcon')
});
$(".toglePriceRange").click(() => {
    tCat('cardPriceRange', 'priceRangeIcon')
});