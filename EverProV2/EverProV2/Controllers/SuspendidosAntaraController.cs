using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EverProV2.Models;
using EverProV2.WCF_AntaraIntegrationBBVA;

namespace EverProV2.Controllers
{
    public class SuspendidosAntaraController : Controller
    {
       
        //
        // GET: /SuspendidosAntara/

        private AntaraServiceClient wcf_Antara = new AntaraServiceClient();

        public ActionResult Index()
        {
            return View();
        }


        [HttpGet]
        public JsonResult SuspendidosAntara(string idLider, string idProceso)
        {
            Asignador_SGDEntities data = new Asignador_SGDEntities();
            try
            {

                List<spObtenerSuspendidosAntara_Result> listaCasoSuspend = data.spObtenerSuspendidosAntara(Convert.ToInt32(idLider), Convert.ToInt32(idProceso)).ToList();

                return Json(listaCasoSuspend, JsonRequestBehavior.AllowGet);
            }
            catch (Exception es)
            {
                throw es;
            }

        }

        [HttpGet]
        public JsonResult ListDactiloscopia()
        {
            try
            {
                var ListDacti = wcf_Antara.spConsultarPendientes().ToList();
                return Json(ListDacti, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message);
            }
        }

    }
}
