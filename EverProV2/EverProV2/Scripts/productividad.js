$(document).ready(function () {
    var IdLider = $.getUrlVar('idLider');

    ajaxTable(IdLider);
    setInterval(function () {
        ajaxTable(IdLider);

    },10000);

  
});

function ajaxTable(IdLider) {
    transact.ajaxGET('/FuncPorLiderDetalle/Productividad?idLider=' + IdLider, null, success_func, null);
}

function success_func(tabla) {

    var tableProductividad = $("#productividad").dataTable();

    tableProductividad.fnClearTable();

    $.each(tabla, function (i, listProduct) {

        tableProductividad.fnAddData([listProduct.cedula, listProduct.nombre, listProduct.cantCasos]);

    })
}

  $.extend({
        getUrlVars: function () {
            var vars = [], hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for (var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            return vars;
        },
        getUrlVar: function (name) {
            return $.getUrlVars()[name];
        }
    });