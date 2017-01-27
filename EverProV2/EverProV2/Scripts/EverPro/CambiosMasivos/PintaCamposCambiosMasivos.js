(function () {
    var _RRHH = {

        loadPages: function () {
            $(document).ready(function () {
            });

        },

        init: function () {
            transact.ajaxGET("/Productos/CamposDelFormulario?IdFormulario=7&IdCampoCompuesto=0", null, _RRHH.successCampos, _RRHH.error);
        },

        successCampos: function (data) {
            _ui.configCampo($("#contentCampos"), data, 7);
            _uiStatic.buildCombobox();
            $("input[type='text'], textarea, select").addClass("form-control");
            $("#divCampos1").append("<div class='col-md-2'>"
                         +"<input type='button' name='btnConsultar' id='btnConsultar' value='::Consultar::' class='btn btn-login' style='width: auto' />"
                         + "</div>");
            //$("#AREA").attr('data-work', 'Area_Masivos');
            //$("#LIDERSGD").attr('data-work', 'LideresSGD_Masivos');
            
            $("#divContentCampo_Form7_3").hide();
            $("#divContentCampo_Form7_4").hide();
        },


        error: function (error) {
            console.log('No se crearon los campos porque: ' + error);
        },


    }
    _RRHH.init();
    _RRHH.loadPages();

})();









