<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Home.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Cambiar Contraseña
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div class="row">
            
        <fieldset style="background-color:white ; box-shadow: 3px 3px 10px #ccc;" class="scheduler-border">
              <legend>Cambio de Contraseña</legend>
            <div class="col-md-6">
                <form id="formPass" action="/Usuarios/CambiarContrasena" method="post" onsubmit=" return comprobarPass(this)">
                <div class="form-group">
                    <label for="mobilePin">Pin de seguridad</label>
                    <input type="password" class="form-control input-sm" id="mobilePin" name="mobilePin" placeholder="Pin de Seguridad">
                </div>

                <div class="form-group">
                    <label for="passActual">Contraseña Actual</label>
                    <input type="password" class="form-control input-sm" id="passActual" name="passActual" placeholder="Contraseña Actual">
                </div>

                <div class="form-group">
                    <label for="pswNuevo1">Nueva Contraseña</label>
                    <input type="password" class="form-control input-sm" id="pswNuevo1" name="passNuevo" placeholder="Nueva Contraseña">
                </div>
                        
                <div class="form-group">
                    <label for="pswNuevo2"> Repita La Constraseña</label>
                    <input type="password" class="form-control input-sm" id="pswNuevo2" name="confPass" placeholder="Confirme la  Contraseña">
                </div>
                
                <div class="form-group">
                     <div id="pass-info" style="width:100%;"></div>
                </div>

                <input type="hidden" id="validacionValor" />
           
               
                <input type="submit" class="btn btn-login" name="btn_Guardar" id="btnGuardar" value="Guardar Cambios" />

                </form>
            </div>
            <div class="col-md-1"></div>
            <div class="col-md-5">

                <img src="../../Images/Login/contrasenas.png" style="width:70%; height:40%;" />
            </div>
        </fieldset>

    </div>
     

</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="HeadContent" runat="server">

    <script src="../../Scripts/Contrasena.js"></script>
    <link href="../../Styles/Password.css" rel="stylesheet" />
    <script>
        $(document).ready(function () {
            var mensaje = "<%= TempData["Mensaje"] %>";
            if (mensaje != "") {
                alerta(mensaje, "Alerta");
            }
        });
    </script>
</asp:Content>

<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
</asp:Content>
