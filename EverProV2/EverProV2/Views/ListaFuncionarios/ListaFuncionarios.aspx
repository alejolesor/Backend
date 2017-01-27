<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Home.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    ListaFuncionarios
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">


    <input type="hidden" id="idprocess" value="<%= Session["idproceso"] %>" />
    <input type="hidden" id="lider" value="<%=Session["idLider"]%>" />

    <%--<input type="hidden" id="idprocess" value="<%=Session["proces"]%>" />--%>
    <%--<input type="hidden" id="lider" value="<%=Session["Lider"]%>" />--%>
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
                        <%=ViewData["_TableUsua"] %>
                    </tbody>

                </table>
            </fieldset>
        </div>
        <div class="col-md-6">
            <fieldset style="width: 103% ; background-color:white "> <%--avi--%>
                <legend>Personal de Apoyo</legend>
                 <div style="text-align: right;">
                    <input id="cedLider" type="hidden" value=" <%=ViewData["cedLider"]%>"/>
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
                        <%=ViewData["_TableUsuaApoyo"] %>
                    </tbody>

                </table>
            </fieldset>

            <br />
            <div id="imgSig">
                <%--  <a href="#"><img src="../../Images/ButtonNext-01.ico" style="width: 80px; height: 80px;"></a>--%>
                <div style="text-align: right;">
                    <input id="idProceso" type="hidden" value="<%=ViewData["proceso"]%>"/>
                    <input id="idLider" type="hidden" value="<%= ViewData["cedLider"]%>"/>
                    <input type="button" name="btnProceso" id="btnProceso" value=":: Listar Cola ::" class="btn btn-login" style="width: auto;" />
                </div>

            </div>

        </div>
    </div>

    <link href="../../Styles/usuarios.css" rel="stylesheet" />
    <script src="../../Scripts/Usuarios.js"></script>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="HeadContent" runat="server">
    <script>
        $(document).ready(function () {
            var proceso= '<%=ViewData["proceso"]%>';
            var lider = '<%=ViewData["nombre_lider"] %>';
            var final = proceso + " - "+ lider;

            $("#Proceso_Lider").text(final); 

            var Exito = '<%= TempData["Exito"] %>';
            var Archivo = '<%= TempData["ArchExito"] %>'
            var ArchiExito = Archivo.split(",");

            //AVI
            if (Exito == 1 && Exito != "") {
                swal("", "El archivo se cargó con éxito.", "success");
            } else if (Exito == 0 && Exito != "") {
                swal("","Error al cargar el archivo. Intente nuevamente.", "error");
               // swal("Error", mensaje, "error");
            }
            "Good job!", "You clicked the button!", "success"
            //function alerta(mensaje) {
            //    swal("Error", mensaje, "error");
            //    return false;
            //}
        });


</script>


</asp:Content>

<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
</asp:Content>
