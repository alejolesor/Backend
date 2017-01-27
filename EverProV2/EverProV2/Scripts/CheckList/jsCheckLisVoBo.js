
function validar(e) { // 1
    tecla = (document.all) ? e.keyCode : e.which; // 2
    if (tecla == 8) return true; // 3
    if (tecla == 38) return true;
    patron = /[]/; // 4
    te = String.fromCharCode(tecla); // 5
    return patron.test(te); // 6
}

$(document).ready(function () {

    $("#btnFinal").hide();
    if ($("#txtFechaFinal").val() == "") {
        $("#btSiguiente").hide();

    }

    //Con el id de la tabla deshabilitamos los campos de la tabla
    for (j = 1; j <= 6 ; j++) {
        tab = document.getElementById('tabla' + [j]);
        for (i = 0; ele = tab.getElementsByTagName('input')[i]; i++) {
            ele.disabled = true;

        }
    }
    $("#txtRadicadoBonita").removeAttr("disabled");


    $("#btnInicio").on("click", function () {
        debugger;
        $("#txtFechaInicio").val("" + getDate());
        $("#btnFinal").show();
        $("#btnInicio").hide();

    });


    $("#btnFinal").on("click", function () {

        bootbox.dialog({
            message: "<h4>¿Está seguro que desea marcar la hora final?.</h4>",
            //title: "<b>Advertencia</b>",
            buttons: {
                success: {
                    label: ":: SI ::",
                    className: "btn btn-login"
                    , callback: function () {
                        $("#txtFechaFinal").val("" + getDate());
                        $("#btnFinal").hide();
                        $("#btnSiguiente").show();
                    }
                },
                danger: {
                    label: "NO",
                    className: "btn-danger",
                    callback: function () {
                        $("#btnSiguiente").hide();
                    }
                }
            }
        });

    });

});
