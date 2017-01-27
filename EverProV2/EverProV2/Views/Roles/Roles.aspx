<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Home.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Roles
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

    <h2>Roles</h2>
    <ul class="nav nav-tabs">
        <li class="active"><a data-toggle="tab" href="#home" id="AdminRoles">Administración de Roles</a></li>
        <li><a data-toggle="tab" href="#menu1" id="AdmiRolMenu">Administración de Roles - Menú</a></li>
    </ul>

    <div id="home" class="tab-pane fade in active">
        <br />
        <fieldset style="background-color:white ; box-shadow: 3px 3px 10px #ccc;" class="scheduler-border">
            <legend>Creación de Roles</legend>

            <label>Nombre del Rol</label>
            <input type="text" id="txtNombreRol" name="txtNombreRol" class="text-box form-control" style="width: 300px; margin-bottom: 2%;"/>
            <input type="button" id="btnAgregar" value=":: Agregar ::" class="btn btn-login" />
            <input type="button" id="btnEditar" value=":: Editar ::" class="btn btn-login" style="display:none"/>
            <input type="button" id="btnCancelar" value=":: Cancelar ::" class="btn btn-login" style="display:none"/>
        </fieldset>

        <div class="row-fluid">
            <div class="span6">
                <fieldset style="background-color:white ; box-shadow: 3px 3px 10px #ccc;" class="scheduler-border">
                    <legend>Roles Activos</legend>
                    <div id="LoadingActivo" style="display: none; margin-left: 30%;">
                        <img src="../../Images/cargando.gif">
                    </div>
                    <table id="RolesActivos" class="table table-striped table-bordered display" style="text-align: center; width: 100%; text-space-collapse: collapse">
                        <thead style="display: table-row-group;">
                            <tr>
                                <th>ID</th>
                                <th>Descripcion</th>
                                <th>Accion</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody id="tbodyActiRol">
                            <%= ViewData["_TableRolActi"] %>
                        </tbody>

                    </table>

                </fieldset>
            </div>
            <div class="span6">
                <fieldset style="background-color:white ; box-shadow: 3px 3px 10px #ccc;" class="scheduler-border">
                    <legend>Roles Inactivos</legend>
                    <div id="LoadingInactivo" style="display: none; margin-left: 30%;">
                        <img src="../../Images/cargando.gif">
                    </div>
                    <table id="RolesInactivos" class="table table-striped table-bordered display RolesInactivos" style="text-align: center; width: 100%; text-space-collapse: collapse">
                        <thead style="display: table-row-group;">
                            <tr>
                                <th>ID</th>
                                <th>Descripcion</th>
                                <th>Accion</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody id="tbodyInactiRol">
                            <%= ViewData["_TableRolInacti"] %>
                        </tbody>

                    </table>
                </fieldset>
            </div>
        </div>
    </div>

    <div id="menu1" class="tab-pane fade" style="display: none;">
        <br />
        <fieldset  style="background-color:white ; box-shadow: 3px 3px 10px #ccc;"class="scheduler-border">
            <legend>Roles disponibles</legend>
            <select id="dp_Roles" class="form-control" on style="width: 30%">
            </select>
        </fieldset>

        <div class="row-fluid">
            <div class="span6">
                <fieldset style="background-color:white ; box-shadow: 3px 3px 10px #ccc;" class="scheduler-border">
                    <legend>Módulos asociados</legend>
                    <div id="LoadingModAsoc" style="display: none; margin-left: 30%;">
                        <img src="../../Images/cargando.gif">
                    </div>
                    <table id="ModAsoc" class="table table-striped table-bordered display" style="text-align: center; width: 100%; text-space-collapse: collapse">
                        <thead style="display: table-row-group;">
                            <tr>
                                <th>ID</th>
                                <th>Descripcion</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody id="tbodyModAsoc">
                        </tbody>

                    </table>

                </fieldset>
            </div>
            <div class="span6">
                <fieldset  style="background-color:white ; box-shadow: 3px 3px 10px #ccc;" class="scheduler-border">
                    <legend>Módulos no asociados</legend>
                    <div id="LoadingModNoAsoc" style="display: none; margin-left: 30%;">
                        <img src="../../Images/cargando.gif">
                    </div>
                    <table id="ModNoAsoc" class="table table-striped table-bordered display" style="text-align: center; width: 100%; text-space-collapse: collapse">
                        <thead style="display: table-row-group;">
                            <tr>
                                <th>ID</th>
                                <th>Descripcion</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody id="tbodyModNoAsoc">
                        </tbody>

                    </table>
                </fieldset>
            </div>
        </div>
    </div>

</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="HeadContent" runat="server">

    <script src="../../Scripts/jquery.ajaxupload.js"></script>
    <script src="../../Scripts/Roles.js"></script>    
    <script src="/Scripts/jquery.dataTables.min.js"></script>
    <script src="/Scripts/dataTables.bootstrap.min.js"></script>

</asp:Content>

<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
</asp:Content>
