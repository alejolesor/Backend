using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EverProV2.Models;

namespace EverProV2.Controllers
{
    public class MenuController : Controller
    {
        //
        // GET: /Menu/

        public ActionResult Index()
        {
            return View();
        }

        //private EverisProduccionEntities sgd = new EverisProduccionEntities();
        //private EverProEntities sgd = new EverProEntities();
        private Asignador_SGDEntities sgd = new Asignador_SGDEntities();

        

        public List<spObtenerMenuNietosPerfil_Result> ObtenerNietosPerfil(int IdMenu, int RolId)
        {
            List<spObtenerMenuNietosPerfil_Result> list3;
            try
            {

                list3 = this.sgd.spObtenerMenuNietosPerfil(IdMenu, RolId).ToList();
            }
            catch (Exception exception)
            {
                LogRepository.registro("Error en MenuController metodo ObtenerNietosPerfil " + exception.Message + " stack trace " + exception.StackTrace);
                throw exception;
            }
            return list3;
        }

        public List<spObtenerMenuHijosPerfil_Result> ObtenerHijosPerfil(int IdMenu, int RolId)
        {
            List<spObtenerMenuHijosPerfil_Result> list2;
            try
            {

                list2 = this.sgd.spObtenerMenuHijosPerfil(IdMenu, RolId).ToList();
            }
            catch (Exception exception)
            {
                LogRepository.registro("Error en MenuController metodo ObtenerHijosPerfil " + exception.Message + " stack trace " + exception.StackTrace);
                throw exception;
            }
            return list2;
        }

        public List<spObtenerMenuHijosPerfil_Result> ObtenerHijosPerfil(Roles R, Menu M)
        {
            List<spObtenerMenuHijosPerfil_Result> list2;
            try
            {

                list2 = this.sgd.spObtenerMenuHijosPerfil(M.IdMenu, R.IdRol).ToList();
            }
            catch (Exception exception)
            {
                LogRepository.registro("Error en MenuController metodo ObtenerHijosPerfil " + exception.Message + " stack trace " + exception.StackTrace);
                throw exception;
            }
            return list2;
        }


        [HttpGet]
        public JsonResult ObtenerPadresMvc1(Usuarios U)
        {
            List<spObtenerMenuPadre_Result> list2;

            try
            {
                U = (EverProV2.Models.Usuarios)Session["USUARIO_LOGUEADO"];
                list2 = SessionRepository.AllPadres(U);
                return Json(list2, JsonRequestBehavior.AllowGet);
            }

            catch (Exception exception)
            {
                LogRepository.registro("Error en MenuController metodo ObtenerPadresMvc " + exception.Message + " stack trace " + exception.StackTrace);
                throw exception;
            }

        }

    }
}
