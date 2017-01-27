(function () {
    var _RRHH = {

        loadPages: function () {
            $(document).ready(function () {
            });

        },

        init: function () {
            transact.ajaxGET("/Productos/CamposDelFormulario?IdFormulario=6&IdCampoCompuesto=0", null, _RRHH.successCampos, _RRHH.error);
        },

        successCampos: function (data) {
            ShowProgressAntara();
            _ui.configCampo($("#contentCampos"), data, 6);
            _uiStatic.buildCombobox();
            $("input[type='text'], textarea, select").addClass("form-control");

            $("#LoadingOficina").delay(3000).fadeOut("slow");
        },

        error: function (error) {
            ShowProgressAntara();
            console.log('No se crearon los campos porque: ' + error);
            $("#LoadingOficina").delay(3000).fadeOut("slow");
        },


    }
    _RRHH.init();
    _RRHH.loadPages();

})();









