(function () {
    var _CargueArchivos = {

        loadPages: function () {
            $(document).ready(function () {


            });

        },

        init: function () {
            transact.ajaxGET("/Productos/CamposDelFormulario?IdFormulario=1&IdCampoCompuesto=0", null, _CargueArchivos.successCampos, _CargueArchivos.error);
        },

        successCampos: function (data) {
             ShowProgressAntara();
            _ui.configCampo($("#contentCampos"), data, 1);
            _uiStatic.buildCombobox();

            $("#btnCargar").hide();
            $("input[type='text'], textarea, select, input[type='file']").addClass("form-control").addClass("anchoFile");
            $("#Area").attr('data-work', 'Area_cargue');
            $("#Area").attr('name', 'lst_1');
           
            setTimeout(function () {
                $(".custom-combobox-input").val("Seleccione...");
            },4000);

            $("#Producto").attr('data-work', 'Producto_cargue');
            $("#Lider").attr('data-work', 'Lider_cargue');
            $("#Lider").attr('name', 'lst_2');

            $("#Archivo").attr('name', 'Archivo');
            
            $("#Archivo, #NombreFile").addClass("tamanocampos")


            $("#Archivo").change(function () {
                var archivo = $("#Archivo").val().split('\\');
                var nomArchivo = archivo[archivo.length - 1];
            
                var nomFile = $("#NombreFile").val();

                if (nomArchivo == nomFile) {
                    $("#btnCargar").show();

                }
            });

               $("#Archivo").on("click", function () {
                $("#btnCargar").hide();
            });
           
            $("#btnCargar").on("click",function () {

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
    _CargueArchivos.init();
    _CargueArchivos.loadPages();

})();









