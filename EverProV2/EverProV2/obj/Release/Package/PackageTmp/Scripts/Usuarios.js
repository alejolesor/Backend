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

    $('#ListUsuariosApoyo').DataTable({
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


    $("#btnProceso").click(function () {
       // var idProceso = $("#idProceso").val();
        //var idProceso = $.getUrlVar('proceso');
        //var idLider = $("#idLider").val();

        var url = "/ListadoColas/Index";

        window.location.href = url;

    });


    ///Botón crear nuevo usuario
    $("#btnnuevo").click(function () {

        var html = "<div>"
                        + "<fieldset style='border:0;'>"
                        + "<legend></legend>"
                        + "<div class='divCrearUsers'>"
                            + "<label>Identificación:</label>"
                            + "<input type='text' id='idUsuario' class='form-control' required />"
                            //+ "<label>Usuario Dominio:</label>"
                           // + "<input type='hidden' id='cedLider'name='cedLider' value ='" + cedLider + "' class='form-control' placeholder='Ej. CE45670' required />"
                        + "</div>"
                        + "<div class='divCrearUsers' style='margin-left: 20px;'>"
                            + "<label>Nombre completo:</label>"
                            + "<input type='text' id='Nombre' class='form-control' required />"
                            //+ "<label>Rol:</label>"
                            //+ "<select id='ddlRol' data-work='rolesApp'></select>"
                        + "</div>"
                        + "<div id='mensaje' style='color: red; display:none;width: 100%;height: 20px; margin-top: 26%;'></div>"
                        + "</fieldset>"
                        + "</div>";

        bootbox.dialog({
            message: html,
            title: "<b>Ingresar Nuevo Funcionario</b>",
            buttons: {
                success: {
                    label: ":: Guardar ::",
                    className: "btn btn-login",
                    callback: function () {
                        var validarform = FormValid(2);
                        var cedLider = $("#cedLider").val();
                        var nombre = $("#Nombre").val();
                        var cedula = $("#idUsuario").val();
                        var idProceso = $("#idprocess").val();
                        if (validarform == "") {
                            //var idLider = $("#cedLider").val();
                            //var nombre = $("#Nombre").val();
                            //var cedula = $("#Nombre").val();


                            var url = "/ListaFuncionarios/_InsertAjaxEditing?idLider=" + cedLider + "&Nombre=" + nombre + "&cedula=" + cedula + "&idProceso=" + idProceso;
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
        //cargarRoles(null);
    });


    //----------------------------------------*--------------------------------------------------------//
    ///Botón Editar usuario
    $(document).on("click", ".buttonEdit", function () {
        var valores = "";
        $(this).parents("tr").find("td").each(function () {
            valores += $(this).html() + ",";
        });

        var idProceso = $("#idprocess").val();
        var idLider = $("#lider").val();
        //proceso = Session["idproceso"].ToString();
        //console.log(valores);
        var Data = valores.split(",");

        var html = "<iframe src='/ListaFuncionarios/ClasificacionNiveles?identFunc=" + Data[0] + "&proceso=" + idProceso + "&idLider=" + idLider + "' width=550 height=400> </iframe>'"
        ;



        bootbox.dialog({
            message: html,
            title: "<b>Clasificación de Funcionario: " + Data[1] + " </b>",
            buttons: {
            
                danger: {
                    label: ":: Cerrar ::",
                    className: "btn btn-Comando",
                }
            }
        });
        //Cargar atributos a los campos creados en la ventana modal
        //cargarRoles(Data);
        $("#idUsuario").val(Data[0]);
        $("#idUsuario").attr("readonly", true);
        $("#usuarioDominio").val(Data[1]);
        $("#Nombre").val(Data[2]);
    });

    $(document).on("click", ".buttonDelete", function () {
        var valores = "";
        $(this).parents("tr").find("td").each(function () {
            valores += $(this).html() + ",";
        });
        //console.log(valores)
        var Data = valores.split(",");
        if (Data[4] == "ACTIVO") {
            Estado = "Inactivar";
        } else {
            Estado = "Activar";
        }


        bootbox.dialog({
            message: "¿ Desea eliminar este funcionario. ?",
            title: "<b>Advertencia</b>",
            buttons: {
                success: {
                    label: ":: SI ::",
                    className: "btn btn-login"
                    , callback: function () {
                        var url = '/ListaFuncionarios/_DeleteAjaxEditing?identFuncionario=' + Data[0];

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
                        + "<select id='ddlRol' data-work='rolesApp'>fdsfsdfsdfsdfs</select>"
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
  
////----------------------------MODULO NUEVOS USUARIOS-----------------------------------//

/////Botón crear nuevo usuario
//$("#btnnuevoUser").click(function () {

//    var html = "<div>"
//                    + "<fieldset style='border:0;'>"
//                    + "<legend></legend>"
//                    + "<div class='divCrearUsers'>"
//                        + "<label>Identificación:</label>"
//                        + "<input type='text' id='idUsuario' class='form-control' required />"
//                        //+ "<label>Usuario Dominio:</label>"
//                        //+ "<input type='text' id='usuarioDominio' class='form-control' placeholder='Ej. CE45670' required />"
//                    + "</div>"
//                    + "<div class='divCrearUsers' style='margin-left: 20px;'>"
//                        + "<label>Nombre completo:</label>"
//                        + "<input type='text' id='Nombre' class='form-control' required />"
//                        + "<label>Rol:</label>"
//                        + "<select id='ddlRol' data-work='rolesApp'></select>"
//                    + "</div>"
//                    + "<div id='mensaje' style='color: red; display:none;width: 100%;height: 20px; margin-top: 26%;'></div>"
//                    + "</fieldset>"
//                    + "</div>";

//    bootbox.dialog({
//        message: html,
//        title: "<b>Ingresar Nuevo Usuario</b>",
//        buttons: {
//            success: {
//                label: ":: Guardar ::",
//                className: "btn btn-login",
//                callback: function () {
//                    var validarform = FormValid(1);
//                    if (validarform == "") {
//                        var idUsuario = $("#idUsuario").val();
//                        var UsuarioDominio = $("#usuarioDominio").val();
//                        var nombre = $("#Nombre").val();
//                        var rol = $("#ddlRol option:selected").attr("id");

//                        var url = "/Usuarios/_InsertAjaxEditing?idUsuario=" + idUsuario + "&Nombre=" + nombre + "&rol=" + rol + "&UsuarioDominio=" + UsuarioDominio;
//                        $.ajax({
//                            "type": "GET",
//                            "url": url,
//                            "data": null,
//                            "dataType": "json",
//                            "success": function (row) {
//                                //console.log(row);
//                                return false;
//                                confirmarGuardado("Alerta", row, "info");

//                            },
//                            "error": function (error) {
//                                console.log(error);
//                            }
//                        });
//                    }
//                    else {
//                        $("#mensaje").html(validarform + " (*)");
//                        $("#mensaje").css("display", "block");
//                        return false;
//                    }
//                }
//            },
//            danger: {
//                label: ":: Cancelar ::",
//                className: "btn btn-Comando",
//            }
//        }
//    });
//    //Cargar atributos a los campos creados en la ventana modal
//    $("#idUsuario").attr('onkeypress', 'javascript:numerico("idUsuario")');
//    cargarRoles(null);
//});

//function confirmarGuardado(mensaje) {
//    bootbox.dialog({
//        message: "<h2>" + mensaje + "</h2>",
//        title: "<b>Alerta</b>",
//        buttons: {
//            success: {
//                label: ":: Aceptar ::",
//                className: "btn-login",
//                callback: function () {
//                    window.location.reload();
//                }
//            }
//        }
//    });
//}

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




