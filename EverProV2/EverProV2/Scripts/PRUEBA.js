/// <reference path="../Views/FuncPorLiderDetalle/Productividad.aspx" />
/// <reference path="../Views/FuncPorLiderDetalle/Productividad.aspx" />
/// <reference path="../Views/FuncPorLiderDetalle/Productividad.aspx" />

$(document).ready(function () {
    ajaxTable(idLider);
    setInterval(function () {
        ajaxTable(idLider);
        //CountFuncLider(idLider);
        //ConteoCasos(idLider);

    }, 100000);


    function ajaxTable(idLider) {
        transact.ajaxGET('/ListadoColas/trazaCasosFuncionarios?idLider=' + idLider, null, success_func, null);
    }


    //var Tablefunc = $("#ListFuncionariosXlider").dataTable({
    //    //"scrollY": "800px",
    //    //"scrollCollapse": true,
    //    //"paging": false,
    //    //"ordering": false,
    //    //"info": false,
    //    serverSide: true,
    //    ordering: false,
    //    searching: false,
    //    scrollY: 450,
    //    scrollX: 600,
    //    scroller: {
    //        loadingIndicator: true
    //    }


    //});




    function success_func(Datres) {
        var oTables = $("#ListFuncionariosXlider").DataTable();
        oTables.destroy();
        var oTables = $('#ListFuncionariosXlider').DataTable({
            "language": {
                "sPaginationType": "full_numbers",
                "sProcessing": "<img src='../../Images/Splitter/ajax-loader-green-large.gif' style='width: 25%;'/> <br> Cargando registros...",
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
                "sLoadingRecords": "<img src='../../Images/Splitter/ajax-loader-green-large.gif' style='width: 25%;'/><br> Cargando registros..."

            },
            serverSide: true,
            ordering: true,
            searching: true,
            ajax: function (data, callback, settings) {
                var out = [];

                var tbFuncSGD = "";
                // string Estado = "";
                var btnEstado = "";


                debugger;
                for (var i = data.start, ien = data.start + data.length ; i < ien ; i++) {

                    if (i < Datres.length) {
                        if (Datres[i].Estado == 3) {
                            // Estado = "DISPONIBLE";
                            btnEstado = "<img src='../../Images/Estados/152.png' style='cursor:pointer;' data-toggle='tooltip' data-placement='bottom' title='DISPONIBLE'/>";

                        }
                        if (Datres[i].Estado == 4) {
                            //Estado = " NO DISPONIBLE";
                            btnEstado = "<img src='../../Images/Estados/154.png' style='cursor:pointer;' data-toggle='tooltip' data-placement='bottom' title=' NO DISPONIBLE'/>";

                        }
                        if (Datres[i].Estado == 5) {
                            //Estado = "OCUPADO";
                            btnEstado = "<img src='../../Images/Estados/151.png' style='cursor:pointer;' data-toggle='tooltip' data-placement='bottom' title='OCUPADO'/>";

                        }
                        if (Datres[i].Estado == 6) {
                            //Estado = "SIN INICIO DE SESION";
                            btnEstado = "<img src='../../Images/Estados/159.png' style='cursor:pointer;' data-toggle='tooltip' data-placement='bottom' title='SIN INICIO DE SESION'/>";

                        }
                        if (Datres[i].Estado == 10) {
                            //Estado = "SUSPENDIDOS";
                            btnEstado = "<img src='../../Images/Estados/153.png' style='cursor:pointer;' data-toggle='tooltip' data-placement='bottom' title='SUSPENDIDOS'/>";

                        }
                        if (Datres[i].Estado == null || Datres[i].Estado == "") {
                            btnEstado = "";
                        }
                        var ans1 = Datres[i].Ans;
                        var horaIni = Datres[i].HoraInicio;

                        var proceso = Datres[i].Proceso;
                        var procesoNul = "N/A";
                        if (proceso == "" || proceso == null) {
                            proceso = procesoNul;
                        }

                        var producto = Datres[i].Productos;
                        var productoNul = "N/A";
                        if (producto == "" || producto == null) {
                            producto = productoNul;
                        }

                        var nivel = Datres[i].Nivel;
                        var nivelNul = "N/A";
                        if (nivel == "" || nivel == null) {
                            nivel = nivelNul;
                        }


                        var ans = Datres[i].Ans;
                        var ansNul = "N/A";
                        if (ans == "" || ans == null) {
                            ans = ansNul;
                        } else {
                            ans = ans + " min";
                        }
                        var caso = Datres[i].Ncaso;
                        var casoNulo = "0000000";
                        if (caso == "" || caso == null) {
                            caso = casoNulo;
                        }
                        var input = "";
                        if (Datres[i].NombreCompleto == "" || Datres[i].NombreCompleto == null) {
                            input = "<input type = 'checkbox' id='check_" + i + "'/>";
                        }


                        var Reapertura = "(" + Datres[i].Reprocesos + ")";
                        var killer = "";

                        var progresVar = ("<div class='progress'>"
                                            + "<div class='progress-bar progress-bar" + i + "' role='progressbar' aria-valuenow='70'"
                                            + "aria-valuemin='0' aria-valuemax='100' style='width:0%'>"
                                            + "<span style='color:#000'>N/A</span>"
                                            + "</div>"
                                             + "<span class='sr-only'>N/A</span>"
                                            + "</div>"
                                            + "<input type='hidden' id='Ans" + i + "' value='" + ans1 + "'/>"
                                            + "<input type='hidden' id='HoraInihoraIni" + i + "' value='" + horaIni + "'/>");

                        // Tablefunc.fnAddData([input, "" + caso + " " + " " + Reapertura + " ", proceso, nivel, lisTraza.CONVENIO, lisTraza.dif + "/ H", accounting.formatMoney(lisTraza.Monto), btnEstado, NombreApellido(lisTraza.NombreCompleto), killer, progresVar]);

                        if (Datres.length == 54) {
                            debugger;
                            out.push([input, "" + caso + " " + " " + Reapertura + " ", proceso, nivel, Datres[i].CONVENIO, Datres[i].dif + "/ H", accounting.formatMoney(Datres[i].Monto), btnEstado, NombreApellido(Datres[i].NombreCompleto), killer, progresVar])
                        } else {
                            if (i < Datres.length) {
                                //    out.push([Datres[i].CONVENIO, Datres[i].CEDULA, Datres[i].ESTADO_CREDITO_NUEVO, Datres[i].PLAZO_INICIAL_CREDITO_ANTERIOR, Datres[i].FECHA_DESEMBOLSO_CREDITO_ANTERIOR,
                                //Datres[i].ESTADO_CREDITO_ANTERIOR, Datres[i].FECHA_FIN_REAL_DEL_CREDITO_CANCELADO, Datres[i].CREDITO_ANTERIOR, Datres[i].CREDITO_NUEVO, Datres[i].MES_ANO_PARA_ENVIO, '<textarea rows="1" cols="30" name="Observacion" readonly id="Observacion" maxlength="100" class="form-control">' +
                                //Datres[i].OBSERVACIONES + '</textarea>', Datres[i].FECHA_SOLICITUD_NEGOCIO, Datres[i].FECHA_ACTUALIZACION_OPERACION, dtConvFromJSONCompleta(Datres[i].FECHA_CARGA), '<img src="../../Images/Gride/pencil.png" id="editar" class="buttonEdit" style="margin-left:10%;" />'])
                                //   out.push([input, "" + caso + " " + " " + Reapertura + " ", proceso, nivel, ])
                                out.push([input, "" + caso + " " + " " + Reapertura + " ", proceso, nivel, Datres[i].CONVENIO, Datres[i].dif + "/ H", accounting.formatMoney(Datres[i].Monto), btnEstado, NombreApellido(Datres[i].NombreCompleto), killer, progresVar])
                            }
                        }
                        //}
                    } else {
                        break;
                    }
                }

                setTimeout(function () {
                    BarraProgress();
                    //CountFuncLider(idLider);
                    //ConteoCasos(idLider);

                }, 1000);

                setInterval(function () {
                    BarraProgress();
                }, 4000);



                setTimeout(function () {
                    callback({
                        draw: data.draw,
                        data: out,
                        recordsTotal: Datres.length,
                        recordsFiltered: Datres.length
                    });
                }, 50);
            },
            scrollY: 400,
            scrollX: 1,
            scroller: {
                loadingIndicator: true
            }
        });
    }
});

function NombreApellido(nombre) {

    var nom = nombre.split(" ");
    var nomCompuesto = "";
    if (nom.length == 4 || nom.length == 3 || nom.length == 5) {
        nomCompuesto = nom[0] + " " + nom[2];
    } else if (nom.length == 2) {
        nomCompuesto = nom[0] + " " + nom[1];
    }
    else if (nom.length == 6) {
        nomCompuesto = nom[0] + " " + nom[4];
    }
    return nomCompuesto;
}

function BarraProgress() {

    var body = $("#ListFuncionariosXlider tbody tr").find("td");
    var j = 1;
    $.each(body, function (i, valor) {
        var input = $(this).find("input, .progress-bar");
        var tiempo = 0;
        var tiempoTotal = 0;

        if (j % 11 == 0) {
            var ans1 = $("#" + input[1].id).val();
            var horaIni = $("#" + input[2].id).val();
            var horaAct = clock();
            var ansporcent = 0, ans25 = 0, ans50 = 0, ans75 = 0;
            if (ans1 != "null" && ans1 != undefined) {
                if (horaIni != "null" && horaIni != undefined) {
                    tiempoTotal = extraer_tiempototal(horaIni, horaAct);

                    ansporcent = ans1 / 100;
                    ans25 = ansporcent * 25;
                    ans50 = ansporcent * 50;
                    ans75 = ansporcent * 75;

                    var ClaseName = input[0].className.split(' ');

                    if (tiempoTotal >= ans1) {

                        if ($("." + ClaseName[1]).html() != "" + tiempoTotal + " minutos") {
                            $("." + ClaseName[1]).attr({ "style": "width:100% ;background:#FF0000 !important; color: #fff", 'title': ans1 + " minutos" })
                            $("." + ClaseName[1]).html(ans1 + "/" + tiempoTotal + " minutos");
                        }
                    } else if (tiempoTotal > Math.round(ans50) && tiempoTotal < ans1) {

                        if ($("." + ClaseName[1]).html() != "" + tiempoTotal + " minutos") {
                            $("." + ClaseName[1]).attr({ "style": "width:75% ;background:#FFBF00 !important; color: #fff", 'title': ans1 + " minutos" })
                            $("." + ClaseName[1]).html(ans1 + "/" + tiempoTotal + " minutos");
                        }
                    }
                    else if (tiempoTotal > Math.round(ans25) && tiempoTotal <= Math.round(ans50)) {

                        if ($("." + ClaseName[1]).html() != "" + tiempoTotal + " minutos") {
                            $("." + ClaseName[1]).attr({ "style": "width:50% ;background:#01DF01 !important; color: #fff", 'title': ans1 + " minutos" })
                            $("." + ClaseName[1]).html(ans1 + "/" + tiempoTotal + " minutos");
                        }
                    }
                    else if (tiempoTotal <= Math.round(ans25) && tiempoTotal > 1) {

                        if ($("." + ClaseName[1]).html() != "" + tiempoTotal + " minutos") {
                            $("." + ClaseName[1]).attr({ "style": "width:25% ;background:#01DF01 !important; color: #fff", 'title': ans1 + " minutos" })
                            $("." + ClaseName[1]).html(ans1 + "/" + tiempoTotal + " minutos");
                        }

                    } else if (tiempoTotal == 1) {

                        if ($("." + ClaseName[1]).html() != "" + tiempoTotal + " minuto") {
                            $("." + ClaseName[1]).attr({ "style": "width:10% ;background:#01DF01 !important; color: #fff", 'title': ans1 + " minutos" })
                            $("." + ClaseName[1]).html(ans1 + "/" + tiempoTotal + " minuto");
                        }
                    }

                }
            }
        }
        j++;
    });
}


function dtConvFromJSONCompleta(data) {
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
    var curr_m = c.getMinutes();
    var curr_s = c.getSeconds();
    var curr_offset = c.getTimezoneOffset() / 60

    if (curr_date < 10) {
        curr_date = "0" + curr_date;
    }
    if (curr_month < 10) {
        curr_month = "0" + curr_month;
    }
    if (curr_h < 10) {
        curr_h = "0" + curr_h;
    }
    if (curr_m < 10) {
        curr_m = "0" + curr_m;
    }
    if (curr_s < 10) {
        curr_s = "0" + curr_s;
    }

    var d = curr_date + '/' + curr_month.toString() + '/' + curr_year + " " + curr_h + ':' + curr_m + ':' + curr_s;
    return d;
}


function clock() {
    var d = new Date();
    var output = d.getTime();

    return "/Date(" + output + ")/";
}


//Extrae el tiempo total entre dos horas
function extraer_tiempototal(horaini, horaact) {
    var diff;

    var fecha1 = horaini.substring(6, horaini.length - 2);
    var fecha2 = horaact.substring(6, horaini.length - 2);

    diff = fecha2 - fecha1;
    // calcular la diferencia en segundos
    var diffSegundos = Math.abs(diff / 1000);


    // calcular la diferencia en minutos
    var diffMinutos = Math.abs(diff / (60 * 1000));

    var restominutos = diffMinutos % 60;

    // calcular la diferencia en horas
    var diffHoras = (diff / (60 * 60 * 1000));

    // calcular la diferencia en dias
    var diffdias = Math.abs(diff / (24 * 60 * 60 * 1000));

    //console.log("En segundos: " + diffSegundos + " segundos.");
    //console.log("En minutos: " + diffMinutos + " minutos.");
    //console.log("En horas: " + diffHoras + " horas.");
    //console.log("En dias: " + diffdias + " dias.");

    var devolver = parseInt(diffHoras) + "H " + Math.round(restominutos) + "m ";
    //console.log(devolver)

    var tiempototal = Math.round((parseInt(diffHoras) * 60) + restominutos);

    //console.log(tiempototal);

    return tiempototal;

}