//Funcion llenar Listas Padre e hijo
function llenarListasPadreHijo(campoCiudad, valor) {
    var departamento = document.getElementById(valor).value;
    if (departamento == "-1") {
        var CampoCiudad = document.getElementById(campoCiudad);
        CampoCiudad.options.length = 0;
    }
    else {
        var listas = obtenerListasPadre(departamento);
        var listasIndices = obtenerListasIndicePadre(departamento);

        var arrListasCiudades = listas.split(",");
        var arrListasIndices = listasIndices.split(",");
        var totalValores = arrListasIndices.length;

        var CampoCiudad = document.getElementById(campoCiudad);
        CampoCiudad.options.length = 0;

        var optSel = new Option("Seleccione...", "-1");
        CampoCiudad.add(optSel);
        for (var i = 0; i < totalValores; i++) {
            var opt = new Option(arrListasCiudades[i], arrListasIndices[i]);
            try {
                CampoCiudad.add(opt);
            } catch (e) {
                CampoCiudad.add(opt);
            }
        }
    }
}
