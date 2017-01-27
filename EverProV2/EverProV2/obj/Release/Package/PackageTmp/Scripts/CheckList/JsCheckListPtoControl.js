$("#usu").val("q");
function validar(e) { // 1
    tecla = (document.all) ? e.keyCode : e.which; // 2
    if (tecla == 8) return true; // 3
    if (tecla == 38) return true;
    patron = /[]/; // 4
    te = String.fromCharCode(tecla); // 5
    return patron.test(te); // 6
}

$(document).ready(function () {

    $("#listExisteCuenta").on("click", function () {
        if ($("#listExisteCuenta").val() == "SI") {

            $("#txtNoCuenta").show();
            $("#numeroCuenta").show();

        } else if ($("#listExisteCuenta").val() == "") {

            $("#txtNoCuenta").hide();
            $("#numeroCuenta").hide();
        }
    });



    //$("#bntImprimir").on("click", function () {
    //    debugger;
    //    $("#bntImprimir").hide();
    //    $("#agregarCampo1").hide();
    //    var divContents = $("#frm_datos").html();

    //    $("#bntImprimir").show();
    //    $("#agregarCampo1").show();
    //    var printWindow = window.open('', '', 'height=800,width=1500');
    //    printWindow.document.write('<html><head><title>Punto de control</title>');
    //    printWindow.document.write('</head><body >');
    //    printWindow.document.write(divContents);
    //    printWindow.document.write('</body></html>');
    //    printWindow.document.close();
    //    printWindow.print();
    //    printWindow.closeAction = 'destroy';
    //    printWindow.close();

    //});


});

