<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<!DOCTYPE html>

<html>
<head runat="server">
    <meta name="viewport" content="width=device-width" />
    <title>VistaSelectEstados</title>
    <link href="../../Scripts/Tooltipster/tooltipster-light.css" rel="stylesheet" />
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
    <link href="../../Scripts/dist/sweetalert.css" rel="stylesheet" />
    <%----%>
    <script src="../../Scripts/dist/sweetalert.min.js"></script>
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
  <script src="/Scripts/eventsStaticUi.js" type="text/javascript"></script>
         <script src="../../Scripts/Tooltipster/jquery.tooltipster.min.js"></script>
   <%-- <script src="../../Scripts/_uiStatic.js"></script>--%>
    <script src="/Scripts/Validaciones/ReglasNegocio.js" type="text/javascript"></script>
    <script src="/Scripts/jquery.dataTables.min.js"></script>
    <script src="/Scripts/dataTables.bootstrap.min.js"></script>
    <script src="../../Scripts/FormValidation.js"></script>
    <script src="../../Scripts/businessRules.js"></script>
    <script src="../../Scripts/accounting.js-master/accounting.js"></script>
    <script src="../../Scripts/accounting.js-master/accounting.min.js"></script>
    <script src="../../Scripts/selectFuncEstados.js"></script>

<%--    <script>
        var estado = $.getUrlVar('estado');

    </script>--%>

</head>
<body>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <fieldset style="width: 103%; background-color: white">
                    <legend>Personal por Estados</legend>

                        <div style="text-align: right; margin-right: 30px"></div>
                        <table id="selectFuncEstados" class="table table-striped table-bordered display" style="text-align: center; width: auto; text-space-collapse: collapse; background-color: white;">
                            <thead style="display: table-row-group;">
                                <tr>
                                    <th>Cedula</th>
                                    <th>Nombre Completo</th>
                                </tr>
                            </thead>
                            <tbody>
                                <%--<%=ViewData["fincSGD"] %>--%>
                            </tbody>

                        </table>
                </fieldset>
            </div>
        </div>
    </div>
</body>
</html>
