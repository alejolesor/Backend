<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Home.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
   LideresInfo
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="HeadContent" runat="server">

    <link href="../../Styles/SGD/CargueArchivos.css" rel="stylesheet" />
    <script src="../../Scripts/SGD/LidersInfo.js"></script>
   
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

 <form action="/LideresInfo/EstadoFuncionarioLider" method="post" id="cargueInfo" enctype="multipart/form-data">
        
     <div id="contentCampos"></div>

       <div class="row">

            <div class="col-md-3"></div>
            <div class="col-md-9">
                <input type="submit" name="btnCargar" id="btnCargar" value=".::Consultar::." class="btn btn-login" style="width: auto; display:none" onclick="return FormValid()" />
            </div>
        </div>
   
    </form>


</asp:Content>



<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
</asp:Content>
