<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Home.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    ListFuncionarios
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

    <script>

        $(document).ready(function(){

            var proces = $("#idprocess").val();
            var lider = $("#lider").val();

            //setInterval(function () {
            //    ajaxTable(proces, lider);

            //}, 5000);

            ajaxTable(proces, lider);
            transact.ajaxGET('/LideresInfo/Datos_LiderProceso?idProceso=' + proces + '&idLider=' + lider, null, success_lipro, null);
        });

        function ajaxTable(proces, lider) {
            //$(".LoadingListaColas").delay(3000).fadeOut("slow");
            transact.ajaxGET('/Funcionarios/FuncLider?proces=' + proces + '&lider=' + lider, null, success_est, null);
            transact.ajaxGET('/Funcionarios/FuncApoyoLid?lider=' + lider, null, success_func, null);

        }

        function success_est(tabla) {

            //  $(".LoadingListaColas").delay(100).fadeOut("slow");
            var tbFuncSGD = "";
            // string Estado = "";
            var btnEstado = "";
            var edit = "<img src='../../Images/Gride/pencil.png' id='editar' class='buttonEdit' style='margin-left:10%;' />";

            var TableFunc = $("#ListUsuarios").dataTable();
            TableFunc.fnClearTable();
            $.each(tabla, function (i, lstFuncionarios) {
                TableFunc.fnAddData([lstFuncionarios.Cedula, lstFuncionarios.NombreCompleto, edit]);
            });
        }
        function success_func(tabla) {

            var tbFuncSGD = "";
            // string Estado = "";
            var btnEstado = "";
            var clasificacion = "<img src='../../Images/Gride/pencil.png' id='editar' class='buttonEdit' style='margin-left:10%;'/>";
            var eliminar = "<img src='../../Images/Gride/trashcan.png' id='delete' class='buttonDelete' style='margin-left:10%;'/>";
            var Tablefunc = $("#ListUsuariosApoyo").dataTable();
            Tablefunc.fnClearTable();
            $.each(tabla, function (i, lstFuncApoyo) {
                Tablefunc.fnAddData([lstFuncApoyo.Cedula, lstFuncApoyo.NombreCompleto, clasificacion, eliminar]);

            });
        }

        function success_lipro(data) {

            var proceso = data.Nom_proceso;
            var lider = data.Nom_lider;
            var final = proceso + " - " + lider;
            $("#Proceso_Lider").text(final);
        }
    </script>

  

    <input type="hidden" id="idprocess" value="<%=Session["proces"]%>" />
   <input type="hidden" id="lider" value="<%=Session["Lider"]%>" />
    <div class="row">
        <div class="col-md-6">
            <fieldset style="width: 103% ; background-color: white"> <%--avi--%>
                <legend>Funcionarios por Lider</legend>
               
                <table id="ListUsuarios" class="table table-striped table-bordered display" style="text-align: center; width: auto; text-space-collapse: collapse">
                    <thead style="display: table-row-group;">
                        <tr>
                            <th>Identidicación</th>
                            <th>Nombre Funcionario</th>
                            <th>Clasificación</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    </tbody>

                </table>
            </fieldset>
        </div>
        <div class="col-md-6">
            <fieldset style="width: 103% ; background-color:white "> <%--avi--%>
                <legend>Personal de Apoyo</legend>
                 <div style="text-align: right;">
                    <input id="cedLider" type="hidden" value=" <%=Session["Lider"]%>"/>
                    <input type="button" name="btnnuevo" id="btnnuevo" value=":: Nuevo Funcionario ::" class="btn btn-login" style="width: auto;" />
                </div>
                <table id="ListUsuariosApoyo" class="table table-striped table-bordered display" style="text-align: center;width: 97%;MARGIN-LEFT: 16PX;text-space-collapse: collapse;">
                    <thead style="display: table-row-group;">
                        <tr>
                            <th>Identidicación</th>
                            <th>Nombre Funcionario</th>
                            <th>Clasificación</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                       
                    </tbody>

                </table>
            </fieldset>

            <br />
            <div id="imgSig">
                <%--  <a href="#"><img src="../../Images/ButtonNext-01.ico" style="width: 80px; height: 80px;"></a>--%>
                <div style="text-align: right;">
                    <input id="idProceso" type="hidden" value="<%=ViewData["proceso"]%>"/>
                    <input id="idLider" type="hidden" value="<%= ViewData["cedLider"]%>"/>            
                </div>

            </div>

        </div>
    </div>

    <link href="../../Styles/usuarios.css" rel="stylesheet" />
    <script src="../../Scripts/Usuarios.js"></script>

</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="HeadContent" runat="server">
  <%--  <script>
        $(document).ready(function () {
            var proceso = '<%=ViewData["proceso"]%>';
            var lider = '<%=ViewData["nombre_lider"] %>';
            var final = proceso + " - " + lider;

            $("#Proceso_Lider").text(final);

            var Exito = '<%= TempData["Exito"] %>';
            var Archivo = '<%= TempData["ArchExito"] %>'
            var ArchiExito = Archivo.split(",");

            //AVI
            if (Exito == 1 && Exito != "") {
                swal("", "El archivo se cargó con éxito.", "success");
            } else if (Exito == 0 && Exito != "") {
                swal("", "Error al cargar el archivo. Intente nuevamente.", "error");
                // swal("Error", mensaje, "error");
            }
            "Good job!", "You clicked the button!", "success"
            //function alerta(mensaje) {
            //    swal("Error", mensaje, "error");
            //    return false;
            //}
        });


</script>--%>


</asp:Content>

<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
</asp:Content>
