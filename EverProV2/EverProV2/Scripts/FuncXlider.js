/// <reference path="../Views/FuncPorLiderDetalle/Productividad.aspx" />
/// <reference path="../Views/FuncPorLiderDetalle/Productividad.aspx" />
/// <reference path="../Views/FuncPorLiderDetalle/Productividad.aspx" />

$(document).ready(function () {
    ajaxTable(idLider);
    setInterval(function () {
        ajaxTable(idLider);
        CountFuncLider(idLider);
        ConteoCasos(idLider);

    }, 100000);

    //$("#ListColas").click(function () {

    //    $('#home').show();
    //    $('#menu1').hide();
    //})


    //$("#ListFunc").click(function () {

    //    $('#menu1').show();
    //    $('#home').hide();
    //})

    //var cadena = "leonardo";
    //var separador = "";
    //var datas = cadena.split(separador);
    //var data2 = datas[2];
    //alert("este es el resultado " + datas + " esta es la posicion No. 2: " + data2);




    function ajaxTable(idLider) {
        transact.ajaxGET('/ListadoColas/trazaCasosFuncionarios?idLider=' + idLider, null, success_func, null);
    }
    var Tablefunc = $("#ListFuncionariosXlider").dataTable({
        //"scrollY": "800px",
        //"scrollCollapse": true,
        //"paging": false,
        //"ordering": false,
        //"info": false,
    });
    function success_func(tabla) {

        var tbFuncSGD = "";
        // string Estado = "";
        var btnEstado = "";


        Tablefunc.fnClearTable();
        $.each(tabla, function (i, lisTraza) {
            if (lisTraza.Estado == 3) {
                // Estado = "DISPONIBLE";
                btnEstado = "<img src='../../Images/Estados/152.png' style='cursor:pointer;' data-toggle='tooltip' data-placement='bottom' title='DISPONIBLE'/>";

            }
            if (lisTraza.Estado == 4) {
                //Estado = " NO DISPONIBLE";
                btnEstado = "<img src='../../Images/Estados/154.png' style='cursor:pointer;' data-toggle='tooltip' data-placement='bottom' title=' NO DISPONIBLE'/>";

            }
            if (lisTraza.Estado == 5) {
                //Estado = "OCUPADO";
                btnEstado = "<img src='../../Images/Estados/151.png' style='cursor:pointer;' data-toggle='tooltip' data-placement='bottom' title='OCUPADO'/>";

            }
            if (lisTraza.Estado == 6) {
                //Estado = "SIN INICIO DE SESION";
                btnEstado = "<img src='../../Images/Estados/159.png' style='cursor:pointer;' data-toggle='tooltip' data-placement='bottom' title='SIN INICIO DE SESION'/>";

            }
            if (lisTraza.Estado == 10) {
                //Estado = "SUSPENDIDOS";
                btnEstado = "<img src='../../Images/Estados/153.png' style='cursor:pointer;' data-toggle='tooltip' data-placement='bottom' title='SUSPENDIDOS'/>";

            }
            if (lisTraza.Estado == null || lisTraza.Estado == "") {
                btnEstado = "";
            }

            var ans1 = lisTraza.Ans;
            var horaIni = lisTraza.HoraInicio;

            var proceso = lisTraza.Proceso;
            var procesoNul = "N/A";
            if (proceso == "" || proceso == null) {
                proceso = procesoNul;
            }

            var producto = lisTraza.Productos;
            var productoNul = "N/A";
            if (producto == "" || producto == null) {
                producto = productoNul;
            }

            var nivel = lisTraza.Nivel;
            var nivelNul = "N/A";
            if (nivel == "" || nivel == null) {
                nivel = nivelNul;
            }


            var ans = lisTraza.Ans;
            var ansNul = "N/A";
            if (ans == "" || ans == null) {
                ans = ansNul;
            } else {
                ans = ans + " min";
            }
            var caso = lisTraza.Ncaso;
            var casoNulo = "0000000";
            if (caso == "" || caso == null) {
                caso = casoNulo;
            }
            var input = "";
            if (lisTraza.NombreCompleto == "" || lisTraza.NombreCompleto == null) {
                input = "<input type = 'checkbox' id='check_" + i + "'/>";
            }


            var Reapertura = "(" + lisTraza.Reprocesos + ")";
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

            Tablefunc.fnAddData([input, "" + caso + " " + " " + Reapertura + " ", proceso, nivel, lisTraza.CONVENIO, lisTraza.dif + "/ H", accounting.formatMoney(lisTraza.Monto), btnEstado, NombreApellido(lisTraza.NombreCompleto), killer, progresVar]);


        });

        setTimeout(function () {
            BarraProgress();
            CountFuncLider(idLider);
            ConteoCasos(idLider);

        }, 1000);

        setInterval(function () {
            BarraProgress();
        }, 4000);



        $("#productividad").click(function () {
            var lider = idLider;

            window.open('/FuncPorLiderDetalle/VistaProductividad?idLider=' + lider, 'nuevaVentana', 'width=800px, height=600px');


        });

        ///////////////////////////////////////////////////
        $("#conectados").click(function () {
            var lider = idLider;

            window.open('/FuncPorLiderDetalle/VistaSelectEstados?idLider=' + lider + '&estado=3', 'nuevaVentana', 'width=800px, height=600px');


        });

        $("#ausentes").click(function () {
            var lider = idLider;

            window.open('/FuncPorLiderDetalle/VistaSelectEstados?idLider=' + lider + '&estado=4', 'nuevaVentana', 'width=800px, height=600px');


        });

        $("#ocupados").click(function () {
            var lider = idLider;

            window.open('/FuncPorLiderDetalle/VistaSelectEstados?idLider=' + lider + '&estado=5', 'nuevaVentana', 'width=800px, height=600px');


        });
        $("#desconectados").click(function () {
            var lider = idLider;

            window.open('/FuncPorLiderDetalle/VistaSelectEstados?idLider=' + lider + '&estado=6', 'nuevaVentana', 'width=800px, height=600px');


        });
        $("#suspendidos").click(function () {
            var lider = idLider;

            window.open('/FuncPorLiderDetalle/VistaSelectEstados?idLider=' + lider + '&estado=10', 'nuevaVentana', 'width=800px, height=600px');


        });
        ////////////////////////////////////////

        $("#checkTodos").on("click", function () {

            var chequeo = $("#ListFuncionariosXlider tbody").find("input[type='checkbox']");
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


    function CountFuncLider(idLider) {

        $.ajax({
            type: "GET",
            url: "/FuncPorLiderDetalle/CountFuncLider?idLider=" + idLider,
            success: function (data) {

                $(data).each(function () {
                    $("#conect").html(data[0].ESTADO);//.css("font-weith", "bold"); //font-weight: bold
                    $("#ausen").html(data[1].ESTADO);
                    $("#ocup").html(data[2].ESTADO);
                    $("#desconec").html(data[3].ESTADO);
                    $("#suspend").html(data[4].ESTADO);

                });

            },

        });

    }

    function ConteoCasos(idLider) {


        var horaIni = "08:00:00";
        var horaFin = "21:00:00";
        var fechaHoy = $("#fechaActual").val();
        var fechaIni = fechaHoy + " " + horaIni;//02/09/2016 08:00:00
        var fechaFin = fechaHoy + " " + horaFin;
        $.ajax({
            type: "GET",
            url: "/FuncPorLiderDetalle/ConteoCasos?idLider=" + idLider + "&fechaIni=" + fechaIni + "&fechaFin=" + fechaFin,
            success: function (data) {

                $(data).each(function () {
                    $("#cola").html(data[0].DescripcionEstados);//.css("font-weith", "bold"); //font-weight: bold
                    $("#Ncola").html(data[0].Cant);
                    //$("#manual").html(data[1].DescripcionEstados);
                    //$("#Nmanu").html(data[1].Cant);
                    //$("#asig").html(data[2].DescripcionEstados);
                    //$("#Nasig").html(data[2].Cant);
                    //$("#fin").html(data[3].DescripcionEstados);
                    //$("#Nfin").html(data[3].Cant);

                });

            },

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

});