var _grilla = null;
(function ($) {

    _grilla = window._grilla = {

        contador: 1,
        $grid: null,
        pqSearch: {
            txt: "",
            rowIndices: [],
            curIndx: null,
            colIndx: 0,
            sortIndx: null,
            sortDir: null,
            results: null,

            prevResult: function () {
                var colIndx = this.colIndx,
                    rowIndices = this.rowIndices;
                if (rowIndices.length == 0) {
                    this.curIndx = null;
                }
                else if (this.curIndx == null || this.curIndx == 0) {
                    this.curIndx = rowIndices.length - 1;
                }
                else {
                    this.curIndx--;
                }
                this.updateSelection(colIndx);
            },

            nextResult: function () {
                //debugger;
                var rowIndices = this.rowIndices;
                if (rowIndices.length == 0) {
                    this.curIndx = null;
                }
                else if (this.curIndx == null) {
                    this.curIndx = 0;
                }
                else if (this.curIndx < rowIndices.length - 1) {
                    this.curIndx++;
                }
                else {
                    this.curIndx = 0;
                }
                this.updateSelection();
            },

            updateSelection: function () {
                var colIndx = this.colIndx,
                    curIndx = this.curIndx,
                    rowIndices = this.rowIndices;
                if (rowIndices.length > 0) {
                    //results.html("Selected " + (curIndx + 1) + " , "+ rowIndx[curIndx] +" of " + rowIndx.length + " matche(s).");
                    this.results.html("Selected " + (curIndx + 1) + " of " + rowIndices.length + " match(es).");
                }
                else {
                    this.results.html("Nothing found.");
                }
                $grid.pqGrid("setSelection", null);
                //$grid.pqGrid("option", "customData", { foundRowIndices: rowIndices, txt: this.txt, searchColIndx: colIndx });
                //$grid.pqGrid("refreshColumn", { colIndx: colIndx });
                $grid.pqGrid("setSelection", { rowIndx: rowIndices[curIndx], colIndx: colIndx });
            },

            search: function (input, select, $grid) {

                var txt = $(input).val().toUpperCase(),//$("#txtSerch").val().toUpperCase(),
                    colIndx = $(select).val(),//$("#slcSerch").val(),
                    DM = $grid.pqGrid("option", "dataModel"),
                    sortIndx = DM.sortIndx,
                    sortDir = DM.sortDir;

                if (txt == this.txt && colIndx == this.colIndx && sortIndx == this.sortIndx && sortDir == this.sortDir) {
                    return;
                }
                this.rowIndices = [], this.curIndx = null;
                this.sortIndx = sortIndx;
                this.sortDir = sortDir;
                if (colIndx != this.colIndx) {
                    //clean the prev column.
                    //$grid.pqGrid("option", "customData", { foundRowIndices: [], txt: "", searchColIndx: colIndx });
                    $grid.pqGrid("option", "customData", null);
                    $grid.pqGrid("refreshColumn", { colIndx: this.colIndx });
                    this.colIndx = colIndx;
                }
                //debugger;

                if (txt != null && txt.length > 0) {
                    txt = txt.toUpperCase();
                    //this.colIndx = $("select#pq-crud-select-column").val();

                    var data = DM.data;
                    //debugger;
                    for (var i = 0; i < data.length; i++) {
                        var row = data[i];
                        var cell = row[this.colIndx].toUpperCase();
                        if (cell.indexOf(txt) != -1) {
                            this.rowIndices.push(i);
                        }
                    }
                }
                $grid.pqGrid("option", "customData", { foundRowIndices: this.rowIndices, txt: txt, searchColIndx: colIndx });
                $grid.pqGrid("refreshColumn", { colIndx: colIndx });
                this.txt = txt;
            },

            render: function (ui) {
                var rowIndxPage = ui.rowIndxPage,
                rowIndx = ui.rowIndx,
                //data = ui.dataModel.data,
                rowData = ui.rowData,
                dataIndx = ui.dataIndx,
                colIndx = ui.colIndx,
                val = rowData[dataIndx];
                //debugger;
                if (ui.customData) {

                    var rowIndices = ui.customData.foundRowIndices,
                    searchColIndx = ui.customData.searchColIndx,
                    txt = ui.customData.txt,
                    txtUpper = txt.toUpperCase(),
                    valUpper = val.toUpperCase();
                    if ($.inArray(rowIndx, rowIndices) != -1 && colIndx == searchColIndx) {
                        var indx = valUpper.indexOf(txtUpper);
                        if (indx >= 0) {
                            var txt1 = val.substring(0, indx);
                            var txt2 = val.substring(indx, indx + txt.length);
                            var txt3 = val.substring(indx + txt.length);
                            return txt1 + "<span style='background:yellow;color:#333;'>" + txt2 + "</span>" + txt3;
                        }
                        else {
                            return val;
                        }
                    }
                }
                return val;
            }

        },

        buildGrillaHTML: function (that) {

            var tbl = $("#tableHTML");
            var obj = $.paramquery.tableToArray(tbl);
            var newObj = {
                //width: 900, height: 460, sortIndx: 0,
                title: "<b>Actividades Diarias</b>",
                selectionModel: { type: 'row' },
                editModel: { saveKey: 13 },
                freezeCols: 1,
                resizable: true,
                editable: false,
                flexHeight: true,
                flexWidth: true,
                scrollModel: { pace: 'fast', horizontal: false }
            };
            newObj.dataModel = { data: obj.data, paging: "local", rPP: 15, rPPOptions: [10, 15, 20, 50, 100] };
            newObj.colModel = obj.colModel;



            for (var i = 0; i < newObj.colModel.length ; i++) {
                var width = 140;
                if (i == 0) width = 80;
                if (i == 0 || i == 1) newObj.colModel[i].hidden = true;
                if (i == 6 || i == 7 || i == 8) width = 80
                $.extend(newObj.colModel[i], {
                    width: width,
                    render: function (ui) {
                        return _grilla.pqSearch.render(ui);
                    }
                });
            }

            $("#content_tableHTML").on("pqgridrender", function (evt, obj) {
                if ($("#contentSearch input[type='text']").length < 1) {

                    var $toolbar = $("<div class='pq-grid-toolbar pq-grid-toolbar-search' id='contentSearch'></div>").appendTo($(".pq-grid-top", this));

                    $("<span class='pq-separator'></span>").appendTo($toolbar);

                    $("<span value='Show Popup'>: : Detalle : : </span>").appendTo($toolbar).button({
                        icons: {
                            primary: "ui-icon-search"
                        }
                    }).click(function (evt) {
                        _grilla.detalleRow();
                    });

                    $("<span> : : Eliminar : :</span>").appendTo($toolbar).button({
                        icons: {
                            primary: "ui-icon-circle-minus"
                        }
                    }).click(function () {
                        _grilla.deleteRow();
                    });

                    $("<span>: : Editar : :</span>").appendTo($toolbar).button({
                        icons: {
                            primary: "ui-icon-pencil"
                        }
                    }).click(function () {
                        _grilla.editRow();
                    });

                    $toolbar.disableSelection();
                }

            });

            ///refresh the search after grid sort.
            $("#content_tableHTML").on("pqgridsort", function (evt, obj) {
                _grilla.pqSearch.search($("#txtSerch"), $("#slcSerch"), $("#content_tableHTML"));
                _grilla.pqSearch.nextResult();
            });
            //change the message after change in selection.
            $("#content_tableHTML").on("pqgridrowselect pqgridcellselect", function (evt, obj) {
                if (evt.originalEvent && evt.originalEvent.type == "click") {
                    if (_grilla.pqSearch.rowIndices.length > 0) {
                        _grilla.pqSearch.results.html(_grilla.pqSearch.rowIndices.length + " match(es).");
                    }
                }
            });

            $grid = $("#content_tableHTML").pqGrid(newObj);
            tbl.css("display", "none");

        },

        getRowIndx: function () {
            var $grid = $("#content_tableHTML");

            // var obj = $grid.pqGrid("getSelection");
            //debugger;
            var arr = $grid.pqGrid("selection", {
                type: 'row',
                method: 'getSelection'
            });
            if (arr && arr.length > 0) {
                var rowIndx = arr[0].rowIndx;

                //if (rowIndx != null && colIndx == null) {
                return rowIndx;
            } else {
                alert("Select a row.");
                return null;
            }
        },

        getRowIndxDetalle: function () {
            var $grid = $("#content_tableHTML_Detalle");

            // var obj = $grid.pqGrid("getSelection");
            //debugger;
            var arr = $grid.pqGrid("selection", {
                type: 'row',
                method: 'getSelection'
            });
            if (arr && arr.length > 0) {
                var rowIndx = arr[0].rowIndx;

                //if (rowIndx != null && colIndx == null) {
                return rowIndx;
            } else {
                alert("Select a row.");
                return null;
            }
        },

        deleteRow: function () {
            var rowIndx = _grilla.getRowIndx();
            if (rowIndx != null) {

                var tbl = $("#tableHTML");
                var DM = $grid.pqGrid("option", "dataModel");

                transact.ajaxDELETE("/api/ActividadDiaria?id=" + DM.data[rowIndx][0], null, function (data) { alert("Actividad Eliminada") }, function (error) {
                    alert("Error en el proceso, \n intente mas tarde");
                });

                DM.data.splice(rowIndx, 1);
                $grid.pqGrid("refreshDataAndView");
                $grid.pqGrid("setSelection", {
                    rowIndx: rowIndx
                });

                tbl.children().children()[rowIndx].remove();
            }
        },

        deleteRowDetalle: function () {

            var rowIndx = _grilla.getRowIndxDetalle();

            if (rowIndx != null) {

                var $grid = $("#content_tableHTML_Detalle");

                var tbl = $("#ContentReportActividadDiaria_Detalle .pq-grid-table.pq-grid-td-border-right.pq-grid-td-border-bottom ");

                var DM = $grid.pqGrid("option", "dataModel");

                transact.ajaxDELETE("/api/ActividadDiaria?id=" + DM.data[rowIndx].ActividadDiariaId, null, function (data) { alert("Actividad Eliminada") }, function (error) {
                    alert("Error en el proceso, \n intente mas tarde");
                });

                DM.data.splice(rowIndx, 1);
                $grid.pqGrid("refreshDataAndView");
                $grid.pqGrid("setSelection", {
                    rowIndx: rowIndx
                });

                tbl.children().children()[rowIndx].remove();
            }

        },

        detalleRow: function () {
            var rowIndx = _grilla.getRowIndx();
            if (rowIndx != null) {
                var DM = $grid.pqGrid("option", "dataModel");

                transact.ajaxGET("/api/ActividadDiaria?numActivdad=" + DM.data[rowIndx][1], null,
                     _grilla.buildGrillaDetalle, function (error) { });
            }
        },

        editRow: function () {
            var rowIndx = _grilla.getRowIndx();
            if (rowIndx != null) {
                var tbl = $("#tableHTML");
                var DM = $grid.pqGrid("option", "dataModel");
                var row = DM.data[rowIndx];
                console.log(row);
                $("#btnRegistrar").css("display", "none");
                $("#btnActualizar").css("display", "block");

                //Tiempo
                $("#47").val(row[6]);
                //Area
                var area = $.fn._fx.searchValueOption($("#36"), row[2])
                $("#36 > option[value='" + area + "']")[0].selected = true
                $("#36").parent().find("input").val(row[2]);
                //Procesos
                _grilla.cargarListas($("#37"), area);
                var proceso = $.fn._fx.searchValueOption($("#37"), row[3])
                $("#37 > option[value='" + proceso + "']")[0].selected = true
                $("#37").parent().find("input").val(row[3]);
                //Actividad
                _grilla.cargarListas($("#38"), proceso);
                var actividad = $.fn._fx.searchValueOption($("#38"), row[4])
                $("#38 > option[value='" + actividad + "']")[0].selected = true
                $("#38").parent().find("input").val(row[4]);
                //Producto
                _grilla.cargarListas($("#48"), actividad);
                var producto = $.fn._fx.searchValueOption($("#48"), row[5]);
                $("#48 > option[value='" + producto + "']")[0].selected = true
                $("#48").parent().find("input").val(row[5]);
                //Proctividad
                $("#49").val(row[7]);
                //ActividadDiariaId
                $("#txtActividadId").val(row[0]);

                transact.ajaxGET("/api/ActividadDiaria?numActivdad=" + row[1], null,
                   _grilla.cargarGrillaParaEditar, function (error) { }, null, false);

                $("#hModoEditar").val("true");
                $("#hVistaEditarActividadDiaria").val("true");
            }
        },

        buildGrillaDetalle: function (data) {
            var Obj = {
                //width: 900, height: 460, sortIndx: 0,
                title: "<b>Detalle</b>",
                selectionModel: { type: 'row' },
                editModel: { saveKey: 13 },
                freezeCols: 1,
                resizable: true,
                editable: false,
                flexHeight: true,
                flexWidth: true,
                scrollModel: { pace: 'fast', horizontal: false }
            };
            Obj.dataModel = {
                data: data, paging: "local", rPP: 10, rPPOptions: [10, 15, 20, 50, 100]
            };

            Obj.colModel = [{ title: "ActividadId", width: 100, dataType: "integer", dataIndx: "ActividadDiariaId" },
                       { title: "numActividad", width: 100, dataType: "integer", dataIndx: "NumActividad" },
                       { title: "Tipo inactividad", width: 150, dataType: "string", align: "center", dataIndx: "TipoInactividad" },
                       { title: "Inactividad", width: 180, dataType: "string", align: "center", dataIndx: "Inactividad" },
                       { title: "Tiempos Inactividad", width: 180, dataType: "string", align: "center", dataIndx: "Tiempo" }];

            Obj.colModel[0].hidden = true;
            Obj.colModel[1].hidden = true;

            $("#content_tableHTML_Detalle").on("pqgridrender", function (evt, obj) {

                if ($("#contentSearch_Detalle span[role='button'] ").length < 1) {

                    var $toolbar = $("<div class='pq-grid-toolbar pq-grid-toolbar-crud'  id='contentSearch_Detalle' ></div>").appendTo($(".pq-grid-top", this));
                    $("<span>: : Eliminar : : </span>").appendTo($toolbar).button({ icons: { primary: "ui-icon-circle-minus" } }).click(function () {
                        _grilla.deleteRowDetalle();
                    });
                    $toolbar.disableSelection();
                }
            });


            $("#ContentReportActividadDiaria_Detalle").dialog({

                height: 300,
                width: 600,
                create: function (evt, ui) {
                    $(this).detach().appendTo($("<input type='button'>"));

                },
                open: function (evt, ui) {

                    var $grid = $("#content_tableHTML_Detalle");
                    var ht = $grid.parent().height() - 2;
                    var wd = $grid.parent().width() - 2;
                    //alert("ht=" + ht + ", wd=" + wd);                        
                    if ($grid.hasClass('pq-grid')) {
                        $grid.pqGrid("option", { height: ht, width: wd });
                    }
                    else {
                        Obj.width = wd;
                        Obj.height = ht;
                        $grid.pqGrid(Obj);
                    }
                    //refresh the selections made before closing grid if any.
                    $grid.pqGrid("selection", { type: 'cell', method: 'refresh' });
                    return true;
                },
                close: function () {
                    var $grid = $("#content_tableHTML_Detalle");
                    $grid.pqGrid('destroy');
                },
                resizeStop: function (evt, ui) {
                    var $grid = $("#content_tableHTML_Detalle");
                    var ht = $grid.parent().height();
                    var wd = $grid.parent().width();
                    $grid.pqGrid("option", { height: ht - 2, width: wd - 2 });
                },
                show: {
                    effect: "blind",
                    duration: 500
                },
                hide: {
                    effect: "explode",
                    duration: 500
                }
            });

            $("#ContentReportActividadDiaria_Detalle").dialog("open");
        },

        cargarListas: function (elemento, padre) {
            _ui.configDataCampos($(elemento),
                                      parseInt($(elemento).attr("tipoCampo")),
                                       $("#clienteId").val(),
                                      "/api/ListaCampos?padre=" + padre + "&editar=false&cliente=", true, true);
        },

        cargarGrillaParaEditar: function (data) {
            var contador = 1;
            $("#bodyGillas").attr("data-row", 1)
            $.each(data, function (j, values) {

                var objectTargetHTML = $("#bodyGillas").children().last().html();

                var nameLastChild = $("#bodyGillas").children().attr("id");
                var nameRow = nameLastChild.substring(0, 5) + (parseInt($("#bodyGillas").attr("data-row")) + 1);

                var row = _uiStatic.createElement("tr", { "id": nameRow }, "");

                $("#bodyGillas").prepend(row);

                $("#" + nameRow).append("<td class='ocultar'><input type='hidden' name='actividadIdRow_" + nameRow + "' value='" + data[j].ActividadDiariaId + "'class='ocultar'></td>");

                $("#" + nameRow).append(objectTargetHTML);

                $.each($("#" + nameRow).children(), function (i, tdRow) {

                    var name = $(tdRow).find("select,input").first().attr("name");
                    $(tdRow).attr("id", "tdCampo_" +
                            $(tdRow).find("select,input").first().attr("id") + "_"
                            + (parseInt(nameLastChild.substring(5, 6)) + 1))
                    var newName;
                    if (name != undefined) {
                        newName = $(tdRow).find("select,input").first().attr("type") == "hidden" ? name.substring(0, 20) + (parseInt($("#bodyGillas").attr("data-row")) + 1)
                                                                    : name.substring(0, 7) + (parseInt($("#bodyGillas").attr("data-row")) + 1);

                        $(tdRow).find("select,input").first().attr("name", newName);
                    }

                    if ($(tdRow).find("select,input").first().attr("id") == 53)
                        $(tdRow).find("select,input").first().val(data[j].Tiempo);

                    var elemento = $("[name='" + newName + "']");
                    if ($(elemento).attr("tipoCampo") == 5) {

                        $(tdRow).find("select").combobox();
                        $(tdRow).find(".custom-combobox").last().remove();

                        //Se busca el id del campo 
                        if ($(elemento).attr("id") == 51) {
                            var TipoInactividad = $.fn._fx.searchValueOption($("[name='" + newName + "']"), data[j].TipoInactividad);
                            $("[name='" + newName + "'] > option[value='" + TipoInactividad + "']")[0].selected = true
                            $("[name='" + newName + "']").parent().find("input").val(data[j].TipoInactividad);

                        } else if ($(elemento).attr("id") == 52) {
                            var Inactividad = $.fn._fx.searchValueOption($("[name='" + newName + "']"), data[j].Inactividad);
                            $("[name='" + newName + "'] > option[value='" + Inactividad + "']")[0].selected = true
                            $("[name='" + newName + "']").parent().find("input").val(data[j].Inactividad);
                        }
                    }

                });

                $("#bodyGillas").attr("data-row", contador + 1);
                contador++;

                $("#" + nameRow + " input,select").change(_grilla.campoEditadoVistaActividadDiaria);
            });

            //Agreg una etiqueda que indica que el primero 
            $("#bodyGillas #trRow1").prepend("<td class='ocultar'><input type='hidden' name='actividadIdRow_trRow1' value='" + 0 + "'class='ocultar'></td>");

        },

        campoEditadoVistaActividadDiaria: function (e) {
            _this = $(e.currentTarget);
            var name = $(_this)[0].name;
            var arrayCamposStatic = ["55", "56", "57", "58", "54", "59"];
            if (arrayCamposStatic.indexOf(name) == -1) {
                $(_this)[0].name = name.indexOf("editado") >= 0 ? $(_this)[0].name : "editado_" + _this.attr("name");
            }

        },




    }

})(jQuery);