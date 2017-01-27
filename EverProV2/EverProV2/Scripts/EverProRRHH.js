
$(document).ready(function () {

    $.extend({
        getUrlVars: function () {
            var vars = [], hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for (var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            return vars;
        },
        getUrlVar: function (name) {
            return $.getUrlVars()[name];
        }
    });

   

    obtenerPsl();
    obtenerPtl();
    obtenerPsc();
    obtenerJefe();
    $("#CATEGORIA").html("");
    //$("#JEFE").html("");
    $("#NIVEL").html("");

    $("#btnCargar").on("click", function () {
        debugger;
        var validar = validar_form();
        if (validar) {
            var RRHH = {
                Cedula: $("#NUMERODEDOCUMENTO").val(),
                NombreCompleto: $("#NOMBRECOMPLETO").val(),
                FechaNacimiento: $("#FECHADENACIMIENTO").val(),
                Edad: $("#EDAD").val(),
                TelefonoCelular: $("#TELEFONOCELULAR").val(),
                TelefonoContato: $("#TELEFONODECONTACTO").val(),
                Direccion: $("#DIRECCION").val(),
                IdMotivoIngreso: $("#MOTIVODELINGRESO option:selected").val(),
                IdTipoDocumento: $("#TIPODEDOCUMENTO option:selected").val(),
                IdGenero: $("#GENERO option:selected").val(),
                IdCiudad: $("#CIUDAD option:selected").val(),
                IdLocalidad: $("#LOCALIDAD option:selected").val(),
                IdCarreraEducativa: $("#CARRERAEDUCATIVA option:selected").val()
            };

            var CamposCapturados = JSON.stringify({
                'RRHH': RRHH
            });

            var url = "", redirecc = "";
            if (Cedula == "" || Cedula == null || Cedula == undefined) {
                url = "/EverProRRHH/InsertDatosPersonal";
                redirecc = '/EverProRRHH/EverProModuloEveris'
            } else {
                url = "/EverProRRHH/ActualizaDatosPersonalesEverPro";
                redirecc = '/EverProRRHH/EverProModuloEveris?Cedula=' + Cedula + "&IdForm=2"
            }

            $.ajax({
                type: "POST",
                dataType: "json",
                contentType: 'application/json', // Tipo de datos que envío
                url: url,
                async: true,
                data: CamposCapturados,
                success: function (row) {

                    debugger;
                    if (row == "Se han registrado los datos correctamente") {
                        confirmarGuardado("Alerta", row, "success", redirecc);
                    } else {
                        confirmarGuardado("Error", row, "error", '');
                    }

                    //console.log(Result);

                },
                //contentType: "application/json; charset=utf-8",
                error: function (error) {
                    console.log(error);
                }
            });
        }
    });


    $("#btnSigModEveris").on("click", function () {
        var validar = validar_form();
        if (validar) {
            var RRHHModEveris = {
                Cedula: $("#CEDULA").val(),
                Empresa: $("#EMPRESA option:selected").val(),
                FecContratacionTemporal: $("#FECHADECONTRATACIONTEMPORAL").val(),
                FecContratacionEveris: $("#FECHADECONTRATACIONEVERIS").val(),
                SalarioEveris: $("#SALARIOEVERIS2016").val(),
                CsrGeco: $("#CSRGECO2016").val(),
                Pais: $("#PAIS option:selected").val(),
                Cliente: $("#CLIENTE option:selected").val(),
                Proyecto: $("#PROYECTO option:selected").val(),
                Cargo: $("#CARGO option:selected").val(),
                Categoria: $("#CATEGORIA option:selected").val(),
                Nivel: $("#NIVEL option:selected").val()
            };

            var CamposCapturados = JSON.stringify({
                'RRHHModEveris': RRHHModEveris
            });


            var url = "", redirecc = "";
            if (Cedula == "" || Cedula == null || Cedula == undefined) {
                url = "/EverProRRHH/InsertDatosmoduloEveris";
                redirecc = '/EverProRRHH/EverProModuloEverPro'
            } else {
                url = "/EverProRRHH/ActualizaModuloEverisEverPro";
                redirecc = '/EverProRRHH/EverProModuloEverPro?Cedula=' + Cedula + "&IdForm=3"
            }

            $.ajax({
                type: "POST",
                dataType: "json",
                contentType: 'application/json', // Tipo de datos que envío
                url: url,
                async: true,
                data: CamposCapturados,
                success: function (row) {
                    debugger;
                    if (row == "Se han registrado los datos correctamente") {
                        confirmarGuardado("Alerta", row, "success", redirecc);
                    } else {
                        confirmarGuardado("Error", row, "error", '');
                    }
                },

                //contentType: "application/json; charset=utf-8",
                error: function (error) {
                    console.log(error);
                }

            });
        }
    });

    $("#btnSigEverProLider").on("click", function () {
        var validar = validar_form();
       // if (validar) {
            var RRHHEverProLideres = {
                Cedula: $("#CEDULA").val(),
                IdHC: $("#HC option:selected").val(),
                IdRol: $("#ROL option:selected").val(),
                CodigoDeEmpleado: $("#CODIGODEEMPLEADO").val(),
                CedJefe: $("#JEFE option:selected").val(),
                CedPsl: $("#PSL option:selected").val(),
                CedPtl: $("#PTL option:selected").val(),
                CedPsc: $("#PSC option:selected").val(),
                IdArea: $("#AREA").find(':selected').attr("data-Codigo"),
                IdProceso: $("#PROCESO option:selected").val(),
                IdClasificacion: $("#CLASIFICACION option:selected").val(),
                IdLugarDeTrabajo: $("#LUGARDETRABAJO option:selected").val(),
                IdTurno: $("#TURNO option:selected").val(),
                CedLiderSGD: $("#LIDERSGD option:selected").val()
            };

            var CamposCapturados = JSON.stringify({
                'RRHHEverProLideres': RRHHEverProLideres
            });

            var url = "";
            if (Cedula == "" || Cedula == null || Cedula == undefined) {
                url = "/EverProRRHH/InsertDatosDatosEverPro";
            } else {
                url = "/EverProRRHH/ActualizaModuloEverPro";
            }

            $.ajax({
                type: "POST",
                dataType: "json",
                contentType: 'application/json', // Tipo de datos que envío
                url: url,
                async: true,
                data: CamposCapturados,
                success: function (row) {

                    debugger;
                    if (row == "Se han registrado los datos correctamente") {
                        confirmarGuardado("Alerta", row, "success", '/Home/Index');
                    } else {
                        confirmarGuardado("Error", row, "error", '');
                    }

                },
                //contentType: "application/json; charset=utf-8",
                error: function (error) {
                    console.log(error);
                }
            });
        //}
    });

    function obtenerPsl() {
        transact.ajaxGET('/EverProRRHH/obtenerPsl?perfil=1', null,
            function (data) {
                _ui.llenarListasSeleccion($("#PSL"), data);
            }, function (error) { console.log(error); })
    }

    function obtenerPtl() {
        transact.ajaxGET('/EverProRRHH/obtenerPsl?perfil=2', null,
            function (data) {
                ("#PSL")
                _ui.llenarListasSeleccion($("#PTL"), data);
            }, function (error) { console.log(error); })
    }

    function obtenerPsc() {
        transact.ajaxGET('/EverProRRHH/obtenerPsl?perfil=3', null,
            function (data) {
                _ui.llenarListasSeleccion($("#PSC"), data);
            }, function (error) { console.log(error); })
    }


    function obtenerJefe() {
        transact.ajaxGET('/EverProRRHH/obtenerPsl?perfil=4', null,
            function (data) {
                setTimeout(function () {

                    _ui.llenarListasSeleccion($("#JEFE"), data);
                }, 100);
            }, function (error) { console.log(error); }, "json", false)
    }



    //$(document).on("change", "#CIUDAD", function () {
    //    var ciudad = $("#CIUDAD option:selected").val();
    //    if (ciudad != 3) {
    //        $("#LOCALIDAD").attr('disabled', true);
    //    }
    //    else {
    //        $("#LOCALIDAD").attr('disabled', false);
    //    }
    //});


    function confirmarGuardado(Titulo, Mensaje, Tipo, url) {
        swal({
            title: Titulo,
            text: Mensaje,
            type: Tipo
        },
           function () {
               if (url != '') {
                   document.location.href = url//window.location.reload();
               }
           });
    }

    var Cedula = $.getUrlVar('Cedula'),
        IdForm = $.getUrlVar('IdForm');

    if (Cedula != "" && IdForm != "") {
        if (IdForm == 1) {
            transact.ajaxGET('/EverProRRHH/consultarDatosPersonales?Cedula=' + Cedula, null,
                function (data) {
                    setTimeout(function () {
                        console.log(data);
                        $("#NOMBRECOMPLETO").val(data[0].NombreCompleto);
                        $("#NUMERODEDOCUMENTO").val(data[0].Cedula);
                        var fecha = dtConvFromJSON(data[0].FechaNacimiento);
                        $("#FECHADENACIMIENTO").val(fecha);
                        $("#EDAD").val(data[0].Edad);
                        $("#TELEFONOCELULAR").val(data[0].TelefonoCelular);
                        $("#TELEFONODECONTACTO").val(data[0].TelefonoContato);
                        $("#DIRECCION").val(data[0].Direccion);
                        $("#MOTIVODELINGRESO > option[value='" + data[0].IdMotivoIngreso + "']").attr("selected", true);
                        $("#MOTIVODELINGRESO").parent().find("span input").val($("#MOTIVODELINGRESO > option[value='" + data[0].IdMotivoIngreso + "']").text());
                        $("#GENERO option[value='" + data[0].IdGenero + "']").attr("selected", true);
                        $("#GENERO").parent().find("span input").val($("#GENERO option[value='" + data[0].IdGenero + "']").text());
                        $("#TIPODEDOCUMENTO option[value='" + data[0].IdTipoDocumento + "']").attr("selected", true);
                        $("#TIPODEDOCUMENTO").parent().find("span input").val($("#TIPODEDOCUMENTO option[value='" + data[0].IdTipoDocumento + "']").text());
                        $("#LOCALIDAD option[value='" + data[0].IdLocalidad + "']").attr("selected", true);
                        $("#LOCALIDAD").parent().find("span input").val($("#LOCALIDAD option[value='" + data[0].IdLocalidad + "']").text());
                        $("#CARRERAEDUCATIVA option[value='" + data[0].IdCarreraEducativa + "']").attr("selected", true);
                        $("#CARRERAEDUCATIVA").parent().find("span input").val($("#CARRERAEDUCATIVA option[value='" + data[0].IdCarreraEducativa + "']").text());
                        $("#CIUDAD option[value='" + data[0].IdCiudad + "']").attr("selected", true);
                        $("#CIUDAD").parent().find("span input").val($("#CIUDAD option[value='" + data[0].IdCiudad + "']").text());
                    }, 3000);
                }
                , function (error) { console.log(error) });
        } else {
            if (IdForm == 2) {
                transact.ajaxGET('/EverProRRHH/consultarModuloEveris?Cedula=' + Cedula, null,
               function (data) {
                   setTimeout(function () {
                       $("#EMPRESA > option[value='" + data[0].Empresa + "']").attr("selected", true);
                       $("#EMPRESA").parent().find("span input").val($("#EMPRESA > option[value='" + data[0].Empresa + "']").text());
                       var fechaTemp = dtConvFromJSON(data[0].FecContratacionTemporal);
                       $("#FECHADECONTRATACIONTEMPORAL").val(fechaTemp);
                       var fechaEver = dtConvFromJSON(data[0].FecContratacionEveris);
                       $("#FECHADECONTRATACIONEVERIS").val(fechaEver);
                       $("#SALARIOEVERIS2016").val(data[0].SalarioEveris);
                       $("#CSRGECO2016").val(data[0].CsrGeco);
                       $("#PAIS > option[value='" + data[0].Pais + "']").attr("selected", true);
                       $("#PAIS").parent().find("span input").val($("#PAIS > option[value='" + data[0].Pais + "']").text());
                       $("#CLIENTE > option[value='" + data[0].Cliente + "']").attr("selected", true);
                       $("#CLIENTE").parent().find("span input").val($("#CLIENTE > option[value='" + data[0].Cliente + "']").text());
                       $("#PROYECTO > option[value='" + data[0].Proyecto + "']").attr("selected", true);
                       $("#PROYECTO").parent().find("span input").val($("#PROYECTO > option[value='" + data[0].Proyecto + "']").text());
                       $("#CARGO > option[value='" + data[0].Cargo + "']").attr("selected", true);
                       $("#CARGO").parent().find("span input").val($("#CARGO > option[value='" + data[0].Cargo + "']").text());
                       _ui.cargarCategoriaNivel(data[0].Empresa);
                       $("#CATEGORIA > option[value='" + data[0].Categoria + "']").attr("selected", true);
                       $("#CATEGORIA").parent().find("span input").val($("#CATEGORIA > option[value='" + data[0].Categoria + "']").text());
                       $("#NIVEL > option[value='" + data[0].Nivel + "']").attr("selected", true);
                       $("#NIVEL").parent().find("span input").val($("#NIVEL > option[value='" + data[0].Nivel + "']").text());
                   }, 3000);
               }
               , function (error) { console.log(error) });
            } else {
                if (IdForm == 3) {
                    transact.ajaxGET('/EverProRRHH/consultarModuloEverProLideres?Cedula=' + Cedula, null,
                   function (data) {
                       setTimeout(function () {
                           debugger;
                           $("#ROL > option[value='" + data[0].IdRol + "']").attr("selected", true);
                           $("#ROL").parent().find("span input").val($("#ROL > option[value='" + data[0].IdRol + "']").text());
                           $("#HC > option[value='" + data[0].IdHc + "']").attr("selected", true);
                           $("#HC").parent().find("span input").val($("#HC > option[value='" + data[0].IdHc + "']").text());
                           $("#CODIGODEEMPLEADO").val(data[0].CodigoDeEmpleado);
                           obtenerJefe()
                           $("#JEFE > option[value='" + data[0].CedJefe + "']").attr("selected", true);
                           $("#JEFE").parent().find("span input").val($("#JEFE > option[value='" + data[0].CedJefe + "']").text());
                           $("#PSL > option[value='" + data[0].CedPsl + "']").attr("selected", true);
                           $("#PSL").parent().find("span input").val($("#PSL > option[value='" + data[0].CedPsl + "']").text());
                           $("#PTL > option[value='" + data[0].CedPtl + "']").attr("selected", true);
                           $("#PTL").parent().find("span input").val($("#PTL > option[value='" + data[0].CedPtl + "']").text());
                           $("#PSC > option[value='" + data[0].CedPsc + "']").attr("selected", true);
                           $("#PSC").parent().find("span input").val($("#PSC > option[value='" + data[0].CedPsc + "']").text());
                           $("#AREA > option[value='" + data[0].IdArea + "']").attr("selected", true);
                           $("#AREA").parent().find("span input").val($("#AREA > option[data-Codigo='" + data[0].IdArea + "']").text());
                           $("#PROCESO > option[value='" + data[0].IdProceso + "']").attr("selected", true);
                           $("#PROCESO").parent().find("span input").val($("#PROCESO > option[value='" + data[0].IdProceso + "']").text());
                           $("#CLASIFICACION > option[value='" + data[0].IdClasificacion + "']").attr("selected", true);
                           $("#CLASIFICACION").parent().find("span input").val($("#CLASIFICACION > option[value='" + data[0].IdClasificacion + "']").text());
                           $("#LUGARDETRABAJO > option[value='" + data[0].IdLugarDeTrabajo + "']").attr("selected", true);
                           $("#LUGARDETRABAJO").parent().find("span input").val($("#LUGARDETRABAJO > option[value='" + data[0].IdLugarDeTrabajo + "']").text());
                           $("#TURNO > option[value='" + data[0].IdTurno + "']").attr("selected", true);
                           $("#TURNO").parent().find("span input").val($("#TURNO > option[value='" + data[0].IdTurno + "']").text());
                           _ui.obtenerLiderSGD(data[0].IdArea);
                           $("#LIDERSGD > option[value='" + data[0].CedLiderSGD + "']").attr("selected", true);
                           $("#LIDERSGD").parent().find("span input").val($("#LIDERSGD > option[value='" + data[0].CedLiderSGD + "']").text());
                       }, 3000);
                   }
                   , function (error) { console.log(error) });
                }
            }
        }

    }
});

//Validar que los campos requeridos nos se vayan vacios
function validar_form() {
    var biarray = {};
    var validacionObligatorio = $("#contentCampos").find("input, select,textarea");
    var retorne = true;
    // retorne = _fx.validFormulario(validacionObligatorio);
    $.each(validacionObligatorio, function (i, values) {

        values = $(values);

        var datos = values.attr("id");
        var camposarmado = values.attr("id");
        var x = values.attr("required");

        if (x && values.val() == "" || x && values.val() == null) {
            values.focus();
            values.css("border", "1px solid red");
            values.attr("title", "*Campo requerido");
            values.tooltipster({
                position: 'right',
                content: $('<span><strong>(*) Campo requerido</strong></span>'),
                animation: 'swing',
                delay: 200,
                theme: 'tooltipster-light',
                touchDevices: false,
                trigger: 'hover'
            });

            values.tooltipster('show');

            $(window).keypress(function () {
                values.tooltipster('hide');
            });
            retorne = false;

            return retorne;
        } else {
            values.css({
                "color": "black",
                "border": "1px solid gray"
            });
            //values.focus();
        }

    });
    return retorne;
}





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
    if (curr_date < 10) {
        curr_date = "0" + curr_date;
    }
    if (curr_month < 10) {
        curr_month = "0" + curr_month;
    }
    var d = curr_year + '-' + curr_month.toString() + '-' + curr_date;
    return d;

}

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i
}


