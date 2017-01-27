
(function ($) {

    var _reglas = window._reglas = {

        diferenciaEntreFechas: function (fechaMayor, FechaMenor) {

            var años = (FechaMenor.getMonth() + 1) > (fechaMayor.getMonth() + 1) ? (fechaMayor.getFullYear() - FechaMenor.getFullYear()) - 1 : fechaMayor.getFullYear() - FechaMenor.getFullYear();

            var meses = (FechaMenor.getMonth() + 1) > (fechaMayor.getMonth() + 1) ? ((FechaMenor.getMonth() + 1)) - ((fechaMayor.getMonth() + 1)) : ((fechaMayor.getMonth() + 1)) - ((FechaMenor.getMonth() + 1));

            var dias = FechaMenor.getDate() > fechaMayor.getDate() ? FechaMenor.getDate() - fechaMayor.getDate() : fechaMayor.getDate() - FechaMenor.getDate();

            var resultado = { "años": años, "mes": meses, "dias": dias };
            return resultado;
        },

        reglaFechaNacimientos: function (e) {
            var _this = $(e.currentTarget);
            var fechaNacimiento = new Date(_fx.formatoDDMMAAAA($("#FECHADENACIMIENTO").val()));
            var fechaExpedicion = new Date(_fx.formatoDDMMAAAA(_this.val()));

            var nacimientoArray = _fx.formatoDDMMAAAA($("#FECHADENACIMIENTO").val()).split("/");
            var resultado = _fx.calculadarEdad(nacimientoArray[1], parseInt(nacimientoArray[0]), nacimientoArray[2]);

            if (_this[0].id != "FECHADEEXPEDICION_2") {
                var nacimientoArray = _fx.formatoDDMMAAAA($("#FECHADENACIMIENTO").val()).split("/");
                var resultado = _fx.calculadarEdad(nacimientoArray[1], parseInt(nacimientoArray[0]), nacimientoArray[2]);
                $("#EDADVSEXPEDICION").val(fechaExpedicion.getFullYear() - fechaNacimiento.getFullYear());
                $("#EDAD").val(resultado);

            } else {
                $("#EDADVSEXPEDICION_2").attr("disabled", "disabled");
                $("#EDAD_2").attr("disabled", "disabled");
                fechaNacimiento = new Date(_fx.formatoDDMMAAAA($("#FECHADENACIMIENTO_2").val()));
                nacimientoArray = _fx.formatoDDMMAAAA($("#FECHADENACIMIENTO_2").val()).split("/");
                resultado = _fx.calculadarEdad(nacimientoArray[1], parseInt(nacimientoArray[0]), nacimientoArray[2]);
                $("#EDADVSEXPEDICION_2").val(fechaExpedicion.getFullYear() - fechaNacimiento.getFullYear());
                $("#EDAD_2").val(resultado);
            }
        },

        reglaFechaLobral: function (e) {
            var _this = $(e.currentTarget);
            var fechaLaboral = new Date(_fx.formatoDDMMAAAA(_this.val()));
            var fechaActual = new Date();

            var tipoContrato = $("#TIPODECONTRATO :selected").text()
            var resultado = _reglas.diferenciaEntreFechas(fechaActual, fechaLaboral);


            if (tipoContrato == "Temporal") {
                if (resultado.años < 5) {
                    alert("PLAZO MAXIMO 60 MESES");
                }
                if (resultado.años >= 5) {
                    alert("PLAZO MAXIMO 84 MESES");
                }
            }
            if (tipoContrato == "Indefinido") {
                if (resultado.años >= 5) {
                    alert("PLAZO MAXIMO 108 MESES");
                }
            }

        },

        sumarUno: function (e) {
            var valor = $('#COMPONENTEDEUNIDADFAMILIAR').val();
            valor = parseInt(valor) + parseInt(1);
            $('#COMPONENTEDEUNIDADFAMILIAR').val(valor);

            var valor1 = $('#COMPONENTEDEUNIDADFAMILIAR_2').val();
            valor1 = parseInt(valor1) + parseInt(1);
            $('#COMPONENTEDEUNIDADFAMILIAR_2').val(valor1);
        },

        reglaFechaAntiguedadCiudad: function (e) {
            var _this = $(e.currentTarget);
            var fechaAntiguedad = new Date(_fx.formatoDDMMAAAA(_this.val()));
            var fechaActual = new Date();
            var resultado = _reglas.diferenciaEntreFechas(fechaActual, fechaAntiguedad)
            $("#ANTIGUEDADENLACIUDAD").val(resultado.años + " años " + resultado.mes + " mes " + resultado.dias + " Dias");
        },

        ValidarDiasPeriodoGracia: function (valor) {
            if (valor == "1") {
                return 30;
            } else if (valor == "2") {
                return 60;
            } else if (valor == "0") {
                return 0;
            }
        },

        reglaCompletarNombreGestor: function (e) {
            var _this = $(e.currentTarget);
            //console.log("Cedula3 " + _this.val());
            $.ajax({
                "type": "GET",
                "url": "/Productos/ValidarGestor?cedula=" + _this.val(),
                "success": function (data) {
                    //console.log("Valida Gestor1 " + data)
                    $("#NOMBREGESTOR").val(data);
                    $("#NOMBREGESTOR").attr('readonly', true);
                },
                "error": function (error) {
                    $("#NOMBREGESTOR").val("");
                    $("#NOMBREGESTOR").attr('readonly', false);
                    $("#NOMBREGESTOR").removeAttr("disabled");
                    var mensaje = error.responseJSON;
                    alert(mensaje.Message);
                }
            });

        },

        ValidarGestor: function (e) {
            var _this = $(e.currentTarget);
            $.ajax({
                "type": "GET",
                "url": "/Productos/ValidarGestor?cedula=" + _this.val(),
                "success": function (data) {
                    if (data == "") {
                        alertify.alert("No existe el Gestor o se encuentra inactivo, Verifique.")
                    } else {
                        //console.log(data)
                    }

                }
            });

        },

        ValidarGestorVehiculo: function (e) {
            var _this = $(e.currentTarget);
            //console.log("Cedula1 " + _this.val());
            $.ajax({

                "type": "GET",
                "url": "/Productos/ValidarGestor?cedula=" + _this.val(),
                "success": function (data) {
                    //console.log("Valida Gestor2 " + data)
                    $("#NOMBREGESTOR").val(data);
                    $("#NOMBREGESTOR").attr('readonly', true);
                },
                "error": function (error) {
                    $("#NOMBREGESTOR").val("");
                    $("#NOMBREGESTOR").attr('readonly', false);
                    $("#NOMBREGESTOR").removeAttr("disabled");
                    var mensaje = error.responseJSON;
                    //_this.val("");
                    alert(mensaje.Message);
                }
            });

        },

        ValidarProducto: function () {
            var valor = $("#PRODUCTO").val();
            if (valor == "SUBROGACION") {
                $("#divCampos4").css("display", "block");
                $("#divCampos5").css("display", "none");
            } else if (valor == "LEASING") {
                $("#divCampos5").css("display", "block");
                $("#divCampos4").css("display", "block");
            }
            else {
                $("#divCampos4").css("display", "none");
                $("#divCampos5").css("display", "none");
            }
        },

        validaProductoVehi: function () {
            var valor = $("#CANALVEHICULO").val();

            if (valor == "CONSUMER") {
                $("#SUCURSAL").attr("disabled", "disabled");
                $("#SUCURSAL").parent().find("input.ui-autocomplete-input").autocomplete("option", "disabled", true).prop("disabled", true);
                $("#SUCURSAL").parent().find("input.ui-autocomplete-input").css("background-color", "#dddddd");
                $("#SUCURSAL").parent().find("a.ui-button").button("disable");
                $("#SUCURSAL").removeAttr("required");
                $("#CODIGOSUCURSAL").removeAttr("required");
            }
            else {
                $("#SUCURSAL").removeAttr("disabled", "disabled");
                $("#SUCURSAL").parent().find("input.ui-autocomplete-input").autocomplete("option", "disabled", false).prop("disabled", false);
                $("#SUCURSAL").parent().find("input.ui-autocomplete-input").css("background-color", "#ffffff");
                $("#SUCURSAL").parent().find("a.ui-button").button("enable");
                $("#SUCURSAL").attr("required");
                $("#CODIGOSUCURSAL").attr("required");
            }

        },

        reglaMontoSolicitado: function () {
            var valor = parseInt(_fx.formatearCampoMoneda($("#MONTOSOLICITADO").val()));
            var min = parseInt(_fx.formatearCampoMoneda($("#MONTO_Min").val()));
            var max = parseInt(_fx.formatearCampoMoneda($("#MONTO_Max").val()));
            if (min <= valor && valor <= max) {
                $("#mensaje").remove();
                $("#alertaPaso1Hipotecario").css("display", "none");
                return true;
            } else {
                //console.log("se sale del rando el vaor");
                if ($("#mensaje").length >= 1) {
                    $("#mensaje").remove();
                }
                $("#alertaPaso1Hipotecario").append(_uiStatic.createElement("strong", { "id": "mensaje" }, "EL VALOR DEL MONTO ESTA FUERA DEL RANGO"));
                $("#alertaPaso1Hipotecario").css("display", "block");

                return false;
            }
        },

        reglaPlazoSolicitado: function () {
            var valor = parseInt($("#PLAZOSOLICITADO").val());
            var min = parseInt($("#PLAZO_Min").val());
            var max = parseInt($("#PLAZO_Max").val());
            if (min <= valor && valor <= max) {
                $("#mensaje").remove();
                $("#alertaPaso1Hipotecario").css("display", "none");
                return true;
            } else {
                //console.log("se sale del rando el vaor");
                if ($("#mensaje").length >= 1) {
                    $("#mensaje").remove();
                }
                $("#alertaPaso1Hipotecario").append(_uiStatic.createElement("strong", { "id": "mensaje" }, "EL VALOR DEL PLAZO ESTA FUERA DEL RANGO"));
                $("#alertaPaso1Hipotecario").css("display", "block");

                return false;
            }
        },

        reglaValorComercial: function () {
            var valorComercialEntrada = parseInt(_fx.formatearCampoMoneda($("#VALORCOMERCIAL").val()));
            var valorComercialEstandar = parseInt(sessionStorage.getItem("varCom"));
            var tipoViviendaEntrada = $("#TIPODEVIVIENDA").val();
            var tipoVivienda = "";
            //SE VALIDA SI EL VALOR COMERCIAL CON EL VALOR COMERCIAL ESTANDAR QUE TIENE EL APLICATIVO 
            if (valorComercialEntrada > valorComercialEstandar) {
                tipoVivienda = "NO VIS";
                //sE VALIDA EL TIPO DE VIVIENDA
                if (tipoVivienda != tipoViviendaEntrada) {
                    if ($("#mensaje").length >= 1) {
                        $("#mensaje").remove();
                    }
                    $("#alertaPaso1Hipotecario").append(_uiStatic.createElement("strong", { "id": "mensaje" }, "EL VALOR COMERCIAL NO SE AJUSTA AL TIPO DE VIVIEDA DEL DEL CREDITO"));
                    $("#alertaPaso1Hipotecario").css("display", "block");
                } else {
                    $("#mensaje").remove();
                    $("#alertaPaso1Hipotecario").css("display", "none");
                }
            } else if (valorComercialEntrada <= valorComercialEstandar) {
                tipoVivienda = "VIS";
                if (tipoVivienda != tipoViviendaEntrada) {
                    if ($("#mensaje").length >= 1) {
                        $("#mensaje").remove();
                    }
                    $("#alertaPaso1Hipotecario").append(_uiStatic.createElement("strong", { "id": "mensaje" }, "EL VALOR COMERCIAL NO SE AJUSTA AL TIPO DE VIVIEDA DEL DEL CREDITO"));
                    $("#alertaPaso1Hipotecario").css("display", "block");
                } else {
                    $("#mensaje").remove();
                    $("#alertaPaso1Hipotecario").css("display", "none");
                }
            }


        },

        calculoCuotaProyectadaHipotecario: function () {
            var _valorSolicitado = parseInt(_fx.formatearCampoMoneda($("#MONTOSOLICITADO").val())),
              _plazo = parseInt($("#PLAZOSOLICITADO").val()),
              _tasa = (parseFloat(_fx.formatearCampoPorcentaje($("#TASA").val())) / 100) / 12;

            var resultado = (_valorSolicitado * _tasa * Math.pow((1 + _tasa), _plazo)) / (Math.pow((1 + _tasa), _plazo) - 1);

            $("#CUOTAPROYECTADA").val(_fx.separadorMilesConDecimal((resultado.toFixed(2)).toString()));
        },

        calculoProcentajeFinanciacion: function () {
            var _valorSolicitado = parseInt(_fx.formatearCampoMoneda($("#MONTOSOLICITADO").val())),
            _valorComercial = parseInt(_fx.formatearCampoMoneda($("#VALORCOMERCIAL").val())),
                _financiacion = parseFloat(_fx.formatearCampoPorcentaje($("#FINANCIACION").val()));

            var result = parseFloat((_valorSolicitado / _valorComercial) * 100).toFixed(2);
            $("#PORCENTAJEDEFINANCIACION").val(_fx.porcetaje(result));

            if (result <= _financiacion) {
                $("#CUMPLEONOCUMPLE").val("CUMPLE");
            } else {
                $("#CUMPLEONOCUMPLE").val("NO CUMPLE");
            }
        },

        reglaGrillaTipoVivienda: function (valor) {
            switch (valor) {
                case "PROPIA SIN HIPOTECA":
                    $("#VIVIENDA").css("display", "block");
                    $("#HIPOTECA").css("display", "none");
                    $("#ARRIENDO").css("display", "none");
                    break;
                case "PROPIA CON HIPOTECA":
                    $("#VIVIENDA").css("display", "block");
                    $("#HIPOTECA").css("display", "block");
                    $("#ARRIENDO").css("display", "none");
                    break;
                case "FAMILIAR":
                    $("#VIVIENDA").css("display", "none");
                    $("#HIPOTECA").css("display", "none");
                    $("#ARRIENDO").css("display", "none");

                    break;
                case "ARRIENDO":
                    $("#ARRIENDO").css("display", "block");
                    $("#VIVIENDA").css("display", "none");
                    $("#HIPOTECA").css("display", "none");
                    break;
                case "OTROS":
                    $("#VIVIENDA").css("display", "none");
                    $("#HIPOTECA").css("display", "none");
                    $("#ARRIENDO").css("display", "none");
                    break;
                default:

            }
        },

        reglaGrillaTipoVivienda_2: function (valor) {
            switch (valor) {
                case "PROPIA SIN HIPOTECA":
                    $("#VIVIENDA_2").css("display", "block");
                    $("#HIPOTECA_2").css("display", "none");
                    $("#ARRIENDO_2").css("display", "none");
                    break;
                case "PROPIA CON HIPOTECA":
                    $("#VIVIENDA_2").css("display", "block");
                    $("#HIPOTECA_2").css("display", "block");
                    $("#ARRIENDO_2").css("display", "none");
                    break;
                case "FAMILIAR":
                    $("#VIVIENDA_2").css("display", "none");
                    $("#HIPOTECA_2").css("display", "none");
                    $("#ARRIENDO_2").css("display", "none");

                    break;
                case "ARRIENDO":
                    $("#ARRIENDO_2").css("display", "block");
                    $("#VIVIENDA_2").css("display", "none");
                    $("#HIPOTECA_2").css("display", "none");
                    break;
                case "OTROS":
                    $("#VIVIENDA_2").css("display", "none");
                    $("#HIPOTECA_2").css("display", "none");
                    $("#ARRIENDO_2").css("display", "none");
                    break;
                default:

            }
        },

        reglaListasInformacionLaboral: function (valor) {
            switch (valor) {
                case "INDEFINIDO":
                    break;
                case "TEMPORAL":
                    break;
                case "INDEPENDIENTE":
                    break;
                case "OTROS":
                    break;
                default:

            }
        },

        reglaNuevoTitular: function (valorAportante, valorConsolida) {
            if (valorAportante == 1 && valorConsolida == 1) {
                $("#tiularDos_divCampos1").css("display", "block");
                $("#tiularDos_divCampos2").css("display", "block");
                $("#tiularDos_divCampos3").css("display", "block");
                $("#tiularDos_divCampos1").find("input, select").removeAttr("disabled");
                $("#tiularDos_divCampos2").find("input, select").removeAttr("disabled");
                $("#INGRESOSPARALEYDEVIVIENDA_2,#chek_2_235,#chek_2_236").removeAttr("disabled");
            } else if (valorAportante == 0 && valorConsolida == 1) {
                $("#tiularDos_divCampos1").css("display", "block");
                $("#tiularDos_divCampos1").find("input, select").removeAttr("disabled");
                $("#tiularDos_divCampos2").css("display", "none");
                $("#tiularDos_divCampos3").css("display", "none");
            } else if (valorAportante == 0 && valorConsolida == 0) {
                $("#tiularDos_divCampos1").css("display", "block");
                $("#tiularDos_divCampos1").find("input, select").removeAttr("disabled");
                $("#tiularDos_divCampos2").css("display", "none");
                $("#tiularDos_divCampos3").css("display", "none");
            } else if (valorAportante == 1 && valorConsolida == 0) {
                $("#tiularDos_divCampos1").css("display", "block");
                $("#tiularDos_divCampos2").css("display", "block");
                $("#tiularDos_divCampos3").css("display", "block");
                $("#tiularDos_divCampos1").find("input, select").removeAttr("disabled");
                $("#tiularDos_divCampos2").find("input, select").removeAttr("disabled");
                $("#INGRESOSPARALEYDEVIVIENDA_2,#chek_2_235,#chek_2_236").removeAttr("disabled");
            }
        },

        promedioGrillas: function (elemento, valorSumatoria, idCampo) {
            elemento = $(elemento);
            var idElemento = elemento.attr("id"),
             idInputPromedio = "",
             promedio = 0,
             inputPromedio = "";

            if (idCampo == "199") {
                inputPromedio = elemento.find("#txtTotal_220");
                idInputPromedio = inputPromedio.attr("id");
            } else if (idCampo == "200") {
                inputPromedio = elemento.find("#txtTotal_221");
                idInputPromedio = inputPromedio.attr("id")
            }

            promedio = parseFloat(valorSumatoria / 3).toFixed(2);

            $("#" + idElemento + " #" + idInputPromedio).val(_fx.separadorMilesConDecimal(promedio));
        },

        promedioGrillasDeducciones2: function (elemento, valorSumatoria, idCampo) {
            elemento = $(elemento);
            var idElemento = elemento.attr("id"),
             idInputPromedio2 = "",
             idInputPromedio2_5 = "",
             promedio = 0,
             inputPromedio2 = "";
            inputPromedio2_5 = "";

            if (idCampo == "200") {
                inputPromedio2 = elemento.find("#txtTotal_297");
                idInputPromedio2 = inputPromedio2.attr("id")
            }

            promedio2 = parseFloat(valorSumatoria / 2).toFixed(2);

            $("#" + idElemento + " #" + idInputPromedio2).val(_fx.separadorMilesConDecimal(promedio2));


        },

        promedioGrillasDeducciones2_5: function (elemento, valorSumatoria, idCampo) {
            elemento = $(elemento);
            var idElemento = elemento.attr("id"),
             idInputPromedio2 = "",
             idInputPromedio2_5 = "",
             promedio = 0,
             inputPromedio2 = "";
            inputPromedio2_5 = "";

            if (idCampo == "200") {
                inputPromedio2_5 = elemento.find("#txtTotal_298");
                idInputPromedio2_5 = inputPromedio2_5.attr("id")
            }

            promedio2_5 = parseFloat(valorSumatoria / 2.5).toFixed(2);

            $("#" + idElemento + " #" + idInputPromedio2_5).val(_fx.separadorMilesConDecimal(promedio2_5));
        },

        patrimonioTitularUnoYDos: function (elemento, valor, idCampos) {
            //console.log(elemento);
            var sumaPatrimonio = 0,
                idGrillaDiv = elemento.attr("id"),
               valorTotalOtrosActivos = "",
               valorTotalVivienda = "";
            elementoParimonio = "";
            if (idGrillaDiv == "div_OTROSACTIVOS_205" || idGrillaDiv == "div_VIVIENDA_227") {
                valorTotalOtrosActivos = $("#tr_POSICIONESINFORMACIONFINANCIERA #txtTotal_205").val() == "" ||
                                         $("#tr_POSICIONESINFORMACIONFINANCIERA #txtTotal_205").val() == undefined ? 0 :
                                         parseInt(_fx.formatearCampoMoneda($("#tr_POSICIONESINFORMACIONFINANCIERA #txtTotal_205").val()));
                valorTotalVivienda = $("#tr_POSICIONESINFORMACIONFINANCIERA #txtTotal_227").val() == "" ||
                                    $("#tr_POSICIONESINFORMACIONFINANCIERA #txtTotal_227").val() == undefined ? 0 :
                                    parseInt(_fx.formatearCampoMoneda($("#tr_POSICIONESINFORMACIONFINANCIERA #txtTotal_227").val()));
                sumaPatrimonio = valorTotalOtrosActivos + valorTotalVivienda;
                elementoParimonio = $("#PATRIMONIO");

            } else if (idGrillaDiv == "div_OTROSACTIVOS_2_205" || idGrillaDiv == "div_VIVIENDA_2_227") {
                valorTotalOtrosActivos = $("#tblPrincipla_POSICIONESINFORMACIONFINANCIERA_2 #txtTotal_205").val() == "" ||
                                         $("#tblPrincipla_POSICIONESINFORMACIONFINANCIERA_2 #txtTotal_205").val() == undefined ? 0 :
                                         parseInt(_fx.formatearCampoMoneda($("#tblPrincipla_POSICIONESINFORMACIONFINANCIERA_2 #txtTotal_205").val()));
                valorTotalVivienda = $("#tblPrincipla_POSICIONESINFORMACIONFINANCIERA_2 #txtTotal_227").val() == "" ||
                                    $("#tblPrincipla_POSICIONESINFORMACIONFINANCIERA_2 #txtTotal_227").val() == undefined ? 0 :
                                    parseInt(_fx.formatearCampoMoneda($("#tblPrincipla_POSICIONESINFORMACIONFINANCIERA_2 #txtTotal_227").val()));
                sumaPatrimonio = valorTotalOtrosActivos + valorTotalVivienda;
                elementoParimonio = $("#PATRIMONIO_2");
            }
            $(elementoParimonio).val(_fx.separacionMiles(sumaPatrimonio));

        },

        reglaPerfilEconomico: function (valorText) {
            var texto = "";
            switch (valorText) {
                case "ASALARIADO":
                    texto = "INCLUIR ING FIJOS + ING VAR";
                    break;
                case "PRESTADOR DE SERVICIOS":
                    texto = "INCLUIR ING BRUTOS";
                    break;
                case "AUTONOMO":
                    texto = "TOTAL DE INGRESOS RECIBIDOS POR CONCEPTO DE RENTA/12";

                    break;
                case "RENTISTA":
                    texto = "INCLUIR ING BRUTOS"
                    break;
                case "PENSIONADO":
                    texto = "INCLUIR ING FIJOS"
                    break;
                case "MIXTO":
                    texto = "INCLUIR SUMATORIA"
                    break;
                default: break;
            }

            return texto;
        },

        reglaRelacionCuotaIngreso: function (e) {
            var cuotaProyectada = parseFloat(_fx.formatearCampoMoneda($("#CUOTAPROYECTADA").val()));
            var ingresoLeyViviendaUno = $("#INGRESOSPARALEYDEVIVIENDA").val() == "" ? 0 :
                                        parseFloat(_fx.formatearCampoMoneda($("#INGRESOSPARALEYDEVIVIENDA").val()));

            var ingresoLeyViviendaDos = $("#INGRESOSPARALEYDEVIVIENDA_2").val() == undefined || $("#INGRESOSPARALEYDEVIVIENDA_2").val() == "" ? 0 :
                                        parseFloat(_fx.formatearCampoMoneda($("#INGRESOSPARALEYDEVIVIENDA_2").val()));


            var sumaIngresos = (parseFloat(ingresoLeyViviendaUno) + parseFloat(ingresoLeyViviendaDos))
            cuotaProyectada = parseFloat(cuotaProyectada) * 100

            var resultado = parseFloat(cuotaProyectada) / parseFloat(sumaIngresos)

            $("#RELACIONCUOTAINGRESO").val(_fx.porcetaje(resultado.toFixed(2)));
        },

        validacionInfoLaboral: function (perfilEconomico, declaraRenta) {
            if (perfilEconomico == "AUTONOMO" && declaraRenta == "No") {
                if ($("#mensaje").length >= 1) {
                    $("#mensaje").remove();
                }
                $("#alertaPaso2Hipotecario").append(_uiStatic.createElement("strong", { "id": "mensaje" }, "CLIENTE NO ES SUJETO DE CREDITO"));
                $("#alertaPaso2Hipotecario").css("display", "block");
            } else {
                $("#mensaje").remove();
                $("#alertaPaso2Hipotecario").css("display", "none");
            }
        },

        //Validacion del simulador DEDUCCIONES DE LEY. 
        validacionDeduccionesDeLey: function (valor, tipcont) {
            var porcentajeDeduccion = 0;


            if (tipcont == "Otros - Pensionado") {
                porcentajeDeduccion = 12;
            } else {
                if (valor >= 644350 && valor <= 2577400) {
                    porcentajeDeduccion = 8;
                } else if (valor >= 2577401 && valor <= 3866100) {
                    porcentajeDeduccion = 9;
                } else if (valor >= 3866101 && valor <= 5154800) {
                    porcentajeDeduccion = 12;
                } else if (valor >= 5154801) {
                    porcentajeDeduccion = 15;
                }
            }


            return porcentajeDeduccion;
        },
        //Libranzas 
        otrasObligacionesPaso2: function () {
            var opciones = $("#GrillaDOS").find("select option:selected");
            var valores = []; // Arreglo de los valores que no estan condicionados
            var codigosEntidades = ["1105", "1155", "1037", "973"];
            var arrayEntidades = []; // Valores condicionados

            $.each(opciones, function (i, values) {
                var opcion = $(values).val();
                if (codigosEntidades.indexOf(opcion) == -1) { // el valor no existe en el arreglo codigosEntidades
                    valores.push(opcion);
                } else {
                    arrayEntidades.push(opcion);
                }
            });

            valores = _fx.eliminateDuplicates(valores);

            sumaEntidades = valores.length + arrayEntidades.length;

            $("#HTOTAL_241").val(sumaEntidades);
            $("#TOTAL_241").val(sumaEntidades);

        },
        //Busca los convenios de libranzas.
        buscar: function () {
            var nitEmpresa = $("#NITDELCONVENIO").val();
            //if (nitEmpresa != "") {
            $("#NITDELCONVENIO").css("border", "1px solid green");
            $.ajax({
                "type": "GET",
                "url": "/api/FormularioCampos?nitEmpresa=" + nitEmpresa,
                "success": function (data) {
                    $("#tbodyTr tr").remove();
                    if (data.length == 0) {
                        alertify.alert("No existe un convenio Asociado al Nit Ingresado");
                        $("#NITDELCONVENIO").css("border", "1px solid red");
                    } else {
                        _ui.cargarNewTrConvenio(data, $("#ConveniosTB").html());
                        $("#dialogConvenio").dialog("open");
                    }
                },
                "error": _ui.displayError
            });
            //} else {
            //    $("#NITDELCONVENIO").css("border", "1px solid red");
            //}


        },

        buscarHipotecario: function () {
            var valor = $("#CODIGOSUBPRODUCTO").val();
            $.ajax({
                url: "/Productos/BuscarHipotecario?subproducto=" + valor,
                type: "GET",
                data: null,
                dataType: "json",
                contentType: 'application/json',
                success: function (data) {
                    //console.log(data);
                    $("#PRODUCTO").val(data[0].PRODUCTO);
                    $("#TIPOSDEVIVIENDA").val(data[0].TIPO_VIVIENDA);
                    $("#COBERTURA").val(data[0].COBERTURA);
                    $("#TIPODECLIENTE").val(data[0].TIPO_CLIENTE);
                    $("#FINANCIACION").val(_fx.porcetaje(data[0].FINANCIACION));
                    $("#MONTO_Min").val(_fx.separacionMiles(data[0].MONTO_MIN));
                    $("#MONTO_Max").val(_fx.separacionMiles(data[0].MONTO_MAX));
                    $("#PLAZO_Min").val(data[0].PLAZO_MIN);
                    $("#PLAZO_Max").val(data[0].PLAZO_MAX);
                    $("#TASA").val(_fx.porcetaje(data[0].TASA));
                    $("#FUERZADEVENTAS").val(data[0].FUERZA_DE_VENTAS);
                    $("#TIPODECREDITO").val(data[0].TIPO_CREDITO);
                    _reglas.ValidarProducto();

                }
            });
        },

        //______________           VEHICULO

        objetos: [],

        buscarVehiculo: function () {
            var valor = $("#CODIGOSUBPRODUCTO").val();
            if (valor == "") {
                alertify.alert("No ingreso ningun subproducto");
                //valor = "null";
            }
            else {
                $.ajax({
                    url: "/api/FormularioCampos?subproductoVehiculo=" + valor,
                    type: "GET",
                    data: null,
                    dataType: "json",
                    contentType: 'application/json',
                    success: function (data) {
                        //console.log(data);
                        $("#CANALVEHICULO").val(data[0].Canal);
                        $("#SEGMENTO").val(data[0].Segmento);
                        $("#GARANTIA").val(data[0].Garantia);
                        $("#TIPODEARTICULO").val(data[0].Tipo_Articulo);
                        $("#PLAZO_Min").val(data[0].Plazo_Min);
                        $("#PLAZO_Max").val(data[0].Plazo_Max);
                        $("#CUOTASALAÑO").val(data[0].Cuotas_Año);
                        $("#FINANCIACIONMAX").val(data[0].Financiacion);
                        _reglas.reglaMontoSolicitdoVehiculo(data[0].Segmento);
                        _reglas.reglasPlazoSolicitado();
                        _reglas.reglasPorcentaje();
                        _reglas.validaProductoVehi();
                    }
                });
            }
        },

        openDialogfilterVehiculo: function () {

            $("#dialogfiltroSearch").dialog("open");

            var valor = $("#CODIGOSUBPRODUCTO").val();
            if (valor == "") {
                valor = "null";
            }

            $("#tableVehiculo tbody").children().remove();

            var tabla = $("#tableVehiculo").DataTable();
            $("#tableVehiculo tbody").off('click', 'tr', function () {
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                }
                else {
                    tabla.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                }
            });
            tabla.destroy();

            $.ajax({
                url: "/api/FormularioCampos?subproductoVehiculo=" + valor,
                type: "GET",
                data: null,
                dataType: "json",
                contentType: 'application/json',
                success: function (data) {
                    $.each(data, function (i, subproducto) {
                        plantilla = $("#subProductosVehiculo").html();
                        var temp = _uiStatic.newTrSubproductosVehiculo(plantilla, "tr_" + i,
                             subproducto.SubProducto,
                             subproducto.Canal,
                             subproducto.Segmento,
                             subproducto.Tipo_Articulo,
                             subproducto.Plazo_Min,
                             subproducto.Plazo_Max,
                             subproducto.Cuotas_Año,
                             subproducto.Financiacion,
                             subproducto.Garantia,
                             subproducto.Campana);

                        $("#BodyRegistrosVehiculo").append(temp);

                    });

                    table = $("#tableVehiculo").DataTable({
                        initComplete: function () {
                            this.api().columns().every(function () {
                                var column = this;
                                var select = $('<select><option value=""></option></select>')
                                    .appendTo($(column.footer()).empty())
                                    .on('change', function () {
                                        var val = $.fn.dataTable.util.escapeRegex(
                                            $(this).val()
                                        );

                                        column
                                            .search(val ? '^' + val + '$' : '', true, false)
                                            .draw();
                                    });

                                column.data().unique().sort().each(function (d, j) {
                                    select.append('<option value="' + d + '">' + d + '</option>')
                                });
                            });
                        }
                    });

                    $("#tableVehiculo tbody").on('click', 'tr', function () {
                        if ($(this).hasClass('selected')) {
                            $(this).removeClass('selected');
                        }
                        else {
                            table.$('tr.selected').removeClass('selected');
                            $(this).addClass('selected');
                        }
                    });
                }
            });
        },

        reglaMontoSolicitdoVehiculo: function (e) {
            var segmento = $("#SEGMENTO").val().trim();
            if (segmento == "MOTO") {
                $("#MONTOSOLICITADO").attr("title", "MONTO MÍNIMO PARA MOTOS $ 5.000.000");
                $("#MONTOSOLICITADO").attr("data-toggle", "tooltip");
                $("#MONTOSOLICITADO").tooltip();
            }
        },

        reglaValidaMontoSolicitadoMoto: function (m, s) {
            var ReturnValid = true;
            Segmento = s.val().trim();
            var Monto = m.val().replace(/[^0-9]/g, '');
            if (Monto < 5000000 && Segmento == "MOTO") {
                m.next().text("* El monto debe ser mayor a 5.000.000 ");
                m.css("border", "1px solid red");
                m.attr("autofocus", "autofocus");
                m.focus();
                ReturnValid = false;
            }

            return ReturnValid;
        },

        reglasPlazoSolicitado: function () {
            var plazomaximo = $("#PLAZO_Max").val();
            $("#PLAZOSOLICITADO").attr("title", "PLAZO MÁXIMO " + plazomaximo + " MESES");
            $("#PLAZOSOLICITADO").attr("data-toggle", "tooltip");
            $("#PLAZOSOLICITADO").tooltip();
        },

        reglasPorcentaje: function () {
            $("#PORCENTAJEDEFINANCIACION").focusout(function () {
                var valorIngresado = _fx.formatearCampoPorcentaje($("#PORCENTAJEDEFINANCIACION").val());
                var valorSubproducto = _fx.formatearCampoPorcentaje($("#FINANCIACIONMAX").val());
                if (parseInt(valorIngresado) <= parseInt(valorSubproducto)) {
                    //Esta correcto el valor
                    $("#PORCENTAJEDEFINANCIACION").css("border", "1px solid green");
                    $("#PORCENTAJEDEFINANCIACION").attr("title", "Valor correcto");
                    $("#PORCENTAJEDEFINANCIACION").attr("data-toggle", "tooltip");
                    $("#PORCENTAJEDEFINANCIACION").tooltip();
                } else {

                    $("#PORCENTAJEDEFINANCIACION").css("border", "1px solid red");
                    $("#PORCENTAJEDEFINANCIACION").attr("title", "Tendrá que ser igual o menor al estipulado en el % FINANCIACION MAX.");
                    $("#PORCENTAJEDEFINANCIACION").attr("data-toggle", "tooltip");
                    $("#PORCENTAJEDEFINANCIACION").tooltip();
                    return false;
                }

            });
        },

        reglaModelo: function () {
            var plazo = parseInt($("#PLAZOSOLICITADO").val());
            var añoActual = new Date().getFullYear();
            var modelo = parseInt($("#MODELO").val());
            var calculo = (10 - (añoActual - modelo)) * 12;
            $("#PLAZOMAXIMO").val(calculo);
            if (plazo > calculo) {

                objeto = {
                    "IdControl": "TIPODEARTICULO",
                    "Mensaje": "EL PLAZO DEBE SER MENOR AL PLAZO MAX",
                    "valorValidado": "USADO",
                    "run": false,
                    "funcion": ""
                }

                _reglas.objetos.push(objeto);
                //console.log(_reglas.objetos);
                return true;
            } else {
                return false
            }
        },

        reglaValidacionMensajeAlerta: function (entra) {
            if (entra == 1) {
                _reglas.objetos.push(
                {
                    "IdControl": "CUOTASALAÑO",
                    "Mensaje": "NO APLICA PARA CLIENTES CON SALARIO INTEGRAL",
                    "valorValidado": "14 %",
                    "run": false,
                    "funcion": ""
                },
                {
                    "IdControl": "SEGMENTO",
                    "Mensaje": "CILINDRAJE DESDE 250 CC",
                    "valorValidado": "MOTO",
                    "run": false,
                    "funcion": ""
                }
                );
            }

            return _reglas.objetos;
        },

        reglaAntiguedadLaboral: function (e) {
            _this = $(e.currentTarget);
            var fecha = _this.val();
            var resultado = _fx.CalcularAntiguedadLaboral(fecha);

            if (e.currentTarget.id == "FECHADEINGRESO_2") {
                $("#ANTIGUEDADLABORAL_2").val(resultado);
            } else {
                $("#ANTIGUEDADLABORAL").val(resultado);
            }

        },



        reglasAntiguadadDomicilio: function (e) {
            _this = $(e.currentTarget);
            if (e.currentTarget.id == "ANTIGUEDADDOMICILIO") {
                var valorEdad = parseInt($("#EDAD").val().split(' ')[0]);
                var antiguadad = parseInt(_this.val());
                var mensaje = "Al antiguedad del domicilio no puede ser mayor a la edad, Verificar";
                if (antiguadad > valorEdad) {
                    var mensajeAlerta = $("#mensajesAlertas").html().replace(/{{Mensaje}}/ig, mensaje);
                    $("#alertaReglas").append(mensajeAlerta);
                    $("#alertaReglas").css("display", "block");
                    _this.val("")
                }
            } else {
                var valorEdad = parseInt($("#EDAD").val().split(' ')[0]);
                var antiguadad = parseInt(_this.val());
                if (antiguadad > valorEdad) {
                    var mensajeAlerta = $("#mensajesAlertas").html().replace(/{{Mensaje}}/ig, mensaje);
                    $("#alertaReglas").append(mensajeAlerta);
                    $("#alertaReglas").css("display", "block");
                }
            }

        },


        reglasDeducciones: function () {
            if ($("#PERFILECONOMICODELCLIENTE").val() == "675") {
                var Deducciones = $("#txtTotal_200").val().replace(/[^0-9,]/g, '');
                var ingfijos = $("#txtTotal_198").val().replace(/[^0-9,]/g, '');
                if (parseFloat(Deducciones) > parseFloat(ingfijos)) {
                    alertify.alert("DEDUCCIONES SUPERA INGRESOS FIJOS, POR FAVOR UTILICE LA CALCULADORA DE INGRESOS");
                    return false;
                } else {
                    return true;
                }

            } else {
                return true;
            }
        }

    }

})(jQuery);
