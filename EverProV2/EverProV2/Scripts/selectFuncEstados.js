$(document).ready(function () {
    var IdLider = $.getUrlVar('idLider');
    var estado = $.getUrlVar('estado');


    ajaxTable(IdLider, estado);
    setInterval(function () {
        ajaxTable(IdLider, estado);

    }, 10000);


});

function ajaxTable(IdLider, estado) {
    transact.ajaxGET('/FuncPorLiderDetalle/SelectFuncLider?idLider=' + IdLider + "&estado=" + estado, null, success_func, null);
}

function success_func(tabla) {

    var tableFuncEst = $("#selectFuncEstados").dataTable();

    tableFuncEst.fnClearTable();

    $.each(tabla, function (i, listProductest) {

        tableFuncEst.fnAddData([listProductest.Cedula, listProductest.NombreCompleto]);

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
