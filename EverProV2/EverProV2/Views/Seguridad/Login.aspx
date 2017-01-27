<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<%@ Import Namespace="EverProV2.Controllers"%>
<%--<%@ Import Namespace="EverProV2.Models" %>--%>

<!DOCTYPE html>

<html>
<head runat="server">
    <meta name="viewport" content="width=device-width" />
    <title>Login</title>
    <link href="../../Styles/InicioStyle.css" rel="stylesheet" />
    <link href="../../Bootstrap/css/bootstrap.min.css" rel="stylesheet" />
    <link href="../../Bootstrap/css/bootstrap.css" rel="stylesheet" />
    <link href="../../Bootstrap/css/bootstrap-theme.css" rel="stylesheet" />
    <link href="../../Bootstrap/css/bootstrap-theme.min.css" rel="stylesheet" />
    <script src="../../Bootstrap/js/jqBootstrapValidation.js"></script>
</head>
<body id="loginBody">
   
      <form id="form1" runat="server" action="/Seguridad/ValidarUsuario">
        <div id="loginBox" class="centrar form-group" >
            <div>
                <br />
                <%--<img src="../../Images/everpro.png" id="ImagesBox"/>--%>  <%--avi--%>
                <br />
                <label class="control-label">
                    Usuario:
                </label>
                <div class="form-group has-success has-feedback" id="textUsuario" runat="server">
                    <asp:TextBox ID="txtUsuario" PlaceHolder="Ingrese..." CssClass="form-control" Required
                        runat="server"></asp:TextBox>
                </div>
                <label class="control-label">
                    Contraseña: </label>
                <div class="form-group has-success has-feedback" id="textContrasena" runat="server">
                    <asp:TextBox ID="txtContrasena" PlaceHolder="Ingrese..." CssClass="form-control"
                        Required runat="server" TextMode="Password"></asp:TextBox>
                </div>
                <asp:Button ID="btnIngresar" runat="server" Text="Ingresar" Class="btn btn-login" Font-Bold="True"
                     ForeColor="White" style="margin-left:60px ;"/><br /> <%--avi--%> 
                <asp:Label ID="lblError" runat="server" ForeColor="Red"><%=ViewData["Respuesta"]%></asp:Label>
            </div>
        </div>
      </form>

   <img src="../../Images/Login/Antara.png" id="Antara"> <%--avi--%>
   <img src="../../Images/logoEveris.png" id="logoEveris" />
    <img src="../../Images/Login/LogoBbva.png" id="LogoBbva" /> <%--avi--%>
</body>
</html>
