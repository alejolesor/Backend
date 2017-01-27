<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<!DOCTYPE html>

<html>
<head runat="server">
    <meta name="viewport" content="width=device-width" />
    <title>ClasificacionNivelesII</title>
    <link href="../../Styles/dataTables.bootstrap.min.css" rel="stylesheet" />
    <link href="../../Styles/BootsTrap/css/bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/BootsTrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/BootsTrap/css/bootstrap-theme.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/BootsTrap/css/bootstrap-theme.min.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/BootsTrap/css/bootstrap-responsive.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/jquery-ui.css" rel="stylesheet" />
    <link href="../../Styles/page.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/Default.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/alertify.core.css" rel="stylesheet" />
    <link href="../../Styles/alertify.default.css" rel="stylesheet" />
    <link href="../../Styles/main.css" rel="stylesheet" />
    <link href="../../Styles/normalize.css" rel="stylesheet" />
    <link href="../../Styles/jquery-ui.css" rel="stylesheet" />
    <link href="../../Styles/tooltipster.css" rel="stylesheet" />
    <link href="../../Styles/formularios.css" rel="stylesheet" />
    <link href="../../Styles/default.css" rel="stylesheet" />
    <link rel="Shortcut Icon" href="../../images/Icono.ico" />
    <%----%>
    <script src="../../Scripts/jquery-1.12.0.js"></script>
    <script src="../../Styles/BootsTrap/js/bootstrap.js"></script>
    <script src="../../Styles/BootsTrap/js/bootstrap.min.js"></script>
    <script src="../../Styles/BootsTrap/js/bootbox.js"></script>
    <script src="../../Scripts/jquery-ui.js"></script>
    <script src="../../Scripts/alertify.js"></script>
    <script src="/Scripts/Validaciones/Reestricciones.js" type="text/javascript"></script>
    <script src="/Scripts/jquery.maskedinput.min.js" type="text/javascript"></script>
    <script src="/Scripts/jquery.maskedinput.js" type="text/javascript"></script>
    <script src="/Scripts/jquery.maskMoney.js" type="text/javascript"></script>
    <script src="/Scripts/ajax.js" type="text/javascript"></script>
    <script src="/Scripts/_fx.js" type="text/javascript"></script>
    <script src="/Scripts/_ui.js" type="text/javascript"></script>
<%--    <script src="/Scripts/eventsStaticUi.js" type="text/javascript"></script>--%>
    <script src="../../Scripts/_uiStatic.js"></script>
    <script src="/Scripts/Validaciones/ReglasNegocio.js" type="text/javascript"></script>
    <script src="/Scripts/jquery.dataTables.min.js"></script>
    <script src="/Scripts/dataTables.bootstrap.min.js"></script>
    <script src="../../Scripts/FormValidation.js"></script>

</head>
<body>
    <div class='row'>
        <div class='col-md-6'>
            <fieldset style='width: 48%; float: left;'>
                <legend>Asignar Nivel</legend>
                <table id='' class='table table-striped table-bordered display' style='text-align: center; width: auto; text-space-collapse: collapse'>
                    <thead style='display: table-row-group;'>
                        <tr id='PintaNivelesFunc' style='cursor: pointer;'>
                            <th>Nivel</th>    
                            <th>Complejidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        <%=ViewData["_TableNivelesFunc"] %>
                    </tbody>
                </table>
            </fieldset>
        </div>


        <div class='col-md-6'>
            <fieldset style='width: 48%; float: left;'>
                <legend>Niveles</legend>
                <div style='text-align: right;'>
                </div>
                <table id='' class='table table-striped table-bordered display' style='text-align: center; width: auto; margin-left: 16PX; text-space-collapse: collapse;'>
                    <thead style='display: table-row-group;'>
                        <tr>
                            <th>Nivel</th>
                            <th>Complejidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        <%=ViewData["_TableNiveles"] %>
                    </tbody>
                </table>
            </fieldset>
        </div>
    </div>
    <div class='row'>

    <script type="text/javascript">

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



        var identFunc = '<%=ViewData["_identFunc"] %>';
        var idProceso = $.getUrlVar('proceso');
        var idLider = $.getUrlVar('idLider');

        $(document).on("click", "#PintaNiveles", function () {
                     var valores = "";
                     $(this).find("td").each(function () {
                         valores += $(this).html() + ",";
                     });
                     //console.log(valores)
                     var Data = valores.split(",");
                     var id = Data[0];


                     var url = "/ListaFuncionarios/InsertaCargaNivelesPorFunc?identFunc=" + identFunc + "&NivelClasi=" + id + "&proceso=" + idProceso;
                     $.ajax({
                         "type": "GET",
                         "url": url,
                         "data": null,
                         "dataType": "json",
                         "success": function (row) {
                             //console.log(row);
                            // confirmarGuardado(row);
                             document.location.href = '/ListaFuncionarios/ClasificacionNiveles?identFunc=' + identFunc + "&proceso=" + idProceso + "&idLider=" + idLider;


                         },
                         "error": function (error) {
                             console.log(error);
                         }
                     });

        });

        $(document).on("click", "#PintaNivelesFunc", function () {
            var valores = "";
            $(this).find("td").each(function () {
                valores += $(this).html() + ",";
            });
            //console.log(valores)
            var Data = valores.split(",");
            var id = Data[0];


            var url = "/ListaFuncionarios/EliminarCargaNivelesPorFunc?identFunc=" + identFunc + "&NivelClasi=" + id + "&proceso=" + idProceso ;
            $.ajax({
                "type": "GET",
                "url": url,
                "data": null,
                "dataType": "json",
                "success": function (row) {
                    //console.log(row);
                    //confirmarGuardado(row);
                    document.location.href = '/ListaFuncionarios/ClasificacionNiveles?identFunc=' + identFunc + "&proceso=" + idProceso + "&idLider=" + idLider;


                },
                "error": function (error) {
                    console.log(error);
                }
            });

        });

                 
                 
    </script>

    </div>
    <link href='../../Styles/usuarios.css' rel='stylesheet' />
    <script src="../../Scripts/Usuarios.js"></script>
</body>
</html>
