<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Home.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    MallaTurnos
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

   
        <form class="form-inline">
           <fieldset style="width: 103% ; background-color: white">
               <legend>Asignacion de Turnos</legend>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="funcionarios">Funcionarios</label>
                        <select id="funcionarios" multiple="multiple" class="SumoUnder form-control"> </select>     
                    </div>
                </div>
                <div class="col-md-6">
                     <div class="form-group">
                        <label for="turnos">Turnos</label>
                        <select id="turnos" class="form-control" style="margin-left: 29px;">
                            <option value="">Selecione...</option>
                        </select>
                     </div>
                </div>
            </div>
                
             <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="desde">Fecha Desde</label>
                        <input type="text" class="form-control" id="desde" />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="turnos">Fecha Hasta</label>
                        <input type="text" class="form-control" id="hasta"/>
                    </div>
                </div>
            </div>
               <br />
               <br />
            <div class="row">
                <div class="col-md-8"></div>
                <div class="col-md-2">
                    <button type="button" id="enviaTurnos" class="btn btn-primary">Asignar</button>
                </div>
            </div>
               <input type="hidden" name="usuario" id="usuario" value="<%=Session["IdUsuario"]%>"/>
               <input type="hidden" name="vistra1" id="vista1" value="1"/>
            <%--<input type="button" name="idUsuario" id="idUsuario" value=":: Malla Diaria ::" class="btn btn-login" style="width: auto;" />--%>
        </fieldset>
        </form>

    <fieldset style="width: 103% ; background-color: white">
        <legend>Descripcion Turnos</legend>
        <div class="row">
            <div class="col-md-12">
                 <table id="cronoTurnos" class="table table-striped table-bordered display" style="text-align: center; width: auto; text-space-collapse: collapse; background-color: white;">
                <thead style="display: table-row-group;">
                    <tr>
                        <th>Codigo Horario</th>
                        <th>Entrada</th>
                        <th>Salida</th>
                        <th>Sabado</th>
                        <th>Break 1</th> 
                        <th>Break 2</th>
                        <th>Hora Almuerzo</th>
                        <th>Horas Laboradas</th>
                        <th>Justificacion</th>
                    </tr>
                </thead>
                <tbody>
                  
                </tbody>

            </table>
            </div>
        </div>
    </fieldset>

   

   <%-- <div id="mallaContent"></div>--%>

</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="HeadContent" runat="server">
    <script src="../../Scripts/MultiSelect/jquery.sumoselect.min.js"></script>
    <link href="../../Styles/MultiSelect/sumoselect.css" rel="stylesheet" />
    <script src="../../Scripts/MallaTurnos.js"></script>
 <script>
        var idLider = '<%=Session["IdUsuario"]%>';
</script>


</asp:Content>

<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
</asp:Content>
