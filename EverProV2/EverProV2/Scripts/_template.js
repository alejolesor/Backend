/*
* Autor : Elena Parra
* Version: 1.0
*   _template administras todas la funciones que remplaza los templates que se crean en la el HTML.
*/
$.fn._template = null;
(function () {

    $.fn._template = {

        tempGrillaActividadesDiarias: function (temp, _trId, _area, _proceso, _actividad, _producto,
            _horas_Laborales, _produccion, _TiempoInproductivo, _ActividadId, _Numactividad, _fechaproductiva) {

            temp = temp.replace(/{{trId}}/ig, _trId)
            .replace(/{{area}}/ig, _area)
            .replace(/{{proceso}}/ig, _proceso)
            .replace(/{{actividad}}/ig, _actividad)
            .replace(/{{producto}}/ig, _producto)
            .replace(/{{horas_Laborales}}/ig, _horas_Laborales)
            .replace(/{{produccion}}/ig, _produccion)
            .replace(/{{TiempoInproductivo}}/ig, _TiempoInproductivo)
            .replace(/{{ActividadId}}/ig, _ActividadId)
            .replace(/{{Numactividad}}/ig, _Numactividad)
            .replace(/{{fechaproductiva}}/ig, _fechaproductiva);

            return temp;
        },

        tempGrillaInActividadesDiarias: function (temp, _trId, _ActividadId, _Numactividad, _tipoInactividad, _inactividad, _tiempo) {

            temp = temp.replace(/{{_trId}}/ig, _trId)
            .replace(/{{ActividadId}}/ig, _ActividadId)
            .replace(/{{Numactividad}}/ig, _Numactividad)
            .replace(/{{tipoInactividad}}/ig, _tipoInactividad)
            .replace(/{{inactividad}}/ig, _inactividad)
            .replace(/{{tiempo}}/ig, _tiempo);
            
            return temp;

        },

        tempGrillaHorasLaborales: function (temp, _tr_row, _No, _id_chk, _PersonaId, _nombre, _nameLunes, _nameMartes, _nameMiercoles,
            _nameJueves, _nameViernes, _nameSabado, _nameDomingo, _nameTotal, _valueLunes, _valueMartes, _valueMiercoles,
            _valueJueves, _valueViernes, _valueSabado, _valueDomingo) {

            temp = temp.replace(/{{tr_row}}/ig, _tr_row)
            .replace(/{{No}}/ig, _No)
            .replace(/{{id_chk}}/ig, _id_chk)
            .replace(/{{PersonaId}}/ig, _PersonaId)
            .replace(/{{nombre}}/ig, _nombre)
            .replace(/{{nameLunes}}/ig, _nameLunes)
            .replace(/{{nameMartes}}/ig, _nameMartes)
            .replace(/{{nameMiercoles}}/ig, _nameMiercoles)
            .replace(/{{nameJueves}}/ig, _nameJueves)
            .replace(/{{nameViernes}}/ig, _nameViernes)
            .replace(/{{nameSabado}}/ig, _nameSabado)
            .replace(/{{nameDomingo}}/ig, _nameDomingo)
            .replace(/{{nameTotal}}/ig, _nameTotal)
            .replace(/{{valueLunes}}/ig, _valueLunes)
            .replace(/{{valueMartes}}/ig, _valueMartes)
            .replace(/{{valuesMiercoles}}/ig, _valueMiercoles)
            .replace(/{{valuesJueves}}/ig, _valueJueves)
            .replace(/{{valuesViernes}}/ig, _valueViernes)
            .replace(/{{valuesSabado}}/ig, _valueSabado)
            .replace(/{{valuesDomingo}}/ig, _valueDomingo);

            return temp;
        },

        tempGrillaExtras: function (temp, _tr_row, _No, _PersonaId, _nombre, _valorLunes, _valorMartes, _valorMiercoles,
          _valorJueves, _valorViernes, _valorSabado, _valorDomingo, _id_chk_Lunes, _id_chk_Martes, _id_chk_Miercoles,
          _id_chk_Jueves, _id_chk_Viernes, _id_chk_Sabado, _id_chk_Domingo, _FechaLunes, _FechaMartes, _FechaMiercoles,
          _FechaJueves, _FechaViernes, _FechaSabado, _FechaDomingo) {

            temp = temp.replace(/{{tr_row}}/ig, _tr_row)
            .replace(/{{No}}/ig, _No)
            .replace(/{{PersonaId}}/ig, _PersonaId)
            .replace(/{{nombre}}/ig, _nombre)
            .replace(/{{valorLunes}}/ig, _valorLunes)
            .replace(/{{valorMartes}}/ig, _valorMartes)
            .replace(/{{valorMiercoles}}/ig, _valorMiercoles)
            .replace(/{{valorJueves}}/ig, _valorJueves)
            .replace(/{{valorViernes}}/ig, _valorViernes)
            .replace(/{{valorSabado}}/ig, _valorSabado)
            .replace(/{{valorDomingo}}/ig, _valorDomingo)
            .replace(/{{id_chk_Lunes}}/ig, _id_chk_Lunes)
            .replace(/{{id_chk_Martes}}/ig, _id_chk_Martes)
            .replace(/{{id_chk_Miercoles}}/ig, _id_chk_Miercoles)
            .replace(/{{id_chk_Jueves}}/ig, _id_chk_Jueves)
            .replace(/{{id_chk_Viernes}}/ig, _id_chk_Viernes)
            .replace(/{{id_chk_Sabado}}/ig, _id_chk_Sabado)
            .replace(/{{id_chk_Domingo}}/ig, _id_chk_Domingo)
            .replace(/{{fechaLunes}}/ig, _FechaLunes)
            .replace(/{{fechaMartes}}/ig, _FechaMartes)
            .replace(/{{fechaMiercoles}}/ig, _FechaMiercoles)
            .replace(/{{fechaJueves}}/ig, _FechaJueves)
            .replace(/{{fechaViernes}}/ig, _FechaViernes)
            .replace(/{{fechaSabado}}/ig, _FechaSabado)
            .replace(/{{fechaDomingo}}/ig, _FechaDomingo);

            return temp;
        },


        tempExportGrillaExtras: function (temp, _cedula, _nombre, _area, _empresa, _horasExtras) {

            temp = temp.replace(/{{cedula}}/ig, _cedula)
            .replace(/{{nombre}}/ig, _nombre)
            .replace(/{{area}}/ig, _area)
            .replace(/{{empresa}}/ig, _empresa)
            .replace(/{{horasExtras}}/ig, _horasExtras);

            return temp;

        }

    }

})();