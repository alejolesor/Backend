(function () {
    var _LideresInfo = {

        loadPages: function () {
            $(document).ready(function () {


            });

        },

        init: function () {
            transact.ajaxGET("/Productos/CamposDelFormulario?IdFormulario=2&IdCampoCompuesto=0", null, _LideresInfo.successCampos, _LideresInfo.error);
        },

        successCampos: function (data) {
            ShowProgressAntara();
            _ui.configCampo($("#contentCampos"), data, 2);
            _uiStatic.buildCombobox();

            $("#btnCargar").hide();
            $("input[type='text'], textarea, select, input[type='file']").addClass("form-control").addClass("anchoFile");
            $("#Area").attr('data-work', 'Area_Info');
            $("#Area").attr('name', 'lst_4');

            setTimeout(function () {
                $(".custom-combobox-input").val("Seleccione...");
            }, 3000);

            $("#Producto").attr('data-work', 'Producto_Info');
            $("#Lider").attr('data-work', 'Lider_Info');
            $("#Lider").attr('name', 'lst_7');

            $("#Archivo").attr('name', 'Archivo');



            $("#Archivo").change(function () {
                var archivo = $("#Archivo").val().split('\\');
                var nomArchivo = archivo[archivo.length - 1];

                var nomFile = $("#NombreFile").val();

                if (nomArchivo == nomFile) {
                    $("#btnCargar").show();

                }
            });

            $("#btnCargar").on("click", function () {

                $("#Area").find(':selected').attr("value", $("#Area").find(':selected').attr("data-Codigo"));
            });


            $("#LoadingOficina").delay(3000).fadeOut("slow");

        },

        error: function (error) {
            ShowProgressAntara();
            console.log('No se crearon los campos porque: ' + error);
            $("#LoadingOficina").delay(1000).fadeOut("slow");
        },

    }
    _LideresInfo.init();
    _LideresInfo.loadPages();

})();









