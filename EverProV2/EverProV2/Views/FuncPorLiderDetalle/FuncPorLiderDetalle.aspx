<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Home.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content5" ContentPlaceHolderID="TitleContent" runat="server">
    FuncPorLiderDetalle
</asp:Content>

<asp:Content ID="Content6" ContentPlaceHolderID="MainContent" runat="server">
    
    <script>
        var idLider = '<%=Session["IdUsuario"]%>';
    </script>

    <div class="row">

        <div class="col-md-6">      
             <%string fecha = DateTime.Now.ToString("dd/MM/yyyy"); %>
            <input type="hidden" name="fecha" value="<%=fecha%>" id="fechaActual" />  
              
         <table id="contCaso" class="table table-striped table-bordered display" style="text-align: center; width: auto; text-space-collapse: collapse; margin-left: 20px;">
                <thead style="display: table-row-group;">
                   <%-- <tr>
                        <th colspan="4">
                            <div class="col-md-3"></div>
                            <div class="col-md-6" id="fecha" style="font-weight:bold;"> <%=fecha %></div>
                            <div class="col-md-3"></div>
                        </th>
                    </tr>--%>
                    <tr>
                        <th>
                            <div class="row">
                                <div class="col-md-3"></div>
                                <div class="col-md-6" id="cola" style="font-weight:bold;"></div>
                                <div class="col-md-3"></div>
                            </div>
                        </th>
                        <th>
                            <div class="row">
                                <div class="col-md-3"></div>
                                <div class="col-md-6" id="manual" style="font-weight:bold;"></div>
                                <div class="col-md-3"></div>
                            </div>
                        </th>
                        <th>
                            <div class="row">
                                <div class="col-md-3"></div>
                                <div class="col-md-6" id="asig" style="font-weight:bold;"></div>
                                <div class="col-md-3"></div>
                            </div>
                        </th>
                        <th>
                            <div class="row">
                                <div class="col-md-3"></div>
                                <div class="col-md-6" id="fin" style="font-weight:bold;"></div>
                                <div class="col-md-3"></div>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div class="row">
                                <div class="col-md-3"></div>
                                <div class="col-md-6" id="Ncola" style="font-weight:bold;"></div>
                                <div class="col-md-3"></div>
                            </div>
                        </td>
                        <td>
                            <div class="row">
                                <div class="col-md-3"></div>
                                <div class="col-md-6" id="Nmanu" style="font-weight:bold;"></div>
                                <div class="col-md-3"></div>
                            </div>
                        </td>
                        <td>
                            <div class="row">
                                <div class="col-md-3"></div>
                                <div class="col-md-6" id="Nasig" style="font-weight:bold;"></div>
                                <div class="col-md-3"></div>
                            </div>
                        </td>
                        <td>
                            <div class="row">
                                <div class="col-md-3"></div>
                                <div class="col-md-6" id="Nfin" style="font-weight:bold;"></div>
                                <div class="col-md-3"></div>
                            </div>
                        </td>
                        
                    </tr>


                </tbody>

            </table>
     </div>
        <div class="col-md-6">

            <table id="estados" class="table table-striped table-bordered display" style="text-align: center; width: auto; text-space-collapse: collapse">
                <thead style="display: table-row-group;">
                    <tr>
                        <th>Conectado</th>
                        <th>Ausente</th>
                        <th>Ocupado</th>
                        <th>Desconectado</th>
                        <th>Suspendido</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div class="row">
                                <div class="col-md-3"></div>
                                <div class="col-md-3" id="conect" style="font-weight:bold;"></div>
                                <div class="col-md-3"><img src='../../Images/Estados/152.png' style='cursor: pointer;' data-toggle='tooltip' data-placement='bottom' title='Conectado' /></div>
                                <div class="col-md-3"></div>
                            </div>
                        </td>
                        <td>
                            <div class="row">
                                <div class="col-md-3"></div>
                                <div class="col-md-3" id="ausen" style="font-weight:bold;"></div>
                                <div class="col-md-3"><img src='../../Images/Estados/154.png' style='cursor: pointer;' data-toggle='tooltip' data-placement='bottom' title='Ausente' /></div>
                                <div class="col-md-3"></div>                               
                           </div>
                        </td>
                        <td>
                            <div class="row">
                                <div class="col-md-3"></div>
                                <div class="col-md-3" id="ocup" style="font-weight:bold;"></div>
                                <div class="col-md-3"><img src='../../Images/Estados/151.png' style='cursor: pointer;' data-toggle='tooltip' data-placement='bottom' title='Ocupado' /></div>
                                <div class="col-md-3"></div>
                            </div>
                        </td>
                        <td>
                            <div class="row">
                                <div class="col-md-3"></div>
                                <div class="col-md-3" id="desconec" style="font-weight:bold;"></div>
                                <div class="col-md-3"><img src='../../Images/Estados/159.png' style='cursor: pointer;' data-toggle='tooltip' data-placement='bottom' title='Desconectado' /></div>
                                <div class="col-md-3"></div>
                            </div>
                        </td>
                        <td>
                            <div class="row">
                                <div class="col-md-3"></div>
                                <div class="col-md-3" id="suspend" style="font-weight:bold;"></div>
                                <div class="col-md-3"><img src='../../Images/Estados/153.png' style='cursor: pointer;' data-toggle='tooltip' data-placement='bottom' title='Suspendido' /></div>
                                <div class="col-md-3"></div>
                            </div>
                        </td>
                    </tr>


                </tbody>

            </table>
        </div>
    </div>
    <div class="row">
        <div class="col-md-1"></div>
        <div class="col-md-1">
            <input type="button" name="productividada" id="productividad" value="Productividad" class="btn btn-success" title="Produccion dia" />
            <br />
            <br />
        </div>
        <div class="col-md-1"></div>
    </div>

    <div class="col-md-12">
        <fieldset style="width: 103%; background-color: white">
            <legend>Lista de Funcionarios</legend>

            <div style="text-align: right; margin-right: 30px">
            </div>
            <%--avi--%>
            <table id="ListFuncionariosXlider" class="table table-striped table-bordered display" style="text-align: center; width: auto; text-space-collapse: collapse; background-color: white;">
                <thead style="display: table-row-group;">
                    <tr>
                        <th>No. de Caso</th>
                        <th>Actividad</th>
                        <th>Nivel</th>
                        <th>Reapertura</th>
                        <th>Monto</th>
                        <th>Indicador</th>
                        <th>Nombre</th>
                        <th>Ans</th> 
                        <th>Progreso</th>
                    </tr>
                </thead>
                <tbody>
                    <%--<%=ViewData["fincSGD"] %>--%>
                </tbody>

            </table>
        </fieldset>

    </div>

</asp:Content>


<asp:Content ID="Content7" ContentPlaceHolderID="HeadContent" runat="server">
    <style type="text/css" media="all">
/*#productividad { 
    background:url('imagenes/../../Images/IconosMenuLider/Control_Panel_6.png') no-repeat;
    border:none; 
    width:100%; 
    height:100%; 

}*/

    </style>
    <script src="../../Scripts/FuncXlider.js"></script>
 
</asp:Content>

<asp:Content ID="Content8" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
</asp:Content>
