var _grilla = null;
(function () {

    _grilla = window._grilla = {

        buildGrillaHTML: function (that, tabla, data, columNameObject, titulo) {

            var newObj = {
                //width: 900, height: 460, sortIndx: 0,
                title: "<b>" + titulo + "</b>",
                selectionModel: { type: 'row' },
                editModel: { saveKey: 13 },
                freezeCols: 1,
                resizable: true,
                editable: false,
                flexHeight: true,
                flexWidth: true,
               scrollModel: { pace: 'fast', horizontal: false }
            };

            newObj.dataModel = { data: data, paging: "local", rPP: 15, rPPOptions: [10, 15, 20, 50, 100] };
            newObj.colModel = columNameObject;


            $grid = $("#content_tableHTML").pqGrid(newObj);
        },

    }


})();