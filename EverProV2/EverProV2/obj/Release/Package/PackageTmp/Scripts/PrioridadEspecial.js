
$(document).ready(function () {


    $('#ListUsuarios').DataTable({
        "language": {
            "sProcessing": "<img src='../../Images/Splitter/ajax-loader-green-large.gif' />",
            "sLengthMenu": "Mostrar _MENU_ registros",
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "Ningún dato disponible en esta tabla",
            "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix": "",
            "sSearch": "Buscar:",
            "sUrl": "",
            "sInfoThousands": ",",
            "sLoadingRecords": "<img src='../../Images/Splitter/ajax-loader-green-large.gif' />",
            "oPaginate": {

                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"

            },

            "oAria": {

                "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"

            }
        }
    });


    $('#ListFuncionarios').DataTable({
        "language": {
            "sProcessing": "<img src='../../Images/Splitter/ajax-loader-green-large.gif' />",
            "sLengthMenu": "Mostrar _MENU_ registros",
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "Ningún dato disponible en esta tabla",
            "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix": "",
            "sSearch": "Buscar:",
            "sUrl": "",
            "sInfoThousands": ",",
            "sLoadingRecords": "<img src='../../Images/Splitter/ajax-loader-green-large.gif' />",
            "oPaginate": {

                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"

            },

            "oAria": {

                "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"

            }
        }
    });


    $('[data-toggle="tooltip"]').tooltip();



    //$.extend({
    //    getUrlVars: function () {
    //        var vars = [], hash;
    //        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    //        for (var i = 0; i < hashes.length; i++) {
    //            hash = hashes[i].split('=');
    //            vars.push(hash[0]);
    //            vars[hash[0]] = hash[1];
    //        }
    //        return vars;
    //    },
    //    getUrlVar: function (name) {
    //        return $.getUrlVars()[name];
    //    }
    //});

    ///Botón crear nuevo caso prioiritario
    $("#btnPrioridad").click(function () {

        var idProceso = $("#idProceso").val();
        var idLider = $("#idLider").val();
        var valor = "";
        var style = "";
        var monto = "";
        if (idProceso == 1) {
            valor = 0;
            // style = "readonly='readonly'";
            monto = "<input type='text' id='monto' name='' value = '" + valor + "' readonly='readonly'  class='form-control' required />"
        } else {
            valor = "";
            monto = "<input type='text' id='monto' name='' value = '" + valor + "'  class='form-control' required />"
        }

        var html = "<div>"
            + " <table id='casoPri' class='table table-striped table-bordered display' style='text-align: center; width: auto; text-space-collapse: collapse'>"
               + " <thead style='display: table-row-group;'>"
                   + " <tr>"
                        + "<th>Nombre Proceso</th>"
                        + "<th>N° Caso</th>"
                        + "<th>Nivel</th>"
                        + "<th>Monto</>"
                    + "</tr>"
                + "</thead>"
                + "<tbody>"
                    + "<tr>"
                        + "<td>"
                            // + "<input type='text' id='nomProceso' name='' class='form-control' required />"
                               + "<select  class=  'form-control' id='listProcesos' data-work='rolesApp'></select>"
                        + "</td>"
                        + "<td>"
                             + "<input type='text' id='noCaso' name=''  class='form-control' required />"
                        + "</td>"
                        + "<td>"
                           //  + "<input type='text' id='nivel' name=''  class='form-control' required />"
                             + "<select  class=  'form-control' id='listnivel' data-work='rolesApp'></select>"
                        + "</td>"
                        + "<td>"
                             + monto
                             //"<input type='text' id='monto' name='' value = '" + valor + "'  class='form-control' required />"
                        + "</td>"
                        // + "<td>"
                        //     + "<input type='text' id='concepto' name=''  class='form-control' required />"
                        //+ "</td>"
                    + "</tr>"

                + "</tbody>"

            + "</table>"
          + "<div id='mensaje' style='color: red; display:none;width: 100%;height: 20px; margin-top: 26%;'></div>";

        + "</div>";


        bootbox.dialog({
            message: html,
            title: "<b>Ingresar Nuevo Caso </b>",
            buttons: {
                success: {
                    label: ":: Guardar ::",
                    className: "btn btn-login",
                    callback: function () {

                        var monto = $("#monto").val();
                        var validarform = FormValid(3);
                        var nomProceso = $("#listProcesos option:selected").val();

                        var noCaso = $("#noCaso").val();
                        var nivel = $("#listnivel option:selected").val();
                        //var proceso = $("#idProceso").val();
                        //var idProceso = $.getUrlVar('idProceso');
                        //var idLider = $.getUrlVar('idLider');
                        if (validarform == "") {

                            var url = "/ListadoColas/CasoPrioritario?nomProceso=" + nomProceso + "&noCaso=" + noCaso + "&nivel=" + nivel + "&monto=" + monto + "&idLider=" + idLider + "&idProceso=" + idProceso;
                            $.ajax({
                                "type": "GET",
                                "url": url,
                                "data": null,
                                "dataType": "json",
                                "success": function (row) {
                                    //console.log(row);
                                    confirmarGuardado("Alerta", row, "info");

                                    // document.location.href = '/ListadoColas/Index';

                                },
                                "error": function (error) {
                                    console.log(error);
                                }
                            });
                        }
                        else {
                            $("#mensaje").html(validarform + " (*)");
                            $("#mensaje").css("display", "block");
                            return false;
                        }
                    }
                },
                danger: {
                    label: ":: Cancelar ::",
                    className: "btn btn-Comando",
                }
            }
        });
        //Cargar atributos a los campos creados en la ventana modal
        $("#noCaso").attr('onkeypress', 'numerico("noCaso")');
        $("#monto").attr('onkeypress', 'numerico("monto")');
        listaProcesos(idProceso);
        listaNiveles(idProceso);
        //cargarRoles(null);
    });



    // borrar
    //$(document).on("click", ".buttonDelete", function () {
    //    var valores = "";
    //    $(this).parents("tr").find("td").each(function () {
    //        valores += $(this).html() + ",";
    //    });
    //    //console.log(valores)
    //    var Data = valores.split(",");
    //    if (Data[4] == "ACTIVO") {
    //        Estado = "Inactivar";
    //    } else {
    //        Estado = "Activar";
    //    }


    //    bootbox.dialog({
    //        message: "¿ Desea eliminar este funcionario. ?",
    //        title: "<b>Advertencia</b>",
    //        buttons: {
    //            success: {
    //                label: ":: SI ::",
    //                className: "btn btn-login"
    //                , callback: function () {
    //                    var url = '/ListaFuncionarios/_DeleteAjaxEditing?identFuncionario=' + Data[0];

    //                    $.ajax({
    //                        "type": "GET",
    //                        "url": url,
    //                        "data": null,
    //                        "dataType": "json",
    //                        "success": function (row) {
    //                            //console.log(row);
    //                            confirmarGuardado(row);
    //                        },
    //                        "error": function (error) {
    //                            console.log(error);
    //                        }
    //                    });

    //                }
    //            },
    //            danger: {
    //                label: ":: NO ::",
    //                className: "btn-danger",
    //                callback: function () {
    //                }
    //            }
    //        }

    //    });
    //})
});

//------------------------Ver Casos en Cola---------------------------//

$("#btnCasosCola").click(function () {

    var idProceso = $("#idProceso").val();
    var idLider = $("#idLider").val();

    var html = "<div>"
        + " <table id='casos_Cola' class='table table-striped table-bordered display' style='text-align: center; width: 100%; text-space-collapse: collapse'>"
           + " <thead style='display: table-row-group;'>"
               + " <tr>"
                    + "<th>Identificacion</th>"
                    + "<th>Nombre Funcionario</th>"
                    + "<th>N° Caso</th>"
                    + "<th>Nombre Proceso</th>"
                    + "<th>Complejidad</th>"
                    + "<th>Estado</th>"
                + "</tr>"
            + "</thead>"
            + "<tbody>"
            + "</tbody>"
        + "</table>"
    + "</div>";


    bootbox.dialog({
        message: html,
        title: "<b>Casos en Cola </b>",
        buttons: {
            danger: {
                label: ":: Cancelar ::",
                className: "btn btn-Comando",
            }
        }
    });
    //Cargar atributos a los campos creados en la ventana modal
    transact.ajaxGET("/ListadoColas/ListCasoManual?idProceso=" + idProceso + "&idLider=" + idLider, false, success_casomanual, null);
    //cargarRoles(null);
});


///Pinta el cuerpo de la table con los registros
function success_casomanual(tabla) {
    $(".modal-content").css("width", "800px");
    $(".modal-content").css("margin-left", "-5%");
    //$("#casos_Cola").css("margin-left", "8px");
    //$(".dataTables_info").css("margin-left", "15%");
    //$(".dataTables_length").css("margin-left", "15px");

    DataTable();
    var TableCasos = $("#casos_Cola").dataTable();
    TableCasos.fnClearTable();
    $.each(tabla, function (i, listaCasoManual) {
        TableCasos.fnAddData([listaCasoManual.identFuncionario, listaCasoManual.NombreCompleto, listaCasoManual.Ncaso, listaCasoManual.Actividad, listaCasoManual.Complejidad, listaCasoManual.Descripcion]);
    });


}

function DataTable() {
    $('#casos_Cola').DataTable({
        "language": {
            "sPaginationType": "full_numbers",
            "sProcessing": "<img src='../../Images/Splitter/ajax-loader-green-large.gif' />",
            "sLengthMenu": "Mostrar _MENU_ registros",
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "Ningún dato disponible en esta tabla",
            "sInfo": "Registros _START_ al _END_ de _TOTAL_",
            "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix": "",
            "sSearch": "Buscar:",
            "sUrl": "",
            "sInfoThousands": ",",
            "sLoadingRecords": "<img src='../../Images/Splitter/ajax-loader-green-large.gif' />",
            "oPaginate": {

                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"

            },
        }
    });
}


//------------------------Ver Casos Suspendidos ---------------------------//



$("#btnCasoSuspend").click(function () {

    var idProceso = $("#idProceso").val();
    var idLider = $("#idLider").val();

    var html = "<div>"
        + " <table id='casos_Suspend' class='table table-striped table-bordered display' style='text-align: center; width: 100%; text-space-collapse: collapse'>"
           + " <thead style='display: table-row-group;'>"
               + " <tr>"
                    + "<th>Identificacion</th>"
                    + "<th>Nombre Funcionario</th>"
                    + "<th>N° Caso</th>"
                    + "<th>Observacionies</th>"
                    + "<th>Fecha</th>"
                + "</tr>"
            + "</thead>"
            + "<tbody>"
            + "</tbody>"
        + "</table>"
    + "</div>";


    bootbox.dialog({
        message: html,
        title: "<b>Casos Suspendidos </b>",
        buttons: {
            danger: {
                label: ":: Cancelar ::",
                className: "btn btn-Comando",
            }
        }
    });
    //Cargar atributos a los campos creados en la ventana modal
    transact.ajaxGET("/SuspendidosAntara/SuspendidosAntara?idProceso=" + idProceso + "&idLider=" + idLider, false, success_Suspendidos, null);
    //cargarRoles(null);
});


///Pinta el cuerpo de la table con los registros
function success_Suspendidos(tabla) {
    $(".modal-content").css("width", "1000px");
    $(".modal-content").css("margin-left", "-35%");
    //$("#casos_Cola").css("margin-left", "8px");
    //$(".dataTables_info").css("margin-left", "15%");
    //$(".dataTables_length").css("margin-left", "15px");

    DataTable();
    $("#casos_Suspend_wrapper .row .col-sm-12").css("height", "300px")
    $("#casos_Suspend_wrapper .row .col-sm-12").css("overflow-y", "auto")
    var TableCasos = $("#casos_Suspend").dataTable();
    TableCasos.fnClearTable();
    $.each(tabla, function (i, listaCasoSuspend) {
        TableCasos.fnAddData([listaCasoSuspend.CodigoUsuario, listaCasoSuspend.NombreUsuario, listaCasoSuspend.NroCaso, listaCasoSuspend.Observaciones, dtConvFromJSON(listaCasoSuspend.FechaProcesamiento)]);
    });


}

function DataTable() {
    $('#casos_Suspend').DataTable({
        "language": {
            "sPaginationType": "full_numbers",
            "sProcessing": "<img src='../../Images/Splitter/ajax-loader-green-large.gif' />",
            "sLengthMenu": "Mostrar _MENU_ registros",
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "Ningún dato disponible en esta tabla",
            "sInfo": "Registros _START_ al _END_ de _TOTAL_",
            "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix": "",
            "sSearch": "Buscar:",
            "sUrl": "",
            "sInfoThousands": ",",
            "sLoadingRecords": "<img src='../../Images/Splitter/ajax-loader-green-large.gif' />",
            "oPaginate": {

                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"

            },
        },
        //"scrollY": "200px",
    });
}

//--------------------------------Fin Suspendidos -------------------------//

//--------------------------------Ver Dactiloscopia-----------------------//


$("#btnDactiloscopia").click(function () {

    var idProceso = $("#idProceso").val();
    var idLider = $("#idLider").val();
    var nivel = 32;

    var html = "<div>"
        + " <table id='dactiloscopia' class='table table-striped table-bordered display' style='text-align: center; width: 100%; text-space-collapse: collapse'>"
           + " <thead style='display: table-row-group;'>"
               + " <tr>"
                    + "<th>N° Caso</th>"
                    + "<th>Nombre Proceso</th>"
                    + "<th>Nivel</th>"
                    + "<th>Monto</th>"                    
                    + "<th>Observaciones SmartFile</th>"
                    + "<th>Observaciones Antara</th>"
                    + "<th>Estado SmartFile</th>"
                    + "<th>Asignar <input type='checkbox' id='checkTodos'></th>"
                + "</tr>"
            + "</thead>"
            + "<tbody>"
            + "</tbody>"
        + "</table>"
    + "</div>";


    bootbox.dialog({
        message: html,
        title: "<b>Dactiloscopia</b>",
        buttons: {
            success: {
                label: ":: Guardar ::",
                className: "btn btn-login",
                callback: function () {

                    var check = $("#dactiloscopia tbody tr").find("input[type='checkbox']");
                    var cont = 0;
                    $.each(check, function (i, values) {


                        if ($("#" + values.id).is(":checked")) {
                            var noCaso, nomProceso, monto;

                            var valores = "";
                            $("#dactiloscopia tbody tr #" + values.id).parent().parent().find("td").each(function () {
                                valores += $(this).html() + ",";
                            });

                            var Data = valores.split(",");
                            noCaso = Data[0];
                            nomProceso = Data[1];
                            monto = Data[3];                            

                            var url = "/ListadoColas/CasoPrioritario?nomProceso=" + 1 + "&noCaso=" + noCaso + "&nivel=" + nivel + "&monto=" + monto + "&idLider=" + idLider + "&idProceso=" + idProceso;
                            $.ajax({
                                "type": "GET",
                                "url": url,
                                "data": null,
                                "dataType": "json",
                                "success": function (row) {
                                    confirmarGuardado("Alerta", row, "info");

                                },
                                "error": function (error) {
                                    console.log(error);
                                }
                            });

                            cont++;
                        }
                    });

                    if (cont == 0) {
                        swal({
                            title: "Error",
                            text: "Seleccione al menos un caso para asignarlo a la cola",
                            type:  "error"
                        });
                        return false;
                    }


                }

            },
            danger: {
                label: ":: Cancelar ::",
                className: "btn btn-Comando",
            }
        }
    });
    //Cargar atributos a los campos creados en la ventana modal
    ShowProgressAntara();
    transact.ajaxGET("/SuspendidosAntara/ListDactiloscopia", false, success_dactiloscopia, function (error) {
        $("#LoadingOficina").delay(3000).fadeOut("slow");
    });

    $(".modal-body").css({ 'overflow-y': 'auto', 'height': '600px' });


    //cargarRoles(null);
});


///Pinta el cuerpo de la table con los registros
function success_dactiloscopia(tabla) {
    $(".modal-content").css("width", "200%");
    $(".modal-content").css("margin-left", "-49%");


    DataTable();

   
    var TableCasos = $("#dactiloscopia").dataTable();
    var Estado = "";
    TableCasos.fnClearTable();
    $.each(tabla, function (i, lista) {
        if (lista.Estado == null) {
            Estado = "NO REGISTRA ESTADO";
        } else {
            Estado = lista.Estado;
        }
        var check = "<input type = 'checkbox' id='check_" + i + "'/>";
        TableCasos.fnAddData([lista.IdRadicadoBonita, lista.Area, "PENDIENTE DACTILOSCOPIA", lista.Monto, lista.ObservacionesDactiloscopia, lista.Observaciones,Estado, check]);
    });
    ClickAsignar();

    $("#LoadingOficina").delay(3000).fadeOut("slow");

}

function DataTable() {
    $('#dactiloscopia').DataTable({
        "language": {
            "sPaginationType": "full_numbers",
            "sProcessing": "<img src='../../Images/Splitter/ajax-loader-green-large.gif' />",
            "sLengthMenu": "Mostrar _MENU_ registros",
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "Ningún dato disponible en esta tabla",
            "sInfo": "Registros _START_ al _END_ de _TOTAL_",
            "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix": "",
            "sSearch": "Buscar:",
            "sUrl": "",
            "sInfoThousands": ",",
            "sLoadingRecords": "<img src='../../Images/Splitter/ajax-loader-green-large.gif' />",
            "oPaginate": {

                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"

            },
        },

        "order": [],
        "columnDefs": [{
            "targets": 'no-sort',
            "orderable": false,
        }]

    });
}

function ClickAsignar() {
    $("#checkTodos").on("click", function () {

        var chequeo = $("#dactiloscopia tbody").find("input[type='checkbox']");
        if ($(this).is(":checked")) {
            $.each(chequeo, function (i, campo) {
                var idcamp = $("#" + campo.id);
                idcamp.prop("checked", true);
            });
        }
        else {
            $.each(chequeo, function (i, campo) {
                var idcamp = $("#" + campo.id);
                idcamp.prop("checked", false);
            });
        }
    });
}

//--------------------------------Fin Dactiloscopia-----------------------//



//------------------------------funcion para combertir formato de fecha ----------------------------------//

function dtConvFromJSON(data) {
    if (data == null) return '1/1/1950';
    var r = /\/Date\(([0-9]+)\)\//gi
    var matches = data.match(r);
    if (matches == null) return '1/1/1950';
    var result = matches.toString().substring(6, 19);
    var epochMilliseconds = result.replace(
    /^\/Date\(([0-9]+)([+-][0-9]{4})?\)\/$/,
    '$1');
    var b = new Date(parseInt(epochMilliseconds));
    var c = new Date(b.toString());
    var curr_date = c.getDate();
    var curr_month = c.getMonth() + 1;
    var curr_year = c.getFullYear();
    var curr_h = c.getHours();
    var curr_m = addZero(c.getMinutes());
    var curr_s = c.getSeconds();
    var curr_offset = c.getTimezoneOffset() / 60
    var d = curr_date + '/' + curr_month.toString() + '/' + curr_year + " " + curr_h + ':' + curr_m + ':' + curr_s;
    return d;

}

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i
}


//------------------------------ Fin funcion para combertir formato de fecha ----------------------------------//

function confirmarGuardado(Titulo, Mensaje, Tipo) {
    swal({
        title: Titulo,
        text: Mensaje,
        type: Tipo
    },
       function () {
           window.location.reload();
       });
}


function listaProcesos(idProceso) {
    transact.ajaxGET("/ListadoColas/listaProcesos?idProceso=" + idProceso, null,
        function (data) {
            llenarListasSeleccion($("#listProcesos"), data);
        }, function (error) { console.log(error); });
}

function listaNiveles(idProceso) {
    transact.ajaxGET("/ListadoColas/listaNiveles?idProceso=" + idProceso, null,
        function (data) {
            llenarListasSeleccion($("#listnivel"), data);
        }, function (error) { console.log(error); });
}



function llenarListasSeleccion(campo, data) {
    var $valSeleccione = $('<option>').val("").html("Seleccione...");
    var $valvacio = $('<option>').val("").html(" ");
    var idCampo = $(campo).attr("id");
    //if (idCampo != "selCausalAperturas" && idCampo != "selTipodeVia" && idCampo != "selPuntoCardinal1" && idCampo != "selPuntoCardinal2") {
    $(campo).append($valSeleccione);
    //}

    //if (idCampo == "selTipodeVia" || idCampo == "selPuntoCardinal1" || idCampo == "selPuntoCardinal2") {
    //    $(campo).append($valvacio);
    //}

    $.each(data, function (i, row) {
        var $option = $('<option>');
        $option.val(row.idAns);
        $option.html(row.Actividad);
        $(campo).append($option);
    });
}
