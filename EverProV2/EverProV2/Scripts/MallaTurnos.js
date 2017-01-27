$(document).ready(function () {

    $.ajax({
        type: "GET",
        url: "/FuncPorLiderDetalle/ListaFuncionariosMalla?idLider=" + idLider,
        success: function (data) {

            $(data).each(function () {

                var option = $(document.createElement('option'));

                option.text(this.NombreCompleto);
                option.val(this.Cedula);

                $("#funcionarios").append(option);

            });
            $('#funcionarios').SumoSelect({ selectAll: true });
            $('.SelectBox').css("height", "34px");
            $('.SelectBox').css("width", "270px");
            $(".select-all").find('label').css('margin-top', '-8px').html("Seleccionar todos...")
        },


    });

    $.ajax({
        type: "GET",
        url: "/FuncPorLiderDetalle/ListaTurnos",
        success: function (data) {

            $(data).each(function () {

                var option = $(document.createElement('option'));

                option.text(this.CodigoTurno);
                option.val(this.idTurnosMalla);

                $("#turnos").append(option);

            });

        },


    });

    //var Mes = 0, anio = 0;
    var date = new Date();
    var fechaDesde = "";
    var fechaHasta = "";

    $(function () {
        $("#desde").datepicker({
            showWeek: true,
            // showButtonPanel: true,
            //firstDay: 1,
            defaultDate: date,
            minDate: "-0D",
            maxDate: "+3M, -0D ", //"+2M, -10D"
            dateFormat: "dd-mm-yy",
            constrainInput: true,
            showAnim: 'clip',
            // beforeShowDay: noFinesDeSemanaNiFestivos,

            onSelect: function () {
                var day1 = $("#desde").datepicker('getDate').getDate();
                var month1 = $("#desde").datepicker('getDate').getMonth() + 1;
                var year1 = $("#desde").datepicker('getDate').getFullYear();
                var fullDate = day1 + "-" + month1 + "-" + year1;
                //Mes = month1;
                // anio = year1;
                var str_output = fullDate;
                fechaDesde = str_output;
                // $('#date').html(str_output);
                // $("#Malla tbody").html(" ");

                //var FuncSelected = $("#funcionarios > option:selected").map(function () { return this.value }).get().join(",");
                //var SplFuncSele = FuncSelected.split(",");
                // CreateTable(ObtenerDiasMes(year1, month1));
            }


        });

        $("#hasta").datepicker({
            showWeek: true,
            // showButtonPanel: true,
            //firstDay: 1,
            defaultDate: date,
            minDate: "-0D",
            maxDate: "+3M, -0D ", //"+2M, -10D"
            dateFormat: "dd-mm-yy",
            showAnim: 'clip',
            // beforeShowDay: noFinesDeSemanaNiFestivos,

            onSelect: function () {
                var day1 = $("#hasta").datepicker('getDate').getDate();
                var month1 = $("#hasta").datepicker('getDate').getMonth() + 1;
                var year1 = $("#hasta").datepicker('getDate').getFullYear();
                var fullDate = day1 + "-" + month1 + "-" + year1;
                //Mes = month1;
                //anio = year1;
                var str_output = fullDate;
                fechaHasta = str_output;
                // $('#date').html(str_output);
                //$("#Malla tbody").html(" ");

                //var FuncSelected = $("#funcionarios > option:selected").map(function () { return this.value }).get().join(",");
                //var SplFuncSele = FuncSelected.split(",");
                //CreateTable(ObtenerDiasMes(year1, month1));
            }


        });


    })
    var msn = "";

    $("#enviaTurnos").click(function () {


        var FuncSelected = $("#funcionarios > option:selected").map(function () { return this.value }).get().join(",");
        var SplFuncSele = FuncSelected.split(",");
        var turnos = $("#turnos").val().trim();
        var desde = $("#desde").val().trim();
        var hasta = $("#hasta").val().trim();
        var metodoInsert = $("#vista1").val();
        var metodoConsulta = $("#vista2").val();

        if (metodoInsert == 1) {
            if (FuncSelected == "") {
                // alert("debe seleccionar por lo menos un funcionario");
                msn = "Debe seleccionar por lo menos un funcionario";
                mensaje(msn);
                return false;
            }
        }


        if (turnos == "") {
            msn = "Debe seleccionar por lo menos un turno";
            mensaje(msn);
            return false;
        }
        if (desde == "") {
            msn = "Debe seleccionar la fecha de inicio";
            mensaje(msn);
            return false;
        }
        if (hasta == "") {
            msn = "Debe seleccionar la fecha de fin";
            mensaje(msn);
            return false;
        }
        if (validate_fechaMayorQue(desde, hasta) == 0) {

            msn = "La fecha de fin debe ser mayor a la fecha de inicio";
            mensaje(msn);
            return false;
        }
        if (metodoInsert == 1) {
            $.each(SplFuncSele, function (i, values) {
                $.ajax({
                    type: "GET",
                    url: "/FuncPorLiderDetalle/InsertTurnos?IdFuncionario=" + values + "&turno=" + turnos + "&fdesde=" + desde + "&fhasta=" + hasta + "&idLider=" + idLider,
                    success: function (data) {
                        //.map(function () { return this.value }).get().join(",");
                        //var SplFuncSele = FuncSelected.split(",");
                        swal("Exito", "Los turnos se asignaron con exito", "success");
                        // $('select.SlectBox')[0].sumo.reload();
                        // $('#funcionarios').val($('#funcionarios').prop('defaultSelected'));
                  

                        $("#turnos option[value = '']").attr("selected", true);
                        $("#desde").val("");
                        $("#hasta").val("");

                    },
                })
            });
        }

        if (metodoConsulta == 2) {
            // $.each(SplFuncSele, function (i, values) {
            $("#Malla tbody").html("");
            $.ajax({
                type: "GET",
                url: "/FuncPorLiderDetalle/VerMallaTurnos?turno=" + turnos + "&fdesde=" + desde + "&fhasta=" + hasta + "&idLider=" + idLider,
                success: function (data) {

                    $("#turnos option[value = '']").attr("selected", true);
                    $("#desde").val("");
                    $("#hasta").val("");
                   
                    CreateTableMallaTurnos(data);

                    // $('select.SlectBox')[0].sumo.unSelectAll();
                    // $("#Malla tbody").html(" ");
                

                },
            })
            // });
        }


    });

    function mensaje(msn) {

        swal("Error", msn, "error");
        //return false;

    }

    //date.setDate(date.getDate());
    //var dias = $("#desde").datepicker("setDate", date);
    //var da = $("#desde").val();
    //var a = da.split("-");
    //$("#Malla tbody").html(" ");
    //anio = a[2];
    //Mes = a[1];
    //CreateTable(ObtenerDiasMes(a[2], a[1]));

    //---------------funcion calcular dias por mes----------------//
    //function ObtenerDiasMes(year1, month1) {

    //    fecha = new Date(year1, month1, 0);
    //    var nDias = fecha.toDateString();
    //    var c = nDias.split(" ");
    //    var r = c[2];
    //    return r;

    //}
    //---------------------fin-------------------------------------//

    //$(document).on("dblclick", ".Turno", function () {
    //    var idButton = $(this).attr("id");
    //    $("#" + idButton).css("background-color", "#FA5858");
    //});

    //$(document).on("click", ".Turno", function () {
    //    var FuncSelected = $("#funcionarios > option:selected").map(function () { return this.value }).get().join(",");
    //    var SplFuncSele = FuncSelected.split(",");
    //    var activo = "";
    //    var idButton = $(this).attr("id");
    //    var diaSelect = $(this).attr("data-dia");
    //    var horaSelect = parseInt($(this).attr("data-hora"));
    //    var color = $(this).css("background-color")

    //    //$("td").each.()

    //    if (FuncSelected != "") {

    //        if ($("#fecha").val() != "") {
    //            $.each(SplFuncSele, function (i, values) {
    //                if (color == "rgb(242, 242, 242)") {
    //                    // color verde $("#idHora9_3").css("background-color")rojo  "rgb(254, 46, 46)" 154, 174, 4
    //                    activo = 11;
    //                    $("#" + idButton).css("background-color", "#9AAE04")
    //                }
    //                else if (color == "rgb(154, 174, 4)") {
    //                    //color rojo
    //                    activo = 12;
    //                    $("#" + idButton).css("background-color", "#FA5858")
    //                }else if (color == "rgb(250, 88, 88)") {
    //                    //color rojo
    //                    activo = 11;
    //                    $("#" + idButton).css("background-color", "#9AAE04")
    //                }


    //                $.ajax({
    //                    type: "GET",
    //                    // alert("cc: " + values + " año: " + anio + " mes: " + Mes + " dia: " + diaSelect + " hora: " + horaSelect + " lider " + idLider);

    //                    url: "/FuncPorLiderDetalle/InsertTurnos?IdFuncionario=" + values + "&anio=" + anio + "&mes=" + Mes + "&dia=" + diaSelect + "&hora=" + horaSelect + "&idLider=" + idLider + "&turmo=" + activo,

    //                });

    //            });
    //        } else {
    //            alert("seleccione una fecha ")
    //            return false;
    //        }

    //    }
    //    else {
    //        alert("seleccione por lo menos un funcionario a cargar la malla")
    //        return false;
    //    }




    //});

    //$(document).on("mousedown", ".Turno", function () {
    //    var FuncSelected = [];
    //    $(document).on("mouseover", ".Turno", function () {

    //        if (FuncSelected.indexOf($(this).attr("id")) == "-1") { 
    //            FuncSelected.push(  $(this).attr("id"));
    //            }
    //        $(document).on("mouseup", ".Turno", function () {
    //            console.log(FuncSelected);
    //        var activo = "";
    //        //$("td").each.()
    //        if (FuncSelected != "") {
    //            $.each(FuncSelected, function (i, values) {

    //                var color = $("#" + values).css("background-color")
    //                if (color == "rgb(254, 46, 46)") {
    //                    // color verde
    //                    activo = 1;
    //                    $("#" + values).css("background-color", "#9aae04")
    //                }
    //                else if (color == "rgb(154, 174, 4)") {
    //                    //color rojo
    //                    activo = 0;
    //                    $("#" + values).css("background-color", "#fe2e2e")
    //                }
    //            });
    //        }
    //        else {
    //            alert("seleccione por lo menos un funcionario a cargar la malla")
    //            return false;
    //        }
    //        });
    //    });
    //});

    //$("select")
    //  .change(function () {
    //      var str = "";
    //      $("select option:selected").each(function () {
    //          str += $(this).text() + " ";
    //      });
    //      $("#selects").text(str);
    //  })
    // .trigger("change");
    ajaxTable();

    function ajaxTable() {
        transact.ajaxGET('/FuncPorLiderDetalle/InfoTurnos', null, success_InfoTurnos, null);
    }

    function success_InfoTurnos(tabla) {
        var trHTML = '';

        $.each(tabla, function (i, listInfoTurnos) {


            trHTML += '<tr><td>' + listInfoTurnos.CodeHorario + '</td><td>' + listInfoTurnos.Entrada + '</td><td>' + listInfoTurnos.Salida + '</td><td>' + listInfoTurnos.Sabado + '</td><td>' + listInfoTurnos.Breack1 + '</td><td>' + listInfoTurnos.Breack2 + '</td><td>' + listInfoTurnos.Almuerzo + '</td><td>' + listInfoTurnos.HorasLabor + '</td><td>' + listInfoTurnos.Justifi + '</td></tr>';
        })
        $('#cronoTurnos').append(trHTML);
    }


    $("#idUsuario").click(function () {


        var usuario = $("#usuario").val();
        var url = "/FuncPorLiderDetalle/PintaTurnosMalla?idLider=" + usuario;

        window.location.href = url;



    });




})


function validate_fechaMayorQue(fechaInicial, fechaFinal) {
    valuesStart = fechaInicial.split("-");
    valuesEnd = fechaFinal.split("-");

    // Verificamos que la fecha no sea posterior a la actual
    var dateStart = new Date(valuesStart[2], (valuesStart[1] - 1), valuesStart[0]);
    var dateEnd = new Date(valuesEnd[2], (valuesEnd[1] - 1), valuesEnd[0]);
    if (dateStart >= dateEnd) {
        return 0;
    }
    return 1;
}
//function CreateTable(diasMes) {

//    var f = new Date();
//    var da = $("#fecha").val();
//    var a = da.split("-");
//    anio = a[2];
//    Mes = a[1];

//    var table = "<table class='table table-striped table-bordered display' style='text-align: center; width: auto; text-space-collapse: collapse; background-color: white;' id='Malla'>";



//    table += "<tr>"
//    var z = 0;
//    var hora = new Date();
//    var horaSet = hora.setHours(8);
//    var horaMalla = hora.getHours();
//    table += "<td>" + "Dias\\Horas" + "</td>";
//    for (var k = 1 ; k < 15; k++) {
//        table += "<td style='text-align:center;'>" + horaMalla + ":00" + "</td>";
//        horaMalla = horaMalla + 1;
//    }
//    table += "</tr>"
//    var disabled = "", Color = "";
//    for (var i = 1 ; i <= diasMes; i++) {
//        if (i < f.getDate() && parseInt(Mes) == f.getMonth() + 1 && parseInt(anio) == f.getFullYear()) {
//            Color = "#BFB6B4";
//            disabled = "disabled";
//        }
//        else {
//            Color = "#F2F2F2";
//            disabled = "";
//        }
//        table += "<tr>"
//        table += "<td style='Background-color: #fff;width: 5%;height:28px;text-align:center;'>" + i + "</td>";
//        horaSet = hora.setHours(8);
//        horaMalla = hora.getHours();
//        for (var j = 1 ; j < 15 ; j++) {
//            table += "<td><input type='button' class='Turno' id='idHora" + i + "_" + j + "' data-dia='" + i + "' data-hora= '" + horaMalla + ":00' style='Background-color: " + Color + ";width: 100%; height: 100%;' " + disabled + "></td>";
//            horaMalla = horaMalla + 1;
//        }

//        table += "</tr>"
//    }

//    table += "</table>";
//    $("#mallaContent").append(table);
//}

function CreateTableMallaTurnos(data) {

    var table = "<table class='table table-striped table-bordered display' style='text-align: center; width: auto; text-space-collapse: collapse; background-color: white;' id='Malla'>";
    table += "<tr>"

    var numCols = 0;
    var valores = data;
    if (valores.length > 0) {
        var atributos = "";
        for (var aux in valores[0])
            atributos += aux + ",";

        var datos = atributos.split(',');
    }

    $.each(datos, function (i, values) {
        var valor = "";
        if (values != "") {
            if (values == "Anio") {
                valor = "Año";
            }
            else if (values == "RangosDias") {
                valor = "Rango días";
            }
            else if (values == "IdFuncionario") {
                valor = "Cédula Funcionario";
            } else if (values == "Nombreompleto") {
                valor = "Nombre";
            } else if (values == "idT") {
                valor = "Turno";
            }
            else {
                valor = values.replace('_', ':').replace('C', '');
            }



            table += "<th id=" + i + " style='text-align:center; width: 0px;'>" + valor + "</th>";
        }
    });

    table += "</tr>"
   // var disabled = "", Color = "";

    $.each(data, function (i, valorCampo) {
        table += "<tr style='height: 60px !important; width: 1px;'>";

        //horaSet = hora.setHours(8);2
        //horaMalla = hora.getHours();
        Color = "";
        

        //table += "<td data-dia='0'>" + valorCampo.IdFuncionario + "</td>";
        table += "<td data-dia='1'>" + valorCampo.Nombre + "</td>";
        table += "<td data-dia='2'>" + valorCampo.RangosDias + "</td>";
        table += "<td data-dia='3'>" + valorCampo.Mes + "</td>";
        //table += "<td data-dia='4'>" + valorCampo.Anio + "</td>";
        if (valorCampo.idT == 1 || valorCampo.idT == 2 || valorCampo.idT == 3 || valorCampo.idT == 4) { numCols = 13 }
        else if (valorCampo.idT == 5 || valorCampo.idT == 6 || valorCampo.idT == 8) { numCols = 9 }
        else if (valorCampo.idT == 9) { numCols = 10 }
        var cont = 5;
        for (var a = 0; a <= numCols ; a++) {
            if (valorCampo.idT == 1) {
                if (a == 0) { if (valorCampo.C7_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 1) { if (valorCampo.C8_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 2) { if (valorCampo.C9_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 3) { if (valorCampo.C9_31 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 4) { if (valorCampo.C10_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 5) { if (valorCampo.C11_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 6) { if (valorCampo.C12_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 7) { if (valorCampo.C13_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 8) { if (valorCampo.C14_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 9) { if (valorCampo.C15_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 10) { if (valorCampo.C16_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 11) { if (valorCampo.C16_31 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 12) { if (valorCampo.C17_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 13) { if (valorCampo.C17_30 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
            } else if (valorCampo.idT == 2) {

                if (a == 0) { if (valorCampo.C8_00 = 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 1) { if (valorCampo.C9_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 2) { if (valorCampo.C9_31 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 3) { if (valorCampo.C10_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 4) { if (valorCampo.C11_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 5) { if (valorCampo.C12_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 6) { if (valorCampo.C13_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 7) { if (valorCampo.C14_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 8) { if (valorCampo.C15_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 9) { if (valorCampo.C16_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 10) { if (valorCampo.C16_31 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 11) { if (valorCampo.C17_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 12) { if (valorCampo.C18_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 13) { if (valorCampo.C18_30 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
            }

            else if (valorCampo.idT == 3) {

                if (a == 0) { if (valorCampo.C9_00 = 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 1) { if (valorCampo.C10_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 2) { if (valorCampo.C11_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 3) { if (valorCampo.C11_31 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 4) { if (valorCampo.C12_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 5) { if (valorCampo.C13_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 6) { if (valorCampo.C14_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 7) { if (valorCampo.C15_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 8) { if (valorCampo.C16_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 9) { if (valorCampo.C17_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 10) { if (valorCampo.C17_31 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 11) { if (valorCampo.C18_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 12) { if (valorCampo.C19_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 13) { if (valorCampo.C19_30 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
            } else if (valorCampo.idT == 4) {

                if (a == 0) { if (valorCampo.C10_30 = 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 1) { if (valorCampo.C11_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 2) { if (valorCampo.C11_31 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 3) { if (valorCampo.C12_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 4) { if (valorCampo.C13_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 5) { if (valorCampo.C14_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 6) { if (valorCampo.C15_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 7) { if (valorCampo.C16_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 8) { if (valorCampo.C17_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 9) { if (valorCampo.C17_31 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 10) { if (valorCampo.C18_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 11) { if (valorCampo.C19_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 12) { if (valorCampo.C20_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 13) { if (valorCampo.C21_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
            }
            else if (valorCampo.idT == 5) {

                if (a == 0) { if (valorCampo.C06_00 = 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 1) { if (valorCampo.C07_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 2) { if (valorCampo.C08_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 3) { if (valorCampo.C09_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 4) { if (valorCampo.C09_31 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 5) { if (valorCampo.C10_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 6) { if (valorCampo.C11_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 7) { if (valorCampo.C12_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 8) { if (valorCampo.C13_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 9) { if (valorCampo.C14_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
            }
            else if (valorCampo.idT == 6) {

                if (a == 0) { if (valorCampo.C13_00 = 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 1) { if (valorCampo.C14_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 2) { if (valorCampo.C15_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 3) { if (valorCampo.C16_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 4) { if (valorCampo.C16_31 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 5) { if (valorCampo.C17_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 6) { if (valorCampo.C18_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 7) { if (valorCampo.C19_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 8) { if (valorCampo.C20_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 9) { if (valorCampo.C21_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
            }
            else if (valorCampo.idT == 8) {

                if (a == 0) { if (valorCampo.C8_00 = 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 1) { if (valorCampo.C9_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 2) { if (valorCampo.C10_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 3) { if (valorCampo.C11_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 4) { if (valorCampo.C12_31 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 5) { if (valorCampo.C13_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 6) { if (valorCampo.C14_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 7) { if (valorCampo.C15_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 8) { if (valorCampo.C16_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 9) { if (valorCampo.C17_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
            }
            else if (valorCampo.idT == 9) {

                if (a == 0) { if (valorCampo.C9_30 = 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 1) { if (valorCampo.C10_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 2) { if (valorCampo.C11_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 3) { if (valorCampo.C12_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 4) { if (valorCampo.C13_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 5) { if (valorCampo.C14_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 6) { if (valorCampo.C15_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 7) { if (valorCampo.C16_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 8) { if (valorCampo.C17_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 9) { if (valorCampo.C18_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
                if (a == 10) { if (valorCampo.C19_00 == 11) { Color = "#F95635"; } else { Color = "#F9BB35"; } }
            }

           

            table += "<td><input type='button' class='Turno' data-dia='" + cont + "' style='Background-color: " + Color + ";width: 100%; height: 100%;'></td>";
            cont++;
        }
        //table += "<td><input type='button' class='Turno' value='" + valorCampo.C8_00 + "'  data-dia='" + i + "' data-hora= '" + 11 + ":00' style='Background-color: " + Color + ";width: 100%; height: 100%;' " + disabled + "></td>";
        //table += "<td><input type='button' class='Turno' value='" + valorCampo.C9_00 + "'  data-dia='" + i + "' data-hora= '" + 11 + ":00' style='Background-color: " + Color + ";width: 100%; height: 100%;' " + disabled + "></td>";
        //table += "<td><input type='button' class='Turno' value='" + valorCampo.C9_31 + "'  data-dia='" + i + "' data-hora= '" + 11 + ":00' style='Background-color: " + Color + ";width: 100%; height: 100%;' " + disabled + "></td>";
        //table += "<td><input type='button' class='Turno' value='" + valorCampo.C10_00 + "'  data-dia='" + i + "' data-hora= '" + 11 + ":00' style='Background-color: " + Color + ";width: 100%; height: 100%;' " + disabled + "></td>";
        //table += "<td><input type='button' class='Turno' value='" + valorCampo.C11_00 + "'  data-dia='" + i + "' data-hora= '" + 11 + ":00' style='Background-color: " + Color + ";width: 100%; height: 100%;' " + disabled + "></td>";
        //table += "<td><input type='button' class='Turno' value='" + valorCampo.C12_00 + "'  data-dia='" + i + "' data-hora= '" + 11 + ":00' style='Background-color: " + Color + ";width: 100%; height: 100%;' " + disabled + "></td>";
        //table += "<td><input type='button' class='Turno' value='" + valorCampo.C13_00 + "'  data-dia='" + i + "' data-hora= '" + 11 + ":00' style='Background-color: " + Color + ";width: 100%; height: 100%;' " + disabled + "></td>";
        //table += "<td><input type='button' class='Turno' value='" + valorCampo.C14_00 + "'  data-dia='" + i + "' data-hora= '" + 11 + ":00' style='Background-color: " + Color + ";width: 100%; height: 100%;' " + disabled + "></td>";
        //table += "<td><input type='button' class='Turno' value='" + valorCampo.C15_00 + "'  data-dia='" + i + "' data-hora= '" + 11 + ":00' style='Background-color: " + Color + ";width: 100%; height: 100%;' " + disabled + "></td>";
        //table += "<td><input type='button' class='Turno' value='" + valorCampo.C16_00 + "'  data-dia='" + i + "' data-hora= '" + 11 + ":00' style='Background-color: " + Color + ";width: 100%; height: 100%;' " + disabled + "></td>";
        //table += "<td><input type='button' class='Turno' value='" + valorCampo.C16_31 + "'  data-dia='" + i + "' data-hora= '" + 11 + ":00' style='Background-color: " + Color + ";width: 100%; height: 100%;' " + disabled + "></td>";
        //table += "<td><input type='button' class='Turno' value='" + valorCampo.C17_00 + "'  data-dia='" + i + "' data-hora= '" + 11 + ":00' style='Background-color: " + Color + ";width: 100%; height: 100%;' " + disabled + "></td>";
        //table += "<td><input type='button' class='Turno' value='" + valorCampo.C17_30 + "'  data-dia='" + i + "' data-hora= '" + 11 + ":00' style='Background-color: " + Color + ";width: 100%; height: 100%;' " + disabled + "></td>";
        table += "<td>" + valorCampo.idT + "</td>";
        //horaMalla = horaMalla + 1;


        table += "</tr>"
    });


    table += "</table>";
    $("#PintaMalla").append(table);

    $(" #0,    #4, td[data-dia='0'], td[data-dia='4']").hide();
}




