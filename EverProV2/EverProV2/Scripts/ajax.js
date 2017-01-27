/*
* Autor : Elena Parra
* Version: 1.0
*   transact administras todas la funciones de comunicacion Ajax
*/
var transact = null;
(function ($) {
    //Transacciones Ajax

    transact = window.transact = {

        ajaxGET: function (url, data, success, error, dataType, async) {

            if (!dataType)
                dataType = "json";
            if (async == null)
                async = true;

            $.ajax({
                "type": "GET",
                "url": url,
                "async": async,
                "data": (data != null) ? data : null,
                "dataType": dataType,
                "success": success,
                "error": error
            });
        },

        ajaxPOST: function (url, data, success, error, dataType, contentType) {

            if (!dataType)
                dataType = "json";

            if (!contentType)
                contentType = "application/json";

            $.ajax({
                "type": "POST",
                "url": url,
                "contentType": contentType,
                "data": (data != null) ? JSON.stringify(data) : {},
                "success": success,
                "error": error
            });
        },


        ajaxPUT: function (url, data, success, error, dataType) {

            if (!dataType)
                dataType = "json";

            $.ajax({
                "type": "PUT",
                "url": url,
                "contentType": 'application/json',
                "data": (data != null) ? data : {},
                "success": success,
                "error": error
            });
        },

        ajaxDELETE: function (url, data, success, error, dataType) {

            if (!dataType)
                dataType = "json";

            $.ajax({
                "type": "DELETE",
                "url": url,
                "data": (data != null) ? data : {},
                "dataType": dataType,
                "success": success,
                "error": error
            });
        }


    }


})(jQuery);