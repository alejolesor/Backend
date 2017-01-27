
<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Home.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content5" ContentPlaceHolderID="TitleContent" runat="server">
    CambiosMasivosEverPro
</asp:Content>

<asp:Content ID="Content6" ContentPlaceHolderID="MainContent" runat="server">

    <div id="contentCampos" style="WIDTH: 35%;float:left;">         
    </div>
    <fieldset class="scheduler-border" style="WIDTH: 63%; float: left; margin-left: 2%!important;  margin-top: 1% !important;">
        <div class="col-sm-12" style="padding-left: 20px !important; height: 300px; overflow-y: auto; margin-top: 2%;">
            <table id="List_Cheques" class="table table-striped table-bordered display" style="text-align: center; width: 100%; text-space-collapse: collapse;">
                <thead style="display: table-row-group;">
                    <tr>
                        <th><input type ="checkbox" id ="checkTodos"/> Todos</th>
                        <th>Cédula</th>
                        <th>Nombre Completo</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>

        </div>
        <div class="col-md-9"></div>
        <div class="col-md-2" style="margin-top: 3%;">
                <input type="button" name="btnActualizar" id="btnActualizar" value="::Actualizar::" class="btn btn-login" style="width: auto" />
        </div>
    </fieldset>


</asp:Content>

<asp:Content ID="Content7" ContentPlaceHolderID="HeadContent" runat="server">
    <script src="../../Scripts/EverPro/CambiosMasivos/PintaCamposCambiosMasivos.js"></script>
    <link href="../../Styles/EstilosEverProRRHH/cssEverProRRHH.css" rel="stylesheet" />
    <script src="../../Scripts/EverPro/CambiosMasivos/CambiosMasivos.js"></script>
</asp:Content>

<asp:Content ID="Content8" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
</asp:Content>
