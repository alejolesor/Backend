function validar(e) { // 1
    tecla = (document.all) ? e.keyCode : e.which; // 2
    if (tecla == 8) return true; // 3
    if (tecla == 38) return true;
    patron = /[]/; // 4
    te = String.fromCharCode(tecla); // 5
    return patron.test(te); // 6
}

$(document).ready(function () {

    //Con el id de la tabla deshabilitamos los campos de la tabla
    for (j = 1; j <= 1; j++) {
        tab = document.getElementById('tabla' + [j]);
        for (i = 0; ele = tab.getElementsByTagName('input')[i]; i++) {
            ele.disabled = true;

        }
    }
    $("#txtRadicadoBonita").removeAttr("disabled");

});
