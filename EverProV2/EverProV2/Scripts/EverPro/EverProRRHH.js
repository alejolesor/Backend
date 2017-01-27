(function () {
    var _RRHH = {

        loadPages: function () {
            $(document).ready(function () {
               

            });

        },

        init: function () {
            transact.ajaxGET("/Productos/CamposDelFormulario?IdFormulario=4&IdCampoCompuesto=0", null, _RRHH.successCampos, _RRHH.error);
        },

        successCampos: function (data) {
            ShowProgressAntara();
            _ui.configCampo($("#contentCampos"), data, 4);
            _uiStatic.buildCombobox();
            $("input[type='text'], textarea, select").addClass("form-control");
            $("select").addClass("divSelects");

            $("#FECHADENACIMIENTO").on("change", _rules.ageRole);
            $("#TELEFONODECONTACTO").removeAttr("required");

            $("#LoadingOficina").delay(3000).fadeOut("slow");
            $("#LOCALIDAD").next().find("input[autocomplete='off']").val('');
    
    



        },

        error: function (error) {
            ShowProgressAntara();
            console.log('No se crearon los campos porque: ' + error);
            $("#LoadingOficina").delay(1000).fadeOut("slow");
        },


    }
    _RRHH.init();
    _RRHH.loadPages();




    function confirmarGuardado(Titulo, Mensaje, Tipo, url) {
        swal({
            title: Titulo,
            text: Mensaje,
            type: Tipo
        },
           function () {
               if (url != '') {
                   document.location.href = url//window.location.reload();
               }
           });
    }


})();









