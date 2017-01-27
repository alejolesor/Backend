using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EverProV2.Models;


namespace EverProV2.Controllers
{
    public class CamposController : Controller
    {
        //
        // GET: /Campos/

        private Asignador_SGDEntities gd = new Asignador_SGDEntities();
        //private EverProEntities dbo = new EverProEntities();

        public ActionResult Index()
        {
            return View();
        }

        public List<CodigosCampo> obtenerCodigosCampo(ts_Campos camp)
        {

            List<CodigosCampo> list2;
            try
            {
                this.gd = new Asignador_SGDEntities();
                List<CodigosCampo> list = (from c in this.gd.CodigosCampo
                                           where c.CampId == camp.CampoId && c.Activo == true
                                           orderby c.CodDescripcion
                                           select c).ToList<CodigosCampo>();
                //SI NO SELECCIONA NADA AGREGO ESTE CAMPO COMO NULO
                Parametros param = this.gd.Parametros.First(c => c.codigo == "VAL_NUL");

                CodigosCampo item = new CodigosCampo
                {
                    CodId = param.valor,
                    CodDescripcion = "Seleccione..."
                };
                list.Insert(0, item);
                list2 = list;
            }
            catch (Exception exception)
            {
                LogRepository.registro("Error en CamposController metodo obtenerCodigosCampo " + exception.Message + " stack trace " + exception.StackTrace);
                throw exception;
            }
            return list2;
        }

    }
}
