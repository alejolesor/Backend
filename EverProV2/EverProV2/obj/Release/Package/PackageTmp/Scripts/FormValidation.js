function FormValid(IdForm) {
    switch (IdForm) {
        case 1:
            var mensaje = "";
            if ($("#idUsuario").val() == "") {
                mensaje = "Debe ingresar la identificación del usuario, Verifique.";
            }
            else {
                if ($("#Nombre").val() == "") {
                    mensaje = "Debe ingresar el nombre completo del usuario, Verifique.";
                } else {
                    if ($("#usuarioDominio").val() == "") {
                        mensaje = "Debe ingresar el CE o identificación en caso de que el usuario aún no tenga asignado un CE, Verifique.";
                    }
                    else {
                        if ($("#ddlRol").val().trim() == "-1") {
                            mensaje = "Debe Seleccionar un rol al usuario, Verifique.";
                        }
                    }
                }
            }
            return mensaje;
            break;

        case 2:
            var mensaje = "";
            if ($("#idUsuario").val() == "") {
                mensaje = "Debe ingresar la identificación del funcionario, Verifique.";
            }
            else {
                if ($("#Nombre").val() == "") {
                    mensaje = "Debe ingresar el nombre completo del funcionario, Verifique.";
                } 
                
            }
            return mensaje;
            break;

        case 3:
            var mensaje = "";
            if ($("#listProcesos").val() == "") {
                mensaje = "Debe seleccionar el nombre del proceso, Verifique";
            } else {
                if ($("#noCaso").val() == "")
                {
                    mensaje = "Debe ingresar el numero de caso, Verifique";
                }
                else{
                    if ($("#listnivel").val() == "") {
                        mensaje = "Debe seleccionar el nivel, Verifique";
                    }
                    else {
                        if ($("#monto").val() == "") {

                            mensaje = "Debe ingresar el monto, Verifique";
                        }
                    }
                }

            }
           
           
            return mensaje;
            break;
            
    }
}

function numerico(campo) {
    $("#" + campo).keyup(function () {
        this.value = (this.value + '').replace(/[^0-9]/g, '');
    });
}

function alerta(mensaje) {
    bootbox.dialog({
        message: "<h2>" + mensaje + "</h2>",
        title: "<b>Advertencia</b>",
        buttons: {
            success: {
                label: ":: Aceptar ::",
                className: "btn-login",
                callback: function () {

                }
            }
        }
    });
}