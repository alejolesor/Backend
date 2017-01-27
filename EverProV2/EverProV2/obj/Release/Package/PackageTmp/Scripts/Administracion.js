/// <reference path="../Views/ListaFuncionarios/ClasificacionNiveles.aspx" />
/// <reference path="../Views/ListaFuncionarios/ClasificacionNiveles.aspx" />
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

    //----------------------------MODULO NUEVOS USUARIOS-----------------------------------//

    ///Botón crear nuevo usuario
    $("#btnnuevoUser").click(function () {

        var html = "<div>"
                        + "<fieldset style='border:0;'>"
                        + "<legend></legend>"
                        + "<div class='divCrearUsers'>"
                            + "<label>Identificación:</label>"
                            + "<input type='text' id='idUsuario' class='form-control' required />"
                            + "<label>Rol:</label>"
                            + "<select id='ddlRol' data-work='rolesApp'></select>"
                        + "</div>"
                        + "<div class='divCrearUsers' style='margin-left: 20px;'>"
                            + "<label>Nombre completo:</label>"
                            + "<input type='text' id='Nombre' class='form-control' required />"
                        + "</div>"
                        + "<div id='mensaje' style='color: red; display:none;width: 100%;height: 20px; margin-top: 26%;'></div>"
                        + "</fieldset>"
                        + "</div>";

        bootbox.dialog({
            message: html,
            title: "<b>Ingresar Nuevo Usuario</b>",
            buttons: {
                success: {
                    label: ":: Guardar ::",
                    className: "btn btn-login",
                    callback: function () {
                        var validarform = FormValid(1);
                        if (validarform == "") {
                            var idUsuario = $("#idUsuario").val();
                            // var UsuarioDominio = $("#usuarioDominio").val();
                            var nombre = $("#Nombre").val();
                            var rol = $("#ddlRol option:selected").attr("id");

                            var url = "/Usuarios/_InsertAjaxEditing?idUsuario=" + idUsuario + "&Nombre=" + nombre + "&rol=" + rol;
                            $.ajax({
                                "type": "GET",
                                "url": url,
                                "data": null,
                                "dataType": "json",
                                "success": function (row) {
                                    //console.log(row);
                                    confirmarGuardado("Alerta", row, "info");

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
        $("#idUsuario").attr('onkeypress', 'javascript:numerico("idUsuario")');
        cargarRoles(null);
    });


    $(document).on("click", ".buttonDelete", function () {
        var valores = "";
        $(this).parents("tr").find("td").each(function () {
            valores += $(this).html() + ",";
        });
        //console.log(valores)
        var Data = valores.split(",");
        if (Data[3] == "ACTIVO") {
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
                        var url = '/Usuarios/_DeleteAjaxEditing?idUsuario=' + Data[0] + '&estado=' + Data[3];

                        $.ajax({
                            "type": "GET",
                            "url": url,
                            "data": null,
                            "dataType": "json",
                            "success": function (row) {
                                //console.log(row);
                                confirmarGuardado("Alerta", row, "info");
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



//--------------------Modulo Editar usuarios---------------------------------


$(document).on("click", "#editarUsuario", function () {

    var valores = "";
    $(this).parents("tr").find("td").each(function () {
        valores += $(this).html() + ",";
    });

    //console.log(valores);
    var Data = valores.split(",");

    var html = "<div>"
                    + "<fieldset style='border:0;'>"
                    + "<legend></legend>"
                    + "<div class='divCrearUsers'>"
                        + "<label>Identificación:</label>"
                        + "<input type='text' id='idUsuario' class='form-control' required />"
                        + "<label>Rol:</label>"
                        + "<input type='text' id='usuarioDominio' class='form-control' placeholder='Rol' required />"
                    + "</div>"
                    + "<div class='divCrearUsers' style='margin-left: 20px;'>"
                        + "<label>Nombre completo:</label>"
                        + "<input type='text' id='Nombre' class='form-control' required />"
                        + "<label>Rol:</label>"
                        + "<select id='ddlRol' data-work='rolesApp'></select>"
                    + "</div>"
                    + "<div id='mensaje' style='color: red; display:none;width: 100%;height: 20px; margin-top: 26%;'></div>"
                    + "<div id='mensaje' style='width: 100%;margin-top: 26%;'><input type='button' id='Resetear' class='btn btn-login' value=\" :: Resetear ::\" /></div>"
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

                        var url = "/Usuarios/_SaveAjaxEditing?idUsuario=" + idUsuario + "&Nombre=" + nombre + "&rol=" + rol;
                        $.ajax({
                            "type": "GET",
                            "url": url,
                            "data": null,
                            "dataType": "json",
                            "success": function (row) {
                                //console.log(row);
                                confirmarGuardado("Alerta", row, "info");

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
    cargarRoles(Data);
    $("#idUsuario").val(Data[0]);
    $("#idUsuario").attr("readonly", true);
    $("#usuarioDominio").val(Data[2]);
    $("#usuarioDominio").attr("readonly", true);
    $("#Nombre").val(Data[1]);
});

//-------------------------------------Resetear contraseña----------------------------------/
$(document).on("click", "#Resetear", function () {
    var idUsu = $("#idUsuario").val();
    var url = '/Usuarios/Resetear_Contra?idusuario=' + idUsu;

    $.ajax({
        "type": "GET",
        "url": url,
        "data": null,
        "dataType": "json",
        "success": function (row) {
            //console.log(row);
            confirmarGuardado("Alerta", row, "info");
        },
        "error": function (error) {
            console.log(error);
        }
    });
});





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

function cargarRoles(Data) {
    $.ajax({
        "type": "GET",
        "url": "/Usuarios/OptionSelect",
        "data": null,
        "dataType": "json",
        "success": function (data) {
            //console.log(data);
            content = $("#ddlRol");
            _ui.fillCombo("#ddlRol", data);
            _uiStatic.buildCombobox();
            content.combobox();
            if (Data != null) {
                $("#ddlRol > option[value='" + Data[2] + "']")[0].selected = true;
                $("#ddlRol").parent().find("input[autocomplete='off']").val($("#ddlRol > option[value='" + Data[2] + "']").text());
            }
        },
        "error": function (error) {
            console.log(error);
        }
    });
}


