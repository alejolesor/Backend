/*
* Autor : Elena Parra
* Version: 1.0
*   _ui administras todas la funciones que te permite administar las etiquetas del DOM
*/
//var _ui = null;
(function ($) {

    var RecibeJsonr = window.RecibeJsonr = new Array();
    var clicks = 0;
    var _ui = window._ui = {

        fillCombo: function (combo, items) {
            combo = $(combo);
            $.each(items, function (i, item) {
                switch (combo.data("work")) {
                    case "rolesApp":
                        if (i == 0) {
                            combo.append(_uiStatic.createElement("option", { "value": "-1" }, ""))
                        }
                        combo.append(_uiStatic.createElement("option", { "id": item._codigo, "value": item._descripcion }, item._descripcion));
                        break;
                    case "camposTipoLista":
                        if (i == 0) {
                            combo.append(_uiStatic.createElement("option", { "value": "-1" }, ""))
                        }
                        combo.append(_uiStatic.createElement("option", { "id": item.IdCampo, "value": item.IdCampo }, item.Descripcion));
                        break;
                    default:
                        if (i == 0) {
                            combo.append(_uiStatic.createElement("option", { "value": "-1" }, ""))
                        }
                        combo.append(_uiStatic.createElement("option", { "value": item.IdCampos_Listas, "data-Codigo": item.Codigo }, item.Descripcion));
                }

            });
        },

        //---------------------------------------------------funcion para los selects on change--------------------------------------------------------//

        changeSelect: function (e) {
            var _this = $(e.currentTarget);
            var select = $(_this.parent().prev());
            switch (select.data("work")) {

                case "EMPRESA":
                    debugger;
                    $("#CATEGORIA").html("");
                    $("#NIVEL").html("");
                    var id = $("#EMPRESA").find(':selected').val();
                    _ui.cargarCategoriaNivel(id)


                    break;
                case "Area":
                    debugger;
                    $("#LIDERSGD").html("");
                    var id = $("#Area").find(':selected').attr("data-Codigo");
                    //$("#CODIGOSUCURSAL").val($("#" + select.attr("id") + " option:selected").attr("data-Codigo"));
                    _ui.obtenerLiderSGD(id)

                    break;
                //case "Area_Masivos":
                //    debugger;
                //    $("#LIDERSGD").html("");
                //    //$("#TIPODECAMBIO").html("");
                //   // $("#LIDERCAMBIOMASIVO").html("");
                //   // $("#CAMBIODESUELDO").html("");
                    
                //    $("#divContentCampo_Form7_1 .custom-combobox-input").val("");
                //    //$("#divContentCampo_Form7_2 .custom-combobox-input").val("");
                //    //$("#divContentCampo_Form7_3 .custom-combobox-input").val("");
                //   // $("#divContentCampo_Form7_4 .custom-combobox-input").val("");
                //    var id = $("#AREA").find(':selected').attr("data-Codigo");
                //    //$("#CODIGOSUCURSAL").val($("#" + select.attr("id") + " option:selected").attr("data-Codigo"));
                //    _ui.obtenerLiderSGD(id)

                //    break;
                case "CIUDAD":
                    debugger;
                    var ciudad = $("#CIUDAD option:selected").val();
                    var listas = ["LOCALIDAD"];
                    if (ciudad != "10") {
                        var select = $("#LOCALIDAD").val();
                        $("#LOCALIDAD").next().find("input[autocomplete='off']").val('');
                        _ui.deshabilitarList(listas);

                    }
                    else {
                        $("#LOCALIDAD").empty();
                        _ui.habilitarList(listas);
                    }
                    break;

                case "Area_cargue":

                    debugger;
                    $("#btnCargar").hide();
                    $("#Producto").html("");
                    $("#Lider").html("");
                    $("#Archivo").val("");
                    $("#NombreFile").val("");
                  
                    //setTimeout(function () {
                    $("#divContentCampo_Form1_1 .custom-combobox-input").val("Seleccione...");
                    $("#divContentCampo_Form1_2 .custom-combobox-input").val("Seleccione...");
                    //setTimeout(function () {
                    //    $("#Producto").val("Seleccione...");
                    //}, 3000);

                    var id = $("#Area").find(':selected').val();
                    _ui.ObtenerProducto(id);

                    break;
                case "Producto_cargue":
                    $("#btnCargar").hide();
                    $("#Lider").html("");
                    $("#Archivo").val("");
                    $("#NombreFile").val("");
                    $("#divContentCampo_Form1_2 .custom-combobox-input").val("Seleccione...");
                    
                    var idProd = $("#Producto").find(':selected').val();
                    var idArea = $("#Area").find(':selected').val();
                    //alert(idProd + " el area es :" + idArea);
                    _ui.ObtenerLider(idProd, idArea);
                    
                    break;

                case "Lider_cargue":
                    $("#NombreFile").val("");

                    var idProd = $("#Producto").find(':selected').val();
                    var idArea = $("#Area").find(':selected').val();
                    _ui.ObtenerNombFile(idProd, idArea);
                    break;

                case "Area_Info":

                    debugger;
                    $("#btnCargar").hide();
                    $("#Producto").html("");
                    $("#Lider").html("");

                    //setTimeout(function () {
                    $("#divContentCampo_Form2_1 .custom-combobox-input").val("Seleccione...");
                    $("#divContentCampo_Form2_2 .custom-combobox-input").val("Seleccione...");
                    //setTimeout(function () {
                    //    $("#Producto").val("Seleccione...");
                    //}, 3000);

                    var id = $("#Area").find(':selected').val();
                    _ui.ObtenerProducto(id);

                    break;
                case "Producto_Info":
                    $("#btnCargar").hide();
                    $("#Lider").html("");
                    $("#divContentCampo_Form2_2 .custom-combobox-input").val("Seleccione...");

                    var idProd = $("#Producto").find(':selected').val();
                    var idArea = $("#Area").find(':selected').val();
                    //alert(idProd + " el area es :" + idArea);
                    _ui.ObtenerLider(idProd, idArea);

                    break;

                case "Lider_Info":
                    
                    $("#btnCargar").show();
                    break;

                case "Area_Funcionarios":

                    debugger;
                    $("#btnCargar").hide();
                    $("#Producto").html("");
                    $("#Lider").html("");

                    //setTimeout(function () {
                    $("#divContentCampo_Form3_1 .custom-combobox-input").val("Seleccione...");
                    $("#divContentCampo_Form3_2 .custom-combobox-input").val("Seleccione...");
                    //setTimeout(function () {
                    //    $("#Producto").val("Seleccione...");
                    //}, 3000);

                    var id = $("#Area").find(':selected').val();
                    _ui.ObtenerProducto(id);

                    break;
                case "Producto_Funcionarios":
                    $("#btnCargar").hide();
                    $("#Lider").html("");
                    $("#divContentCampo_Form3_2 .custom-combobox-input").val("Seleccione...");

                    var idProd = $("#Producto").find(':selected').val();
                    var idArea = $("#Area").find(':selected').val();
                    //alert(idProd + " el area es :" + idArea);
                    _ui.ObtenerLider(idProd, idArea);

                    break;

                case "Lider_Funcionarios":

                    $("#btnCargar").show();
                    break;

                case "TIPODECAMBIO":
                    if ($("#TIPODECAMBIO option:selected").val() == 128) {


                        $("#divContentCampo_Form7_3").show();
                        $("#divContentCampo_Form7_4").hide();
                    }
                    if ($("#TIPODECAMBIO option:selected").val() == 129) {


                        $("#divContentCampo_Form7_3").hide();
                        $("#divContentCampo_Form7_4").show();
                    }

                    break;

                default:

            }

        },
        //---------------------------------------------------fin on change-----------------------------------------------------------------------------//
        _estiloInputCorecto: function (e) {
            $(this).css("border", "1px solid green");
        },

        contDiv: 0,

        configCampo: function (content, data, formulario, valorAdicional) {
            debugger;
            content = $(content);
            //console.log("Entra al metodo configCampo");
            var idCamposFormulario = null;
            var contadorSeparacion = 0;
            $.each(data, function (i, values) {
                debugger;
                switch (formulario) {

                    case 1:
                        if (i == 0) {
                            contadorSeparacion++;
                            content.append(_uiStatic.createElement("fieldset", { "id": "divCampos" + contadorSeparacion, "class": "scheduler-border" }, ""));
                            content = $("#divCampos" + contadorSeparacion);

                            if (i == 0) {
                                content.append(_uiStatic.createElement("legend", { "id": "legend" + contadorSeparacion, "class": "scheduler-border" }, "Cargue Informacion"));
                            }


                        }

                        idCamposFormulario = "_Form1_";

                        break;

                    case 2:
                        if (i == 0) {
                            contadorSeparacion++;
                            content.append(_uiStatic.createElement("fieldset", { "id": "divCampos" + contadorSeparacion, "class": "scheduler-border fileset" }, ""));
                            content = $("#divCampos" + contadorSeparacion);

                            if (i == 0) {
                                content.append(_uiStatic.createElement("legend", { "id": "legend" + contadorSeparacion, "class": "scheduler-border" }, "Informacion de Funcionarios por Lider"));
                            }


                        }

                        idCamposFormulario = "_Form2_";

                        break;

                    case 3:
                        if (i == 0) {
                            contadorSeparacion++;
                            content.append(_uiStatic.createElement("fieldset", { "id": "divCampos" + contadorSeparacion, "class": "scheduler-border fileset" }, ""));
                            content = $("#divCampos" + contadorSeparacion);

                            if (i == 0) {
                                content.append(_uiStatic.createElement("legend", { "id": "legend" + contadorSeparacion, "class": "scheduler-border" }, "Funcionarios por Lider"));
                            }


                        }

                        idCamposFormulario = "_Form3_";

                        break;
                    case 4:
                        if (i == 0) {
                            contadorSeparacion++;
                            content.append(_uiStatic.createElement("fieldset", { "id": "divCampos" + contadorSeparacion, "class": "scheduler-border" }, ""));
                            content = $("#divCampos" + contadorSeparacion);

                            if (i == 0) {
                                content.append(_uiStatic.createElement("legend", { "id": "legend" + contadorSeparacion, "class": "scheduler-border" }, "EverProRRHH"));
                            }


                        }

                        idCamposFormulario = "_Form4_";

                        break;
                    case 5:
                        if (i == 0) {
                            contadorSeparacion++;
                            content.append(_uiStatic.createElement("fieldset", { "id": "divCampos" + contadorSeparacion, "class": "scheduler-border" }, ""));
                            content = $("#divCampos" + contadorSeparacion);

                            if (i == 0) {
                                content.append(_uiStatic.createElement("legend", { "id": "legend" + contadorSeparacion, "class": "scheduler-border" }, "DatosContratación"));
                            }
                        }

                        idCamposFormulario = "_Form5_";
                        break;
                    case 6:
                        if (i == 0) {
                            contadorSeparacion++;
                            content.append(_uiStatic.createElement("fieldset", { "id": "divCampos" + contadorSeparacion, "class": "scheduler-border" }, ""));
                            content = $("#divCampos" + contadorSeparacion);

                            if (i == 0) {
                                content.append(_uiStatic.createElement("legend", { "id": "legend" + contadorSeparacion, "class": "scheduler-border" }, "DatosLideres"));
                            }
                        }
                        idCamposFormulario = "_Form6_";
                        break;

                    case 7:
                        if (i == 0) {
                            contadorSeparacion++;
                            content.append(_uiStatic.createElement("fieldset", { "id": "divCampos" + contadorSeparacion, "class": "scheduler-border" }, ""));
                            content = $("#divCampos" + contadorSeparacion);

                            if (i == 0) {
                                content.append(_uiStatic.createElement("legend", { "id": "legend" + contadorSeparacion, "class": "scheduler-border" }, "CambiosMasivos"));
                            }
                        }
                        idCamposFormulario = "_Form7_";
                        break;


                    default:
                        break;

                }

                switch (formulario) {

                    case 1:

                        if (i > 2 ) {
                            content.append(_uiStatic.createElement("div", { "id": "divContentCampo" + idCamposFormulario + i, "class": "divContentLeft " }, ""));
                        
                        } else {
                            content.append(_uiStatic.createElement("div", { "id": "divContentCampo" + idCamposFormulario + i, "class": "divContentSGD" }, ""));
                        }
                        content = $("#divContentCampo" + idCamposFormulario + i);

                        //content.append(_uiStatic.createElement("div", { "id": "divContentCampo" + idCamposFormulario + i, "class": "" }, ""));
                        //content = $("#divContentCampo" + idCamposFormulario + i);
                        break;
                    case 2:

                       
                        content.append(_uiStatic.createElement("div", { "id": "divContentCampo" + idCamposFormulario + i, "class": "divContentSGDinfo" }, ""));
                        content = $("#divContentCampo" + idCamposFormulario + i);

                        //content.append(_uiStatic.createElement("div", { "id": "divContentCampo" + idCamposFormulario + i, "class": "" }, ""));
                        //content = $("#divContentCampo" + idCamposFormulario + i);
                        break;

                    case 3:


                        content.append(_uiStatic.createElement("div", { "id": "divContentCampo" + idCamposFormulario + i, "class": "divContentSGDinfo" }, ""));
                        content = $("#divContentCampo" + idCamposFormulario + i);

                        //content.append(_uiStatic.createElement("div", { "id": "divContentCampo" + idCamposFormulario + i, "class": "" }, ""));
                        //content = $("#divContentCampo" + idCamposFormulario + i);
                        break;

                    case 4:
                        content.append(_uiStatic.createElement("div", { "id": "divContentCampo" + idCamposFormulario + i, "class": "divContentRRHH custom-combobox, .custom-combobox-input" }, ""));
                        content = $("#divContentCampo" + idCamposFormulario + i);
                        break;
                    case 5:
                        content.append(_uiStatic.createElement("div", { "id": "divContentCampo" + idCamposFormulario + i, "class": "divContentRRHH custom-combobox, .custom-combobox-input" }, ""));
                        content = $("#divContentCampo" + idCamposFormulario + i);
                        break;
                    case 6:
                        content.append(_uiStatic.createElement("div", { "id": "divContentCampo" + idCamposFormulario + i, "class": "divContentRRHH custom-combobox, .custom-combobox-input" }, ""));
                        content = $("#divContentCampo" + idCamposFormulario + i);
                        break;
                    
                    case 7:
                        content.append(_uiStatic.createElement("div", { "id": "divContentCampo" + idCamposFormulario + i, "class": "divContentMasivos custom-combobox, .custom-combobox-input" }, ""));
                        content = $("#divContentCampo" + idCamposFormulario + i);
                        break;

                    default:
                        content.append(_uiStatic.createElement("div", { "id": "divContentCampo" + idCamposFormulario + i, "class": "divContentLeft" }, ""));
                        content = $("#divContentCampo" + idCamposFormulario + i);

                }


                //content.append(_uiStatic.createElement("div", { "id": "divContentCampo" + idCamposFormulario + i, "class": "divContentLeft" }, ""));
                //content = $("#divContentCampo" + idCamposFormulario + i);
                //if (formulario != 18) {
                content.append(_uiStatic.createElement("label", "", values.Descripcion + ":"));
                //}
                //else {
                //    content.append("<span class=\"auto-style3\">" + values.Descripcion + ":</span>");
                //}

                content.append(_uiStatic.createElement(_uiStatic.validarTipoElemento(values.IdTipoCampo),
                                                 {
                                                     "type": _uiStatic.validTypeInput(values.IdTipoCampo),
                                                     "name": "_value",
                                                     "style": "width:" + values.DimensionAncho + "%",
                                                     "id": $.trim(((values.Descripcion).replace(/\s/g, '')).replace(/\./g, '').replace(/\*/g, '').replace(/\(/g, '').replace(/\)/g, '')),
                                                     "data-id": values.IdCampo,
                                                     "maxlength": values.LongMax
                                                 }, ""));
                content.append(_uiStatic.createElement("span", { "id": "_error" + values.IdCampo, "class": "error" }, ""))

                switch (values.IdTipoCampo) {
                    case 5:
                        var idCampo = $("#" + $.trim(((values.Descripcion).replace(/\s/g, '')).replace(/\./g, '').replace(/\*/g, '').replace(/\(/g, '').replace(/\)/g, '')));
                        idCampo.attr("data-work", $.trim(((values.Descripcion).replace(/\s/g, '')).replace(/\./g, '').replace(/\*/g, '').replace(/\(/g, '').replace(/\)/g, '')));
                        idCampo.attr("data-id", values.IdCampo);
                        if (_uiStatic.validarTipoElemento(values.IdTipoCampo).match(/select/g) == "select") {
                            $.ajax({
                                "type": "GET",
                                "url": "/Productos/ListaItemsDependientes?IdCampo=" + values.IdCampo + "&idCampo_Lista=1&CuotaAnio=" + null + "&Segmento=" + null,
                                "success": function (data) {
                                    _ui.fillCombo(idCampo, data)
                                   
                                        idCampo.combobox();
                                   
                                    

                                    var padre = idCampo.parent();
                                    if (values.Obligatorio == true) {
                                        $(padre).find("input").attr({
                                            "required": "",
                                            "title": ""
                                        });
                                    }
                                    if (values.Editable == false) {
                                        $(padre).find("input").attr("disabled", "disabled");
                                        $(padre).find("input").removeAttr("required");
                                    }
                                    $(padre).find("input").val("-1")
                                    $(padre).find("input").val("");
                                },
                                "error": _ui.displayError
                            });

                        }


                        break;
                    case 3:
                        _ui.idCamp = $("#" + $.trim(((values.Descripcion).replace(/\s/g, '')).replace(/\./g, '').replace(/\*/g, '').replace(/\(/g, '').replace(/\)/g, '')));
                        _ui.idCamp.attr("placeholder", "DD/MM/YYYY")
                        _uiStatic.builDatepicker(_ui.idCamp);

                        $.mask.definitions['~'] = "[+-]";
                        _ui.idCamp.mask("99/99/9999", {});

                        _ui.idCamp.blur(function () {
                            $("#info").html("Unmasked value: " + $(this).mask());
                        }).dblclick(function () {
                            $(this).unmask();
                        });

                        _uiStatic.eventOutFocus(_ui.idCamp, _ui._estiloInputCorecto);

                        break;
                    case 1:
                        _ui.idCamp = $("#" + $.trim(((values.Descripcion).replace(/\s/g, '')).replace(/\./g, '').replace(/\*/g, '').replace(/\(/g, '').replace(/\)/g, '')));
                        _ui.idCamp.attr("pattern", "^[0-9]{0," + values.LongMax + "}$");
                        _uiStatic.eventKeypress(_ui.idCamp, _fx.numbersonly);
                        break;
                    case 8:
                        $("#tdValue" + i).attr("colspan", "4");
                        break;
                    case 16:
                        _ui.idCamp = $("#" + $.trim(((values.Descripcion).replace(/\s/g, '')).replace(/\./g, '').replace(/\*/g, '').replace(/\(/g, '').replace(/\)/g, '')));
                        $(_ui.idCamp).maskMoney({ prefix: '$ ', thousands: '.', affixesStay: true, allowZero: false, precision: 0 });
                        break;
                    case 17:
                        _ui.idCamp = $("#" + $.trim(((values.Descripcion).replace(/\s/g, '')).replace(/\./g, '').replace(/\*/g, '').replace(/\(/g, '').replace(/\)/g, '')));
                        $(_ui.idCamp).maskMoney({ prefix: '$ ', thousands: '.', affixesStay: true, allowZero: false, precision: 0 });
                        break;
                    case 18:
                        var idCampo = $("#" + $.trim(((values.Descripcion).replace(/\s/g, '')).replace(/\./g, '').replace(/\*/g, '').replace(/\(/g, '').replace(/\)/g, '')));
                        $.ajax({
                            "type": "GET",
                            "url": "/Productos/ListaItemsDependientes?IdCampoCompuesto=" + values.IdCampo,
                            "success": function (data) {
                                $.each(data, function (j, valuesCompuesto) {
                                    idCampo.append(_uiStatic.createElement(_uiStatic.validarTipoElemento(valuesCompuesto.IdTipoCampo),
                                                                     {
                                                                         "type": _uiStatic.validTypeInput(valuesCompuesto.IdTipoCampo),
                                                                         "name": "_value",
                                                                         "style": "width:" + valuesCompuesto.DimensionAncho + "%",
                                                                         "id": $.trim(((valuesCompuesto.Descripcion).replace(/\s/g, '')).replace(/\./g, '').replace(/\*/g, '').replace(/\(/g, '').replace(/\)/g, '')),
                                                                         "data-id": valuesCompuesto.IdCampo,
                                                                         "maxlength": valuesCompuesto.LongMax
                                                                     }, ""));
                                    idCampo.append(_uiStatic.createElement("span", { "id": "_error" + valuesCompuesto.IdCampo, "class": "error" }, ""));

                                    if (valuesCompuesto.Obligatorio == true) {
                                        _ui.idCamp = $("#" + $.trim(((valuesCompuesto.Descripcion).replace(/\s/g, '')).replace(/\./g, '').replace(/\*/g, '').replace(/\(/g, '').replace(/\)/g, '')));
                                        _ui.idCamp.attr({
                                            "required": "",
                                            "title": "*Campo requerido"
                                        });
                                    }
                                    if (valuesCompuesto.IdTipoCampo == 1) {
                                        _ui.idCamp = $("#" + $.trim(((valuesCompuesto.Descripcion).replace(/\s/g, '')).replace(/\./g, '').replace(/\*/g, '').replace(/\(/g, '').replace(/\)/g, '')));
                                        _ui.idCamp.attr("pattern", "^[0-9]{0," + valuesCompuesto.LongMax + "}$");
                                    }
                                })
                            },
                            "error": _ui.displayError
                        });
                        break;
                    case 13:


                        var idCampo = $.trim(((values.Descripcion).replace(/\s/g, '')).replace(/\./g, '').replace(/\*/g, '').replace(/\(/g, '').replace(/\)/g, ''));
                       // $("#" + idCampo).addClass("anchoFile");
                        //Grilla campo a campo
                        //var idtext = $.trim(((values.Descripcion).replace(/\s/g, '')).replace(/\./g, '').replace(/\*/g, '').replace(/\(/g, '').replace(/\)/g, ''));

                        //$("#" + idtext).parent().attr("data-grilla", values.IdCampo);
                        //var idPadre = $("#" + idtext).parent().attr("id");
                        //$("div").find("#" + idPadre + "[data-grilla]").children().remove();
                        //var tempContentTabla = $("#tablaPrincipal").html();
                        //var contentPrincipal = _uiStatic.newGrillaPrincipal(tempContentTabla, "tblPrincipla_" + idtext, "tr_" + idtext);
                        //$("div").find("#" + idPadre + "[data-grilla]").append(contentPrincipal);
                        break;
                    case 14:
                        // Gilla campleta
                        var idCampo = $.trim(((values.Descripcion).replace(/\s/g, '')).replace(/\./g, '').replace(/\*/g, '').replace(/\(/g, '').replace(/\)/g, ''));
                        padreContent = $("#" + idCampo).parent();
                        $("#" + idCampo).remove();

                        //Tabla general
                        var tempTableGeneral = $("#GrillaCopleta").html();
                        padreContent.append(_uiStatic.newTableCompleta(tempTableGeneral, idCampo, values.IdCampo));

                        transact.ajaxGET("/Grillas/GetCamposGrilla?idGrilla=" + values.IdCampo,
                            null, _ui.configCamposGrillas, function (error) {
                                console.log(error);
                            }, null, false);

                        break;
                    case 15:
                        // Gilla Checklist
                        var idCampo = $.trim(((values.Descripcion).replace(/\s/g, '')).replace(/\./g, '').replace(/\*/g, '').replace(/\(/g, '').replace(/\)/g, ''));
                        padreContent = $("#" + idCampo).parent();
                        $("#" + idCampo).remove();

                        //Tabla general
                        var tempTableGeneral = $("#GrillaCopleta").html();
                        padreContent.append(_uiStatic.newTableCompleta(tempTableGeneral, idCampo, values.IdCampo));

                        transact.ajaxGET("/Grillas/GetCamposGrilla?idGrilla=" + values.IdCampo,
                            null, _ui.configCamposGrillasTip15, function (error) {
                                console.log(error);
                            }, null, false);

                        break;

                    case 21:
                        var idCampo = $.trim(((values.Descripcion).replace(/\s/g, '')).replace(/\./g, '').replace(/\*/g, '').replace(/\(/g, '').replace(/\)/g, ''));
                        $("#" + idCampo).addClass("btn").addClass("btn-login");
                        var valor = values.Descripcion.split(" ");
                        $("#" + idCampo).val(":: " + valor[1].toUpperCase() + " ::");
                        break;
                    default:
                }

                if (values.Obligatorio == true) {

                    _ui.idCamp = $("#" + $.trim(((values.Descripcion).replace(/\s/g, '')).replace(/\./g, '').replace(/\*/g, '').replace(/\(/g, '').replace(/\)/g, '')));
                    _ui.idCamp.attr({
                        "required": "",
                        "title": "*Campo requerido"
                    });
                }

                if ((values.IdTipoCampo != 1) && (values.IdTipoCampo != 5) && (values.IdTipoCampo != 3) && (values.IdTipoCampo != 8) && (values.IdTipoCampo != 18) && (values.IdTipoCampo != 17) && (values.IdTipoCampo != 16)) {
                    _ui.idCamp = $("#" + $.trim(((values.Descripcion).replace(/\s/g, '')).replace(/\./g, '').replace(/\*/g, '').replace(/\(/g, '').replace(/\)/g, '')));
                    _ui.idCamp.attr("pattern", "^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ@ .,;/s/W]{0," + values.LongMax + "}$");
                }

                if (values.Editable == false) {
                    _ui.idCamp = $("#" + $.trim(((values.Descripcion).replace(/\s/g, '')).replace(/\./g, '').replace(/\*/g, '').replace(/\(/g, '').replace(/\)/g, '')));
                    _ui.idCamp.attr("disabled", "disabled");
                }

                switch (formulario) {

                    case 1:

                        if (i == 5) {
                            content = content.parent().parent();
                        }

                        else {
                            content = $("#divContentCampo" + idCamposFormulario + i).parent();
                        }

                        break;

                    case 2:

                        if (i == 4) {
                            content = content.parent().parent();
                        }

                        else {
                            content = $("#divContentCampo" + idCamposFormulario + i).parent();
                        }

                        break;
                    case 4:

                        if (i == 13) {
                            content = content.parent().parent();
                        }

                        else {
                            content = $("#divContentCampo" + idCamposFormulario + i).parent();
                        }

                        break;
                    case 5:

                        if (i == 13) {
                            content = content.parent().parent();
                        }

                        else {
                            content = $("#divContentCampo" + idCamposFormulario + i).parent();
                        }

                        break;
                    case 6:

                        if (i == 13) {
                            content = content.parent().parent();
                        }

                        else {
                            content = $("#divContentCampo" + idCamposFormulario + i).parent();
                        }

                        break;



                    default:
                        content = $("#divContentCampo" + idCamposFormulario + i).parent();
                        break;
                }

                if (values.FuncionValidacion != null && values.Evento != null) {
                    _ui.idCamp = $("#" + $.trim(((values.Descripcion).replace(/\s/g, '')).replace(/\./g, '').replace(/\*/g, '').replace(/\(/g, '').replace(/\)/g, '')));
                    var func = window[values.FuncionValidacion];
                    //console.log(func);
                    _uiStatic.funcionRegla(_ui.idCamp, eval(values.FuncionValidacion), values.Evento);
                }

                if (values.DobleCaptura == true) {
                    _ui.idCamp = $("#" + $.trim(((values.Descripcion).replace(/\s/g, '')).replace(/\./g, '').replace(/\*/g, '').replace(/\(/g, '').replace(/\)/g, '')));
                    _uiStatic.eventOutFocus(_ui.idCamp, _fx.dobleCaptura);
                }

            });
        },



        crearCamposGrillaas: function (content, campo) {

            content.append(_uiStatic.createElement(_uiStatic.validarTipoElemento(campo.IdTipoCampo),
                                                   {
                                                       "type": _uiStatic.validTypeInput(campo.IdTipoCampo),
                                                       "name": campo.FormularioCampoId,
                                                       "style": "width:" + campo.DimensionAncho + "%",
                                                       "id": campo.CampoId,
                                                       "data-work": campo.CampoId,
                                                       "maxlength": campo.LongMax,
                                                       "tipoCampo": campo.IdTipoCampo,
                                                       "data-CampoIdDependiente": campo.CampoIdDependiente,
                                                       "data-descripcion": campo.Descripcion,
                                                       "data-origen": campo.FuenteOrigen != null || campo.FuenteOrigen != undefined ? campo.FuenteOrigen : "",
                                                   }, ""));
            content.append(_uiStatic.createElement("span", { "id": "_error" + campo.CampoId, "class": "error" }, ""))

            switch (campo.IdTipoCampo) {
                case 1:
                    idCamp = $("#" + content.attr("id") + " #" + campo.CampoId);
                    idCamp.attr("pattern", "^[0-9]{0," + campo.LongMax + "}$");
                    _uiStatic.eventKeypress(idCamp, $.fn._fx.numbersonly);
                    break;
                case 2:
                    idCamp = $("#" + content.attr("id") + " #" + campo.CampoId);
                    idCamp.attr("pattern", "^[0-9a-zA-ZñÑ .,;/s/W]{0," + campo.LongMax + "}$");
                    break;
                case 3:
                    idCamp = $("#" + content.attr("id") + " #" + campo.CampoId);
                    idCamp.attr("placeholder", "DD/MM/YYYY")
                    _uiStatic.builDatepicker(idCamp);

                    $.mask.definitions['~'] = "[+-]";
                    idCamp.mask("99/99/9999", {});

                    idCamp.blur(function () {
                        $("#info").html("Unmasked value: " + $(this).mask());
                    });
                    //.dblclick(function () {
                    //    $(this).unmask();
                    //});

                    //_uiStatic.eventOutFocus(_ui.idCamp, _ui._estiloInputCorecto);

                    break;
                case 5:
                    idCampo = $("#" + content.attr("id") + " #" + campo.CampoId);
                    if (_uiStatic.validarTipoElemento(campo.IdTipoCampo).match(/select/g) == "select") {
                        if (campo.FuenteOrigen != null && campo.FuenteParametros == false) {
                            _ui.configDataCampos($(idCampo),
                                 campo.IdTipoCampo, campo.FuenteOrigen,
                                 "/api/ListaCampos?nameOrigen=",
                                 campo.Obligatorio, campo.Editable);
                        } else {
                            _ui.configDataCampos($(idCampo),
                               campo.IdTipoCampo, campo.CampoId,
                               "/api/ListaCampos?campoId=",
                               campo.Obligatorio, campo.Editable);
                        }
                    }
                    break;
                case 8:
                    //Grilla
                    break;
                case 10:
                    idCampo = $("#" + content.attr("id") + " #" + campo.CampoId);
                    idCampo.attr("data-work", $.trim(((campo.Descripcion).replace(/\s/g, '')).replace(/\./g, '')));
                    idCampo.attr("data-id", idCampo);

                    $(idCampo).combobox();

                    break;
                case 11:
                    idCamp = $("#" + content.attr("id") + " #" + campo.CampoId);
                    idCamp.attr("placeholder", "hh:mm")

                    $.mask.definitions['~'] = "[+-]";
                    idCamp.mask("99:99", {});

                    idCamp.blur(function () {
                        $("#info").html("Unmasked value: " + $(this).mask());
                    }).dblclick(function () {
                        $(this).unmask();
                    });

                    //_uiStatic.eventOutFocus(_ui.idCamp, _ui._estiloInputCorecto);

                    break;

                case 17:
                    _ui.idCamp = $("#" + $.trim(((values.Descripcion).replace(/\s/g, '')).replace(/\./g, '').replace(/\*/g, '').replace(/\(/g, '').replace(/\)/g, '')));
                    $(_ui.idCamp).maskMoney({ prefix: '$ ', thousands: '.', affixesStay: true, allowZero: false, precision: 0 });
                    break;
                default:
            }

            idCampo = $("#" + content.attr("id") + " #" + campo.CampoId);
            $.fn._fx.obligatorio($(idCampo), campo.Obligatorio);
            $.fn._fx.editable($(idCampo), campo.Editable);
            if (campo.DobleCaptura)
                _uiStatic.eventOutFocus(idCamp, $.fn._fx.dobleCaptura);
            if (campo.Funcion != null && campo.Evento != null)
                $.fn._fx.ejecutarFuncionJS($(idCampo), campo.Funcion, campo.Evento);

        },


        configCampoData: function (Campos, Data) {

            if (rolUser == 3 || rolUser == 2) {
                $("#btnGuardar").attr("disabled", "disabled");
            }

            $.each(Campos, function (i, values) {
                var idCampo = $("#" + $.trim(((values.CampDescripcion).replace(/\s/g, '')).replace(/\./g, '')));
                //SE DESHABILITAN TODOS LOS CAMPOS EN MODO EDICION
                //idCampo.attr("disabled", "disabled");
                var m = 0;
                var idFilaNew;
                $.each(Data, function (j, values2) {
                    if (values2.CampId == values.CampId && values.TcId != 18) {
                        //                        if (values.TcId == 18) { 
                        //                            continue;
                        //                        }
                        // SE LE COLOCA EL VALOR A LOS CAMPOS IS APLICA
                        idCampo.val(values2.NegValor);
                        idCampo.attr("disabled", "disabled");
                        idCampo.css("width", "400");

                        if (values.TcId == 5) {
                            var padre = idCampo.parent();
                            $(padre).find("input").val(values2.NegValor);
                            idCampo.next().children().attr("disabled", "disabled");
                            idCampo.next().find("a").remove();
                        }
                    }

                    //IDENTIFICAMOS EN Data (CAPTURA), SI TIENE ID PADRE
                    if (values2.IdPadre == values.CampId) {

                        var filaTemp = $("#trContentFila").html();
                        var contentBody = $("tbody[data-id=" + values2.IdPadre + "]");
                        var columnaFilaHTML = $("#tdTemp").html();
                        var fila = "";

                        //HAGO QUE SOLO ENTRE UNA VES, AL INICIO 
                        if (m == 0) {
                            idFilaNew += "tr_" + values2.IdPadre + "_fila_" + values2.Indice;
                            contentBody.append(_temp._tempFilaTr(filaTemp, idFilaNew));
                            m = j;
                        } else {
                            //VALIDO SI EL CAMPO ANTERIOR TIENE UN INDICE DIFERENTE AL ACTUAL,
                            //(IDETIFICO EN QUE MOMENTO ES UNA FILA DIFERENTE)                      
                            if (values2.Indice != Data[j - 1].Indice) {
                                idFilaNew += "tr_" + values2.IdPadre + "_fila_" + values2.Indice;
                                contentBody.append(_temp._tempFilaTr(filaTemp, idFilaNew));
                                fila += " Temina Fila " + Data[j - 1].Indice + "  Comienza " + values2.Indice;
                            }
                        }

                        var contentTR = $("#" + idFilaNew);
                        var CampoHTMLId = values2.CampId + "_indice_" + values2.Indice;
                        var campo = {
                            "tipo": 2,
                            "name": "_valuesGrillas",
                            "maxLength": 200,
                            "requerido": false,
                            "id": CampoHTMLId,
                            "idCampo": values.CampId
                        }
                        _ui.configCamposGrilla(contentTR, campo, columnaFilaHTML);
                        contentTR.find("input").attr("disabled", "disabled");
                        $("#" + CampoHTMLId).val(values2.NegValor);

                        contentBody.parent().find("img").remove();
                    }
                });
            });
        },



        //Evento del elemento select de query UI
        selectChangeAutoComplete: function (e) {
            var _this = $(e.currentTarget);
            var select = $(_this.parent().prev());
            var idSelect = select.data("work");
            var camposHijos = $(document).find("[data-CampoIdDependiente='" + idSelect + "']");

            $.each(camposHijos, function (i, values) {

                var contentPadreSelectId = select.parent().attr("id");
                var dataOrigen = $(values).attr("data-origen");

                console.log($(values));
                if ($(values).attr("id") == "25") {
                    defaultPage.PruebaCodProyec($("#24 option:selected").val());
                }

                if (dataOrigen == "spObtenerEstructuras") {
                    var nivel, padre = $("#" + contentPadreSelectId + " #" + idSelect + " option:selected").val();
                    switch (parseInt($(values).attr("id"))) {
                        case 24: padre = 0; break;
                        default:
                    }

                    var edita = $("#hModoEditar").val();
                    if (edita == "true")
                        edita = true;
                    else
                        edita = false;

                    _ui.configDataCampos($(values),
                        parseInt($(values).attr("tipoCampo")),
                         $("#clienteId").val(),
                        "/api/ListaCampos?padre=" + padre + "&editar=" + edita + "&cliente=", true, true);

                } else if (dataOrigen == "spObtenerClientesRoles") {
                    console.log("Si entra");

                    _ui.configDataCampos($(values),
                       parseInt($(values).attr("tipoCampo")),
                        $("#clienteId").val(),
                       "/api/ListaCampos?clienteId=", true, true);

                } else if (dataOrigen == "spObtenerPersonasCargoEVERIS") {
                    var ListaDatelleId;
                    switch (parseInt($(values).attr("id"))) {
                        case 33: ListaDatelleId = 41; break;
                        case 34: ListaDatelleId = 43; break;
                        case 35: ListaDatelleId = 40; break;
                        default:
                    }

                    console.log("Si llega aqui " + ListaDatelleId);

                    _ui.configDataCampos($(values),
                       parseInt($(values).attr("tipoCampo")),
                        ListaDatelleId,
                       "/api/ListaCampos?listaDetalleId=", false, true);

                }
                else if (dataOrigen == "spObtenerItemsListaCamposCascada") {
                    padre = $("#" + contentPadreSelectId + " #" + idSelect + " option:selected").val();
                    var elemento = $("#" + $("#" + contentPadreSelectId).parent().attr("id") + " #" + $(values).attr("id"));
                    _ui.configDataCampos($(elemento),
                      parseInt($(elemento).attr("tipoCampo")),
                      padre,
                      "/api/ListaCampos?campoId=" + $(elemento).attr("id") + "&padreId=", false, true);
                }



            });

            var name = $(select).attr("name");
            if ($("#hModoEditar").val() == "true") {
                if (name.indexOf("_") != -1) {
                    name = name.substring(name.indexOf("_") + 1, name.length);
                }
                ///SE VALIDA SI SE ENCUENTRA EDITANDO UNA PERSONA
                if ($("#hVistaEditar").val() == "true") {
                    var arrayCamposStatic = ["2", "3", "4", "5", "7", "27", "1"];
                    if (arrayCamposStatic.indexOf($(select)[0].name) == -1) {
                        $(select)[0].name = $(select)[0].name.indexOf("editado") >= 0 ? $(select)[0].name : "editado_" + $(select).attr("name");
                    } else {
                        $(select)[0].name = $(select)[0].name;
                    }

                } else if ($("#hVistaEditarActividadDiaria").val() == "true") {
                    var arrayCamposStatic = ["55", "56", "57", "58", "54", "59"];
                    if (arrayCamposStatic.indexOf($(select)[0].name) == -1) {
                        $(select)[0].name = $(select)[0].name.indexOf("editado") >= 0 ? $(select)[0].name : "editado_" + $(select).attr("name");
                    } else {
                        $(select)[0].name = $(select)[0].name;
                    }

                } else {
                    $(select)[0].name = $(select)[0].name.indexOf("editado") >= 0 ? $(select)[0].name : "editado_" + $(select).attr("name");
                }
            }

            console.log(name);
            switch (name) {
                case "49":
                    $("#hPSL").val($("#" + select.attr("id") + " option:selected").text());
                    $("#hPTL").val("");
                    $("#hPSC").val("");
                    $("#2").val("");
                    $("#4").val("");
                    break;
                case "50":
                    $("#hPTL").val($("#" + select.attr("id") + " option:selected").text());
                    $("#hPSL").val("");
                    $("#hPSC").val("");
                    $("#2").val("");
                    $("#4").val("");
                    break;
                case "51":
                    $("#hPSC").val($("#" + select.attr("id") + " option:selected").text());
                    $("#hPSL").val("");
                    $("#hPTL").val("");
                    $("#2").val("");
                    $("#4").val("");
                    break;
                case "45":
                    $("#hEmpresa").val($("#" + select.attr("id") + " option:selected").val());
                    break;
                case "48":
                    $("#hArea").val($("#" + select.attr("id") + " option:selected").val());
                    break;
                default:

            }

        },

        crearMenuMaster: function (data, content) {
            content = $(content);
            var countImg = 1;
            var idPadre = "liPadre", idHijos = "ulHijos_";
            $.each(data, function (i, values) {
                content.append(_uiStatic.createElement("li", { "id": idPadre + values.IdMenu, "data-rol": "menuPadre" }, ""));
                content = $("#" + idPadre + values.IdMenu);
                content.append(_uiStatic.createElement("a", { "id": "link" + values.IdMenu, "class": "staticItem" }, ""));
                // $("#link" + values.IdMenu).append(_uiStatic.createElement("img", { "src": "../../../images/IconosMenu/Imagen" + countImg + ".png" }, ""));
                $("#link" + values.IdMenu).append(values.DescMenu);
                content.append(_uiStatic.createElement("ul", { "id": idHijos + values.IdMenu, "data-rol": "menuHijos", "class": "level2 dynamic", "style": "display: none; top: 0px; left: 100%;" }, ""));
                _ui.crearMenuHijos($("#" + idHijos + values.IdMenu), values.IdMenu);
                content = content.parent();
                countImg++;
            });

            $("li[data-rol='menuPadre']").hover(
            function () {
                $(this).find("ul[data-rol='menuHijos']").css("display", "block");

            },
            function () {
                $(this).find("ul[data-rol='menuHijos']").css("display", "none");
            });
        },

        crearMenuHijos: function (content, idPadre) {
            $.ajax({
                "type": "GET",
                "url": "/Seguridad/CargarHijosMenu?parentId=" + idPadre,
                "data": null,
                "dataType": "json",
                "success": function (data) {
                    var idHijos = "liHijos", idNietos = "ulNietos_";;
                    content = $(content);
                    $.each(data, function (i, values) {
                        content.append(_uiStatic.createElement("li", { "id": idHijos + values.IdMenu, "role": "menuitem", "data-rol": "menuHijo" }, ""));
                        content = $("#" + idHijos + values.IdMenu);
                        var href = "#";
                        if (values.Url) {
                            href = values.Url;
                        }

                        content.append(_uiStatic.createElement("a", { "id": "link" + values.IdMenu, "href": href, "class": "itemSelect" }, values.DescMenu));
                        content.append(_uiStatic.createElement("ul", { "id": idNietos + values.IdMenu, "data-rol": "menuitemnieto", "class": "level2 dynamic", "style": "display: none; top: 0px; left: 100%;" }, ""));
                        _ui.crearMenuNietos($("#" + idNietos + values.IdMenu), values.IdMenu);
                        content = content.parent();
                    });

                    $("li[data-rol='menuHijo']").hover(
                    function () {
                        $(this).find("ul[data-rol='menuitemnieto']").css("display", "block");

                    },
                    function () {
                        $(this).find("ul[data-rol='menuitemnieto']").css("display", "none");
                    });

                },
                "error": function (error) {
                    console.log(error);
                }
            });
        },

        crearMenuNietos: function (content, idHijo) {
            $.ajax({
                "type": "GET",
                "url": "/Seguridad/CargarNietosMenu?parentId=" + idHijo,
                "data": null,
                "dataType": "json",
                "success": function (data) {
                    var idNietos = "liNietos";
                    var target = "";
                    content = $(content);
                    $.each(data, function (i, values) {
                        if (values.DescMenu == "Reportes") { target = "_blank"; }
                        content.append(_uiStatic.createElement("li", { "id": idNietos + values.IdMenu, "role": "menuitemnieto" }, ""));
                        content = $("#" + idNietos + values.IdMenu);
                        content.append(_uiStatic.createElement("a", { "id": "link" + values.IdMenu, "href": values.Url, "class": "itemNietosSelected", "Target": target }, values.DescMenu));
                        content.css("margin-left", "18px");
                        content = content.parent();
                    });
                },
                "error": function (error) {
                    console.log(error);
                }
            });
        },



        crearBarra: function (content, data, event) {
            $.each(data, function (i, values) {
                content.append(_uiStatic.createElement("li", { "id": "li_" + values.BarraEventoId, "data-id": "li_" + values.BarraEventoId }, ""));

                content = $("#li_" + values.BarraEventoId);
                var LinkId = "link" + values.BarraEventoId;
                content.append(_uiStatic.createElement("a", { "id": LinkId }, ""));



                $("#" + LinkId).append(_uiStatic.createElement("img", { "src": values.UrlImagen }, ""));

                $("#" + LinkId).append(values.Descripcion);

                _uiStatic.eventClick($("#" + LinkId), event);
                content = content.parent();

                if ($("#li_1").hasClass("scaleFija")) {
                    $("li[data-id=li_1]").hide();
                    $("#li_2").show();
                }
            });
        },

        llenarListasSeleccion: function (campo, data) {
            debugger;
            var $valSeleccione = $('<option>').val("").html("Seleccione...");
            var $valvacio = $('<option>').val("").html(" ");
            //var idCampo = $(campo).text("Cedula");

            $(campo).append($valSeleccione);
            $.each(data, function (i, row) {
                var $option = $('<option>');
                $option.val(row.Value);
                $option.html(row.Text);
                $(campo).append($option);
            });

        },

        llenarCampo: function (campo, data) {
            debugger;
           
            //var idCampo = $(campo).text("Cedula");

            $(campo).val(data[0].nomfile);
        },

        cargarCategoriaNivel: function (id) {
            debugger;
            transact.ajaxGET('/EverProRRHH/obtenerCategoriaEverPro?empresa=' + id, null,
                function (data) {

                    console.log(data);

                    _ui.llenarListasSeleccion($("#CATEGORIA"), data);
                }, function (error) { console.log(error); });

            transact.ajaxGET('/EverProRRHH/obtenerNivelesEverPro?empresa=' + id, null,
                function (data) {
                    _ui.llenarListasSeleccion($("#NIVEL"), data);
                }, function (error) { console.log(error); }, "json", false)
        },

        obtenerLiderSGD: function (id) {
            $("#LIDERSGD").html("");
            transact.ajaxGET('/EverProRRHH/obtenerlideresSGD?area=' + id, null,
            function (data) {
                _ui.llenarListasSeleccion($("#LIDERSGD"), data);
            }, function (error) { console.log(error); }, "json", false)
        },

        ObtenerProducto: function (id) {
            $("#Producto").html("");
            transact.ajaxGET('/CargueInformacion/OptenerProducto?idArea=' + id, null,
            function (data) {
                _ui.llenarListasSeleccion($("#Producto"), data);
            }, function (error) { console.log(error); }, "json", false)
        },

        ObtenerLider: function (idProd, idArea) {
            $("#Lider").html("");
            transact.ajaxGET('/CargueInformacion/ObtenerLider?idProd=' + idProd + '&idArea=' + idArea, null,
                 function(data){
                     _ui.llenarListasSeleccion($("#Lider"), data);
                 }, function (error) { console.log(error); }, "json", false)

           
        },

        ObtenerNombFile: function (idProd, idArea){

            transact.ajaxGET('/CargueInformacion/ObtenerNomFile?idProd=' + idProd + '&idArea=' + idArea, null,
               function (data) {
                   _ui.llenarCampo($("#NombreFile"), data);
               }, function (error) { console.log(error); }, "json", false)
        },



        deshabilitarList: function (e) {
            $.each(e, function (index, item) {
                $("#" + item).html("");
                $("#" + item).prop("disabled", "disabled");
                $("#" + item).parent().find("input.ui-autocomplete-input").autocomplete("option", "disabled", true).prop("disabled", true);
                $("#" + item).parent().find("input.ui-autocomplete-input").css("background-color", "#dddddd");
                $("#" + item).parent().find("a.ui-button").button("disable");
                $("#" + item).prop("disabled", "true");




            });
        },


        habilitarList: function (e) {

            $.each(e, function (index, item) {

                $("#" + item).removeAttr("disabled", "disabled");
                $("#" + item).parent().find("input.ui-autocomplete-input").autocomplete("option", "disabled", false).prop("disabled", false);

                $("#" + item).parent().find("input.ui-autocomplete-input").css("background-color", "#ffffff");
                $("#" + item).parent().find("a.ui-button").button("enable");

                transact.ajaxGET('/EverProRRHH/obtenerLocalidades', null,
                function (data) {


                    console.log(data);

                    _ui.llenarListasSeleccion($("#LOCALIDAD"), data);
                }, function (error) { console.log(error); });



            });

        },




    }


})(jQuery);