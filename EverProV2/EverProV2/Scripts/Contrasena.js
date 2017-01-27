function comprobarPass(formulario) {
    var campo1 = formulario.passNuevo.value;
    var campo2 = formulario.confPass.value;

    if (campo1 == "" || campo2 == "") {
        return false;
    }

    if (campo1 == campo2) {
        return true;
    }
    else {
        alerta("Las contraseñas no coinciden","Alerta")
        return false;
    }
}


$(document).ready(function () {
    var password1 = $('#pswNuevo1'); //id of first password field
    var password2 = $('#pswNuevo2'); //id of second password field
    var passwordsInfo = $('#pass-info'); //id of indicator element
    $('#btnGuardar').hide();
    passwordStrengthCheck(password1, password2, passwordsInfo); //call password check function
});

function passwordStrengthCheck(password1, password2, passwordsInfo) {
    //Debe contener 4 o mas caracteres
    var WeakPass = /(?=.{4,}).*/;
    //Debe contener letras minusculas y al menos un numero
    var MediumPass = /^(?=\S*?[a-z])(?=\S*?[0-9])\S{5,}$/;
    //Debe contener una letra Mayuscula, letras minusculas y al menos un numero
    var StrongPass = /^(?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9])\S{5,}$/;
    //Debe contener una Mayuscula, letras minusculas, un numero, y un caracter especial
    var VryStrongPass = /^(?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9])(?=\S*?[^\w\*])\S{5,}$/;

    $(password1).on('keyup', function (e) {
        if (VryStrongPass.test(password1.val())) {
            passwordsInfo.removeClass().addClass('vrystrongpass').html("Contraseña segura");
            $('#validacionValor').val('1');
        }
        else if (StrongPass.test(password1.val())) {
            passwordsInfo.removeClass().addClass('strongpass').html("Ingrese al menos un caracter especial");
            $('#validacionValor').val('0');
            $('#btnGuardar').hide();
        }
        else if (MediumPass.test(password1.val())) {
            passwordsInfo.removeClass().addClass('goodpass').html("Ingrese al menos una letra mayuscúla");
            $('#validacionValor').val('0');
            $('#btnGuardar').hide();
        }
        else if (WeakPass.test(password1.val())) {
            passwordsInfo.removeClass().addClass('stillweakpass').html("Ingrese un número");
            $('#validacionValor').val('0');
            $('#btnGuardar').hide();
        }
        else {
            passwordsInfo.removeClass().addClass('weakpass').html("La contraseña debe ser de mas de 4 caracteres");
            $('#validacionValor').val('0');
            $('#btnGuardar').hide();
        }
    });

    $(password2).on('keyup', function (e) {
        if (password1.val() !== password2.val()) {
            passwordsInfo.removeClass().addClass('weakpass').html("Las contraseñas no coinciden");
        } else {
            var validacion = $('#validacionValor').val();
            if (validacion == '1') {
                $('#btnGuardar').show();
                passwordsInfo.removeClass().addClass('goodpass').html("Las contraseñas coinciden");
            }
            else {
                passwordsInfo.removeClass().addClass('goodpass').html("Las contraseñas coinciden pero no cumplen con los estandares de seguridad");
                $('#btnGuardar').hide();
            }
        }
    });
}


function alerta(mensaje,titulo) {
    bootbox.dialog({
        message: "<h2>" + mensaje + "</h2>",
        title: "<b>"+titulo+"</b>",
        buttons: {
            success: {
                label: ":: Aceptar ::",
                className: "btn-login",
                callback: function () {

                    if (mensaje == "La contraseña ha sido cambiada con exito") {
                        location.href = "/Seguridad/Logout";
                    }
                }
            }
        }
    });
}

function alertacon(mensaje, titulo) {
    bootbox.dialog({
        message: "<h2>" + mensaje + "</h2>",
        title: "<b>" + titulo + "</b>",
        buttons: {
            success: {
                label: ":: Aceptar ::",
                className: "btn-login",
                callback: function () {

                    if (mensaje == "La contraseña ha sido cambiada con exito") {
                        location.href = "/Seguridad/Login";
                    }
                }
            }
        }
    });
}