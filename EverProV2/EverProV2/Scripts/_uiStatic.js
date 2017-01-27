/*
* Autor : Elena Parra
* Version: 1.0
*   _uiStatic administras todas la funciones complementarias y repetitivas  del _ui.
*/
var _uiStatic = null;
(function ($) {

    _uiStatic = window._uiStatic = {

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
                            _ui.selectChangeAutoComplete(event);
                        },

                        autocompletechange: "_removeIfInvalid"
                    });
                },

                _createShowAllButton: function () {
                    var input = this.input,
                      wasOpen = false;

                    $("<a>")
                      .attr("tabIndex", -1)
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
            $(_control).datepicker({
                maxDate: "+0D",
                defaulDate: "+1w",
                changeMounth: true,
                numberOfMonths: 1,
                dateFormat: "dd/mm/yy"
            });

            $(_control).attr("placeholder", "DD/MM/YYYY")

            $.mask.definitions['~'] = "[+-]";
            $(_control).mask("99/99/9999", {});

            $(_control).blur(function () {
                $("#info").html("Unmasked value: " + $(this).mask());
            }).dblclick(function () {
                $(this).unmask();
            });

        },

        builDatepickerWeek: function (_control, controlDateIni, controlDateFin, funcionAdicional) {
            var startDate;
            var endDate;

            var selectCurrentWeek = function (date) {
                window.setTimeout(function () {
                    $(_control).find('.ui-datepicker-current-day a').addClass('ui-state-active');

                    if ($("#ui-datepicker-div .ui-datepicker-calendar tr").length > 1) {

                        //$("#ui-datepicker-div .ui-datepicker-calendar tr").on("mousemove", function () {
                        //    $(this).find("td a").addClass("ui-state-hover");
                        //});

                        //$("#ui-datepicker-div .ui-datepicker-calendar tr").on("mouseleave", function () {
                        //    $(this).find("td a").removeClass("ui-state-hover");
                        //});
                    }

                }, 1);


                $.each($("#ui-datepicker-div .ui-datepicker-calendar tr"), function (i, values) {
                    $.each(values.children, function (j, td) {

                        if ($($(td)[0]).text() == $.datepicker.iso8601Week(date)) {
                            $(values).find("td[data-handler='selectDay']")
                                .addClass("ui-datepicker-unselectable").addClass("ui-state-disabled");
                        }

                    })
                });
            }

            $(_control).datepicker({
                defaultDate: "+1w",
                changeMounth: true,
                numberOfMonths: 1,
                showWeek: true,
                showOtherMonths: true,
                selectOtherMonths: true,
                dateFormat: "dd/mm/yy",
                onSelect: function (dateText, inst) {
                    var date = $(this).datepicker('getDate');
                    startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
                    endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 6);
                    var dateFormat = inst.settings.dateFormat || "dd/mm/yy";
                    $(controlDateIni).val($.datepicker.formatDate(dateFormat, startDate, inst.settings));
                    $(controlDateFin).val($.datepicker.formatDate(dateFormat, endDate, inst.settings));

                    if (funcionAdicional != undefined)
                        funcionAdicional();

                    selectCurrentWeek(date);
                },
                beforeShowDay: function (date) {
                    var cssClass = '';
                    if (date >= startDate && date <= endDate)
                        cssClass = 'ui-datepicker-current-day';
                    return [true, cssClass];
                }             
            });

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

                case 13:
                    return "file";
                    break;
                case 18:
                    return "div";
                    break;
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
                case 4:
                    return "text";
                    break;
                case 12:
                    return "email";
                case 11:
                    return "text";
                    break;
                case 16:
                    return "text";
                    break;
                case 13:
                    return "file";
                    break
                default:
            }
        },

        eventClick: function (btn, event) {
            btn = $(btn),
            btn.on("click", event);

        },

        eventKeypress: function (element, funcion) {
            element = $(element);
            //element.on("keyup", funcion);
            element.keyup(funcion);
        },

        eventOnFocus: function (elemento, event) {
            elemento = $(elemento);
            elemento.focusin(event);
        },

        eventOutFocus: function (elemento, event) {
            elemento = $(elemento);
            elemento.on("focusout", event);
        },

        eventBlur: function (elemento, event) {
            elemento = $(elemento);
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
                buttons: buttons,
                show: {
                    effect: "blind",
                    duration: 500
                },
                hide: {
                    effect: "explode",
                    duration: 500
                }
            });
        },

        builModelDialogDetalle: function (elemento, autoOpen, open, close, buttons, width, height) {

            $(elemento).dialog({
                resizable: false,
                height: height,
                width: width,
                modal: true,
                autoOpen: autoOpen,
                open: open,
                close: close,
                buttons: buttons,
                show: {
                    effect: "blind",
                    duration: 500
                },
                hide: {
                    effect: "explode",
                    duration: 500
                }
            });
        },

        builResizable: function (elemento, elementoContinuo) {
            $(elemento).resizable({
                grid: 50,
                alsoResize: "#" + $(elementoContinuo).attr("id")
            });
            $(elementoContinuo).resizable();
        },

    }


})(jQuery);