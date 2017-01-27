<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Home.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>


<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    PintaTurnosMalla
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

<h2>PintaTurnosMalla</h2>
    <div class="row">
        <div class="col-md-12">
            <fieldset style="width: 103%; background-color: white">
                <table id="pintaMallaTurnos" class="table table-striped table-bordered display" style="text-align: center; width: auto; text-space-collapse: collapse; background-color: white;">
                <thead style="display: table-row-group;">
                    <tr>
                        <th style="width: 1px;">Funcionario</th>
                        <th>Dia</th>
                        <th>08:00</th>
                        <th>09:00</th>
                        <th>10:00</th>
                        <th>11:00</th> 
                        <th>12:00</th>
                        <th>13:00</th>
                        <th>14:00</th>
                        <th>15:00</th>
                        <th>16:00</th>
                        <th>17:00</th>
                        <th>18:00</th>
                        <th>19:00</th>
                        <th>20:00</th>
                        <th>21:00</th>
                    </tr>
                </thead>
                <tbody>
                   <%=ViewData["MallaTurnos"] %>
                </tbody>

            </table>
            </fieldset>
        </div>
    </div>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
</asp:Content>
