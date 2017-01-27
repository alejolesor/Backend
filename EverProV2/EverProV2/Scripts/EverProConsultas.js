$(document).ready(function () {


    $('#btnBuscarFuncionacio').on('click', function () {
        debugger;
        if ($('#CedFuncionario').val() != "") {
            transact.ajaxGET('/EverProRRHH/consultarFuncEverPro?Cedula=' + $('#CedFuncionario').val(), null, success_func, null);
        } else {
            Alerta_info("Alerta", "Ingrese un de cédula a consultar", 'info', "")
        }
        $('#CedFuncionario').val("");
    });

    $(document).on("click", "#btnActualizarFuncEverPro", function () {
        debugger;
        //Obtiene los valores del TR donde se dio click...
        var valores = "";
        $(this).parents("tr").find("td").each(function () {
            valores += $(this).html() + ",";
        });
        var Data = valores.split(",");
        document.location.href = '/EverProRRHH/EverProRRHH?Cedula=' + Data[0] + "&IdForm=1";
    });

    $('#ListaFuncEverPro').DataTable({
        "language": {
            "sProcessing": "<img src='../../Images/Splitter/ajax-loader-green-large.gif' />",
            "sLengthMenu": "Mostrar _MENU_ registros",
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "Ningún dato disponible en esta tabla",
            "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
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

            "oAria": {

                "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"

            }
        }
    });

    $(".dataTables_length").hide();
    $(".dataTables_filter").hide();


});



function success_func(tabla) {

    var TableFuncionarios = $("#ListaFuncEverPro").dataTable();
    TableFuncionarios.fnClearTable();
    var imgeditar = "<img src='../../Images/Gride/pencil.png' id='btnActualizarFuncEverPro' class='buttonEdit' style='margin-left:50%;' />";
    var imgbaja = "<img src='../../Images/Delete.png' id='btnDarBajaUsuario' class='buttonEdit' style='margin-left:10%;'/>";
    $.each(tabla, function (i, listFunc) {
        TableFuncionarios.fnAddData([listFunc.Cedula, listFunc.NombreCompleto, listFunc.Cargo, listFunc.Area, imgeditar, imgbaja]);
    });

}
