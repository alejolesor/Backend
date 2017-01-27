<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Home.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Administracion Usuarios
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

<div style="width: 100%">
        <fieldset style="width: 103%" >
            <legend>Administración de usuarios</legend>
            <div style="text-align: right;">
                <input type="button" name="btnnuevoUser" id="btnnuevoUser" value=":: Nuevo Usuario ::" class="btn btn-login" style="width: auto;" />
            </div>
            <table id="ListUsuarios" class="table table-striped table-bordered display" style="text-align: center; width: 100%; text-space-collapse: collapse;background-color:#fff">
                <thead style="display: table-row-group;">
                    <tr>
                        <th>Identidicación</th>
                        <th>Nombre</th>
                        <th>Rol </th>
                        <th>Estado</th>
                        <th>Fecha de Creacion</th>
                        <th>Fecha de Caducidad</th>
                        <th>Security Pin</th>
                        <th style="display: none">Rol </th>
                        <th>Editar</th>
                        <th>Cambiar Estado</th>
                    </tr>
                </thead>
                <tbody>
                    <%= ViewData["TableUsu"] %>
                </tbody>

            </table>
        </fieldset>
    </div>

</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="HeadContent" runat="server">
    <link href="../../Styles/usuarios.css" rel="stylesheet" />
    <script src="../../Scripts/Administracion.js"></script>
</asp:Content>

<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
</asp:Content>
