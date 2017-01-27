
<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Home.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    EverProConsultas
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

<div class="col-md-12">
        <fieldset style="width: 103%; background-color: white">
            <legend>Consulta Funcionarios EverPro</legend>
            <div class="col-md-12">

                <div class="col-md-3">
                    <b>Cedula:</b>
                    <input type="text" id="CedFuncionario" class="form-control" style="width: 100%" />
                </div>
                <div class="col-md-6">
                    <br />
                    <input type="button" id="btnBuscarFuncionacio" value="Buscar" class="btn btn-login" onkeypress="return " />
                </div>
                <div class="col-md-3">
                </div>
                <br />
            </div>
            <div style="text-align: right; margin-right: 30px">
                <%--avi--%>
                <table id="ListaFuncEverPro" class="table table-striped table-bordered display" style="text-align: center; width: auto; text-space-collapse: collapse; background-color: white; margin-left: 3%;">
                    <thead style="display: table-row-group;">
                        <tr>
                            <th>Cedula</th>
                            <th>NombreCompleto</th>
                            <th>Cargo</th>
                            <th>Area</th>
                            <th>Actualizar</th>   
                            <th>Dar Baja</th>                            
                        </tr>
                    </thead>
                    <tbody>
                        <%--<%=ViewData["fincSGD"] %>--%>
                    </tbody>

                </table>


            </div>
        </fieldset>

    </div>

</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="HeadContent" runat="server">
    <script src="../../Scripts/EverProConsultas.js"></script>
 
</asp:Content>

<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
</asp:Content>
