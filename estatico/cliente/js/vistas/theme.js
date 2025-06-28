document.addEventListener('DOMContentLoaded', () => {
    const btnSwich = document.getElementById('toggle-switch');

    //aplica tema de localstorage si hay o por defecto dsetea en oscuro
    if (localStorage.getItem('modo') === 'claro') {
        document.body.classList.add('light-mode');
        btnSwich.checked = true;
        console.log("claro")    
    } else {
        document.body.classList.remove('light-mode');
        btnSwich.checked = false;
        console.log("oscuro")
    }

    //cambia con btn
    btnSwich.addEventListener('change', () => {
        console.log("cambio!")
    if (btnSwich.checked) {
        document.body.classList.add('light-mode');
        localStorage.setItem('modo', 'claro');
    } else {
        document.body.classList.remove('light-mode');
        localStorage.setItem('modo', 'oscuro');
    }
    });
});