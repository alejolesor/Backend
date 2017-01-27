(function ($) {

    var _uiStatic = window._uiStatic = {

        buildCombobox: function () {
            $.widget("custom.combobox", {
                _create: function () {
                    this.wrapper = $("<span>")
                      .addClass("custom-combobox")
                      .insertAfter(this.element);

                    this.element.hide();
                    this._createAutocomplete();
                    this._createShowAllButton();
                },

                _createAutocomplete: function () {
                    var selected = this.element.children(":selected"),
                      value = selected.val() ? selected.text() : "";

                    this.input = $("<input>")
                      .appendTo(this.wrapper)
                      .val(value)
                      .attr("title", "")
                      .addClass("custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left")
                      .autocomplete({
                          delay: 0,
                          minLength: 0,
                          source: $.proxy(this, "_source")
                      })
                      .tooltip({
                          tooltipClass: "ui-state-highlight"
                      });

                    this._on(this.input, {
                        autocompleteselect: function (event, ui) {
                            ui.item.option.selected = true;
                            this._trigger("select", event, {
                                item: ui.item.option
                            });
                            _ui.changeSelect(event);
                        },

                        autocompletechange: "_removeIfInvalid"
                    });
                },

                _createShowAllButton: function () {
                    var input = this.input,
                      wasOpen = false;

                    $("<a>")
                      .attr("tabIndex", 1001)
                      .attr("title", "Show All Items")
                      .tooltip()
                      .appendTo(this.wrapper)
                      .button({
                          icons: {
                              primary: "ui-icon-triangle-1-s"
                          },
                          text: false
                      })
                      .removeClass("ui-corner-all")
                         .addClass("custom-combobox-toggle ui-corner-right")
                      .mousedown(function () {
                          wasOpen = input.autocomplete("widget").is(":visible");
                      })
                      .click(function () {
                          input.focus();

                          // Close if already visible
                          if (wasOpen) {
                              return;
                          }

                          // Pass empty string as value to search for, displaying all results
                          input.autocomplete("search", "");
                          _uiStatic._scroll();
                      });
                },

                _source: function (request, response) {
                    var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
                    response(this.element.children("option").map(function () {
                        var text = $(this).text();
                        if (this.value && (!request.term || matcher.test(text)))
                            return {
                                label: text,
                                value: text,
                                option: this
                            };
                    }));
                },

                _removeIfInvalid: function (event, ui) {

                    // Selected an item, nothing to do
                    if (ui.item) {
                        return;
                    }

                    // Search for a match (case-insensitive)
                    var value = this.input.val(),
                      valueLowerCase = value.toLowerCase(),
                      valid = false;
                    this.element.children("option").each(function () {
                        if ($(this).text().toLowerCase() === valueLowerCase) {
                            this.selected = valid = true;
                            return false;
                        }
                    });

                    // Found a match, nothing to do
                    if (valid) {
                        return;
                    }

                    // Remove invalid value
                    this.input
                      .val("")
                      .attr("title", value + " didn't match any item")
                      .tooltip("open");
                    this.element.val("");
                    this._delay(function () {
                        this.input.tooltip("close").attr("title", "");
                    }, 2500);
                    this.input.autocomplete("instance").term = "";
                },

                _destroy: function () {
                    this.wrapper.remove();
                    this.element.show();
                }
            });

        }, // Fin de la funcion

        buildPaginador: function () {
            $.fn.pageMe = function (opts) {
                var $this = this,
                    defaults = {
                        perPage: 7,
                        showPrevNext: false,
                        numbersPerPage: 5,
                        hidePageNumbers: false
                    },
                    settings = $.extend(defaults, opts);

                var listElement = $this;
                var perPage = settings.perPage;
                var children = listElement.children();
                var pager = $('.pagination');

                if (typeof settings.childSelector != "undefined") {
                    children = listElement.find(settings.childSelector);
                }

                if (typeof settings.pagerSelector != "undefined") {
                    pager = $(settings.pagerSelector);
                }

                var numItems = children.size();
                var numPages = Math.ceil(numItems / perPage);

                pager.data("curr", 0);

                if (settings.showPrevNext) {
                    $('<li><a href="#" class="prev_link">«</a></li>').appendTo(pager);
                }

                var curr = 0;
                while (numPages > curr && (settings.hidePageNumbers == false)) {
                    $('<li><a href="#" class="page_link">' + (curr + 1) + '</a></li>').appendTo(pager);
                    curr++;
                }

                if (settings.numbersPerPage > 1) {
                    $('.page_link').hide();
                    $('.page_link').slice(pager.data("curr"), settings.numbersPerPage).show();
                }

                if (settings.showPrevNext) {
                    $('<li><a href="#" class="next_link">»</a></li>').appendTo(pager);
                }

                pager.find('.page_link:first').addClass('active');
                pager.find('.prev_link').hide();
                if (numPages <= 1) {
                    pager.find('.next_link').hide();
                }
                pager.children().eq(1).addClass("active");

                children.hide();
                children.slice(0, perPage).show();

                pager.find('li .page_link').click(function () {
                    var clickedPage = $(this).html().valueOf() - 1;
                    goTo(clickedPage, perPage);
                    return false;
                });
                pager.find('li .prev_link').click(function () {
                    previous();
                    return false;
                });
                pager.find('li .next_link').click(function () {
                    next();
                    return false;
                });

                function previous() {
                    var goToPage = parseInt(pager.data("curr")) - 1;
                    goTo(goToPage);
                }

                function next() {
                    goToPage = parseInt(pager.data("curr")) + 1;
                    goTo(goToPage);
                }

                function goTo(page) {
                    var startAt = page * perPage,
                        endOn = startAt + perPage;

                    children.css('display', 'none').slice(startAt, endOn).show();

                    if (page >= 1) {
                        pager.find('.prev_link').show();
                    }
                    else {
                        pager.find('.prev_link').hide();
                    }

                    if (page < (numPages - 1)) {
                        pager.find('.next_link').show();
                    }
                    else {
                        pager.find('.next_link').hide();
                    }

                    pager.data("curr", page);

                    if (settings.numbersPerPage > 1) {
                        $('.page_link').hide();
                        $('.page_link').slice(page, settings.numbersPerPage + page).show();
                    }

                    pager.children().removeClass("active");
                    pager.children().eq(page + 1).addClass("active");

                }
            };
        },

        _scroll: function () {

            var dataUL = $(".ui-autocomplete.ui-front.ui-menu.ui-widget.ui-widget-content.ui-corner-all");

            $.each(dataUL, function (i, values) {
                values = $(values);
                var itemsUL = values.children().length;
                if (itemsUL >= 10) {
                    values.css({
                        "height": "150px",
                        "overflow-x": "hidden",
                        "overflow-y": "scroll",
                        "overflow-style": "move"
                    });
                }
            });
        },

        builDatepicker: function (_control) {

            $.datepicker.regional['es'] = {
                closeText: 'Cerrar',
                prevText: '<Ant',
                nextText: 'Sig>',
                currentText: 'Hoy',
                monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                dayNames: ['Domingo', 'Lunes', 'Martes', 'MiÃ©rcoles', 'Jueves', 'Viernes', 'SÃ¡bado'],
                dayNamesShort: ['Dom', 'Lun', 'Mar', 'MiÃ©', 'Juv', 'Vie', 'Sab'],
                dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
                weekHeader: 'Sm',
                dateFormat: 'yy-mm-dd',
                firstDay: 1,
                isRTL: false,
                showMonthAfterYear: true,
                yearSuffix: ''
            };
            $.datepicker.setDefaults($.datepicker.regional['es']);

            $(_control).datepicker({
                changeYear: true,
                yearRange: '-100:+0',
                //firstDay: '1',
                maxDate: "+0D",
                defaulDate: "+1w",
                changeMonth: true,
                numberOfMonths: 1,
                dateFormat: "dd/mm/yy"
            });

            $(_control).attr("placeholder", "DD/MM/YYYY")

            $.mask.definitions['~'] = "[+-]";
            $(_control).mask("99/99/9999", {});

            //$(_control).blur(function () {
            //    $("#info").html("Unmasked value: " + $(this).mask());
            //}).dblclick(function () {
            //    $(this).unmask();
            //});


        },

        dateSystem: function () {
            var date = new Date;
            return date.toLocaleDateString();
        },

        createElement: function (element, attr, text) {
            var element = $('<' + element + '>');
            if (attr) element.attr(attr);
            if (text) element.text(text);
            return element;
        },

        validarTipoElemento: function (tipo) {
            switch (tipo) {
                case 5 || 6 || 7:
                    return "select";
                    break;
                case 8:
                    return "textarea";
                    break;
                case 18:
                    return "div";
                    break
                default:
                    return "input";
            }
        },

        validTypeInput: function (tipo) {
            switch (tipo) {
                case 1:
                    return "text";
                    break;
                case 2:
                    return "text";
                    break;
                case 17:
                    return "text";
                    break;
                case 3:
                    return "text";
                case 11:
                    return "radio";
                    break;
                case 12:
                    return "email";
                    break;
                case 13:
                    return "file";
                    break;
                case 16:
                    return "text";
                    break;
                case 19:
                    return "time";
                    break;
                case 21:
                    return "button";
                    break;
                case 22:
                    return "checkbox";
                    break;
                default:
            }
        },

        eventClick: function (btn, event) {
            //console.log("ingresa envento click");
            btn = $(btn),
            btn.on("click", event);

        },

        _keypress: function (e) {
            var _this = $(e.currentTarget);
        },

        eventKeypress: function (element, funcion) {
            element = $(element);
            //element.on("keyup", funcion);
            element.keyup(funcion);
        },

        eventOnFocus: function (elemento, event) {
            elemento = $(elemento);
            //console.log("entra focus in");
            //elemento.on("focusin", event);
            elemento.focusin(event);
        },

        eventOutFocus: function (elemento, event) {
            elemento = $(elemento);
            //console.log("entra focus OUT");
            elemento.on("focusout", event);
        },

        eventBlur: function (elemento, event) {
            elemento = $(elemento);
            //console.log("entra blur");
            elemento.blur(event);
        },

        funcionRegla: function (elemento, funccion, evento) {
            elemento = $(elemento);
            elemento.on(evento, funccion);
        },

        builModelDialog: function (elemento, open, buttons, width, height) {

            $(elemento).dialog({
                resizable: false,
                height: height,
                width: width,
                modal: true,
                autoOpen: open,
                buttons: buttons
            });
        },

        builResizable: function (elemento, elementoContinuo) {
            $(elemento).resizable({
                grid: 50,
                alsoResize: "#" + $(elementoContinuo).attr("id")
            });
            $(elementoContinuo).resizable();
        },

        builObjectCaptura: function (values, solicitud, formulario, usuarioID, indiceGrilla, indiceTitular, dataId) {

            var objetoCaptura = {};
            if (dataId == null)
                dataId = values.context.localName == "option" ? values.parent().attr("data-id") : values.attr("data-id");

            objetoCaptura = {
                "IdSolicitud": solicitud,
                "IdFormulario": formulario,
                "IdUsuario": usuarioID,
                "IdCampo": dataId,
                "IdUsuario": usuarioID,
                "IndiceGrilla": indiceGrilla,
                "IndiceTitular": indiceTitular,
                "Valor": values.val(),
                "Fecharegistro": new Date()
            }
            if (indiceGrilla != null) {
                indiceGrilla++;
            }

            return objetoCaptura;
        },

        //--------------------------------------  Remplazar templates   ----------------------------------///

        newGrillaPrincipal: function (contentTemp, _idTable, _idTr) {

            contentTemp = contentTemp.replace(/{{NomGrillaPrincipal}}/ig, _idTable).replace(/{{columCampo}}/ig, _idTr);
            return contentTemp;
        },

        newTdContentGrillaCampo: function (tempTd, _idDivContentGrillaCampo, _tdCamposText) {
            tempTd = tempTd.replace(/{{divContentGrillaCampo}}/ig, _idDivContentGrillaCampo)
            .replace(/{{tdCamposText}}/ig, _tdCamposText);
            return tempTd;
        },

        newGrilla: function (contentTemp, dataId, lblDescripcion, _tempFilas, idAddFila, _dobleCaptura, _typeInput, _obligatoria, _MaxLong, _txtTotalColum, _idTotalColum) {
            contentTemp = contentTemp.replace(/{{dataId}}/ig, dataId)
            .replace(/{{lblNomColum}}/ig, lblDescripcion)
            .replace(/{{tempFilas}}/ig, _tempFilas)
            .replace(/{{idAddFila}}/ig, idAddFila)
            .replace(/{{dobleCaptura}}/ig, _dobleCaptura)
            .replace(/{{typeInput}}/ig, _typeInput)
            .replace(/{{obligatoria}}/ig, _obligatoria)
            .replace(/{{MaxLong}}/ig, _MaxLong)
            .replace(/{{txtTotalColum}}/ig, _txtTotalColum)
            .replace(/{{idTotalColum}}/ig, _idTotalColum);
            return contentTemp;
        },

        newTrGrilla: function (temp, _typeInput, _idDeleteFila, _nameInput, _obligatoria, _MaxLong, _idInput) {
            temp = temp.replace(/{{typeFila}}/ig, _typeInput)
            .replace(/{{idDeleteFila}}/ig, _idDeleteFila)
            .replace(/{{nameInput}}/ig, _nameInput)
            .replace(/{{required}}/ig, _obligatoria)
            .replace(/{{maxLong}}/ig, _MaxLong)
            .replace(/{{Idinput}}/ig, _idInput);
            return temp;
        },

        newTrUsuario: function (temp, _idTr, _lblNo, _valblUsuario, _vlblCorreo, _chkRol) {

            temp = temp.replace(/{{IdTr}}/ig, _idTr)
            .replace(/{{valblNo}}/ig, _lblNo)
            .replace(/{{valblUsuario}}/ig, _valblUsuario)
            .replace(/{{vlblCorreo}}/ig, _vlblCorreo)
            .replace(/{{chkRol}}/ig, _chkRol);
            return temp;
        },

        newTableUsuario: function (temp, _divContentTable) {

        },

        newTrConvenio: function (temp, IdTr, _lblNitEmpresa, _lblConsecutivo, _lblNomEmpresa, _lblSubProducto,
                                _lblPlazo, _lblConvenio, _lblTasa, _lblTipoCliente, _chkRol, _TipoFormula,
                                _diasVencimiento, _destino, _claseDesembolso, _migrados_a_Fabrica) {

            temp = temp.replace(/{{IdTr}}/ig, _lblNitEmpresa)
                .replace(/{{chkRol}}/ig, _chkRol)
                    .replace(/{{lblNitEmpresa}}/ig, _lblNitEmpresa)
                    .replace(/{{lblConsecutivo}}/ig, _lblConsecutivo)
                    .replace(/{{lblNomEmpresa}}/ig, _lblNomEmpresa)
                    .replace(/{{lblSubProducto}}/ig, _lblSubProducto)
                    .replace(/{{lblPlazo}}/ig, _lblPlazo)
                    .replace(/{{lblConvenio}}/ig, _lblConvenio)
                    .replace(/{{lblTasa}}/ig, _lblTasa)
                    .replace(/{{lblTipoCliente}}/ig, _lblTipoCliente)
                    .replace(/{{lblTipoFormulario}}/ig, _TipoFormula)
                    .replace(/{{lblDiasVencimiento}}/ig, _diasVencimiento)
                    .replace(/{{lblDestino}}/ig, _destino)
                    .replace(/{{lblClaseDesembolso}}/ig, _claseDesembolso)
                     .replace(/{{Migrados_a_Fabrica}}/ig, _migrados_a_Fabrica);
            return temp;
        },

        newTrConvenioConsulta: function (temp, IdTr, _lblNitEmpresa, _lblConsecutivo, _lblNomEmpresa, _lblSubProducto,
                            _lblPlazo, _lblConvenio, _lblTasa, _lblTipoCliente, _chkRol, _TipoFormula,
                            _diasVencimiento, _destino, _claseDesembolso, _digitoVerificacion, _PeriodoGracia,
                            _tipoDesembolso, _Restriccion, _factorSeguro, _retieneCuotas, _descripcion, _migrados_a_Fabrica) {

            temp = temp.replace(/{{IdTr}}/ig, _lblNitEmpresa)
                .replace(/{{chkRol}}/ig, _chkRol)
                    .replace(/{{lblNitEmpresa}}/ig, _lblNitEmpresa)
                    .replace(/{{lblConsecutivo}}/ig, _lblConsecutivo)
                    .replace(/{{lblNomEmpresa}}/ig, _lblNomEmpresa)
                    .replace(/{{lblSubProducto}}/ig, _lblSubProducto)
                    .replace(/{{lblPlazo}}/ig, _lblPlazo)
                    .replace(/{{lblCodigo}}/ig, _lblConvenio)
                    .replace(/{{lblTasa}}/ig, _lblTasa)
                    .replace(/{{lblEstado}}/ig, _lblTipoCliente)
                    .replace(/{{lblTipoFormulario}}/ig, _TipoFormula)
                    .replace(/{{lblDiasVencimiento}}/ig, _diasVencimiento)
                    .replace(/{{lblDestino}}/ig, _destino)
                    .replace(/{{lblClaseDesembolso}}/ig, _claseDesembolso)
                    .replace(/{{lblDigitoVerificacion}}/ig, _digitoVerificacion)
                    .replace(/{{lblPeriodoGracia}}/ig, _PeriodoGracia)
                    .replace(/{{lbltipoDesembolso}}/ig, _tipoDesembolso)
                    .replace(/{{lblRestriccion}}/ig, _Restriccion)
                    .replace(/{{lblfactorSeguro}}/ig, _factorSeguro)
                    .replace(/{{lblRetieneCuotas}}/ig, _retieneCuotas)
                    .replace(/{{lblDescripcion}}/ig, _descripcion)
                    .replace(/{{lblMigradoFabrica}}/ig, _migrados_a_Fabrica);


            return temp;
        },

        newLiNotificacion: function (temp, _idLi, _titulo, _descripcion) {
            temp = temp.replace(/{{li_Id}}/ig, _idLi)
               .replace(/{{titulo}}/ig, _titulo)
               .replace(/{{Descripcion}}/ig, _descripcion);
            return temp;
        },

        newTrUsuariosCreados: function (temp, _Id_TR, _lblNo, _lblUsuario, _lblCorreo, _lblRol) {
            temp = temp.replace(/{{Id_TR}}/ig, _Id_TR)
                   .replace(/{{lblNo}}/ig, _lblNo)
                   .replace(/{{lblUsuario}}/ig, _lblUsuario)
                   .replace(/{{lblCorreo}}/ig, _lblCorreo)
                   .replace(/{{idRol}}/ig, _lblRol);
            return temp;
        },

        newTrNotificaciones: function (temp, _Id_TR, _lblNo, _titulo, _descripcion, _lblOrden, idchkActivo, idImg) {
            temp = temp.replace(/{{Id_TR}}/ig, _Id_TR)
                        .replace(/{{lblNo}}/ig, _lblNo)
                        .replace(/{{lblTitulo}}/ig, _titulo)
                        .replace(/{{lblDescripcion}}/ig, _descripcion)
                        .replace(/{{lblOrden}}/ig, _lblOrden)
                        .replace(/{{chkActivo}}/ig, idchkActivo)
                        .replace(/{{idImg}}/ig, idImg);
            return temp;
        },

        newTableCompleta: function (temp, idTable, dataid) {
            temp = temp.replace(/{{idTableCompleta}}/ig, idTable)
                       .replace(/{{dataId}}/ig, dataid);

            return temp;
        },

        newTrSubproductosVehiculo: function (temp, _IdTr, _SubProducto, _Canal, _Segmento, _TipoArticulo,
            _Plazo_Min, _Plazo_Max, _Cuotas_Año, _Financiacion, _Garantia, _Campana) {

            temp = temp.replace(/{{IdTr}}/ig, _IdTr)
                        .replace(/{{SubProducto}}/ig, _SubProducto)
                        .replace(/{{Canal}}/ig, _Canal)
                        .replace(/{{Segmento}}/ig, _Segmento)
                        .replace(/{{TipoArticulo}}/ig, _TipoArticulo)
                        .replace(/{{Plazo_Min}}/ig, _Plazo_Min)
                        .replace(/{{Plazo_Max}}/ig, _Plazo_Max)
                        .replace(/{{Cuotas_Año}}/ig, _Cuotas_Año)
                        .replace(/{{Financiacion}}/ig, _Financiacion)
                        .replace(/{{Garantia}}/ig, _Garantia)
                        .replace(/{{Campana}}/ig, _Campana);

            return temp;

        },


        newTrMenuRol: function (temp, idtr, _No, menuid, _descripcion, _RolId, _NombreRol, _idChek) {
            temp = temp.replace(/{{idTr}}/ig, idtr)
            .replace(/{{No}}/ig, _No)
            .replace(/{{IdMenu}}/ig, menuid)
            .replace(/{{descripcion}}/ig, _descripcion)
            .replace(/{{RolId}}/ig, _RolId)
            .replace(/{{NombreRol}}/ig, _NombreRol)
            .replace(/{{idChek}}/ig, _idChek);

            return temp;

        }
    }

})(jQuery);


function ShowProgress() {
    setTimeout(function () {
        var modal = $('<div />');
        modal.addClass("modal");
        $('body').append(modal);
        var loading = $(".loading");
        loading.show();
        var top = Math.max($(window).height() / 2 - loading[0].offsetHeight / 2, 0);
        var left = Math.max($(window).width() / 2 - loading[0].offsetWidth / 2, 0);
        loading.css({ top: top, left: left });
    }, 200);
}

function ShowProgressCheckList() {
    setTimeout(function () {
        var modal = $('<div />');
        modal.addClass("modal");
        $('body').append(modal);
        var loading = $(".loadingCheckList");
        loading.show();
        var top = Math.max($(window).height() / 2 - loading[0].offsetHeight / 2, 0);
        var left = Math.max($(window).width() / 2 - loading[0].offsetWidth / 2, 0);
        loading.css({ top: top, left: left }).delay(800);
    }, 200);
}

function ShowProgressAntara() {
    setTimeout(function () {
        var modal = $('<div />');
        modal.addClass("modal");
        $('body').append(modal);
        var loading = $("#LoadingOficina");
        loading.show();
        var top = Math.max($(window).height() / 2 - loading[0].offsetHeight / 2, 0);
        var left = Math.max($(window).width() / 2 - loading[0].offsetWidth / 2, 0);
        loading.css({ top: top, left: left }).delay(800);
    }, 200);
}