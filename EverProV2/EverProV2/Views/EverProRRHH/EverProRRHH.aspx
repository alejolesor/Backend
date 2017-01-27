
<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Home.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>
<asp:Content ID="Content5" ContentPlaceHolderID="TitleContent" runat="server">

</asp:Content>

<asp:Content ID="Content6" ContentPlaceHolderID="MainContent" runat="server">
    <div id="contentCampos"></div>   
        <div class="row">
            <div class="col-md-9"></div>
            <div class="col-md-2">
                <input type="button" name="btnCargar" id="btnCargar" value="Siguiente" class="btn btn-login" style="width: auto"   />
            </div>
            <div class="col-md-1"></div>      
        </div>
</asp:Content>

<asp:Content ID="Content7" ContentPlaceHolderID="HeadContent" runat="server">
    <script src="../../Scripts/EverPro/EverProRRHH.js"></script>
    <link href="../../Styles/EstilosEverProRRHH/cssEverProRRHH.css" rel="stylesheet" />
    <script src="../../Scripts/EverProRRHH.js"></script>
   
</asp:Content>

<asp:Content ID="Content8" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
</asp:Content>
    
