/// <reference path="../../Views/MenuCheckList/Index.aspx" />
var FieldCount = 0;
var convenios = new Array();

var fechaActual = new Date();
var dia, mes;
mes = fechaActual.getMonth() + 1;
dia = fechaActual.getDate();
if (mes <= 9) {

    mes = "0" + mes;
}
if (dia <= 9) {

    dia = "0" + dia
}

var fechahoy = (fechaActual.getFullYear() + "-" + mes + "-" + dia);

//Funcion para que el usuario solo puedar digitar las letras.
function soloLetras(e) {
    debugger;
    if (e.keyCode != 32) {
        if (e.keyCode > 16 && e.keyCode <= 57) {
            e.returnValue = false;
        }
    }

}
function soloMayusculas(h) {
    debugger;
    var f = $("#" + h);
    f.val(f.val().toUpperCase());
    f.on("focusout", function () {
        f.val(f.val().toUpperCase());
    });
}

$(document).ready(function () {

    $("#txtEstadoDactiloscopia").on("change", function () {
        if ($("#txtEstadoDactiloscopia").val() == 'APROBADO') {

            $("#btnSiguiente").show();

        } else {
            $("#btnSiguiente").hide();
        }
    });

    $("#MainContent_txtMontoAprobadoGic").maskMoney({ allowNegative: true, thousands: '.', decimal: ',', affixesStay: false });
    $("#txtEstatura").attr('maxlength', '5');
    $("#txtPeso").attr('maxlength', '5');
    $("#txtMontoSolicitado").maskMoney({ allowNegative: true, thousands: '.', decimal: ',', affixesStay: false });
    $("#txtPeso").maskMoney({  suffix: 'Kg' , allowNegative: true, thousands: '.', decimal: ',', affixesStay: true,precision: 0});
    $("#txtEstatura").maskMoney({ suffix: 'cm', symbolPosition: 'right', allowNegative: true, thousands: '.', decimal: ',', affixesStay: true, precision: 0 });
    $("#txtFechaEtapaBonita, #txtDesprendiblePago").attr("max", fechahoy);
    $("#txtFechaTransmision").attr("min", fechahoy);
    
    //Imprimir formulario punto de control
    $("#bntImprimir").click(function () {
        imprimir("frm_datos");
    });

    $("#txtFechaTransmision").attr("min", fechahoy);



    $("#txtPlazoSolicitado").on("focusout", function () {
        if ($("#txtPlazoSolicitado").val() < 6 || $("#txtPlazoSolicitado").val() > 108) {


            $("#txtPlazoSolicitado").tooltip({
                hide: {
                    effect: "explode",
                    delay: 250,

                }
            });
            $("#txtPlazoSolicitado").attr("title", "Número de meses invalido");

            $("#txtPlazoSolicitado").focus();
        }

    });

    $("#txtVcomprarCartera").maskMoney({ allowNegative: true, thousands: '.', decimal: ',', affixesStay: false });
    if ($("#listExisteCuenta").val() == "SI") {

        $("#txtNoCuenta").show();
        $("#numeroCuenta").show();

    } else if ($("#listExisteCuenta").val() == "") {

        $("#txtNoCuenta").hide();
        $("#numeroCuenta").hide();
    }

    if ($("#txtFechaFinal").val() == "") {
        $("#btnSiguiente").hide();

    }
    $("#btnSiguiente").hide();
    $("#btnDevolucion").hide();
    var nit;
    var nit2;
    var entidad;
    var area;
    var harea;
    var x = $("#contenedor tr").length;
    var verificarRadicado = $("#agregarCampo1");
    var CamposSeccionCheckList;
    var camposexistentesCheckList;
    $(verificarRadicado).click(function () {
        //metodo en el que se consulta los radicados si existen o no si, y si es una devolucion o no. según el criterio se muestra la información
        $("#btnFinal").hide();
        $("#btnSiguiente").show();
        $("#btnDevolucion").show();

        var radicado = $("#txtRadicadoBonita").val();
        if (radicado == "") {
            bootbox.dialog({
                message: "<h4>Ingrese un valor...</h4>",
                //title: "<b>Advertencia</b>",
                buttons: {
                    success: {
                        label: ":: Aceptar ::",
                        className: "btn btn-login"
                    }
                }
            });
        }
        else {
            CamposSeccionCheckList = JSON.stringify({ 'ListCampos': radicado })
            $.ajax({
                type: "POST",
                dataType: "json",
                contentType: 'application/json', // Tipo de datos que envío
                url: "/CheckListVCD/LoadFormVCD",
                async: false,
                data: CamposSeccionCheckList,
                success: function (Result) {

                    if (Result != "") {
                        var FieldCount = 0;
                        camposexistentesCheckList = Result;
                        $(contenedor).html("");
                        $.each(Result, function (index, item) { // Iterates through a collection
                            $.each(item, function (it, values) {
                                var f;
                                $("#" + values.NombreCampo).val(values.valor);
                                $("#txtObservaciones").val("");
                                var c = Result.length - 1;
                                if (index + 1 == c) {
                                    var HistorialObservaciones = "";
                                    area = "";
                                    var EstadoCheckList = "";
                                    $.each(Result[Result.length - 1], function (t, values) {
                                        harea = Result[Result.length - 1][t].IdArea;
                                        if (Result[Result.length - 1][t].IdArea == 1) {

                                            area = "VCD"

                                        }
                                        if (Result[Result.length - 1][t].IdArea == 2) {

                                            area = "VoBo"

                                        }
                                        if (Result[Result.length - 1][t].IdArea == 3) {

                                            area = "Pto. de control"

                                        }
                                        if (Result[Result.length - 1][t].IdArea == 4) {

                                            area = "DESEMBOLSO"

                                        }
                                        if (Result[Result.length - 1][t].IdArea == 5) {

                                            area = "SEGMENTACION"

                                        }
                                        if (Result[Result.length - 1][t].IdEstado == 1) {

                                            EstadoCheckList = "APROBADO"

                                        }
                                        if (Result[Result.length - 1][t].IdEstado == 2) {

                                            EstadoCheckList = "DEVOLUCION"

                                        }

                                        HistorialObservaciones = HistorialObservaciones + (t + 1) + ") " + "<b>" + area + "</b>: " + Result[Result.length - 1][t].Observaciones + "<br>" + "***********************************************************************************<br>"


                                    });
                                    $("#nav").html("Observaciones: <br>" + HistorialObservaciones);
                                    $("#txtValidacionFormalizacion").val(EstadoCheckList);
                                }
                            })

                        });
                        //Se valida si el area de la que se consulta es diferente de la que viene el documento con ayuda de un campo oculto en cada formulario.
                        if ($("#IdArea").val() != harea) {

                            if ($("#txtValidacionFormalizacion").val() == "DEVOLUCION") {

                                if (($("#IdArea").val() > harea)) {
                                    bootbox.dialog({
                                        message: "Este documento lo tiene el área de " + "<b>" + area + "</b>",
                                        title: "<b>¡Advertencia!</b>",
                                        buttons: {
                                            success: {
                                                label: ":: Aceptar ::",
                                                className: "btn btn-login",
                                                callback: function () {
                                                    $("#frm_datos").attr("action", "/Home/Index")
                                                    $("#frm_datos").submit();

                                                }

                                            }
                                        }
                                    });


                                    $("#bootbox-body").css("height", "300px");
                                    $("#bootbox-body").css(" overflow-y", "auto");

                                }


                            }
                            else if ($("#txtValidacionFormalizacion").val() == "APROBADO") {
                                if ($("#IdArea").val() != 3) {
                                    if (($("#IdArea").val() - harea) >= 2) {
                                        bootbox.dialog({
                                            message: "Este documento no puede ser consultado aún en esta área ",
                                            title: "<b>¡Advertencia!</b>",
                                            buttons: {
                                                success: {
                                                    label: ":: Aceptar ::",
                                                    className: "btn btn-login",
                                                    callback: function () {
                                                        $("#frm_datos").attr("action", "/Home/Index")
                                                        $("#frm_datos").submit();
                                                    }

                                                }
                                            }
                                        });


                                        $("#bootbox-body").css("height", "300px");
                                        $("#bootbox-body").css(" overflow-y", "auto");
                                    }
                                }

                                bootbox.dialog({

                                    message: $("#nav").html(),
                                    title: "<b>APROBADO</b>",
                                    buttons: {
                                        success: {
                                            label: ":: Aceptar ::",
                                            className: "btn btn-login",
                                            callback: function () {
                                                if ($("#IdArea").val() <= harea) {
                                                    $("#btnDevolucion").hide();
                                                    $("#btnSiguiente").hide();
                                                }
                                            }
                                        }
                                    }
                                });


                                $("#bootbox-body").css("height", "300px");
                                $("#bootbox-body").css(" overflow-y", "auto");


                            }


                        } if ($("#IdArea").val() == harea) {
                            debugger;
                            if ($("#txtValidacionFormalizacion").val() == "APROBADO") {
                                bootbox.dialog({

                                    message: $("#nav").html(),
                                    title: "<b>APROBADO</b>",
                                    buttons: {
                                        success: {
                                            label: ":: Aceptar ::",
                                            className: "btn btn-login",
                                            callback: function () {
                                                //if ($("#IdArea").val() < harea) {
                                                $("#btnDevolucion").hide();
                                                $("#btnSiguiente").hide();
                                                //}

                                            }
                                        }
                                    }
                                });
                            }


                            $("#bootbox-body").css("height", "300px");
                            $("#bootbox-body").css(" overflow-y", "auto");

                        }
                        if ($("#IdArea").val() == 3) {
                            debugger;
                            var inicioRestriccion;
                            var finalRestriccion;
                            var day = (new Date()).getDate();
                            inicioRestriccion = parseInt($("#txtPeriodoRestriccion").val().substring(0, 2));
                            finalRestriccion = parseInt($("#txtPeriodoRestriccion").val().substring(3, 5));

                            if (inicioRestriccion != 0 && finalRestriccion != 0) {
                                if (day >= inicioRestriccion) {
                                    if (day <= finalRestriccion) {

                                        bootbox.dialog({
                                            message: "<h4>Este negocio se encuentra en periodo de restricción</h4>",
                                            //title: "<b>Advertencia</b>",
                                            buttons: {
                                                success: {
                                                    label: ":: Aceptar ::",
                                                    className: "btn btn-login",
                                                    callback: function (e) {
                                                        debugger;
                                                        $("#btnSiguiente").hide();
                                                    }

                                                }
                                            }


                                        });
                                    }
                                }
                            }
                        }
                        if ($("#IdArea").val() == 2) {
                            if ($("#txtFechaInicio").val() == "") {
                                debugger;
                                $("#btnSiguiente").hide();
                                $("#btnFinal").hide();
                                $("#btnInicio").show();
                            }
                            else if ($("#txtFechaFinal").val() == "") {

                                $("#btnInicio").hide();
                                $("#btnFinal").show();
                            }
                            else {
                                debugger;
                                $("#btnInicio").hide();
                                $("#btnFinal").hide();
                            }


                        }

                        if ($("#txtValidacionFormalizacion").val() == "DEVOLUCION") {
                            bootbox.dialog({

                                message: $("#nav").html(),
                                title: "<b>Devolución</b>",
                                buttons: {
                                    success: {
                                        label: ":: Aceptar ::",
                                        className: "btn btn-login"
                                    }
                                }
                            });

                            $("#bootbox-body").css("height", "300px");
                            $("#bootbox-body").css(" overflow-y", "auto");
                        }

                        // $("#nav").html(Result.[Result.length - 1]().IdArea + " " + Result.last().observaciones + "<br>" + "");

                        //console.log(array_pop(Result));

                        Result = null;

                        //if ($("#txtFechaInicio").val() != undefined) {
                        //    if ($("#txtFechaInicio").val() == "") {
                        //        $("#btnInicio").show();
                        //    }
                        //    else { $("#btnInicio").hide(); }
                        //    if ($("#txtFechaFinal").val() == "") {
                        //        $("#btnFinal").show();
                        //    }
                        //    else {
                        //        $("#btnFinal").hide();

                        //    }

                        //}

                        // window.location.href = "../LOL/Index";
                    }

                    else {

                        bootbox.dialog({

                            message: "El radicado no existe en la base...",
                            title: "<b>¡Advertencia!</b>",
                            buttons: {
                                success: {
                                    label: ":: Aceptar ::",
                                    className: "btn btn-login",
                                    callback: function () {
                                        var z = $("#txtRadicadoBonita").val();

                                        $("#frm_datos input[type='text'], select, textarea,input[type='date'],input[type='time']").val("");
                                        $("#txtRadicadoBonita").val(z);
                                        //   $("#frm_datos select").val("");
                                        $("#nav").html("");
                                    }


                                }
                            }
                        });
                    }
                    FieldCount = saveGrillaCheckList();
                    sumaValores();
                },
                //contentType: "application/json; charset=utf-8",
                error: function (error) {
                    console.log(error);
                }
            })
        }

        if ($("#listExisteCuenta").val() == "SI") {

            $("#txtNoCuenta").show();

            $("#numeroCuenta").show();

        }

    });


    $.ajax({
        type: "POST",
        url: "/CheckListVCD/LoadSelected",
        error: function (error) {
            console.log(error);
        }
    }).done(function (response) {

        var infoConvenios = {};
        $.each(response[0], function (index, item) { // Iterates through a collection
            infoConvenios = {
                'Convenio': item.Nombre,
                'FechaInicio': item.fechainicio,
                'FechaFinal': item.fechafinal
            }
            convenios.push(infoConvenios);

            $("#listConvenioBonita").append( // Append an object to the inside of the select box
                $("<option></option>") // Yes you can do this.
                .text(0)
                .val("-----Seleccione----")
                .text(item.Nombre)
                .val(item.Nombre)
                    );

        });

        $.each(response[1], function (index, item) { // Iterates through a collection
            $("#listOfiFormulario").append( // Append an object to the inside of the select box
                $("<option></option>") // Yes you can do this.
                .text(0)
                .val("-----Seleccione----")
                .text(item.CodDescripcion)
                .val(item.CodDescripcion)

            );
            $("#listOfiSegmentar").append( // Append an object to the inside of the select box
                $("<option></option>") // Yes you can do this.
               .text(0)
                .val("-----Seleccione----")
                .text(item.CodDescripcion)
                .val(item.CodDescripcion)
   );
        });


    });


    var returnFecha;
    //Al recibir el evento del click del botòn siguiente se pregunta si validar_form es true para que ejecute SaveCheckList
    $("#btnSiguiente").click(function () {
        debugger;
        estado = 1;
        var validar = validar_form();
        if (validar) {
            //bootbox, confirm('¿Está seguro que desea enviar los datos del radicado: " + $("#txtRadicadoBonita").val() + " ?', function (result) {

            //    if (result) {
            //        debugger;
            //        returnFecha = getDate();
            //        SaveCheckList();
            //        $("#frm_datos").attr("action", "/Save/Index")
            //        $("#frm_datos").submit();

            //    }

            //});

            //$("#txtRadicadoBonita").focus();
            //if (confirm("¿Está seguro que desea enviar los datos del radicado: " + $("#txtRadicadoBonita").val() + " ?")) {
            //    returnFecha = getDate();
            //    SaveCheckList();
            //} else {

            //    $("#frm_datos").attr("action", "javascript:history.back();");
            //}

            bootbox.dialog({
                message: "<h4>¿Está seguro que desea enviar los datos del radicado: " + $("#txtRadicadoBonita").val() + " ?</h4>",
                title: "<b>Advertencia</b>",
                buttons: {
                success: {
                    label: ":: SI ::",
                    className: "btn btn-login"
                    , callback: function () {
                        debugger;
                            returnFecha = getDate();
                            SaveCheckList();
                            $("#frm_datos").attr("action", "/SaveCheck/Index")
                            $("#frm_datos").submit();


                    }
                },
                danger: {
                    label: ":: NO ::",
                    className: "btn-danger",
                    callback: function () {

                        $("#frm_datos").attr("action", "javascript:history.back();");

                    }
                }
            }

            });

        }

    });

    $("#listConvenioBonita").on("change", function () {

        //alert(convenios.convenio.indexOf($("#listConvenioBonita").val()) + "pos");


        $.each(convenios, function (index, item) {
            debugger;
            if (item.Convenio == $("#listConvenioBonita").val()) {
                fechaI = item.FechaInicio;
                fechaF = item.FechaFinal;

                if (fechaI <= 9) {
                    fechaI = "0" + fechaI;
                }
                if (fechaF <= 9) {
                    fechaF = "0" + fechaF;
                }
                $("#txtPeriodoRestriccion").val(fechaI + "-" + fechaF);
                //console.log(fechaI.length);
            }

            if ($("#listConvenioBonita").val() == "") {
                $("#txtPeriodoRestriccion").val("");
            }

        });



    });


    $("#btnDevolucion").click(function () {
        estado = 2;

        $("#txtRadicadoBonita").focus();
        var validar = validar_form();
        if (validar) {
            //$("#txtRadicadoBonita").focus();
            //if (confirm("¿Está seguro que desea hacer la devolución del radicado: " + $("#txtRadicadoBonita").val() + " ?")) {
            //    returnFecha = getDate();
            //    SaveCheckList();
            //} else {

            //    $("#frm_datos").attr("action", "javascript:history.back();");
            //}
     
        bootbox.dialog({
            message: "<h4>¿Está seguro que desea hacer la devolución del radicado: " + $("#txtRadicadoBonita").val() + " ?</h4>",
            //title: "<b>Advertencia</b>",
            buttons: {
                success: {
                    label: ":: SI ::",
                    className: "btn btn-login"
                    , callback: function () {
                        $("#txtRadicadoBonita").focus();
                        var validar = validar_form();
                        if (validar) {
                            returnFecha = getDate();
                            SaveCheckList();
                            $("#frm_datos").attr("action", "/SaveCheck/Index")
                            $("#frm_datos").submit();
                        }

                    }
                },
                danger: {
                    label: "NO",
                    className: "btn-danger",
                    callback: function () {

                    }
                }
            }

        });

        }

    });




    //Aqui captura el evento del boton verificar al presionarlo se generá la fecha en la que empezó y aparecerá el login de la persona que lo esté gestionando.
    var fechainicio = $("#txtHoraDeInicio");
    var boton_verificar = $("#agregarCampo1");
    retornafec = getDate();
    //  $("#txtHoraDeInicio").val(retornafec);

    var MontoSolicitado = $("#txtMontoSolicitado");
    $(MontoSolicitado).on("blur", function () {
        dobleCaptura(MontoSolicitado);
    });

    var txtPlazoSolicitado = $("#txtPlazoSolicitado");
    $(txtPlazoSolicitado).on("blur", function () {

        dobleCaptura(txtPlazoSolicitado);
    });

    var txtNoafiliacionIss = $("#txtNoafiliacionIss");
    $(txtNoafiliacionIss).on("blur", function () {
        dobleCaptura(txtNoafiliacionIss);
    });

    var MaxInputs = 10; //Número Maximo de Campos
    var contenedor = $("#contenedor"); //ID del contenedor
    var AddButton = $("#agregarCampo"); //ID del Botón Agregar

    //var x = número de campos existentes en el contenedor

    var FieldCount = x; //para el seguimiento de los campos
    var temp;
    var sumacartera = 0;

    var z = 0;
    function sumaValores() {
        var contenidoval = $("#contenedor #valores_cont").find("input[type='text']");
        var totalInput = $("#txtVcomprarCartera"),
            valorAcomulado = parseFloat(0);

        $.each(contenidoval, function (i, values) {
            var id = $("#" + values.id);
            var valorInput = id.val();
            if (valorInput == "" || valorInput == "NaN") {
                valorInput = 0;
            } else {
                valorInput = id.val() == "" || id.val() == undefined ? 0 : parseFloat(id.val().replace(/[^0-9\,]+/g, '').replace(',', '.'));
            }
            valorAcomulado = parseFloat(valorAcomulado) + valorInput;
        });
        totalInput.val(valorAcomulado.toFixed(2).replace('.', ','));
        return false
    }

    function Resta(campo) {
        var _this = $(campo),
            totalInput = $("#txtVcomprarCartera"),
            valorAcomulado = totalInput.val() == "" || totalInput.val() == "NaN" ? 0 : totalInput.val(),
            valorEntrante = _this.val().replace(/[^0-9\,]+/g, '').replace(',', '.') == "" || _this.val().replace(/[^0-9\,]+/g, '').replace(',', '.') == "NaN" ? 0 : _this.val().replace(/[^0-9\,]+/g, '').replace(',', '.');

        var resta = parseFloat(valorAcomulado) - parseFloat(valorEntrante);
        totalInput.val(resta.toFixed(2).replace('.', ','));
    }

    $(document).on("click", ".eliminar", function (e) { //click en eliminar campo
        //if (x > 0) {

        _thistr = $(this).parent().parent();
        idtr = _thistr.attr("id");
        idcampo = $("#" + idtr + " #valores_cont").find("input[type='text']");
        //console.log(idcampo);
        Resta(idcampo);
        $(this).parent().parent().remove(); //eliminar el campo
        //    x = x - 1;
        //}


        return false;
    });


    $(AddButton).on("click", function (e) {
        FieldCount = $("#FieldCount").val();
        // alert("fieldcount" + FieldCount + $("#FieldCount").val());
        sumaValores();
        if (x <= MaxInputs) //max input box allowed
        {
            FieldCount++;
            //agregar campo
            $(contenedor).append('<tr id="tr_' + FieldCount + '"><td>' +
                '<input type="text" name="nobliga" onkeyUp="return ValNumero(this);" id="noobliga' + FieldCount + '" required="required" /><a href="#"></a></td>' +
                '<td><input type="text" name="nit" id="nit' + FieldCount + '" placeholder="00000000-0" required="required" /><a href="#"></a></td>' +
                '<td><input type="text" name="entidad" id="entidad' + FieldCount + '" required="required"/><a href="#"></a></td>' +
                '<td id="valores_cont"><input type="text" name="Valorcartera' + FieldCount + '" id="valorCartera' + FieldCount + '" required="required" maxlength="20"  data-focusout="0" id="250_indice_1" ><td>' +
                '<a href="#" class="eliminar" id="eliminar' + FieldCount + '" ></td></a></td></tr>');
            x++; //text box increment
            $("#FieldCount").val(FieldCount);

            // nit2 = $("#nit" + FieldCount).val();
            $("#valorCartera" + FieldCount).maskMoney({ allowNegative: true, thousands: '.', decimal: ',', affixesStay: false });

            $("#valorCartera" + FieldCount).on("focusout", function (e) {
                sumaValores();
            });

            $("#valorCartera" + FieldCount).on("mousemove", function (e) {
                sumaValores();
                $("#txtVcomprarCartera").maskMoney({ allowNegative: true, thousands: '.', decimal: ',', affixesStay: false });

            });

            //$("#valorCartera" + FieldCount).on("mousemove", function (e) {
            //    $("#txtVcomprarCartera").val(sumacartera);
            //});

        }
        $("#nit" + FieldCount).on("focusout", function (e) {
            nit = JSON.stringify({ 'nit': $("#nit" + FieldCount).val() })
            $.ajax({
                type: "POST",
                dataType: "json",
                contentType: 'application/json', // Tipo de datos que envío
                url: "/CheckListVCD/LoadEntidad",
                async: false,
                data: nit,
                success: function (Result) {

                    $("#entidad" + FieldCount).val(Result);
                }

            });

        })


        //  alert("fieldcount" + FieldCount);
        return false;
    });

    var contar = 0;
    function prueba(FieldCount, f) {

        if (x <= MaxInputs) //max input box allowed
        {

            $(contenedor).append('<tr id="tr_' + contar + '"><td>' +
                '<input type="text" name="nobliga" onkeyUp="return ValNumero(this);" id="noobliga' + FieldCount + '" required="required" /><a href="#"></a></td>' +
                '<td><input type="text" name="nit" id="nit' + FieldCount + '" placeholder="00000000-0" required="required" /><a href="#"></a></td>' +
                '<td><input type="text" name="entidad" id="entidad' + FieldCount + '" required="required"/><a href="#"></a></td>' +
                '<td id="valores_cont"><input type="text" name="Valorcartera' + FieldCount + '" id="valorCartera' + FieldCount + '" required="required" maxlength="20"  data-focusout="0" id="250_indice_1" ><td>' +
                '<a href="#" class="eliminar" id="eliminar' + FieldCount + '" ></td></a></td></tr>');
            //  FieldCount++;
            //agregar campo
            //$(contenedor).append('<tr id="tr_' + FieldCount + '"><td>' +
            //    '<input type="text" name="nobliga" onkeyUp="return ValNumero(this);" id="noobliga' + FieldCount + '" required="required" /><a href="#"></a></td>' +
            //    '<td><input type="text" name="nit" id="nit' + FieldCount + '" placeholder="00000000-0" required="required" /><a href="#"></a></td>' +
            //    '<td><input type="text" name="entidad" id="entidad' + FieldCount + '" required="required"/><a href="#"></a></td>' +
            //    '<td id="valores_cont"><input type="text" name="Valorcartera' + FieldCount + '" id="valorCartera' + FieldCount + '" required="required" maxlength="20" class="input-sm" data-focusout="0" id="250_indice_1" ><td>' +
            //    '<a href="#" class="eliminar" id="eliminar' + FieldCount + '" ></td></a></td></tr>');

            //$("#valorCartera" + FieldCount).val(f);
            //$("#nit" + FieldCount).val(f);
            //$("#noobliga" + FieldCount).val(f);
            //$("#entidad" + FieldCount).val(f);


            x++; //text box increment
            // nit2 = $("#nit" + FieldCount).val();
            $("#valorCartera" + FieldCount).maskMoney({ allowNegative: true, thousands: '.', decimal: ',', affixesStay: false });

            $("#valorCartera" + FieldCount).on("focusout", function (e) {
                sumaValores();
            });

            $("#valorCartera" + FieldCount).on("mousemove", function (e) {
                sumaValores();


            });

            //$("#valorCartera" + FieldCount).on("mousemove", function (e) {
            //    $("#txtVcomprarCartera").val(sumacartera);
            //});

        }



        $("#nit" + FieldCount).on("focusout", function (e) {
            nit = JSON.stringify({ 'nit': $("#nit" + FieldCount).val() })
            $.ajax({
                type: "POST",
                dataType: "json",
                contentType: 'application/json', // Tipo de datos que envío
                url: "/CheckListVCD/LoadEntidad",
                async: false,
                data: nit,
                success: function (Result) {

                    $("#entidad" + FieldCount).val(Result);
                }

            });

        })
        contar = contar + 1;

    }


    //Se genera alert al salir del campo si detecta que el valor que genero no es numerico
    var Arraycamposnum = ["#txtCedulaCliente", "#txtNoCuenta", "#txtNoRAutomatico", "#txtRadicadoBonita", "#txtTelefonoCliente", "#txtScoring", "#txtPlazoAprobado", "#txtPlazoSolicitado", "#txtNoafiliacionIss", "#txtCedulaGestor"];
    var values = "";
    $.each(Arraycamposnum, function (i, values) {
        values = $(values);
        $(values).on("blur", function () {
            if (isNaN(values.val())) {
                // alert('Digite valor numérico valido.');
                bootbox.dialog({
                    message: "<h4>Digite valor numérico valido...</h4>",
                    title: "<b>Advertencia</b>",
                    buttons: {
                        success: {
                            label: ":: Aceptar ::",
                            className: "btn btn-login"
                        }
                    }
                });
                $(values).focus();
                $(values).val("");
                return false;
            }
        });
    });



});

//funcion para retornar una fecha con día, mes, año, hora, minutos y segundos
function getDate(e) {
    var today = new Date();
    var yy = today.getFullYear();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var hh = today.getHours();
    var min = today.getMinutes();
    var sec = today.getSeconds();
    var fechainicio = dd + '-' + mm + '-' + yy + ' ' + hh + ':' + min + ':' + sec;
    return fechainicio;
}

// Funcion para realizar doble Captura 
function dobleCaptura(e) {
    var _this = e.currentTarget == undefined ? $(e) : $(e.currentTarget);
    campo = $(_this);
    if (sessionStorage["Contador"] == 0) {
        sessionStorage["Captura1"] = campo.val();
        sessionStorage["Contador"] = 1;
        campo.focus().val("");
    } else {
        var captura1 = sessionStorage["Captura1"];
        var Captura2 = campo.val();
        if (captura1 == Captura2) {
            campo.next().focus();
            sessionStorage["Contador"] = 0;
            sessionStorage["Captura1"] = "";
        } else {
            campo.focus().val("");
            sessionStorage["Contador"] = 0;
            sessionStorage["Captura1"] = "";
        }
    }
}




//*** Este Codigo permite Validar que sea un campo Numerico
function Solo_Numerico(variable) {
    Numer = parseInt(variable);
    if (isNaN(Numer)) {
        return "";
    }
    return Numer;
}
function ValNumero(Control) {
    Control.value = Solo_Numerico(Control.value);
}
//*** Fin del Codigo para Validar que sea un campo Numerico


function validar_form() {
    var biarray = {};
    var validacionObligatorio = $("#frm_datos").find("input[type='text'], select,textarea,input[type='date'],input[type='time']");
    //   var fila = $("#contenedor tbody tr").length;
    //     $("#frm_datos").attr("action", "/CheckListVCD/GuardarCPK?grillaCPK=" + fila);
    //$("#frm_datos").submit();
    //var valor = $("#txtObservaciones").val();
    var retorne = true;
    $.each(validacionObligatorio, function (i, values) {
        values = $(values);
        var datos = values.attr("id");
        var camposarmado = values.attr("id");
        var x = values.attr("required");
        if (x && values.val() == "" ||x && values.val() == null) {
            values.focus();
            values.css("border", "1px solid red");

            values.tooltip({
                hide: {
                    effect: "explode",
                    delay: 250,

                }
            });
            values.attr("title", "*Campo requerido");




            retorne = false;
            return retorne;
        }
    });
    return retorne;

}
var contarcolumnas = 0;
function saveGrillaCheckList() {
    var rad = $("#txtRadicadoBonita").val();
    var radicado = JSON.stringify({ 'radicadoBonita': rad })
    //llenar grilla
    $.ajax({
        type: "POST",
        dataType: "json",
        contentType: 'application/json',
        url: "/CheckListVCD/LoadGrillaList",
        async: false,
        data: radicado,
        success: function (Result) {

            $.each(Result, function (i, values) {
                $(contenedor).append('<tr id="tr_' + i + '"><td>' +
                    '<input type="text" name="nobliga" onkeyUp="return ValNumero(this);" id="noobliga' + i + '" required="required" /><a href="#"></a></td>' +
                    '<td><input type="text" name="nit" id="nit' + i + '" placeholder="00000000-0" required="required" /><a href="#"></a></td>' +
                    '<td><input type="text" name="entidad" id="entidad' + i + '" required="required"/><a href="#"></a></td>' +
                    '<td id="valores_cont"><input type="text" name="Valorcartera' + i + '" id="valorCartera' + i + '" required="required" maxlength="20" data-focusout="0" id="250_indice_1" ><td>' +
                    '<a href="#" class="eliminar" id="eliminar' + i + '" ></td></a></td></tr>');
                $("#noobliga" + i).val(values.noObligacion);
                $("#nit" + i).val(values.nit);
                $("#entidad" + i).val(values.entidad);
                $("#valorCartera" + i).val(values.valorCartera);
                $("#valorCartera" + i).maskMoney({ allowNegative: true, thousands: '.', decimal: ',', affixesStay: false });

                $("#nit" + i).on("focusout", function (e) {
                    nit = JSON.stringify({ 'nit': $("#nit" + i).val() })
                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        contentType: 'application/json', // Tipo de datos que envío
                        url: "/CheckListVCD/LoadEntidad",
                        async: false,
                        data: nit,
                        success: function (Result) {

                            $("#entidad" + i).val(Result);
                        }

                    });

                })


            });
            x = $("#contenedor tr").length;
            //console.log(Result);
            FieldCount = Result.length;
        },
        error: function (error) {
            console.log(error);

        }
    })
    $("#FieldCount").val(FieldCount);
    // alert("fieldcount save grilla" + $("#FieldCount").val() + "   fialdcoutn solo" + FieldCount);
    return FieldCount;
}



function SaveCheckList() {
    //declaracion de variables
    var dato = new Array(), valor = new Array();
    var biarray = {};
    var validacionObligatorio = $("#frm_datos").find("input[type='text'], select, textarea,input[type='date'],input[type='time']");
    var retorne = false;
    $.each(validacionObligatorio, function (i, values) {
        values = $(values);
        if (validacionObligatorio) {
            biarray = {
                "NombreCampo": values.attr("id"),
                "valor": values.val(),
                "IdCapturaCheckList": 1,
                "NumCaptura": 1
            }
            if (biarray.valor != "") {
                dato.push(biarray);
            }
        }
    });

    var periodo = 1;
    var RadicadoBonita = parseInt($("#txtRadicadoBonita").val());
    var GruiIdProducto = 1;
    var Area = $("#IdArea").val();
    // var estado = 1;
    var fechadeInicio = retornafec;
    var fechafin = getDate();
    var observaciones = $("#txtObservaciones").val();
    var ProcesoCheckListModel = {

        GruiIdProducto: GruiIdProducto,
        IdArea: Area,
        IdEstado: estado,
        IdPeriodo: periodo,
        IdRadicadoBonita: RadicadoBonita,
        FechaDeInicio: fechadeInicio,
        FechaFin: fechafin,
        observaciones: observaciones
    };
    var SeccionCheckListModel = JSON.stringify({ 'ProcesoCheckListModel': ProcesoCheckListModel, 'ListSeccion': dato })
    //console.log(ProcesoCheckListModel.IdRadicadoBonita);
    $.ajax({
        type: "POST",
        dataType: "json",
        contentType: 'application/json', // Tipo de datos que envío
        url: "/CheckListVCD/GuardarVCD",
        async: false,
        data: SeccionCheckListModel,
        success: function (Result) {
        },
        //contentType: "application/json; charset=utf-8",
        error: function (error) {
            console.log(error);
        }
    });

    var grilla = new Array(), GrillaCheckListModel = {};
    var camposGrilla = $("#contenedor").find("input[type='text']")
    contarcolumnas++;
    $.each(camposGrilla, function (i, values) {
        if (i % 4 == 0) {
            GrillaCheckListModel = {
                "IdRadicadoBonita": $("#txtRadicadoBonita").val(),
                "entidad": $("#" + camposGrilla[i + 2].id).val(),
                "nit": $("#" + camposGrilla[i + 1].id).val(),
                "valorCartera": $("#" + camposGrilla[i + 3].id).val(),
                "noObligacion": $("#" + camposGrilla[i].id).val()
            }

            grilla.push(GrillaCheckListModel);

        }

    });

    var infoGrilla = JSON.stringify({ 'grilla': grilla })

    if (infoGrilla != null) {

        debugger;
        $.ajax({
            type: "POST",
            dataType: "json",
            contentType: 'application/json', // Tipo de datos que envío
            url: "/CheckListVCD/SaveGrillaCheckList",
            async: false,
            data: infoGrilla,
            success: function (Result) {
            },
            //contentType: "application/json; charset=utf-8",
            error: function (error) {
                console.log(error);
            }
        });
    }





    retorne = true;
    return retorne;
}

