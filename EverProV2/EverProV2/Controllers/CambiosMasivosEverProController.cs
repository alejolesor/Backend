using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EverProV2.Models;

namespace EverProV2.Controllers
{
    public class CambiosMasivosEverProController : Controller
    {
        // GET: /CambiosMasivosEverPro/
        private Asignador_SGDEntities gd = new Asignador_SGDEntities();

        public ActionResult CambiosMasivosEverPro()
        {
            if (Session["IdUsuario"] != null)
            {
                return View();
            }
            else
            {
                Response.Redirect("../Seguridad/Login");
                return null;
            }
            
        }

        [HttpGet]
        public JsonResult consultarFuncEverPro(int idArea, int idCedulaLider)
        {
            try
            {
                List<spConsultaFuncMasivos_Result> listClientes = gd.spConsultaFuncMasivos(idArea, idCedulaLider).ToList();
                return Json(listClientes, JsonRequestBehavior.AllowGet);
            }
            catch (Exception es)
            {
                throw es;
            }
        }

        //[HttpPost]
        [HttpGet]
        public ActionResult ActualizacionMasivo(int idCedulaLider, string idCedulaLiderNuevo, int idCedFuncionario, string salarioNuevo, int idTipoDeCambio)
        {

            try
            {
                List<spActualizacionMasiva_Result> Actualiza = gd.spActualizacionMasiva(idCedulaLider, idCedulaLiderNuevo,
                    idCedFuncionario, salarioNuevo, idTipoDeCambio).ToList();

                var mensaje = "Se han actualizado los datos correctamente";
                return Json(mensaje, JsonRequestBehavior.AllowGet);
            }
            catch (Exception es)
            {
                throw es;
            }
        }


    }
}
