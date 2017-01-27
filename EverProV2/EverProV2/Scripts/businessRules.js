/*
* Autor : Elena Parra
* Version: 1.0
*   _rules administras todas la funciones de validacion especificas
*/
//$.fn._rules = null;
(function ($) {

    var _rules = window._rules = {

        //Calcula la edad en funcion del la fecha de naciento
        ageRole: function (e) {
            var _this = $(e.currentTarget);

            var fechaActual = new Date();
            var fechaNacimiento = _this.val().split("/");
            var result = _fx.calculadarEdad(fechaNacimiento[0], parseInt(fechaNacimiento[1]) - 1, fechaNacimiento[2]);
            $("#EDAD").val(result);

        },

        reportarHorasExtras: function (e) {
            var _this = $(e.currentTarget);
            if (sessionStorage.getItem("Horainicio") != null) {
                console.log("Si entra ");
                var turnoIni = (sessionStorage.getItem("Horainicio")).split(":"),
                    turnoFin = (sessionStorage.getItem("Horafin")).split(":"),
                    tiempoActividad = _this.val().split(":"),
                t1 = new Date(),
                t2 = new Date(),
                t3 = new Date();

                t1.setHours(turnoIni[0], turnoIni[1], turnoIni[2]);
                t2.setHours(turnoFin[0], turnoFin[1], turnoFin[2]);
                t3.setHours(tiempoActividad[0], tiempoActividad[1], tiempoActividad[2] == undefined ? "00" : tiempoActividad[2]);

                var horasTurno = t1.getHours() - t2.getHours(),
                    minTurno = t1.getMinutes() - t2.getMinutes(),
                    segTurno = t1.getSeconds() - t2.getSeconds();

                horasTurno = horasTurno < 0 ? horasTurno * -1 : horasTurno;
                minTurno = minTurno < 0 ? minTurno * -1 : minTurno;

                if (horasTurno <= t3.getHours() || minTurno <= t3.getMinutes()) {

                    $("#txtHorasExtras").val("0" + (t3.getHours() - horasTurno) + ":" + "0" + (t3.getMinutes() - minTurno) + ":" + "00");
                    $("#mansajeConfirmacion").text("Se empezaran a registrar horas Extas");
                    $("#dialogInfomativo").dialog("open");
                }

            }


        },

    }

})(jQuery)