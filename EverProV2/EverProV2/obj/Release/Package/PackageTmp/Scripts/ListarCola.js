$(document).ready(function () {

    $('#ListaColas').DataTable({
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

                "sSortAscendi": ": Activar para ordenar la columna de manera ascendente",
                "sSortDescendi": ": Activar para ordenar la columna de manera descendente"

            }
        },
        //"order":[[3,"asc"]]
        "order": [],
        "columnDefs": [{
            "targets": 'no-sort',
            "orderable": false,
        }]



    });


    $("#btnCasoPorLider").click(function () {
        var html = "<select id ='lideres' name='lideres'>"
                    + "<option vcalue=''>Seleccione</>";
                    
        


        bootbox.dialog({
            message: html,
            title: "<b>Listar Casos por Lider </b>",
            buttons: {
                danger: {
                    label: ":: Cancelar ::",
                    className: "btn btn-Comando",
                }
            }
        });
        //Cargar atributos a los campos creados en la ventana modal
        //$("#idUsuario").attr('onkeypress', 'javascript:numerico("idUsuario")');
        //cargarRoles(null);
    });


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


    //$("#btnStart").click(function () {
    //    var idProceso = $.getUrlVar('proceso');

    //    var url = "/ListadoColas/stsartService"

    //    window.location.href = url;

    //});



    //$("#btnProceso").click(function () {
    //    var idProceso = $.getUrlVar('proceso');

    //    var url = "/ListadoColas/Index?idProceso=" + idProceso;

    //    window.location.href = url;

    //});



  

    ///Botón Editar usuario
    $(document).on("click", ".buttonEdit", function () {
        var valores = "";
        $(this).parents("tr").find("td").each(function () {
            valores += $(this).html() + ",";
        });

        console.log(valores);
        var Data = valores.split(",");

        var html = "<div>"
                        + "<fieldset style='border:0;'>"
                        + "<legend></legend>"
                        + "<div class='divCrearUsers'>"
                            + "<label>Identificación:</label>"
                            + "<input type='text' id='idUsuario' class='form-control' required />"
                            + "<label>Usuario Dominio:</label>"
                            + "<input type='text' id='usuarioDominio' class='form-control' placeholder='Ej. CE45670' required />"
                        + "</div>"
                        + "<div class='divCrearUsers' style='margin-left: 20px;'>"
                            + "<label>Nombre completo:</label>"
                            + "<input type='text' id='Nombre' class='form-control' required />"
                            + "<label>Rol:</label>"
                            + "<select id='ddlRol' data-work='rolesApp'></select>"
                        + "</div>"
                        + "<div id='mensaje' style='color: red; display:none;width: 100%;height: 20px; margin-top: 26%;'></div>"
                        + "</fieldset>"
                        + "</div>";

        bootbox.dialog({
            message: html,
            title: "<b>Modificar Usuario: " + Data[1] + " </b>",
            buttons: {
                success: {
                    label: ":: Guardar ::",
                    className: "btn btn-login",
                    callback: function () {
                        var validarform = FormValid(1);
                        if (validarform == "") {
                            var idUsuario = $("#idUsuario").val();
                            var UsuarioDominio = $("#usuarioDominio").val();
                            var nombre = $("#Nombre").val();
                            var rol = $("#ddlRol option:selected").attr("id");

                            var url = "/Usuarios/_SaveAjaxEditing?idUsuario=" + idUsuario + "&Nombre=" + nombre + "&rol=" + rol + "&UsuarioDominio=" + UsuarioDominio;
                            $.ajax({
                                "type": "GET",
                                "url": url,
                                "data": null,
                                "dataType": "json",
                                "success": function (row) {
                                    console.log(row);
                                    confirmarGuardado(row);

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
        //   Cargar atributos a los campos creados en la ventana modal
        cargarRoles(Data);
        $("#idUsuario").val(Data[0]);
        $("#idUsuario").attr("readonly", true);
        $("#usuarioDominio").val(Data[1]);
        $("#Nombre").val(Data[2]);
    });

    $(document).on("click", ".buttonDelete", function () {
        var valores = "";
        var Estado = "";
        $(this).parents("tr").find("td").each(function () {
            valores += $(this).html() + ",";
        });
        console.log(valores)
        var Data = valores.split(",");
        if (Data[4] == "ACTIVO") {
            Estado = "Inactivar";
        } else {
            Estado = "Activar";
        }


        bootbox.dialog({
            message: "¿ Desea " + Estado + " este Registro. ?",
            title: "<b>Advertencia</b>",
            buttons: {
                success: {
                    label: ":: SI ::",
                    className: "btn btn-login"
                    , callback: function () {
                        var url = '/Usuarios/_DeleteAjaxEditing?idusuario=' + Data[0] + '&estado=' + Data[4];

                        $.ajax({
                            "type": "GET",
                            "url": url,
                            "data": null,
                            "dataType": "json",
                            "success": function (row) {
                                console.log(row);
                                confirmarGuardado(row);
                            },
                            "error": function (error) {
                                console.log(error);
                            }
                        });

                    }
                },
                danger: {
                    label: ":: NO ::",
                    className: "btn-danger",
                    callback: function () {
                    }
                }
            }

        });
    })
});

function confirmarGuardado(mensaje) {
    bootbox.dialog({
        message: "<h2>" + mensaje + "</h2>",
        title: "<b>Alerta</b>",
        buttons: {
            success: {
                label: ":: Aceptar ::",
                className: "btn-login",
                callback: function () {
                    window.location.reload();
                }
            }
        }
    });
}

//function cargarRoles(Data) {
//    $.ajax({
//        "type": "GET",
//        "url": "/Usuarios/OptionSelect",
//        "data": null,
//        "dataType": "json",
//        "success": function (data) {
//            console.log(data);
//            content = $("#ddlRol");
//            _ui.fillCombo("#ddlRol", data);
//            _uiStatic.buildCombobox();
//            content.combobox();
//            if (Data != null) {
//                $("#ddlRol > option[value='" + Data[3] + "']")[0].selected = true;
//                $("#ddlRol").parent().find("input[autocomplete='off']").val($("#ddlRol > option[value='" + Data[3] + "']").text());
//            }
//        },
//        "error": function (error) {
//            console.log(error);
//        }
//    });
//}
