/*
* Autor : Elena Parra
* Version: 1.0
* _fx administra todas las funciones que permiten hacer validacion,conveciones y formateo de informacion. 
*/
//$.fn._fx = null;
(function ($) {

    var _fx = window._fx = {

        /*
         @element: Elemento del DOM 
         @obligatorioSi: paramentro de validacion

         *Valiada si debe ser obligatorio el elemento y configura el elemento para 
         *volverlo obligatorio.
        */
        obligatorio: function (element, obligatorioSi) {
            if (obligatorioSi) {
                element = $(element);
                element.attr({
                    "required": "",
                    "title": "*Campo requerido"
                });
            }
        },

        /*
       @element: Elemento del DOM 
       @obligatorioSi: paramentro de habilitar

       *Valiada si el elemento se habilita o no y lo configura
      */
        editable: function (element, editableSi) {
            if (!editableSi) {
                element = $(element);
                element.attr("readonly", true);
            }
        },

        /*
         Evento que permite colocar un campo de doble captura   
        */
        dobleCaptura: function (e) {
            var _this = e.currentTarget == undefined ? $(e) : $(e.currentTarget);
            campo = $(_this);
            if (sessionStorage["Contador"] == 0) {
                sessionStorage["Captura1"] = campo.val();
                sessionStorage["Contador"] = 1;
                campo.focus().val("");
            } else {
                var captura1 = sessionStorage["Captura1"];
                var Captura2 = campo.val();
                if (captura1 == Captura2) {
                    campo.next().focus();
                    sessionStorage["Contador"] = 0;
                    sessionStorage["Captura1"] = "";
                } else {
                    campo.focus().val("");
                    sessionStorage["Contador"] = 0;
                    sessionStorage["Captura1"] = "";
                }
            }
        },

        /*
         @elemento: elemento del DOM
         @funcion: nombre de la funcion a ejecutar.
         @evento: Nombre del evento al que le va asignar le funcion
         *
         * Convierte un string en una funcion Javacript
        */
        ejecutarFuncionJS: function (elemento, funcion, evento) {
            elemento = $(elemento);
            var func = window[funcion];
            console.log(func);
            elemento.on(evento, eval(funcion));
        },

        /* 
         * Evento que permite solo numeros en un campo
        */
        numbersonly: function (e) {
            //asignamos el valor de la tecla a keynum
            if (window.event) {// IE
                keynum = e.keyCode;
            } else {
                keynum = e.which;
            }
            //comprobamos si se encuentra en el rango
            if (keynum >= 48 && keynum <= 57 || keynum >= 96 && keynum <= 105) {
                return true;
            } else {
                if (keynum == 17 || keynum == 86)
                    return true
                else {
                    $(e.currentTarget).val("");
                    return false;
                }
            }

        },
        
        /*
          @fechaDDMMAAAA : fecha con el formato dia, mes y año.

         * Convierte la fecha dia, mes y año en el formato de fecha  Mes , dia y años
        */
        formatoMMDDAAAA: function (fechaDDMMAAAA) {
            var fechaFormato = fechaDDMMAAAA.split('/')[1] + "/" + fechaDDMMAAAA.split('/')[0] + "/" + fechaDDMMAAAA.split('/')[2];
            return fechaFormato;
        },

        /*
         @fechaAAAADDMM : fecha con el formato año, dia y mes.

         * Convierte la fecha año, dia y mes, en el formato de fecha  dia, mes y años
       */
        formatoDDMMAAAA: function (fechaAAAADDMM) {
            var fechaFormato = fechaAAAADDMM.split('-')[2] + "/" + fechaAAAADDMM.split('-')[1] + "/" + fechaAAAADDMM.split('-')[0];
            return fechaFormato;
        },

       
        diferenciaEntreFechas: function (fechaMayor, FechaMenor) {

            var años = (FechaMenor.getMonth() + 1) > (fechaMayor.getMonth() + 1) ? (fechaMayor.getFullYear() - FechaMenor.getFullYear()) - 1 : fechaMayor.getFullYear() - FechaMenor.getFullYear();

            var meses = (FechaMenor.getMonth() + 1) > (fechaMayor.getMonth() + 1) ? ((FechaMenor.getMonth() + 1)) - ((fechaMayor.getMonth() + 1)) : ((fechaMayor.getMonth() + 1)) - ((FechaMenor.getMonth() + 1));

            var dias = FechaMenor.getDate() > fechaMayor.getDate() ? FechaMenor.getDate() - fechaMayor.getDate() : fechaMayor.getDate() - FechaMenor.getDate();

            var resultado = { "años": años, "meses": meses, "dias": dias };
            return resultado;
        },

        searchValueOption: function (elemento, searcValue) {
            var value;
            var texto = $(elemento).html();
            var valores = texto.split("value");
            $.each(valores, function (i, values) {
                if (values.indexOf(searcValue) != -1) {
                    value = values.split("\"")[1];
                }

            });

            return value;
        },

        aplicarMask_Timer: function (elemento) {
            $(elemento).attr("placeholder", "hh:mm")

            $.mask.definitions['~'] = "[+-]";
            $(elemento).mask("99:99", {});

            //$(elemento).blur(function () {
            //    $("#info").html("Unmasked value: " + $(this).mask());
            //}).dblclick(function () {
            //    //$(this).unmask();
            //});
        },

        aplicarMask_TimerMalla: function (elementos) {
            $(elementos).attr("placeholder", "hh:mm - hh:mm")

            $.mask.definitions['~'] = "[+-]";
            $(elementos).mask("99:99 - 99:99", {});

            //$(elementos).blur(function () {
            //    $("#info").html("Unmasked value: " + $(this).mask());
            //}).dblclick(function () {
            //    $(this).unmask();
            //});
        },

        aplicarMask_Plantilla: function (elementos) {
            $(elementos).attr("placeholder", "hh:mm")

            $.mask.definitions['~'] = "[+-]";
            $(elementos).mask("99:99", {});

            //$(elementos).blur(function () {
            //    $("#info").html("Unmasked value: " + $(this).mask());
            //}).dblclick(function () {
            //    //$(this).unmask();
            //});
        },

        diferenciaEntraHoras: function (horaIni, horaFin) {
            var horasIni = parseInt(horaIni.split(':')[0]);
            var horasFin = parseInt(horaFin.split(':')[0]);

            if (parseInt(horaIni.split(':')[1]) != 00) {
                horasIni = horasIni + 1;
            }

            return $.fn._fx.convertirNumPositivo(horasIni - horasFin);
        },

        //devuelve la diferencia en tres dos fechan teniendo encuenta la hora
        diferencaEntresDosHoras: function (HoraInicio, HoraFin) {
            var acomuladoHoras = 0;
            var acomuladoMin = 0;
            var dateInISemana = new Date();

            if (HoraInicio == null && HoraFin == null) {
                HoraInicio = "00:00:00";
                HoraFin = "00:00:00:";
            }

            fechaIni = $.fn._fx.construirFecha(dateInISemana, HoraInicio);

            dateInISemana = new Date(dateInISemana.getFullYear(), dateInISemana.getMonth(), dateInISemana.getDate() + 1);
            fechaFin = $.fn._fx.construirFecha(dateInISemana, HoraFin);

            fechaResult = $.fn._fx.diferenciaEntreFechas(dateInISemana, fechaIni, fechaFin);

            onlyTimeArray = fechaResult.toLocaleTimeString().split(":");

            acomuladoHoras = acomuladoHoras + parseInt(onlyTimeArray[0]);
            acomuladoMin = acomuladoMin + parseInt(onlyTimeArray[1]);

            var converciones = $.fn._fx.conversionMinAhoras(acomuladoMin);

            return (acomuladoHoras + parseInt(converciones.Horas)) + ":" + converciones.Min;

        },

        diferenciaEntraMinutos: function (horaIni, horaFin) {
            var minIni = parseInt(horaIni.split(':')[1]);
            var minFin = parseInt(horaFin.split(':')[1]);

            return $.fn._fx.convertirNumPositivo(minIni - minFin);
        },

        diferenciaEntreFechas: function (fechaBase, fechaIni, fechaFin) {

            var fechaIniMilisegundos = fechaIni.valueOf();
            var fechaFinMilisegundos = fechaFin.valueOf();

            var fechaDiferencia = fechaFinMilisegundos - fechaIniMilisegundos;

            var fechaResultado = new Date(fechaBase.valueOf() + fechaDiferencia);

            return fechaResultado;

        },

        construirFecha: function (date, time) {
            var arrTime = time.split(":");

            return new Date(date.getFullYear(), date.getMonth(), date.getDay(), arrTime[0], arrTime[1], 0, 0);

        },

        formatoHHHMM_HorasProgramadas: function (valor) {
            var horario = valor.split("-");
            var horaInicio = horario[0];
            var horaFin = horario[1];

            var divisionHI = horaInicio.split(":");
            var divisionHF = horaFin.split(":");


            return divisionHI[0] + ":" + divisionHI[1] + " - " + divisionHF[0] + ":" + divisionHF[1];
        },

        conversionMinAhoras: function (min) {
            var convercion = min / 60;
            var parteHoras;
            var parteMin;
            var residuo = convercion % 1;
            //if (convercion % 1 != 0) {
                parteHoras = (convercion + "").split(".")[0]
                var partDec = parseFloat("0." + (convercion + "").split(".")[1]);
                parteMin = ((partDec * 60) + "").split('.')[0];
            //}

            return {
                "Horas": parteHoras == undefined ? 0 : parteHoras,
                "Min": parteMin == undefined ? 0 : parteMin
            }
        },

        convertirNumPositivo: function (numero) {
            if (numero < 0) {
                return numero * -1;
            } else {
                return numero;
            }
        },

        calculadarEdad: function (dia, mes, año) {
            // body...
            var fechaHoy = new Date(),
                diaHoy = fechaHoy.getDate(),
                mesHoy = fechaHoy.getMonth();
            añoHoy = fechaHoy.getFullYear();
            //Validaciones
            //1.Paso  se debe empezar a calular la fecha desde el años anterior al actual
            añoHoy = añoHoy - 1;
            // años de la persona
            año = añoHoy - año;
            //2.Se valida el mes actual con el del cumpleaños
            if (mes < mesHoy) {
                //Si es menor, ya cumplio años, se le suma un año
                año = año + 1;
                //3. Se construye la fecha de cumpleaños de este años y  se resta con la fecha de hoy
                dateCumple = new Date(añoHoy, mes, dia);
                dateHoy = new Date(añoHoy, mesHoy, diaHoy);

                diferencia = dateHoy - dateCumple;

                edad = new Date(diferencia);

                return año + " años " +
                        edad.getMonth() + " meses " +
                        edad.getDate() + " dias ";

            } else {
                //No es menor no a cumplido años
                dateCumple = new Date(añoHoy, mes, dia);
                dateHoy = new Date(añoHoy, mesHoy, diaHoy);

                diferencia = dateHoy - dateCumple;

                edad = new Date(diferencia);

                return año + " años " +
                       edad.getMonth() + " meses " +
                       edad.getDate() + " dias ";

            }

        },


    }


})(jQuery)