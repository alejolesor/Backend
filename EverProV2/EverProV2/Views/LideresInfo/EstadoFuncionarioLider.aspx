<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Home.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    EstadoFuncionarioLider
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <style>
    </style>
    <script>
        $(document).ready(function () {

            var idProceso = $("#idProceso").val();
            var idLider = $("#idLider").val();

            setInterval(function () {
                ajaxTable(idProceso, idLider);

            }, 10000);


            //$(".LoadingListaColas").show();
            //$(".LoadingListaColas").delay(800).fadeIn("slow");



            ajaxTable(idProceso, idLider);
            // ShowProgress();
            transact.ajaxGET('/LideresInfo/Datos_LiderProceso?idProceso=' + idProceso + '&idLider=' + idLider, null, success_lipro, null);

            $("#checkTodos").on("click", function () {

                var chequeo = $("#ListaColas tbody").find("input[type='checkbox']");
                if ($(this).is(":checked")) {
                    $.each(chequeo, function (i, campo) {
                        var idcamp = $("#" + campo.id);
                        idcamp.prop("checked", true);
                    });
                }
                else {
                    $.each(chequeo, function (i, campo) {
                        var idcamp = $("#" + campo.id);
                        idcamp.prop("checked", false);
                    });
                }
            });


        });

        function ajaxTable(idProceso, idLider) {
            //$(".LoadingListaColas").delay(3000).fadeOut("slow");
            //transact.ajaxGET('/LideresInfo/ListaColas?idProceso=' + idProceso + '&idLider=' + idLider, null, success_est, null);
            transact.ajaxGET('/LideresInfo/FuncionariosAsignar?idLider=' + idLider, null, success_func, null);

        }

        //function success_est(tabla) {

        //    //  $(".LoadingListaColas").delay(100).fadeOut("slow");
        //    var tbFuncSGD = "";
        //    // string Estado = "";
        //    var btnEstado = "";

        //    var TableCasos = $("#ListaColas").dataTable();
        //    TableCasos.fnClearTable();
        //    $.each(tabla, function (i, listfunColas) {
        //        TableCasos.fnAddData([listfunColas.Actividad, listfunColas.C, listfunColas.Complejidad, dtConvFromJSON(listfunColas.FA)]);
        //    });
        //    $("#ListaColas tbody tr").css("cursor", "pointer");

        //    //ShowProgressCheckList();


        //    //$(".LoadingListaColas").hide();


        //}

        //function success_est(tabla) {

        //    //  $(".LoadingListaColas").delay(100).fadeOut("slow");
        //    var tbFuncSGD = "";
        //    // string Estado = "";
        //    var btnEstado = "";


        //    var TableCasos = $("#ListaColas").dataTable();
        //    TableCasos.fnClearTable();
        //    $.each(tabla, function (i, listfunColas) {
        //        var check = "<input type = 'checkbox' id='check_" + i + "'/>"
        //        TableCasos.fnAddData([check, listfunColas.CASO, listfunColas.ACTIVIDAD, listfunColas.CONVENIO, listfunColas.MONTO,  listfunColas.SLA, listfunColas.NIVEL, listfunColas.PLAZO, dtConvFromJSON(listfunColas.FECHA)]);
        //       });
        //       $("#ListaColas tbody tr").css("cursor", "pointer");

        //       //ShowProgressCheckList();


        //       //$(".LoadingListaColas").hide();

        //}




        function success_func(tabla) {

            var tbFuncSGD = "";
            // string Estado = "";
            var btnEstado = "";

            var Tablefunc = $("#ListFuncionarios").dataTable();
            Tablefunc.fnClearTable();
            $.each(tabla, function (i, listfunColas) {
                if (listfunColas.Estado == 3) {
                    // Estado = "DISPONIBLE";
                    btnEstado = "<img src='../../Images/Estados/152.png' style='cursor:pointer;' data-toggle='tooltip' data-placement='bottom' title='DISPONIBLE'/>";

                }
                if (listfunColas.Estado == 4) {
                    //Estado = " NO DISPONIBLE";
                    btnEstado = "<img src='../../Images/Estados/154.png' style='cursor:pointer;' data-toggle='tooltip' data-placement='bottom' title=' NO DISPONIBLE'/>";

                }
                if (listfunColas.Estado == 5) {
                    //Estado = "OCUPADO";
                    btnEstado = "<img src='../../Images/Estados/151.png' style='cursor:pointer;' data-toggle='tooltip' data-placement='bottom' title='OCUPADO'/>";

                }
                if (listfunColas.Estado == 6) {
                    //Estado = "SIN INICIO DE SESION";
                    btnEstado = "<img src='../../Images/Estados/159.png' style='cursor:pointer;' data-toggle='tooltip' data-placement='bottom' title='SIN INICIO DE SESION'/>";

                }
                if (listfunColas.Estado == 10) {
                    //Estado = "SUSPENDIDOS";
                    btnEstado = "<img src='../../Images/Estados/153.png' style='cursor:pointer;' data-toggle='tooltip' data-placement='bottom' title='SUSPENDIDOS'/>";

                }

                var caso = listfunColas.Ncaso;
                var casoNulo = "0000000";


                if (caso == "" || caso == null) {
                    caso = casoNulo;
                }

                Tablefunc.fnAddData([btnEstado, listfunColas.Cedula, listfunColas.NombreCompleto, caso]);




            });
        }


        function success_lipro(data) {

            var proceso = data.Nom_proceso;
            var lider = data.Nom_lider;
            var final = proceso + " - " + lider;
            $("#Proceso_Lider").text(final);
        }

        function dtConvFromJSON(data) {
            if (data == null) return '1/1/1950';
            var r = /\/Date\(([0-9]+)\)\//gi
            var matches = data.match(r);
            if (matches == null) return '1/1/1950';
            var result = matches.toString().substring(6, 19);
            var epochMilliseconds = result.replace(
            /^\/Date\(([0-9]+)([+-][0-9]{4})?\)\/$/,
            '$1');
            var b = new Date(parseInt(epochMilliseconds));
            var c = new Date(b.toString());
            var curr_date = c.getDate();
            var curr_month = c.getMonth() + 1;
            var curr_year = c.getFullYear();
            var curr_h = c.getHours();
            var curr_m = addZero(c.getMinutes());
            var curr_s = c.getSeconds();
            var curr_offset = c.getTimezoneOffset() / 60
            var d = curr_date + '/' + curr_month.toString() + '/' + curr_year + " " + curr_h + ':' + curr_m + ':' + curr_s;
            return d;

        }

        function addZero(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i
        }

    </script>

    <div class="row">
        <nav class="navbar navbar-default navbar-static-top" role="navigation">
            <div class="col-md-4">
                <div class="row">

                    <%
                        
                        int idProceso = Convert.ToInt32(Session["idProceso"]);
                        //int lider = Convert.ToInt32(Session["idLider"]);

                        if (idProceso == 1)
                        {  %>

                    <div class="row" style="margin-left: -10px;">

                        <div class="col-md-3">
                            <label for="productividad" style="font-size: 10px">Productividad</label>
                            <input type="image" src="../../Images/IconosMenuLider/productividad2.png" id="productividad" title=":: Produccion dia ::" style="width: 50px; height: 50px" />

                        </div>
                        <div class="col-md-2">
                            <label for="btnCasosCola" style="font-size: 10px">Cola</label>
                            <input type="image" src="../../Images/IconosMenuLider/enCola2.png" name="btnCasosCola" id="btnCasosCola" title=":: Casos en Cola ::" style="width: 50px; height: 50px" />
                        </div>

                        <div class="col-md-3">
                            <label for="btnCasoSuspend" style="font-size: 10px">Suspendidos</label>
                            <input type="image" src="../../Images/IconosMenuLider/suspend2.png" id="btnCasoSuspend" style="width: 60px; height: 50px" />
                        </div>

                        <div class="col-md-2">
                            <label for="btnPrioridad" style="font-size: 10px">Prioridad</label>
                            <input type="image" id="btnPrioridad" src="../../Images/IconosMenuLider/prioridad.png" title=":: Prioridad Especial ::" style="width: 50px; height: 50px" />
                        </div>
                        <div class="col-md-2">
                            <label for="AsigaMasiva" style="font-size: 10px">Masiva</label>
                            <input type="image" src="../../Images/IconosMenuLider/masivos2.png" id="AsigaMasiva" title=":: Asignacion Masiva ::" style="width: 50px; height: 50px" />

                        </div>

                    </div>
                    <% }
                        else if (idProceso == 2 && (ViewData["producto"].ToString() == "LIBRANZA" || ViewData["producto"].ToString() == "CONSUMO" || ViewData["producto"].ToString() == "VEHICULO"))
                        {
                    %>

                    <div class="row" style="margin-left: -10px;">
                        <div class="col-md-3">
                            <label for="productividad" style="font-size: 10px">Productividad</label>
                            <input type="image" src="../../Images/IconosMenuLider/productividad2.png" id="productividad" title=":: Produccion dia ::" style="width: 50px; height: 50px" />

                        </div>

                        <div class="col-md-2">
                            <label for="btnCasosCola" style="font-size: 10px">Cola</label>
                            <input type="image" src="../../Images/IconosMenuLider/enCola2.png" name="btnCasosCola" id="btnCasosCola" title=":: Casos en Cola ::" style="width: 50px; height: 50px" />
                        </div>
                        <div class="col-md-3">
                            <label for="btnDactiloscopia" style="font-size: 10px">Dactiloscopia</label>
                            <input type="image" src="../../Images/IconosMenuLider/dactiloscopia.png" id="btnDactiloscopia" title=":: Dactiloscopia :: " style="width: 50px; height: 50px;" />
                        </div>

                        <div class="col-md-2">
                            <label for="btnPrioridad" style="font-size: 10px">Prioridad</label>
                            <input type="image" id="btnPrioridad" src="../../Images/IconosMenuLider/prioridad.png" title=":: Prioridad Especial ::" style="width: 50px; height: 50px" />
                        </div>
                        <div class="col-md-2">
                            <label for="AsigaMasiva" style="font-size: 10px">Masiva</label>
                            <input type="image" src="../../Images/IconosMenuLider/masivos2.png" id="AsigaMasiva" title=":: Asignacion Masiva ::" style="width: 50px; height: 50px" />

                        </div>

                    </div>
                    <% 
                        }
                        else
                        {%>

                    <div class="row">

                        <div class="col-md-3">
                            <label for="productividad" style="font-size: 10px">Productividad</label>
                            <input type="image" src="../../Images/IconosMenuLider/productividad2.png" id="productividad" title=":: Produccion dia ::" style="width: 50px; height: 50px" />

                        </div>
                        <div class="col-md-3">
                            <label for="btnCasosCola" style="font-size: 10px">Cola</label>
                            <input type="image" src="../../Images/IconosMenuLider/enCola2.png" name="btnCasosCola" id="btnCasosCola" title=":: Casos en Cola ::" style="width: 50px; height: 50px" />
                        </div>
                        <div class="col-md-1"></div>
                        <div class="col-md-3">
                            <label for="btnPrioridad" style="font-size: 10px">Prioridad</label>
                            <input type="image" id="btnPrioridad" src="../../Images/IconosMenuLider/prioridad.png" title=":: Prioridad Especial ::" style="width: 50px; height: 50px" />
                        </div>
                        <div class="col-md-2">
                            <label for="AsigaMasiva" style="font-size: 10px">Masiva</label>
                            <input type="image" src="../../Images/IconosMenuLider/masivos2.png" id="AsigaMasiva" title=":: Asignacion Masiva ::" style="width: 50px; height: 50px" />

                        </div>


                    </div>
                    <%} %>
                </div>



            </div>
            <div class="col-md-2">
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
                                    <div class="col-md-6" id="cola" style="font-weight: bold;"></div>
                                    <div class="col-md-3"></div>
                                </div>
                            </th>
                            <%-- <th>
                            <div class="row">
                                <div class="col-md-3"></div>
                                <div class="col-md-6" id="manual" style="font-weight: bold;"></div>
                                <div class="col-md-3"></div>
                            </div>
                        </th>--%>
                            <%--<th>
                            <div class="row">
                                <div class="col-md-3"></div>
                                <div class="col-md-6" id="asig" style="font-weight: bold;"></div>
                                <div class="col-md-3"></div>
                            </div>
                        </th>--%>
                            <%-- <th>
                            <div class="row">
                                <div class="col-md-3"></div>
                                <div class="col-md-6" id="fin" style="font-weight: bold;"></div>
                                <div class="col-md-3"></div>
                            </div>
                        </th>--%>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div class="row">
                                    <div class="col-md-3"></div>
                                    <div class="col-md-6" id="Ncola" style="font-weight: bold;"></div>
                                    <div class="col-md-3"></div>
                                </div>
                            </td>
                            <%-- <td>
                            <div class="row">
                                <div class="col-md-3"></div>
                                <div class="col-md-6" id="Nmanu" style="font-weight: bold;"></div>
                                <div class="col-md-3"></div>
                            </div>
                        </td>
                        <td>
                            <div class="row">
                                <div class="col-md-3"></div>
                                <div class="col-md-6" id="Nasig" style="font-weight: bold;"></div>
                                <div class="col-md-3"></div>
                            </div>
                        </td>
                        <td>
                            <div class="row">
                                <div class="col-md-3"></div>
                                <div class="col-md-6" id="Nfin" style="font-weight: bold;"></div>
                                <div class="col-md-3"></div>
                            </div>
                        </td>--%>
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
                                    <div class="col-md-3" id="conect" style="font-weight: bold;"></div>
                                    <div class="col-md-3">
                                        <img src='../../Images/Estados/152.png' id="conectados" style='cursor: pointer;' data-toggle='tooltip' data-placement='bottom' title='Conectado' />
                                    </div>
                                    <div class="col-md-3"></div>
                                </div>
                            </td>
                            <td>
                                <div class="row">
                                    <div class="col-md-3"></div>
                                    <div class="col-md-3" id="ausen" style="font-weight: bold;"></div>
                                    <div class="col-md-3">
                                        <img src='../../Images/Estados/154.png' id="ausentes" style='cursor: pointer;' data-toggle='tooltip' data-placement='bottom' title='Ausente' />
                                    </div>
                                    <div class="col-md-3"></div>
                                </div>
                            </td>
                            <td>
                                <div class="row">
                                    <div class="col-md-3"></div>
                                    <div class="col-md-3" id="ocup" style="font-weight: bold;"></div>
                                    <div class="col-md-3">
                                        <img src='../../Images/Estados/151.png' id="ocupados" style='cursor: pointer;' data-toggle='tooltip' data-placement='bottom' title='Ocupado' />
                                    </div>
                                    <div class="col-md-3"></div>
                                </div>
                            </td>
                            <td>
                                <div class="row">
                                    <div class="col-md-3"></div>
                                    <div class="col-md-3" id="desconec" style="font-weight: bold;"></div>
                                    <div class="col-md-3">
                                        <img src='../../Images/Estados/159.png' id="desconectados" style='cursor: pointer;' data-toggle='tooltip' data-placement='bottom' title='Desconectado' />
                                    </div>
                                    <div class="col-md-3"></div>
                                </div>
                            </td>
                            <td>
                                <div class="row">
                                    <div class="col-md-3"></div>
                                    <div class="col-md-3" id="suspend" style="font-weight: bold;"></div>
                                    <div class="col-md-3">
                                        <img src='../../Images/Estados/153.png' id="suspendidos" style='cursor: pointer;' data-toggle='tooltip' data-placement='bottom' title='Suspendido' />
                                    </div>
                                    <div class="col-md-3"></div>
                                </div>
                            </td>
                        </tr>


                    </tbody>

                </table>
            </div>
        </nav>
    </div>



    <div class="row">

        <div class="col-md-12">
        </div>

        <%--<div class="col-md-6">

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
                            <img src='../../Images/Estados/152.png' style='cursor: pointer;' data-toggle='tooltip' data-placement='bottom' title='Conectado' /></td>
                        <td>
                            <img src='../../Images/Estados/154.png' style='cursor: pointer;' data-toggle='tooltip' data-placement='bottom' title='Ausente' /></td>
                        <td>
                            <img src='../../Images/Estados/151.png' style='cursor: pointer;' data-toggle='tooltip' data-placement='bottom' title='Ocupado' /></td>
                        <td>
                            <img src='../../Images/Estados/159.png' style='cursor: pointer;' data-toggle='tooltip' data-placement='bottom' title='Desconectado' /></td>
                        <td>
                            <img src='../../Images/Estados/153.png' style='cursor: pointer;' data-toggle='tooltip' data-placement='bottom' title='Suspendido' /></td>
                    </tr>


                </tbody>

            </table>
        </div>--%>
    </div>

    <%--   <ul class="nav nav-tabs">
        <li class="active"><a data-toggle="tab" href="#home" id="ListColas">Lista Casos</a></li>
        <li><a data-toggle="tab" href="#menu1" id="ListFunc">Lista Funcionarios</a></li>
    </ul>--%>
    <%-- <div class="row">
         <div id="home" class="tab-pane fade in active">--%>
    <%--     <input type="hidden" id="idProceso" value="<%=Session["procesoInfo"]%>" />
        <input type="hidden" id="idLider" value="<%=Session["liderinfo"]%>" />--%>

    <%-- <div class="col-md-12">
            <fieldset style="width: 103%; background-color: white">
                <legend>Lista de Casos</legend>--%>


    <%--avi--%>
    <%-- <table id="ListaColas" class="table table-striped table-bordered display" style="text-align: center; width: auto; background-color: white; text-space-collapse: collapse">
                    <thead style="display: table-row-group;">
                        <tr>--%>
    <%-- <th>Nombre Proceso</th>
                            <th>N° Caso</th>
                            <th>Nivel</th>
                            <th>Fecha de Creacion Actividad</th>--%>

    <%-- <th>
                            <input type="checkbox" id="checkTodos" />Todos</th>
                            <th>N° Caso</th>
                            <th>Nombre Proceso</th>
                            <th>Convenio</th>
                            <th>Monto</th>
                            <th>SLA</th>
                            <th>Nivel</th>
                            <th>Plazo</th>
                            <th>Fecha de Creacion Actividad</th>
                        </tr>
                    </thead>
                    <tbody>--%>
    <%--  <%=ViewData["Colas"] %>--%>
    <%--         </tbody>

                </table>--%>
    <input type="hidden" id="idProceso" value="<%= Session["idProceso"]%>" />
    <input type="hidden" id="idLider" value="<%=Session["idLider"]%>" />
    <%--     </fieldset>

        </div>--%>

    <%--   <div class="col-md-6">
            <fieldset style="width: 103%; background-color: white">
                <legend>Lista de Funcionarios</legend>

                <div style="text-align: right; margin-right: 30px">

                </div>
               
                <table id="ListFuncionarios" class="table table-striped table-bordered display" style="text-align: center; width: auto; text-space-collapse: collapse; background-color: white;">
                    <thead style="display: table-row-group;">
                        <tr>
                            <th>Indicador</th>
                            <th>Identificacion</th>
                            <th>Nombre</th>
                            <th>No. de Caso</th>
                        </tr>
                    </thead>
                    <tbody>
                        <%--<%=ViewData["fincSGD"] %>
                    </tbody>

                </table>
            </fieldset>

        </div>--%>
    <%--      </div>
    </div>--%>


    <div class="row">
        <%--<div id="menu1" class="tab-pane fade" style="display: none;">--%>
        <div class="col-md-12">
            <fieldset style="width: 103%; background-color: white" class="scheduler-border" >
                <legend  class="scheduler-border">Lista Colas - Funcionarios</legend>

      <%--          <div style="text-align: right; margin-right: 30px">
                </div>--%>
                <%--avi--%>
                 <div>
                <table id="ListFuncionariosXlider" class="table table-striped table-bordered display" style="text-align: center; width: 100%; text-space-collapse: collapse;">
                    <thead style="display: table-row-group;">
                        <tr>


                            <th>
                                <input type="checkbox" id="checkTodos" />Todos</th>
                            <th>No. de Caso</th>
                            <th>Actividad</th>
                            <th>Nivel</th>
                            <th>Convenio</th>
                            <th>Sla</th>
                            <th>Monto</th>
                            <th>Indicador</th>
                            <th>Nombre</th>
                            <th>Kill</th>
                            <th>Progreso</th>
                        </tr>
                    </thead>
                    <tbody style="background-color: #fff !important;">
                        <%--<%=ViewData["fincSGD"] %>--%>
                    </tbody>
                     
                </table>
                     </div>
            </fieldset>

        </div>
    </div>


    <%-- tabla de productividad--%>



    <script type="text/javascript">

        var nCaso = [];

        var table = $("#ListaColas tbody tr").find("td");
        $("#ListaColas tbody tr").css("cursor", "pointer");
        //$(document).on("click", "#ListaColas tbody tr", function () {
        $("#AsigaMasiva").on("click", function () {

            var valores = "";
            $(this).find("td").each(function () {
                valores += $(this).html() + ",";
            });




            var idProceso = $("#idProceso").val();
            //proceso = Session["idproceso"].ToString();
            //console.log(valores);
            var contaIntro = 0;
            var check = $("#ListFuncionariosXlider tbody tr").find("input[type='checkbox']");
            $.each(check, function (i, values) {

                if ($("#" + values.id).is(":checked")) {

                    var valores = "";
                    $("#ListFuncionariosXlider tbody tr #" + values.id).parent().parent().find("td").each(function () {
                        valores += $(this).html() + ",";
                    });


                    var Data = valores.split(",");

                    nCaso[contaIntro] = Data[1];


                    contaIntro++;


                    ////Cargar atributos a los campos creados en la ventana modal
                    //// cargarRoles(Data);
                    //$("#idUsuario").val(Data[0]);
                    //$("#idUsuario").attr("readonly", true);
                    //$("#usuarioDominio").val(Data[1]);
                    //$("#Nombre").val(Data[2]);
                }
            });

            if (contaIntro == 0) {
                alert("no ha checkeado ninguno")
                return false;
            } else {
                var url = "/ListaFuncionarios/FuncAsignaManual";
                $.ajax({
                    "type": "GET",
                    "url": url,
                    "data": null,
                    "dataType": "json",
                    "success": function (row) {


                        var Allcasos = "";
                        var html = "";
                        var style = "style=\"font-weight:bolder; font-size: 20px;\"";


                        for (var j = 0; j < contaIntro; j++) {
                            Allcasos = Allcasos + nCaso[j] + " - ";
                        }

                        html = "<div style=\"height:380px; overflow-y:auto;\">";
                        html += "<table id=\"ListUsuarios\" class=\"table table-striped table-bordered display\" style=\"text-align: center; width: auto; text-space-collapse: collapse\">";
                        html += "<thead style=\"display: table-row-group;\">";
                        html += "<tr>";
                        html += "<th>Identidicación</th>";
                        html += "<th>Nombre Funcionario</th>";
                        html += "<th>Máximo Nivel</th>";
                        html += "</tr>";
                        html += "</thead>";
                        html += "<tbody>";
                        html += row;
                        html += "</tbody>";
                        html += "</table>";
                        html += "</div>";

                        bootbox.dialog({
                            message: html,
                            title: "<p " + style + ">Asignar caso manualmente </p>" + "<b>Caso No. " + Allcasos + "</b>",
                            buttons: {
                                success: {
                                    label: ":: Cancelar ::",
                                    className: "btn btn-Comando",
                                    callback: function () {

                                    }
                                }
                            }
                        })

                    },
                    "error": function (error) {
                        console.log(error);

                    }
                });
            }

        });


        $(document).on("click", "#AsignaCasoMan", function () {
            var biarray = {};
            var DatosAsigna = new Array();
            var valores = "";
            $(this).find("td").each(function () {
                valores += $(this).html() + ",";
            });
            //console.log(valores)
            var Data = valores.split(",");

            var identFunc = Data[0];

            var check = $("#ListFuncionariosXlider tbody tr").find("input[type='checkbox']");
            $.each(check, function (i, values) {

                if ($("#" + values.id).is(":checked")) {

                    var valores = "";
                    $("#ListFuncionariosXlider tbody tr #" + values.id).parent().parent().find("td").each(function () {
                        valores += $(this).html() + ",";
                    });

                    var Data = valores.split(",");
                    var caso = Data[1].split(" ");
                    var noCaso = caso[0];
                    var idProceso = $("#idProceso").val();

                    biarray = {
                        "identFuncionario": identFunc,
                        "Ncaso": noCaso,
                        "IdProceso": idProceso
                    };

                    DatosAsigna.push(biarray);

                }
            });


            if (DatosAsigna.length > 0) {
                var dataModel = JSON.stringify({ 'AsignaMan': DatosAsigna })
                var url = "/ListadoColas/AsignaCasoManual";
                $.ajax({
                    "type": "POST",
                    "url": url,
                    "data": dataModel,
                    "dataType": "json",
                    "contentType": 'application/json',
                    "success": function (row) {
                        //console.log(row);
                        confirmarGuardado("Alerta", row, "info");
                        //document.location.href = '/ListaFuncionarios/ClasificacionNiveles?identFunc=' + identFunc + "&proceso=" + idProceso;


                    },
                    "error": function (error) {
                        console.log(error);


                    }
                });
            }

        });



    </script>



    <script>

        var idLider = '<%=Session["idLider"]%>';
        <%--// '<%=Session["IdUsuario"]%>';--%>
    </script>
    <script src="../../Scripts/ListarCola.js"></script>
    <script src="../../Scripts/PrioridadEspecial.js"></script>
    <%--<script src="../../Scripts/FuncXlider.js"></script>--%>
    <script src="../../Scripts/PRUEBA.js"></script>


</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="HeadContent" runat="server">
    <script src="../../Scripts/datatables.scroller.min.js"></script>
    <link href="../../Styles/scroller.dataTables.min.css" rel="stylesheet" />

    <link href="../../Styles/BackOfficeL/reestruct2.css" rel="stylesheet" />
    <link href="../../Styles/BackOfficeL/reestructurados.css" rel="stylesheet" />
</asp:Content>

<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
</asp:Content>
