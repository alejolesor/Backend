(function () {
    var _default = {

        loadPages: function () {
            _uiStatic.buildCombobox();
            $(document).ready(function () { });




        },
        
        init: function () {
            debugger;
            transact.ajaxGET("/CargueInformacion/CamposDelFormulario?IdFormulario=1&IdCampoCompuesto=0", null, _default.successCampos, _default.error);
        },

        

        
        successCampos: function (data) {
            _ui.crearCampo($("#contentDataCampos"), data, 1, "divContentLeft");
            //$("#DIADEPAGO").parent().append("<input type='checkbox' id='chkDiaPagok'>");
            //$("#DIADEPAGO").css("width", " 100%");
            //$("#chkDiaPagok").css("margin-left", "1%");
            //_uiStatic.eventClick($("#chkDiaPagok"), _default._accionCheck);
            //$("#PRESCRIPTOR").parent().append("<input type='checkbox' id='chkPrescriptor'>");
            //$("#PRESCRIPTOR").css("width", " 100%");
            //$("#chkPrescriptor").css("margin-left", "1%");
            //_uiStatic.eventClick($("#chkPrescriptor"), _default._accionCheckPres);
            //$("#PRESCRIPTOR").val("");
            //$("#PRESCRIPTOR").attr("disabled", "disabled");
            //$("#DIGITOVERIFICACION").val("");
            //$("#DIGITOVERIFICACION").attr("disabled", "disabled");
            //$("#PRESCRIPTOR").removeAttr("required");
            //$("#DIGITOVERIFICACION").removeAttr("required");
        },

        

        

        //opnedDialog: function () {
        //    $("#btnImprimirInfoFinanc").hide();
        //    $("#dialogConfirmacion").dialog("open");
        //},

        //btnSiDialog: function () {
        //    $("#PASO3").show();
        //    $("#contentCamposPaso1").hide();
        //    $("#btnCancelar").hide();
        //    $("#contentCamposPaso2").hide();
        //    $("#btnAgrerarTitular").hide();
        //    $("#contentCamposPaso1").hide();
        //    $("#contentCamposPaso3").show();
        //    $("#GuardaPasos").val("3");
        //    addEventListener("load", inicioPag, false);
        //    $("#dialogConfirmacion").dialog("close");

        //    $.ajax({
        //        "type": "POST",
        //        "url": "/Hipotecario/cargarTitulares",
        //        "data": { totalTitulares: $("#hTitulares").val() },
        //        "success": function (data) {
        //            contentData = data.split("~");
        //            console.log(contentData[0]);
        //            console.log(contentData[1]);

        //            $("#pnListaDesplegable").html(contentData[0]);
        //            $("#pnListaTitulares").html(contentData[1]);
        //        },
        //        "error": function (error) {
        //            console.log(error);
        //        }
        //    });
        //},

        //btnNoDialg: function () {
        //    $(this).dialog("close");
        //},

        //successValores: function (data) {
        //    sessionStorage.setItem("varCom", data.VALOR);
        //},

        //_error: function (error) {
        //    console.log(error);
        //},

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////Funciones para imprimir la información financiera/////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        //btnImprimirinfofinan: function () {
        //    var indiceGrilla = 1
        //    var htmlprint = "";
        //    var htmlprint2 = "";
        //    var informacionbasica = "";
        //    var informacionbasica2 = "";
        //    var arrayCaptura = [];
        //    var valorLista = $("#contentCamposPaso2 #TIPODEVIVIENDA option:selected").text();
        //    var valorLista2 = $("#TIPODEVIVIENDA_2 option:selected").text();
        //    var dataTitularDos = $("#contentDataPaso2Titular2").length;
        //    var condicion = "";
        //    var iniciogrilla = 0;
        //    var titular2 = "";

        //    if (valorLista != "") {// Si no selecciona el tipo de vivienda titular 1 arroja alerta    

        //        if (dataTitularDos > 0) {// Si se agrega el segundo titular realiza la impresión
        //            if (valorLista2 != "") {// Si no selecciona el tipo de vivienda titular 2 arroja alerta
        //                // Inicia division informacion sociodemografica titular 2
        //                var idInfoSocioTitularDos = $("#tiularDos_divCampos1").find("[data-id]");
        //                //Recorre la division en la que se encuentra la informacion sociodemografica del titular 2
        //                informacionbasica2 = "<div>";
        //                $.each(idInfoSocioTitularDos, function (x, valorinfo1) {
        //                    valorinfo1 = $(valorinfo1);
        //                    var condicioninfo1 = valorinfo1.attr("id");
        //                    if (condicioninfo1 == "NUMERODEDOCUMENTO_2" || condicioninfo1 == "NOMBRE_2" || condicioninfo1 == "PERSONASACARGO_2" || condicioninfo1 == "FECHADENACIMIENTO_2" || condicioninfo1 == "FECHADEEXPEDICION_2") {
        //                        informacionbasica2 += "<div id=\"divContentCampo_Form11_tiularDos_" + x + "\" class=\"divContentLeft\">" +
        //                            "<label>" + condicioninfo1 + "</label><br><input type=\"text\" value=\"" + valorinfo1.val() + "\" class=\"input-sm\"></div>";
        //                    }
        //                    if (condicioninfo1 == "ESTADOCIVIL_2" || condicioninfo1 == "ESTRATO_2" || condicioninfo1 == "TIPODEVIVIENDA_2") {
        //                        valorinfo1 = $("#" + condicioninfo1 + " option:selected");
        //                        informacionbasica2 += "<div id=\"divContentCampo_Form11_tiularDos_" + x + "\" class=\"divContentLeft\">" +
        //                            "<label>" + condicioninfo1 + "</label><br><input type=\"text\" value=\"" + valorinfo1.text() + "\" class=\"input-sm\"></div>";
        //                    }

        //                });
        //                informacionbasica2 += "</div>";
        //                // Finaliza division informacion sociodemografica titular 2

        //                // Inicia grilla información financiera titular 2
        //                var idGrillasTitularDos = $("#tiularDos_divCampos3").find("[data-work]");
        //                htmlprint2 = "<div id=\"divContentCampo_Form11_tiularUno_20\">";
        //                htmlprint2 += "<table id=\"tblPrincipla_POSICIONESINFORMACIONFINANCIERA\">";
        //                htmlprint2 += "<tbody>";
        //                htmlprint2 += "<tr id=\"tr_POSICIONESINFORMACIONFINANCIERA\">";
        //                $.each(idGrillasTitularDos, function (i, values) {

        //                    values = $(values);

        //                    if (valorLista2 == "PROPIA SIN HIPOTECA") {
        //                        iniciogrilla = 1;
        //                        condicion = iniciogrilla == 1 && values.attr("data-id") != 204 && values.attr("data-id") != 203;
        //                    }
        //                    if (valorLista2 == "PROPIA CON HIPOTECA") {
        //                        iniciogrilla = 2;
        //                        condicion = iniciogrilla == 2 && values.attr("data-id") != 204;
        //                    }
        //                    if (valorLista2 == "FAMILIAR") {
        //                        iniciogrilla = 3;
        //                        condicion = iniciogrilla == 3 && values.attr("data-id") != 204 && values.attr("data-id") != 203;
        //                    }
        //                    if (valorLista2 == "ARRIENDO") {
        //                        iniciogrilla = 4;
        //                        condicion = iniciogrilla == 4 && values.attr("data-id") != 203;
        //                    }
        //                    if (valorLista2 == "OTROS") {
        //                        iniciogrilla = 5;
        //                        condicion = iniciogrilla == 5 && values.attr("data-id") != 204 && values.attr("data-id") != 203 && values.attr("data-id") != 227;
        //                    }


        //                    if (condicion) {

        //                        htmlprint2 += "<td valign=\"top\" id=\"\">";
        //                        htmlprint2 += "<table> <thead>";
        //                        htmlprint2 += "<tr>";
        //                        var id = values.attr("data-id");
        //                        var GrillaContent = values.parent().parent().parent();
        //                        // Funcion que retorna el nombre del encabezado
        //                        var retorna_encabezado = _default.obtenerencabezado(id);
        //                        htmlprint2 += "<th style=\"text-align: center;width: 1%;background-color: rgb(230, 233, 220);border: solid 1px; font-size: 12px;\">" + retorna_encabezado + "</th>";
        //                        htmlprint2 += "</tr></thead>";
        //                        console.log("grilla No. " + id + "__" + i);
        //                        var dataGrillas = GrillaContent.find("tbody input");
        //                        indiceGrilla = 1;
        //                        //Contenido de cada uno de los campos por columna de la grilla
        //                        htmlprint += "<tbody>";
        //                        $.each(dataGrillas, function (i, values) {
        //                            htmlprint2 += "<tr>";
        //                            values = $(values);
        //                            arrayCaptura.push(_default.obtenercaptura(values, indiceGrilla, 1, id));
        //                            htmlprint2 += "<td><input type=\"text\" style=\"width:100%;\" value='" + values.val() + "' class=\"input-sm\"></td>";
        //                            htmlprint2 += "</tr>";
        //                            indiceGrilla++;
        //                        });
        //                        htmlprint2 += "</tbody>";
        //                        htmlprint2 += "<tfoot>";
        //                        //Contenido del total de los campos por columna de la grilla
        //                        var dataGrillasTotales = GrillaContent.find("tfoot input");
        //                        $.each(dataGrillasTotales, function (i, values) {

        //                            htmlprint2 += "<tr>";
        //                            values = $(values);
        //                            arrayCaptura.push(_default.obtenercaptura(values, null, 1, values.attr("data-id")));
        //                            if (values.get(0).type == 'checkbox') {
        //                                if (values.is(':checked')) {
        //                                    htmlprint2 += "<td align='center'>Mostar Promedio:<br><input type=\"checkbox\" disabled=\"disabled\" value='" + values.val() + "' class=\"input-sm\" checked></td>";
        //                                }
        //                                else {
        //                                    htmlprint2 += "<td align='center'>Mostar Promedio:<br><input type=\"checkbox\" disabled=\"disabled\" value='" + values.val() + "' class=\"input-sm\"></td>";
        //                                }
        //                            }
        //                            else {
        //                                htmlprint2 += "<td><input type=\"text\" disabled=\"disabled\" value='" + values.val() + "' class=\"input-sm\"></td>";
        //                            }
        //                            htmlprint2 += "</tr>";

        //                            indiceGrilla++;
        //                        });
        //                        htmlprint2 += "</tfoot>";
        //                        htmlprint2 += "</table>";
        //                        htmlprint2 += "</td>";
        //                    }
        //                });
        //                htmlprint2 += "</tr>";
        //                htmlprint2 += "</tbody>";
        //                htmlprint2 += "</table>";
        //                htmlprint2 += "</div>";
        //                // Finaliza Grilla información financiera titular 2

        //                //Imprimir toda la informacion del titular 2
        //                titular2 = '<br><div><fieldset class="scheduler-border"><legend class="scheduler-border">Información Sociodemografica Titular Dos</legend>' +
        //                            informacionbasica2 + '</fieldset></div>' + '<div><fieldset class="scheduler-border"><legend class="scheduler-border">Información Financiera Titular Dos</legend>'
        //                            + htmlprint2 + '</fieldset><div>';
        //            }
        //            else {
        //                alertify.alert('Debe diligenciar la información sociodemografica y financiera del titular dos');
        //                return false;
        //            }
        //        }

        //        var newWin = window.open('', 'Print_Informacion_financiera', 'width=1000,height=600');

        //        // Inicia division informacion sociodemografica titular 1
        //        var idInfoSocioTitularUno = $("#contentDataPaso2 #tiularUno_divCampos1").find("[data-id]");
        //        //Recorre la division en la que se encuentra la informacion sociodemografica del titular 1
        //        informacionbasica = "<div>";
        //        $.each(idInfoSocioTitularUno, function (x, valorinfo1) {
        //            valorinfo1 = $(valorinfo1);
        //            var condicioninfo1 = valorinfo1.attr("id");
        //            if (condicioninfo1 == "NUMERODEDOCUMENTO" || condicioninfo1 == "NOMBRE" || condicioninfo1 == "PERSONASACARGO" || condicioninfo1 == "FECHADENACIMIENTO" || condicioninfo1 == "FECHADEEXPEDICION") {
        //                informacionbasica += "<div id=\"divContentCampo_Form11_tiularUno_" + x + "\" class=\"divContentLeft\">" +
        //                    "<label>" + condicioninfo1 + "</label><br><input type=\"text\" value=\"" + valorinfo1.val() + "\" class=\"input-sm\"></div>";
        //            }
        //            if (condicioninfo1 == "ESTADOCIVIL" || condicioninfo1 == "ESTRATO" || condicioninfo1 == "TIPODEVIVIENDA") {
        //                valorinfo1 = $("#" + condicioninfo1 + " option:selected");
        //                informacionbasica += "<div id=\"divContentCampo_Form11_tiularUno_" + x + "\" class=\"divContentLeft\">" +
        //                    "<label>" + condicioninfo1 + "</label><br><input type=\"text\" value=\"" + valorinfo1.text() + "\" class=\"input-sm\"></div>";
        //            }

        //        });
        //        informacionbasica += "</div>";
        //        // Finaliza division informacion sociodemografica titular 1

        //        // Inicia grilla información financiera titular 1
        //        var idGrillasTitularUno = $("#tiularUno_divCampos3").find("[data-work]");
        //        htmlprint = "<div id=\"divContentCampo_Form11_tiularUno_20\">";
        //        htmlprint += "<table id=\"tblPrincipla_POSICIONESINFORMACIONFINANCIERA\">";
        //        htmlprint += "<tbody>";
        //        htmlprint += "<tr id=\"tr_POSICIONESINFORMACIONFINANCIERA\">";
        //        $.each(idGrillasTitularUno, function (i, values) {

        //            values = $(values);

        //            if (valorLista == "PROPIA SIN HIPOTECA") {
        //                iniciogrilla = 1;
        //                condicion = iniciogrilla == 1 && values.attr("data-id") != 204 && values.attr("data-id") != 203;
        //            }
        //            if (valorLista == "PROPIA CON HIPOTECA") {
        //                iniciogrilla = 2;
        //                condicion = iniciogrilla == 2 && values.attr("data-id") != 204;
        //            }
        //            if (valorLista == "FAMILIAR") {
        //                iniciogrilla = 3;
        //                condicion = iniciogrilla == 3 && values.attr("data-id") != 204 && values.attr("data-id") != 203;
        //            }
        //            if (valorLista == "ARRIENDO") {
        //                iniciogrilla = 4;
        //                condicion = iniciogrilla == 4 && values.attr("data-id") != 203;
        //            }
        //            if (valorLista == "OTROS") {
        //                iniciogrilla = 5;
        //                condicion = iniciogrilla == 5 && values.attr("data-id") != 204 && values.attr("data-id") != 203 && values.attr("data-id") != 227;
        //            }


        //            if (condicion) {

        //                htmlprint += "<td valign=\"top\" id=\"\">";
        //                htmlprint += "<table> <thead>";
        //                htmlprint += "<tr>";
        //                var id = values.attr("data-id");
        //                var GrillaContent = values.parent().parent().parent();
        //                // Funcion que retorna el nombre del encabezado
        //                var retorna_encabezado = _default.obtenerencabezado(id);
        //                htmlprint += "<th style=\"text-align: center;width: 1%;background-color: rgb(230, 233, 220);border: solid 1px; font-size: 12px;\">" + retorna_encabezado + "</th>";
        //                htmlprint += "</tr></thead>";
        //                console.log("grilla No. " + id + "__" + i);
        //                var dataGrillas = GrillaContent.find("tbody input");
        //                indiceGrilla = 1;
        //                //Contenido de cada uno de los campos por columna de la grilla
        //                htmlprint += "<tbody>";
        //                $.each(dataGrillas, function (i, values) {
        //                    htmlprint += "<tr>";
        //                    values = $(values);
        //                    arrayCaptura.push(_default.obtenercaptura(values, indiceGrilla, 1, id));
        //                    htmlprint += "<td><input type=\"text\" style=\"width:100%;\"  value='" + values.val() + "' class=\"input-sm\"></td>";
        //                    htmlprint += "</tr>";
        //                    indiceGrilla++;
        //                });
        //                htmlprint += "</tbody>";
        //                htmlprint += "<tfoot>";
        //                //Contenido del total de los campos por columna de la grilla
        //                var dataGrillasTotales = GrillaContent.find("tfoot input");
        //                $.each(dataGrillasTotales, function (i, values) {

        //                    htmlprint += "<tr>";
        //                    values = $(values);
        //                    arrayCaptura.push(_default.obtenercaptura(values, null, 1, values.attr("data-id")));
        //                    if (values.get(0).type == 'checkbox') {
        //                        if (values.is(':checked')) {
        //                            htmlprint += "<td align='center'>Mostar Promedio:<br><input type=\"checkbox\" disabled=\"disabled\" value='" + values.val() + "' class=\"input-sm\" checked></td>";
        //                        }
        //                        else {
        //                            htmlprint += "<td align='center'>Mostar Promedio:<br><input type=\"checkbox\" disabled=\"disabled\" value='" + values.val() + "' class=\"input-sm\"></td>";
        //                        }
        //                    }
        //                    else {
        //                        htmlprint += "<td><input type=\"text\" disabled=\"disabled\" value='" + values.val() + "' class=\"input-sm\"></td>";
        //                    }
        //                    htmlprint += "</tr>";

        //                    indiceGrilla++;
        //                });
        //                htmlprint += "</tfoot>";
        //                htmlprint += "</table>";
        //                htmlprint += "</td>";
        //            }
        //        });
        //        htmlprint += "</tr>";
        //        htmlprint += "</tbody>";
        //        htmlprint += "</table>";
        //        htmlprint += "</div>";
        //        // Finaliza Grilla información financiera titular 1

        //        newWin.document.write('<html><head><style>' +
        //             '#tblPrincipla_POSICIONESINFORMACIONFINANCIERA, #tblPrincipla_POSICIONESINFORMACIONFINANCIERA_2, tfoot input, #divCamposQuemados fieldset {' +
        //             'width: 100%;' +
        //             '}' +
        //             '#HIPOTECA, #ARRIENDO, #VIVIENDA,' +
        //             '#HIPOTECA_2, #ARRIENDO_2, #VIVIENDA_2,' +
        //             '#tiularDos_divCampos1, #tiularDos_divCampos2, #tiularDos_divCampos3 {' +
        //             '            display: none;' +
        //             '        }' +
        //             '#tr_POSICIONESINFORMACIONFINANCIERA tbody input, #tr_POSICIONESINFORMACIONFINANCIERA_2 tbody input {' +
        //             '        width: 85%;' +
        //             '}' +
        //             '#divGrillaInfoUno table, #divGrillaInfoDos table {' +
        //             '        border: double #9AAE04;' +
        //             '        width: 100%;' +
        //             '    margin-bottom: 16px;' +
        //             '}' +
        //             '#divGrillaInfoUno, #divGrillaInfoDos {' +
        //             '        height: 61px !important;' +
        //             '}' +
        //             '.divContentLeft {' +
        //             'width: 25% !important;' +
        //             'height: 46px !important;' +
        //             'float: left;' +
        //             '}' +
        //             '</style></head>' +
        //             '<body>' +
        //             '<img src="../../Images/LogoAntara.PNG" >' +
        //             '<img src="../../Images/logon_everis.png" style="margin-left:52%" >' +
        //             '<div><fieldset class="scheduler-border"><legend class="scheduler-border">Información Sociodemografica Titular Uno</legend>'
        //             + informacionbasica + '</fieldset></div>' +
        //             '<div><fieldset class="scheduler-border"><legend class="scheduler-border">Información Financiera Titular Uno</legend>'
        //             + htmlprint +
        //             '</fieldset></div><div>' + titular2 + '</div></body></html>');
        //        newWin.document.close();
        //        newWin.print();
        //        newWin.closeAction = 'destroy';
        //        newWin.close();
        //    }
        //    else {
        //        alertify.alert('Debe diligenciar la información sociodemografica y financiera del titular uno');
        //    }
        //},

        //obtenercaptura: function (values, indiceGrilla, indiceTitular, dataId) {
        //    var objetoCaptura = {};
        //    if (dataId == null)
        //        dataId = values.context.localName == "option" ? values.parent().attr("data-id") : values.attr("data-id");

        //    objetoCaptura = {
        //        "IdCampo": dataId,
        //        "IndiceGrilla": indiceGrilla,
        //        "IndiceTitular": indiceTitular,
        //        "Valor": values.val(),
        //    }
        //    if (indiceGrilla != null) {
        //        indiceGrilla++;
        //    }

        //    return objetoCaptura;
        //},

        //obtenerencabezado: function (id) {
        //    var encabezado = "";
        //    if (id == 198) { encabezado = "ING FIJOS" }
        //    if (id == 199) { encabezado = "ING VARIABLES" }
        //    if (id == 200) { encabezado = "DED" }
        //    if (id == 201) { encabezado = "CUOTAS" }
        //    if (id == 202) { encabezado = "CUPOS" }
        //    if (id == 203) { encabezado = "HIPOTECA" }
        //    if (id == 204) { encabezado = "ARRIENDO" }
        //    if (id == 205) { encabezado = "OTROS ACTIVOS" }
        //    if (id == 227) { encabezado = "VIVIENDA" }

        //    return encabezado;
        //},

        //opendDialogNuevoTitular: function () {
        //    var url = "/Productos/ListaItemsDependientes?IdCampo=223&idCampo_Lista=" + null + "&CuotaAnio=" + null + "&Segmento=" + null;
        //    transact.ajaxGET(url, null, _default.successListas, _default.error);
        //    $("#dialogNewTitular").dialog("open");
        //},

        //btnCrearTitularDialog: function () {
        //    var dataModel = $("#dialogNewTitular").find("input[name], select option:selected");
        //    var resultado = _default.validModelDialog(dataModel);
        //    if (resultado == true) {
        //        $("#hTitulares").val("2");
        //        var dataSave = $("#dialogNewTitular").find("input[name]:checked, select option:selected");
        //        _default.guardarDataModelNewTitular(dataSave);
        //        $("#taps").find("li").removeAttr("class");
        //        $("div#contentDataPaso2").attr("class", "tab-pane");
        //        $("#taps").append(" <li class=\"active\"><a href=\"#contentDataPaso2Titular2\" data-toggle=\"tab\">Titular 2</a></li>");
        //        $("#contentTaps").append(" <div id=\"contentDataPaso2Titular2\" data-work=\"TitularUno\" class=\"tab-pane active\"></div>");
        //        _default.init();
        //        $("#EDADVSEXPEDICION_2").attr("disabled", "disabled");
        //        $("#EDAD_2").attr("disabled", "disabled");
        //        $("#dialogNewTitular").dialog("close");
        //        $("#btnAgrerarTitular").attr("disabled", "disabled").css("display", "none");
        //    }
        //},

        //successListas: function (data) {
        //    $("#RELACIONCONTITULARUNO").html("");
        //    _ui.fillCombo($("#RELACIONCONTITULARUNO"), data);
        //    $("#RELACIONCONTITULARUNO").combobox();
        //},

        //validModelDialog: function (data) {
        //    var resultValid = true;
        //    $.each(data, function (i, values) {
        //        values = $(values);
        //        if (values.context.localName != "option") {
        //            if ($("input[name='" + values.context.name + "']:checked").length == 0) {
        //                values.parent().find("span").text("* Requerido").css({
        //                    "color": "red",
        //                });
        //                resultValid = false;
        //                return resultValid;
        //            } else {
        //                values.parent().find("span").text("");
        //            }
        //        } else {
        //            var inputObtion = $(inputObtion);
        //            if (values.val() == "" || values.val() == "-1") { /// Verifico que tenga un valor 
        //                values.parent().next().next().text("* Requerido");
        //                inputObtion.css({
        //                    "color": "red",
        //                });
        //                resultValid = false;
        //                return resultValid;
        //            } else {
        //                values.parent().next().next().text("");
        //                inputObtion.css({
        //                    "color": "black",
        //                    "border": "1px solid gray"
        //                });
        //            }
        //        }
        //    });
        //    return resultValid;
        //},

        //guardarDataModelNewTitular: function (data) {
        //    var solicitud = _default.solicitud;
        //    var usuarioID = parseFloat($("#usuarioID").val());
        //    var indiceGrilla = 1
        //    var formulario = 11;
        //    var arrayCaptura = [];
        //    $.each(data, function (i, values) {
        //        values = $(values);
        //        arrayCaptura.push(_uiStatic.builObjectCaptura(values, solicitud, formulario, usuarioID, null, 2, null));
        //    });

        //    console.log(arrayCaptura);
        //    var queryCaptura = '/Productos/Captura';
        //    transact.ajaxPOST(queryCaptura, JSON.stringify(arrayCaptura), _default.successDataModel, _default.error);
        //},

        //successDataModel: function (data) {

        //},

        //idTotalesGrillas: function (idCampos) {
        //    switch (idCampos) {
        //        case 198:
        //            return 208;
        //            break;
        //        case 199:
        //            return 209;
        //            break;
        //        case 200:
        //            return 210;
        //            break;
        //        case 201:
        //            return 211;
        //            break;
        //        case 202:
        //            return 228;
        //            break;
        //        case 203:
        //            return 212;
        //            break;
        //        case 204:
        //            return 213;
        //            break;
        //        case 205:
        //            return 214;
        //            break;
        //        case 227:
        //            return 215;
        //            break;
        //    }
        //},

        //_accionCheckP2: function (e) {
        //    var _this = $(e.currentTarget);
        //    var chek = e.currentTarget.checked;
        //    var idCampo = e.currentTarget.id;
        //    if (chek == true) {
        //        _this.val(1);
        //    } else {
        //        _this.val(0);
        //    }
        //},

        //validarInformacionFinanciera: function () {
        //    totalesTitularUno = $("#tr_POSICIONESINFORMACIONFINANCIERA table tfoot input[placeholder='Total']");

        //    totalesTitularDos = $("#tr_POSICIONESINFORMACIONFINANCIERA_2 table tfoot input[placeholder='Total']");
        //    if ($("#tiularDos_divCampos3").css("display") != "none") {

        //        for (var i = 0; i < $(totalesTitularDos).length && $(totalesTitularUno).length ; i++) {

        //            var valorTitulaUno = $(totalesTitularUno[i]).val();
        //            var valorTitulaDos = $(totalesTitularDos[i]).val();
        //            if (valorTitulaUno == valorTitulaDos) {
        //                $(totalesTitularUno[i]).css("border", "1px solid grey");
        //                $(totalesTitularDos[i]).css("border", "1px solid grey");
        //            } else {
        //                var nomCampo = $(totalesTitularUno[i]).parent().parent().parent()
        //                                .parent().parent().parent().attr("id");
        //                if (nomCampo == undefined) {
        //                    nomCampo = $(totalesTitularUno[i]).parent().parent().parent()
        //                                .parent().attr("id");
        //                }
        //                $(totalesTitularUno[i]).css("border", "1px solid red");
        //                $(totalesTitularDos[i]).css("border", "1px solid red");
        //                $("#stgMensajeAlerta").text("El valor del total de : " + nomCampo + " No es igual al del segundo titular");
        //                $("#dialogAlertas").dialog("open");
        //                return false;
        //                break;
        //            }
        //        }
        //    } else {
        //        return true;
        //    }

        //},

        //guardarPasos: function () {
        //    var Paso = true;
        //    if ($("#GuardaPasos").val() == "1" && Paso == true) {
        //        var camposData = $("#contentCamposPaso1 #contentDataPaso1").find("input[type='text'] , textarea, select option:selected");
        //        var Valid = _fx.validFormulario(camposData);
        //        if (Valid) {

        //            var valodacionEspecifica = _default.validacionesEspecificas();
        //            if (valodacionEspecifica) {
        //                $("#PASO2").show();
        //                $("#contentCamposPaso1").hide();
        //                $("#btnCancelar").hide();
        //                $("#contentCamposPaso2").show();
        //                $("#contentCamposPaso3").hide();
        //                $("#btnAgrerarTitular").show();
        //                $("#btnImprimirInfoFinanc").show();
        //                $("#GuardaPasos").val("2");
        //                _default.init2();
        //            }
        //            Paso = false;

        //        }
        //    }

        //    if ($("#GuardaPasos").val() == "2" && Paso == true) {

        //        var dataTitularUno = $("#contentCamposPaso2").find("#tiularUno_divCampos1 input[type='text'], #divCamposQuemados input[type='text']," +
        //                                                    " #tiularUno_divCampos1 select option:selected, " +
        //                                                    "#tiularUno_divCampos2 input[type='text']," +
        //                                                    " #tiularUno_divCampos2 select option:selected, " +
        //                                                    " #divContentCampo_Form11_tiularUno_16 input[type='text'], #divContentCampo_Form11_tiularUno_17 input[type='text']");
        //        var resultTitualrUno = _fx.validFormulario(dataTitularUno);

        //        var dataTitularDos = $("#contentDataPaso2Titular2").find("#tiularDos_divCampos1 input[type='text']," +
        //                                                        " #tiularDos_divCampos1 select option:selected, " +
        //                                                        "#tiularDos_divCampos2 input[type='text']," +
        //                                                        " #tiularDos_divCampos2 select option:selected, " +
        //                                                        " #divContentCampo_Form11_tiularDos_16 input[type='text'], #divContentCampo_Form11_tiularDos_17 input[type='text']");
        //        var resultTitularDos = _fx.validFormulario(dataTitularDos);

        //        //resultTitualrUno = _default.validarInformacionFinanciera() == false ? false : true;

        //        if (resultTitualrUno == true && resultTitularDos == true) {
        //            _default.opnedDialog();
        //            Paso = false;
        //        }
        //        else {
        //            if (resultTitualrUno == false) {
        //                $("a[href='#contentDataPaso2']").parent().attr("class", "active");
        //                $("a[href='#contentDataPaso2Titular2']").parent().removeAttr("class");
        //                $("#contentDataPaso2").attr("class", "tab-pane active");
        //                $("#contentDataPaso2Titular2").attr("class", "tab-pane");
        //            } else if (resultTitularDos == false) {
        //                $("a[href='#contentDataPaso2Titular2']").parent().attr("class", "active");
        //                $("a[href='#contentDataPaso2']").parent().removeAttr("class");
        //                $("#contentDataPaso2Titular2").attr("class", "tab-pane active");
        //                $("#contentDataPaso2").attr("class", "tab-pane");
        //            }
        //        }

        //    }

        //    if ($("#GuardaPasos").val() == "3" && Paso == true) {

        //        ShowProgress();
        //        var camposData = $("#contentCamposPaso1 #contentDataPaso1").find("input[type='text'], input[type='checkbox'], textarea, select option:selected");
        //        var arrayCaptura = [];
        //        var objetoCaptura = {};
        //        var solicitud = _default.solicitud;
        //        var usuarioID = parseFloat($("#usuarioID").val());
        //        var formulario = 10;

        //        $.each(camposData, function (i, values) {
        //            values = $(values);
        //            objetoCaptura = {
        //                "IdSolicitud": solicitud,
        //                "IdFormulario": formulario,
        //                "IdCampo": values.context.localName == "option" ? values.parent().attr("data-id") : values.attr("data-id"),
        //                "IdUsuario": usuarioID,
        //                "IndiceGrilla": null,
        //                "IndiceTitular": null,
        //                "Valor": values.val(),
        //                "Fecharegistro": new Date()
        //            }
        //            arrayCaptura.push(objetoCaptura);
        //        });

        //        console.log(arrayCaptura);
        //        var queryCaptura = '/Productos/Captura';
        //        transact.ajaxPOST(queryCaptura, JSON.stringify(arrayCaptura), _default.successGuardarPaso2, _default.error);
        //    }
        //},


        ///////////////////////////////////////
        //successGuardarPaso2: function (data) {
        //    var dataTitularUno = $("#contentCamposPaso2").find("#tiularUno_divCampos1 input[type='text'], #divCamposQuemados input[type='text']," +
        //                                                        " #tiularUno_divCampos1 select option:selected, " +
        //                                                        "#tiularUno_divCampos2 input[type='text']," +
        //                                                        " #tiularUno_divCampos2 select option:selected, " +
        //                                                        " #divContentCampo_Form11_tiularUno_16 input[type='text'], #divContentCampo_Form11_tiularUno_17 input[type='text']");

        //    var idGrillasTitularUno = $("#tiularUno_divCampos3").find("[data-work]");

        //    var dataTitularDos = $("#contentDataPaso2Titular2").find("#tiularDos_divCampos1 input[type='text']," +
        //                                                    " #tiularDos_divCampos1 select option:selected, " +
        //                                                    "#tiularDos_divCampos2 input[type='text']," +
        //                                                    " #tiularDos_divCampos2 select option:selected, " +
        //                                                    " #divContentCampo_Form11_tiularDos_16 input[type='text'], #divContentCampo_Form11_tiularDos_17 input[type='text']");

        //    var idGrillasTitularDos = $("#tiularDos_divCampos3").find("[data-work]");

        //    var solicitud = _default.solicitud;
        //    var usuarioID = parseFloat($("#usuarioID").val());
        //    var indiceGrilla = 1
        //    var formulario = 11;

        //    var arrayCaptura = [];
        //    ////////////////////////////-------TITULAR UNO -------///////////////////////////////////////////
        //    $.each(dataTitularUno, function (i, values) {

        //        values = $(values);
        //        arrayCaptura.push(_uiStatic.builObjectCaptura(values, solicitud, formulario, usuarioID, null, 1, null));
        //    });

        //    var objetocampos = ["#INGRESOSPARALEYDEVIVIENDA", "#PATRIMONIO"];
        //    var s = 0;
        //    while (s < objetocampos.length) {
        //        values = $(objetocampos[s]);
        //        arrayCaptura.push(_uiStatic.builObjectCaptura(values, solicitud, formulario, usuarioID, null, 1, null));
        //        s++;
        //    }


        //    $.each(idGrillasTitularUno, function (i, values) {
        //        values = $(values);
        //        var id = values.attr("data-id");
        //        var GrillaContent = values.parent().parent().parent();
        //        console.log("grilla No. " + id + "__" + i);
        //        var dataGrillas = GrillaContent.find("tbody input");

        //        indiceGrilla = 1;
        //        $.each(dataGrillas, function (i, values) {
        //            values = $(values);
        //            arrayCaptura.push(_uiStatic.builObjectCaptura(values, solicitud, formulario, usuarioID, indiceGrilla, 1, id));
        //            indiceGrilla++;
        //        });

        //        var dataGrillasTotales = GrillaContent.find("tfoot input");
        //        $.each(dataGrillasTotales, function (i, values) {
        //            values = $(values);
        //            arrayCaptura.push(_uiStatic.builObjectCaptura(values, solicitud, formulario, usuarioID, null, 1, values.attr("data-id")));
        //            indiceGrilla++;
        //        });

        //    });
        //    ////////////////////////////-------TITULAR DOS -------///////////////////////////////////////////
        //    $.each(dataTitularDos, function (i, values) {

        //        values = $(values);
        //        arrayCaptura.push(_uiStatic.builObjectCaptura(values, solicitud, formulario, usuarioID, null, 2, null));
        //    });

        //    if (dataTitularDos.length != 0) {
        //        var objetocampos = ["#INGRESOSPARALEYDEVIVIENDA_2", "#PATRIMONIO_2"];
        //        var s = 0;
        //        while (s < objetocampos.length) {
        //            values = $(objetocampos[s]);
        //            arrayCaptura.push(_uiStatic.builObjectCaptura(values, solicitud, formulario, usuarioID, null, 2, null));
        //            s++;
        //        }
        //    }

        //    $.each(idGrillasTitularDos, function (i, values) {
        //        values = $(values);
        //        var id = values.attr("data-id");
        //        var GrillaContent = values.parent().parent().parent();
        //        console.log("grilla No. " + id + "__" + i);
        //        var dataGrillas = GrillaContent.find("tbody input");
        //        indiceGrilla = 1;
        //        $.each(dataGrillas, function (i, values) {
        //            values = $(values);
        //            arrayCaptura.push(_uiStatic.builObjectCaptura(values, solicitud, formulario, usuarioID, indiceGrilla, 2, id));
        //            indiceGrilla++;
        //        });
        //        var dataGrillasTotal = GrillaContent.find("tfoot input");
        //        $.each(dataGrillasTotal, function (i, values) {
        //            values = $(values);
        //            arrayCaptura.push(_uiStatic.builObjectCaptura(values, solicitud, formulario, usuarioID, null, 2, values.attr("data-id")));
        //        });
        //    });

        //    console.log(arrayCaptura);
        //    var queryCaptura = "/Productos/Captura";
        //    transact.ajaxPOST(queryCaptura, JSON.stringify(arrayCaptura), _default.successGuardarPaso3, _default.error);
        //},

        //successGuardarPaso3: function (data) {
        //    var camposData = $("#contentCamposPaso3 #contentDataPaso3").find("input[type='checkbox'] , select option:selected");
        //    var arrayCaptura = [];
        //    var objetoCaptura = {};
        //    var solicitud = _default.solicitud;
        //    var usuarioID = parseFloat($("#usuarioID").val());
        //    var formulario = 12;

        //    $.each(camposData, function (i, values) {
        //        values = $(values);
        //        objetoCaptura = {
        //            "IdSolicitud": solicitud,
        //            "IdFormulario": formulario,
        //            "IdCampo": values.context.localName == "option" ? values.parent().attr("id") : values.attr("id"),
        //            "IdUsuario": usuarioID,
        //            "IndiceGrilla": null,
        //            "IndiceTitular": null,
        //            "Valor": values.val(),
        //            "Fecharegistro": new Date()
        //        }
        //        arrayCaptura.push(objetoCaptura);
        //    });

        //    console.log(arrayCaptura);
        //    var queryCaptura = '/Productos/Captura';
        //    transact.ajaxPOST(queryCaptura, JSON.stringify(arrayCaptura), _default.successFinalizaGuadar, _default.error);
        //},

        //successFinalizaGuadar: function (data) {
        //    console.log("Data Paso  3 = " + data);
        //    if (data == 'Insercion correcta') {
        //        $(".loading").delay(1000).fadeOut("slow");
        //        $("#contentDataPaso3").hide();
        //        $("#PASO1").hide();
        //        $("#PASO2").hide();
        //        $("#PASO3").hide();
        //        $("#filObservaciones").hide();
        //        $("#btnGuardarHipot").hide();
        //        $("#btnReset").hide();
        //        $("#btnFinalizar").hide();
        //        $("#ModalScoring").show();
        //    }
        //},

        //successFinalizarCaso: function () {
        //    window.location.href = "/Hipotecario/HipotecarioPaso1";
        //},

        //validacionesEspecificas: function () {
        //    var valor = $("#CUMPLEONOCUMPLE").val();
        //    if (valor == "NO CUMPLE") {
        //        $("#dialog-message").dialog("open");
        //        return true;
        //    } else {
        //        return true;
        //    }
        //},

        //btnOkModal: function () {
        //    $(this).dialog("close");
        //},

        //_accionCheck: function (e) {
        //    var chek = e.currentTarget.checked;
        //    var idCampo = e.currentTarget.id;
        //    if (chek == true) {
        //        $("#DIADEPAGO").val("al dia");
        //        $("#DIADEPAGO").attr("disabled", "disabled");
        //    } else {
        //        $("#DIADEPAGO").val("");
        //        $("#DIADEPAGO").removeAttr("disabled");
        //    }
        //},

        //_accionCheckPres: function (e) {
        //    var chek = e.currentTarget.checked;
        //    var idCampo = e.currentTarget.id;
        //    if (chek == true) {
        //        $("#PRESCRIPTOR").removeAttr("disabled");
        //        $("#DIGITOVERIFICACION").removeAttr("disabled");
        //        $("#PRESCRIPTOR").attr("required", "required");
        //        $("#DIGITOVERIFICACION").attr("required", "required");
        //        $("#CODIGODELGESTOR").attr("disabled", "disabled");
        //        $("#CODIGODELGESTOR").removeAttr("required");
        //    } else {
        //        $("#PRESCRIPTOR").val("");
        //        $("#PRESCRIPTOR").attr("disabled", "disabled");
        //        $("#DIGITOVERIFICACION").val("");
        //        $("#DIGITOVERIFICACION").attr("disabled", "disabled");
        //        $("#PRESCRIPTOR").removeAttr("required");
        //        $("#DIGITOVERIFICACION").removeAttr("required");
        //        $("#CODIGODELGESTOR").removeAttr("disabled");
        //        $("#CODIGODELGESTOR").attr("required", "required");
        //    }
        //},

        //sumarTotalIngresosProyectados: function (e) {
        //    var _this = $(e.currentTarget);
        //    var salidaDelInput = parseInt(_this.attr("data-focusout"));

        //    var totalInput = $("#CalculadoraPorrateoHipo").contents().find("#TOTALINGRESOSPROYECTADOS"),
        //        valorAcomulado = totalInput.val() == "" || totalInput.val() == "NaN"
        //                    ? 0 : totalInput.val().replace(/[$ .]/gi, '');
        //    valorConyuge = _this.val().replace(/[$ .]/gi, ''),
        //    valorTitular = $("#CalculadoraPorrateoHipo").contents().find("#INGRESOSTITULAR").val() == ""
        //        ? 0 : $("#CalculadoraPorrateoHipo").contents().find("#INGRESOSTITULAR").val().replace(/[$ .]/gi, '');

        //    var sumaTotal = 0
        //    if (salidaDelInput > 1) {
        //        sumaTotal = parseInt(valorAcomulado) + parseInt(valorConyuge)
        //                    - parseInt(_this.attr("data-ValorOld").replace(/[$ .]/gi, ''));
        //    }
        //    else {
        //        sumaTotal = parseInt(valorAcomulado) + parseInt(valorConyuge) + parseInt(valorTitular);
        //    }

        //    totalInput.val(_fx.separacionMiles(sumaTotal));

        //    _this.attr("data-focusout", salidaDelInput + 1);



        //},

        //calculoCuotaTitularYconyuge: function (e) {
        //    var _this = $(e.currentTarget),
        //                    salidaDelInput = parseInt(_this.attr("data-focusout")),
        //                    cuotaHipoteca = _this.val() == "" || _this.val() == "NaN" ? 0 : _this.val().replace(/[$ .]/gi, ''),
        //                    ingresosTitular = $("#CalculadoraPorrateoHipo").contents().find("#INGRESOSTITULAR").val() == "" || $("#CalculadoraPorrateoHipo").contents().find("#INGRESOSTITULAR").val() == "NaN"
        //                                        ? 0 : $("#CalculadoraPorrateoHipo").contents().find("#INGRESOSTITULAR").val().replace(/[$ .]/gi, ''),

        //                    ingresosConyuge = $("#CalculadoraPorrateoHipo").contents().find("#INGRESOSCONYUGE").val() == "" || $("#CalculadoraPorrateoHipo").contents().find("#INGRESOSCONYUGE").val() == "NaN"
        //                                            ? 0 : $("#CalculadoraPorrateoHipo").contents().find("#INGRESOSCONYUGE").val().replace(/[$ .]/gi, ''),

        //                    TotalIngresosProyect = $("#CalculadoraPorrateoHipo").contents().find("#TOTALINGRESOSPROYECTADOS").val() == ""
        //                                            ? 0 : $("#CalculadoraPorrateoHipo").contents().find("#TOTALINGRESOSPROYECTADOS").val().replace(/[$ .]/gi, ''),
        //                    valorCuotaTitular = 0,
        //                    valorCuotaConyuge = 0;
        //    //Formula: =(ingreso del Titular/Total Ingresos)*valor cuota hipoteca
        //    valorCuotaTitular = parseFloat((parseInt(ingresosTitular) / parseInt(TotalIngresosProyect)) * cuotaHipoteca).toFixed(2);
        //    valorCuotaConyuge = parseFloat((parseInt(ingresosConyuge) / parseInt(TotalIngresosProyect)) * cuotaHipoteca).toFixed(2);

        //    $("#CalculadoraPorrateoHipo").contents().find("#CUOTATITULAR").val(_fx.separadorMilesConDecimal(valorCuotaTitular.toString()));
        //    $("#CalculadoraPorrateoHipo").contents().find("#CUOTACONYUGE").val(_fx.separadorMilesConDecimal(valorCuotaConyuge.toString()));
        //},

        //inputIn: function (e) {
        //    var _this = $(e.currentTarget);
        //    var salidaDelInput = parseInt(_this.attr("data-focusout"));
        //    _this.attr("data-ValorOld", _this.val());
        //    _this.attr("data-focusout", salidaDelInput + 1);
        //},

        //btnGenerarScoring: function () {
        //    $("#btnFinalizar").show();
        //    $("#btnGenerarScoring").hide();
        //    window.location.href = "/ScoringHipotecario/generarReporte" + "?idSolicitud=" + _default.solicitud + "&paso5=" + 1;
        //},
    }
    debugger;
    _default.init();
    _default.loadPages();
})();



function inicioPag() {
    document.getElementById("216").addEventListener("change", cambioSelect, false);
}

var contenido_textarea = "";
var num_caracteres_permitidos = 210;
function valida_longitud() {
    var num_caracteres = $("#txtObservaciones").val();
    num_caracteres = num_caracteres.length;

    if (num_caracteres <= num_caracteres_permitidos) {
        contenido_textarea = $("#txtObservaciones").val();
    } else {
        $("#txtObservaciones").val(contenido_textarea);
    }

    if (num_caracteres >= num_caracteres_permitidos) {
        var textolen = document.getElementById("contadorLen");
        textolen.style.color = "#ff0000";
    } else {
        var textolen = document.getElementById("contadorLen");
        textolen.style.color = "#000000";
    }
    cuenta();
}

function cuenta() {
    var valorlen = $("#txtObservaciones").val();
    $("#contadorLen").val(valorlen.length);
}

function cambioSelect() {
    var _valorSelect = $("#216").val();
    var _tipoViviendaTitular1 = $("#TIPODEVIVIENDA option:selected").val();
    var _tipoViviendaTitular2 = $("#TIPODEVIVIENDA_2 option:selected").val() == undefined ? "" : $("#TIPODEVIVIENDA_2 option:selected").val();

    //Validamos ID's 1 contra 560
    var concatenaT1 = _valorSelect + _tipoViviendaTitular1;
    var concatenaT2 = _valorSelect + _tipoViviendaTitular2;
    if (concatenaT1 == "681560" || concatenaT2 == "681560") {
        $("#panelnoConvenio").show();
        setTimeout(function () {
            if ($("#panelnoConvenio").css("display") == "block") {
                $("#panelnoConvenio").css("display", "none");
            }
        }, 4000);
    }

    //Validamos ID's 1 contra 561
    var contatenaTitular1 = _valorSelect + _tipoViviendaTitular1;
    var contatenaTitular2 = _valorSelect + _tipoViviendaTitular2;
    if (contatenaTitular1 == "681561" || contatenaTitular2 == "681561") {
        $("#panelnoConvenio").show;
        setTimeout(function () {
            if ($("#panelnoConvenio").css("display") == "block") {
                $("#panelnoConvenio").css("display", "none");
            }
        }, 4000);
    }

    //Validamos ID's 3 contra 564
    var _contatenaTitular1 = _valorSelect + _tipoViviendaTitular1;
    var _contatenaTitular2 = _valorSelect + _tipoViviendaTitular2;
    if (_contatenaTitular1 == "683560" || _contatenaTitular1 == "683562" ||
        _contatenaTitular1 == "683563" || _contatenaTitular1 == "683564" ||
        _contatenaTitular2 == "683560" || _contatenaTitular2 == "683562" ||
        _contatenaTitular2 == "683563" || _contatenaTitular2 == "683564") {
        $("#panelnoConvenio").show();
        setTimeout(function () {
            if ($("#panelnoConvenio").css("display") == "block") {
                $("#panelnoConvenio").css("display", "none");
            }
        }, 4000);
    }
}


