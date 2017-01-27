
$("#checkTodos").on("click", function () { 

    var chequeo = $("#List_Cheques tbody").find("input[type='checkbox']"); 
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

function CheckFuncionarios (data) { 
    var tr = ""; 
    if (data != "") { 
        $("#List_Cheques tbody").html("") 
        $.each(data, function (i, item) { 
            tr += "<tr><td><input type = 'checkbox' id='check_"+i+"'/></td><td>" + item.Cedula + "</td><td>"+item.NombreCompleto+"</td></tr>";

        }); 
        $("#List_Cheques tbody").append(tr); 
    } else { 
        $("#List_Cheques tbody").html("") 
    } 
}

}); 
$("#List_Cheques tbody").append(tr); 
} else { 
    $("#List_Cheques tbody").html("") 
} 
}


$("#btnActualizar").on("click", function () {

    var check = $("#List_Cheques tbody tr").find("input[type='checkbox']");
    $.each(check, function (i, values) {


        if ($("#" + values.id).is(":checked")) {
            var cedula;

            var valores = "";
            $("#List_Cheques tbody tr #" + values.id).parent().parent().find("td").each(function () {
                valores += $(this).html() + ",";
            });

            var Data = valores.split(",");
            cedula = Data[1];

            var idCedulaLider = $("#LIDERSGD").val();
            var idCedulaLiderNuevo = $("#LIDERCAMBIOMASIVO").val();
            var salarioNuevo = $("#CAMBIODESUELDO").val();
            var idTipoDeCambio = $("#TIPODECAMBIO").val();


            url = "/CambiosMasivosEverPro/ActualizacionMasivo?idCedulaLider=" + idCedulaLider +
                "&idCedulaLiderNuevo=" + idCedulaLiderNuevo + "&idCedFuncionario=" + cedula + "&salarioNuevo=" + salarioNuevo +
                "&idTipoDeCambio=" + idTipoDeCambio;

            $.ajax({
                type: "GET",
                dataType: "json",
                contentType: 'application/json', // Tipo de datos que envío
                url: url,
                async: true,
                data: null,
                success: function (row) {
                    //CheckFuncionarios(row);

                    debugger;
                    if (row == "Se han actualizado los datos correctamente") {
                        confirmarGuardado("Alerta", row, "success", '/CambiosMasivosEverPro/CambiosMasivosEverPro');
                    } else {
                        confirmarGuardado("Error", row, "error", '');
                    }
                },
                error: function (error) {
                    console.log(error);
                }


            });
        }
    });

});
