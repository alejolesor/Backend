var _default = null;
(function ($) {
    _default = {
        IdRol: null,
        IdRolEstado: null,
        loadData: function () {

        },

        loadPages: function () {
            $(document).ready(function () {
                _uiStatic.eventClick($("#btnAgregar"), _default.guardarRol);
                _uiStatic.eventClick($("#btnEditar"), _default.EditarRol);
                _uiStatic.eventClick($("#btnCancelar"), _default.Cancelar);
                DataTable();

                var TableRolActi = $("#RolesActivos").dataTable();
                var TableRolInacti = $("#RolesInactivos").dataTable();

                var ModAsoc = $("#ModAsoc").dataTable();
                var ModNoAsoc = $("#ModNoAsoc").dataTable();

                //INICIO Funcion para cambiar de estado Activo a Inactivo de los ROLES
                $(document).on("click", ".btnInactivar", function () {

                    //Obtiene los valores del TR donde se dio click...
                    var valores = "";
                    $(this).parents("tr").find("td").each(function () {
                        valores += $(this).html() + ",";
                    });
                    //console.log(valores);
                    var Data = valores.split(",");

                    //Borra la informacion de las DATATABLES de Jquery
                    TableRolActi.fnClearTable();
                    TableRolInacti.fnClearTable();

                    //Oculta la tabla Roles Activos y Muestra el GIF de Cargando....
                    $("#RolesActivos").hide();
                    $("#LoadingActivo").show();
                    //Mediante el Ajax se realiza el cambio de estado y actualizacion de cada una de las DATATABLES 
                    $.ajax({
                        "type": "GET",
                        "url": "/Roles/InactivarRol?idrol=" + Data[0],
                        "data": null,
                        "success": function (data) {
                            //console.log(data);

                            //Recorro lo que me retorna el metodo....
                            $.each(data, function (i, values) {
                                if (values.Activo == true) {
                                    Estado = "<img src='../../Images/Gride/activo.png' id='Activo' class='btnInactivar' style='margin-left:10%; cursor:pointer;' />";
                                }
                                else {
                                    Estado = "<img src='../../Images/Gride/inactivo.png' id='Inactivo' class='btnActivar' style='margin-left:10%; cursor:pointer;' />";
                                }
                                Img = "<img src='../../Images/Gride/pencil.png' id='Inactivo' class='btnEditar' style='margin-left:10%; cursor:pointer;' />";
                                //Agrego a la DATATABLE los diferentes regitros que se retornaron...
                                TableRolActi.fnAddData([values.IdRol, values.DescRol, Img, Estado]);
                            });

                            //Oculto el GIF de cargando... y muestro nuevamente la table pera actualizada...
                            $("#LoadingActivo").delay(1000).fadeOut("slow");
                            $("#RolesActivos").delay(1500).fadeIn("slow");
                        },
                        "error": function (error) {
                            console.log(error);
                        }
                    });

                    //Oculta la tabla Roles Activos y Muestra el GIF de Cargando....
                    $("#RolesInactivos").hide();
                    $("#LoadingInactivo").delay(1500).fadeIn("slow");

                    //Mediante el Ajax se realiza la actualizacion de la DATATABLE de Roles Inactivos 
                    $.ajax({
                        "type": "GET",
                        "url": "/Roles/TableUpdRolInac",
                        "data": null,
                        "success": function (data) {
                            //console.log(data);

                            $.each(data, function (i, values) {
                                if (values.Activo == true) {
                                    Estado = "<img src='../../Images/Gride/activo.png' id='Activo' class='btnInactivar' style='margin-left:10%; cursor:pointer;' />";
                                }
                                else {
                                    Estado = "<img src='../../Images/Gride/inactivo.png' id='Inactivo' class='btnActivar' style='margin-left:10%; cursor:pointer;' />";
                                }
                                Img = "<img src='../../Images/Gride/pencil.png' id='Inactivo' class='btnEditar' style='margin-left:10%; cursor:pointer;' />";
                                TableRolInacti.fnAddData([values.IdRol, values.DescRol, Img, Estado]);
                            });
                            $("#LoadingInactivo").delay(1000).fadeOut("slow");
                            $("#RolesInactivos").delay(1500).fadeIn("slow");
                        },
                        "error": function (error) {
                            console.log(error);
                        }
                    });
                });


                $(document).on("click", ".btnActivar", function () {
                    var valores = "";
                    $(this).parents("tr").find("td").each(function () {
                        valores += $(this).html() + ",";
                    });
                    //console.log(valores);
                    var Data = valores.split(",");

                    TableRolActi.fnClearTable();
                    TableRolInacti.fnClearTable();

                    $("#RolesInactivos").hide();
                    $("#LoadingInactivo").show();

                    $.ajax({
                        "type": "GET",
                        "url": "/Roles/ActivarRol?idrol=" + Data[0],
                        "data": null,
                        "success": function (data) {
                            //console.log(data);
                            $.each(data, function (i, values) {
                                if (values.Activo == true) {
                                    Estado = "<img src='../../Images/Gride/activo.png' id='Activo' class='btnInactivar' style='margin-left:10%; cursor:pointer;' />";
                                }
                                else {
                                    Estado = "<img src='../../Images/Gride/inactivo.png' id='Inactivo' class='btnActivar' style='margin-left:10%; cursor:pointer;' />";
                                }
                                Img = "<img src='../../Images/Gride/pencil.png' id='Inactivo' class='btnEditar' style='margin-left:10%; cursor:pointer;' />";
                                TableRolInacti.fnAddData([values.IdRol, values.DescRol, Img, Estado]);
                            })
                            $("#LoadingInactivo").delay(1000).fadeOut("slow");
                            $("#RolesInactivos").delay(1500).fadeIn("slow");
                        },
                        "error": function (error) {
                            console.log(error);
                        }
                    });


                    $("#RolesActivos").hide();
                    $("#LoadingActivo").delay(1500).fadeIn("slow");
                    $.ajax({
                        "type": "GET",
                        "url": "/Roles/TableUpdRolActi",
                        "data": null,
                        "success": function (data) {
                            //console.log(data);

                            $.each(data, function (i, values) {
                                if (values.Activo == true) {
                                    Estado = "<img src='../../Images/Gride/activo.png' id='Activo' class='btnInactivar' style='margin-left:10%; cursor:pointer;' />";
                                }
                                else {
                                    Estado = "<img src='../../Images/Gride/inactivo.png' id='Inactivo' class='btnActivar' style='margin-left:10%; cursor:pointer;' />";
                                }
                                Img = "<img src='../../Images/Gride/pencil.png' id='Inactivo' class='btnEditar' style='margin-left:10%; cursor:pointer;' />";
                                TableRolActi.fnAddData([values.IdRol, values.DescRol, Img, Estado]);
                            });
                            $("#LoadingActivo").delay(1000).fadeOut("slow");
                            $("#RolesActivos").delay(1500).fadeIn("slow");
                        },
                        "error": function (error) {
                            console.log(error);
                        }
                    });
                });
                //FIN Funcion para cambiar de estado Activo a Inactivo de los ROLES


                _uiStatic.eventClick($("#AdminRoles"), function () {
                    $("#home").show();
                    $("#menu1").hide();
                });

                _uiStatic.eventClick($("#AdmiRolMenu"), function () {
                    cargarRoles();
                    ModAsoc.fnClearTable();
                    ModNoAsoc.fnClearTable();
                    $("#home").hide();
                    $("#menu1").show();
                });



                //INICIO Funcion para mostrar menus asociados y no asociados al ROL Seleccionado
                $("#dp_Roles").change(function () {
                    //Borra la informacion de las DATATABLES de Jquery
                    ModAsoc.fnClearTable();
                    ModNoAsoc.fnClearTable();
                    $.ajax({
                        "type": "GET",
                        "url": "/Roles/MenuRolAsoc?idrol=" + $("#dp_Roles").val(),
                        "data": null,
                        "success": function (data) {
                            //console.log(data);
                            $.each(data, function (i, values) {
                                if (values.Activo == true) {
                                    Estado = "<img src='../../Images/Gride/activo.png' id='MenuActivo' class='btnInacMenu' style='margin-left:10%; cursor:pointer;' />";
                                }
                                else {
                                    Estado = "<img src='../../Images/Gride/inactivo.png' id='MenuInactivo' class='btnActiMenu' style='margin-left:10%; cursor:pointer;' />";
                                }

                                ModAsoc.fnAddData([values.IdMenu, values.DescMenu, Estado]);
                            })
                        },
                        "error": function (error) {
                            console.log(error);
                        }
                    });

                    $.ajax({
                        "type": "GET",
                        "url": "/Roles/MenuRolNoAsoc?idrol=" + $("#dp_Roles").val(),
                        "data": null,
                        "success": function (data) {
                            //console.log(data);
                            $("#tbodyModNoAsoc").html("");
                            $.each(data, function (i, values) {
                                if (values.Activo == true) {
                                    Estado = "<img src='../../Images/Gride/activo.png' id='MenuActivo' class='btnInacMenu' style='margin-left:10%; cursor:pointer;' />";
                                }
                                else {
                                    Estado = "<img src='../../Images/Gride/inactivo.png' id='MenuInactivo' class='btnActiMenu' style='margin-left:10%; cursor:pointer;' />";
                                }

                                ModNoAsoc.fnAddData([values.IdMenu, values.DescMenu, Estado]);
                            })
                        },
                        "error": function (error) {
                            console.log(error);
                        }
                    });
                });
                //FIN Funcion para mostrar menus asociados y no asociados al ROL Seleccionado




                //INICIO Funcion para Asociar y Desasociar Menu en Roles
                $(document).on("click", ".btnInacMenu", function () {
                    //Borra la informacion de las DATATABLES de Jquery
                    ModAsoc.fnClearTable();
                    ModNoAsoc.fnClearTable();

                    //Obtiene los valores del TR donde se dio click...
                    var valores = "";
                    $(this).parents("tr").find("td").each(function () {
                        valores += $(this).html() + ",";
                    });
                    //console.log(valores);
                    var Data = valores.split(",");

                    //Oculta la tabla Módulos asociados asociados y Muestra el GIF de Cargando....
                    $("#ModAsoc").hide();
                    $("#LoadingModAsoc").show();
                    //Mediante el Ajax se realiza el cambio de estado y actualizacion de cada una de las DATATABLES 
                    $.ajax({
                        "type": "GET",
                        "url": "/Roles/DesAsociarMenuRol?idrol=" + $("#dp_Roles").val() + "&idmenu=" + Data[0],
                        "data": null,
                        "success": function (data) {
                            //console.log(data);
                            $.each(data, function (i, values) {
                                if (values.Activo == true) {
                                    Estado = "<img src='../../Images/Gride/activo.png' id='MenuActivo' class='btnInacMenu' style='margin-left:10%; cursor:pointer;' />";
                                }
                                else {
                                    Estado = "<img src='../../Images/Gride/inactivo.png' id='MenuInactivo' class='btnActiMenu' style='margin-left:10%; cursor:pointer;' />";
                                }

                                ModAsoc.fnAddData([values.IdMenu, values.DescMenu, Estado]);
                            });

                            //Oculto el GIF de cargando... y muestro nuevamente la table pera actualizada...
                            $("#LoadingModAsoc").delay(1000).fadeOut("slow");
                            $("#ModAsoc").delay(1500).fadeIn("slow");
                        },
                        "error": function (error) {
                            console.log(error);
                        }
                    });

                    //Oculta la tabla Módulos no asociados y Muestra el GIF de Cargando....
                    $("#LoadingModNoAsoc").delay(1000).fadeIn("slow");
                    $("#ModNoAsoc").hide();

                    //Mediante el Ajax se realiza la actualizacion de la DATATABLE de Roles Inactivos 
                    $.ajax({
                        "type": "GET",
                        "url": "/Roles/TableUpdMenuRolNoAso?idrol=" + $("#dp_Roles").val(),
                        "data": null,
                        "success": function (data) {
                            //console.log(data);
                            $.each(data, function (i, values) {
                                if (values.Activo == true) {
                                    Estado = "<img src='../../Images/Gride/activo.png' id='MenuActivo' class='btnInacMenu' style='margin-left:10%; cursor:pointer;' />";
                                }
                                else {
                                    Estado = "<img src='../../Images/Gride/inactivo.png' id='MenuInactivo' class='btnActiMenu' style='margin-left:10%; cursor:pointer;' />";
                                }

                                ModNoAsoc.fnAddData([values.IdMenu, values.DescMenu, Estado]);
                            });
                            $("#LoadingModNoAsoc").delay(1000).fadeOut("slow");
                            $("#ModNoAsoc").delay(1500).fadeIn("slow");
                        },
                        "error": function (error) {
                            console.log(error);
                        }
                    });
                });


                $(document).on("click", ".btnActiMenu", function () {

                    var valores = "";
                    $(this).parents("tr").find("td").each(function () {
                        valores += $(this).html() + ",";
                    });
                    //console.log(valores);
                    var Data = valores.split(",");

                    ModAsoc.fnClearTable();
                    ModNoAsoc.fnClearTable();

                    $("#ModNoAsoc").hide();
                    $("#LoadingModNoAsoc").show();

                    $.ajax({
                        "type": "GET",
                        "url": "/Roles/AsociarMenuRol?idrol=" + $("#dp_Roles").val() + "&idmenu=" + Data[0],
                        "data": null,
                        "success": function (data) {
                            //console.log(data);
                            $.each(data, function (i, values) {
                                if (values.Activo == true) {
                                    Estado = "<img src='../../Images/Gride/activo.png' id='MenuActivo' class='btnInacMenu' style='margin-left:10%; cursor:pointer;' />";
                                }
                                else {
                                    Estado = "<img src='../../Images/Gride/inactivo.png' id='MenuInactivo' class='btnActiMenu' style='margin-left:10%; cursor:pointer;' />";
                                }

                                ModNoAsoc.fnAddData([values.IdMenu, values.DescMenu, Estado]);
                            });
                            $("#LoadingModNoAsoc").delay(1000).fadeOut("slow");
                            $("#ModNoAsoc").delay(1500).fadeIn("slow");
                        },
                        "error": function (error) {
                            console.log(error);
                        }
                    });


                    $("#ModAsoc").hide();
                    $("#LoadingModAsoc").delay(1500).fadeIn("slow");
                    $.ajax({
                        "type": "GET",
                        "url": "/Roles/TableUpdMenuRolAso?idrol=" + $("#dp_Roles").val(),
                        "data": null,
                        "success": function (data) {
                            //console.log(data);

                            $.each(data, function (i, values) {
                                if (values.Activo == true) {
                                    Estado = "<img src='../../Images/Gride/activo.png' id='MenuActivo' class='btnInacMenu' style='margin-left:10%; cursor:pointer;' />";
                                }
                                else {
                                    Estado = "<img src='../../Images/Gride/inactivo.png' id='MenuInactivo' class='btnActiMenu' style='margin-left:10%; cursor:pointer;' />";
                                }

                                ModAsoc.fnAddData([values.IdMenu, values.DescMenu, Estado]);
                            });
                            $("#LoadingModAsoc").delay(1000).fadeOut("slow");
                            $("#ModAsoc").delay(1500).fadeIn("slow");
                        },
                        "error": function (error) {
                            console.log(error);
                        }
                    });
                });
                //FIN Funcion para Asociar y Desasociar Menu en Roles


                $(document).on("click", ".btnEditar", function () {
                    var valores = "";
                    $(this).parents("tr").find("td").each(function () {
                        valores += $(this).html() + ",";
                    });
                    var Data = valores.split(",");
                    _default.IdRol = Data[0];
                    _default.IdRolEstado = Data[3].split('"')[3];
                    if (_default.IdRolEstado != "Inactivo") {
                        $("#btnEditar").show();
                        $("#btnCancelar").show();
                        $("#btnAgregar").hide();
                        $("#txtNombreRol").val(Data[1]);
                    } else {
                        $("#btnEditar").hide();
                        $("#btnCancelar").hide();
                        $("#btnAgregar").show();
                        $("#txtNombreRol").val("");
                        Message("No se permite la edicion de roles inactivos, verifique.");
                    }
                });
            });
        },

        guardarRol: function () {
            var NombreRol = $("#txtNombreRol").val();
            var TableRolActi = $("#RolesActivos").dataTable();
            if (NombreRol != "") {
                $.ajax({
                    "type": "POST",
                    "url": "/Roles/CapturalRol",
                    "data": { NombreRol: NombreRol },
                    "success": function (data) {
                        var valor = "";
                        $.each(data, function (m, message) {
                            valor = message.Mensaje;
                        })

                        if (valor == "1") {
                            Message("El rol que desea crear ya existe, Verifique");
                        } else if (valor == "0") {
                            TableRolActi.fnClearTable();
                            $("#RolesActivos").hide();
                            $("#LoadingActivo").delay(1500).fadeIn("slow");
                            $.ajax({
                                "type": "GET",
                                "url": "/Roles/TableUpdRolActi",
                                "data": null,
                                "success": function (data) {
                                    //console.log(data);

                                    $.each(data, function (i, values) {
                                        if (values.Activo == true) {
                                            Estado = "<img src='../../Images/Gride/activo.png' id='Activo' class='btnInactivar' style='margin-left:10%; cursor:pointer;' />";
                                        }
                                        else {
                                            Estado = "<img src='../../Images/Gride/inactivo.png' id='Inactivo' class='btnActivar' style='margin-left:10%; cursor:pointer;' />";
                                        }
                                        Img = "<img src='../../Images/Gride/pencil.png' id='Inactivo' class='btnEditar' style='margin-left:10%; cursor:pointer;' />";
                                        TableRolActi.fnAddData([values.IdRol, values.DescRol, Img, Estado]);
                                    });
                                    $("#LoadingActivo").delay(1000).fadeOut("slow");
                                    $("#RolesActivos").delay(1500).fadeIn("slow");
                                },
                                "error": function (error) {
                                    console.log(error);
                                }
                            });
                            Message("Rol creado con exito.");
                        }
                    },
                    "error": function (error) {
                        console.log(error);
                    }
                });
            } else {
                Message("Debe ingresar nombre del rol, Verifique");
            }

        },


        //Editar Rol
        EditarRol: function () {
            var NombreRol = $("#txtNombreRol").val();
            var TableRolActi = $("#RolesActivos").dataTable();
            if (NombreRol != "") {
                $.ajax({
                    "type": "POST",
                    "url": "/Roles/EditarRol",
                    "data": { IdRol: _default.IdRol, NombreRol: NombreRol },
                    "success": function (data) {
                        var valor = "";
                        $.each(data, function (m, message) {
                            valor = message.Mensaje;
                        });
                        if (valor == "0") {
                            TableRolActi.fnClearTable();
                            $("#RolesActivos").hide();
                            $("#LoadingActivo").delay(1500).fadeIn("slow");
                            $.ajax({
                                "type": "GET",
                                "url": "/Roles/TableUpdRolActi",
                                "data": null,
                                "success": function (data) {
                                    //console.log(data);

                                    $.each(data, function (i, values) {
                                        if (values.Activo == true) {
                                            Estado = "<img src='../../Images/Gride/activo.png' id='Activo' class='btnInactivar' style='margin-left:10%; cursor:pointer;' />";
                                        }
                                        else {
                                            Estado = "<img src='../../Images/Gride/inactivo.png' id='Inactivo' class='btnActivar' style='margin-left:10%; cursor:pointer;' />";
                                        }
                                        Img = "<img src='../../Images/Gride/pencil.png' id='Inactivo' class='btnEditar' style='margin-left:10%; cursor:pointer;' />";
                                        TableRolActi.fnAddData([values.IdRol, values.DescRol, Img, Estado]);
                                    });
                                    $("#LoadingActivo").delay(1000).fadeOut("slow");
                                    $("#RolesActivos").delay(1500).fadeIn("slow");
                                },
                                "error": function (error) {
                                    console.log(error);
                                }
                            });
                            Message("Rol actualizado con exito.");
                            $("#txtNombreRol").val("");
                            $("#btnEditar").hide();
                            $("#btnAgregar").show();
                        }
                    },
                    "error": function (error) {
                        console.log(error);
                    }
                });
            } else {
                Message("Debe ingresar nombre del rol, Verifique");
            }
        },

        Cancelar: function(){
            $("#btnEditar").hide();
            $("#btnCancelar").hide();
            $("#btnAgregar").show();
            $("#txtNombreRol").val("");
        },

        error: function (error) {
            console.log(error)
        },
    }

    _default.loadData();
    _default.loadPages();
})(jQuery);

function DataTable() {
    $('#RolesActivos, #RolesInactivos, #ModAsoc, #ModNoAsoc').DataTable({
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


function cargarRoles() {
    $.ajax({
        type: "GET",
        url: "/Roles/OptionRoles",
        data: null,
        dataType: "json",
        success: function (result) {
            //console.log(result);
            content = $("#dp_Roles");
            var option = "";
            content.empty();
            $.each(result, function (i, values) {
                if (option == "") {
                    option = "<option value='-1'>Seleccione...</option><option value='" + values.IdRol + "'>" + values.DescRol + "</option>";
                } else {
                    option = option + "<option value='" + values.IdRol + "'>" + values.DescRol + "</option>";
                }
            });
            content.html(option);
        },
        error: function (result) {
            alert(result.message);
        }
    });
}


function Message(mensaje) {
    bootbox.dialog({
        message: "<h2>" + mensaje + "</h2>",
        title: "<b>Alerta</b>",
        buttons: {
            success: {
                label: ":: Aceptar ::",
                className: "btn-login",
                callback: function () {
                    //window.location.reload();
                }
            }
        }
    });
}

