const darkMode = () => {
    if ($('input[name="mode"]:checked').val()) {
        localStorage.setItem('darkMode', 'true');
        $('link[href="/assets/css/light.css"]').attr('href', '../assets/css/dark.css');
        $(".btn-close").toggleClass("btn-close-white");

    } else {
        localStorage.setItem('darkMode', 'false');
        $('link[href="../assets/css/dark.css"]').attr('href', '/assets/css/light.css');
        $(".btn-close").toggleClass("btn-close-white");
    }
}

$('#darkMode').click(darkMode)

document.addEventListener('DOMContentLoaded', () => {
    //mantengo el valor de si se seleccionó o no el dark mode
    if (localStorage.getItem('darkMode') != null) {
        if (localStorage.getItem('darkMode') == 'true') {
            $('#darkMode').attr('checked', 'checked')
            darkMode();
        }
    }
})