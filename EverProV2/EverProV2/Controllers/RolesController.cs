using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EverProV2.Models;
using System.Web.UI.WebControls;

namespace EverProV2.Controllers
{
    public class RolesController : Controller
    {
        //
        // GET: /Roles/

        Asignador_SGDEntities dbo = new Asignador_SGDEntities();

        public ActionResult Roles()
        {
            if (Session["IdUsuario"] != null)
            {
                ListRolActivo();
                ListRolInactivo();
                return View();
            }
            else
            {
                Response.Redirect("../Seguridad/Login");
                return null;
            }
        }

        public void ListRolActivo()
        {
            try
            {
                List<spObtenerRoles_Result> lstRolActivo = dbo.spObtenerRoles(1).ToList();
                Table ta = new Table();
                string TableRolActi = RolesActivos(ta, lstRolActivo);
                ViewData["_TableRolActi"] = TableRolActi;
            }
            catch (Exception es)
            {
                throw es ;
                    
            }
        }

        public string RolesActivos(Table ta, List<spObtenerRoles_Result> lstRolActivo)
        {
            try
            {
                string tblRolAct = "";
                string Estado = "";
                for (int i = 0; i < lstRolActivo.Count; i++)
                {
                    if (lstRolActivo[i].Activo == true)
                    {
                        Estado = "<img src='../../Images/Gride/activo.png' id='Activo' class='btnInactivar' style='margin-left:10%; cursor:pointer;' />";
                    }
                    else
                    {
                        Estado = "<img src='../../Images/Gride/inactivo.png' id='Inactivo' class='btnActivar' style='margin-left:10%; cursor:pointer;' />";
                    }

                    tblRolAct += "<tr>"
                        + "   <td>" + lstRolActivo[i].IdRol + "</td>"
                        + "   <td>" + lstRolActivo[i].DescRol + "</td>"
                        + "   <td><img src='../../Images/Gride/pencil.png' id='Inactivo' class='btnEditar' style='margin-left:10%; cursor:pointer;' /></td>"
                        + "   <td>" + Estado + "</td>"
                        + "</tr>";

                }
                return tblRolAct;
            }
            catch (Exception es)
            {
                throw es ;
            }
        }

        public void ListRolInactivo()
        {
            try
            {
                List<spObtenerRoles_Result> lstRolActivo = dbo.spObtenerRoles(0).ToList();
                Table ta = new Table();
                string TableRolInacti = RolesInactivos(ta, lstRolActivo);
                ViewData["_TableRolInacti"] = TableRolInacti;
            }
            catch (Exception es)
            {
                throw es;
            }
        }

        public string RolesInactivos(Table ta, List<spObtenerRoles_Result> lstRolActivo)
        {
            try
            {
                string tblRolAct = "";
                string Estado = "";
                for (int i = 0; i < lstRolActivo.Count; i++)
                {
                    if (lstRolActivo[i].Activo == true)
                    {
                        Estado = "<img src='../../Images/Gride/activo.png' id='Activo' class='btnInactivar' style='margin-left:10%; cursor:pointer;' />";
                    }
                    else
                    {
                        Estado = "<img src='../../Images/Gride/inactivo.png' id='Inactivo' class='btnActivar' style='margin-left:10%; cursor:pointer;' />";
                    }

                    tblRolAct += "<tr>"
                        + "   <td>" + lstRolActivo[i].IdRol + "</td>"
                        + "   <td>" + lstRolActivo[i].DescRol + "</td>"
                        + "   <td><img src='../../Images/Gride/pencil.png' id='Inactivo' class='btnEditar' style='margin-left:10%; cursor:pointer;' /></td>"
                        + "   <td>" + Estado + "</td>"
                        + "</tr>";

                }
                return tblRolAct;
            }
            catch (Exception es)
            {
                throw es;
            }
        }

        [HttpGet]
        public ActionResult InactivarRol(int IdRol)
        {
            dbo.spUpdateRoles(IdRol, 0);
            List<spObtenerRoles_Result> lstRolActivo = dbo.spObtenerRoles(1).ToList();
            return Json(lstRolActivo, JsonRequestBehavior.AllowGet);
        }


        [HttpGet]
        public ActionResult TableUpdRolInac()
        {
            List<spObtenerRoles_Result> lstRolInactivo = dbo.spObtenerRoles(0).ToList();
            return Json(lstRolInactivo, JsonRequestBehavior.AllowGet);
        }


        [HttpGet]
        public ActionResult ActivarRol(int IdRol)
        {
            dbo.spUpdateRoles(IdRol, 1);
            List<spObtenerRoles_Result> lstRolActivo = dbo.spObtenerRoles(0).ToList();
            return Json(lstRolActivo, JsonRequestBehavior.AllowGet);
        }


        [HttpGet]
        public ActionResult TableUpdRolActi()
        {
            List<spObtenerRoles_Result> lstRolActivo = dbo.spObtenerRoles(1).ToList();
            return Json(lstRolActivo, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult CapturalRol(string NombreRol)
        {
            List<spCrearNuevoRol_Result> MensajeRol = dbo.spCrearNuevoRol(NombreRol).ToList();
            return Json(MensajeRol, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult EditarRol(int IdRol, string NombreRol)
        {
            List<spUpdateDescRol_Result> MensajeRol = dbo.spUpdateDescRol(IdRol, NombreRol).ToList();
            return Json(MensajeRol, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult OptionRoles()
        {
            List<spObtenerRoles_Result> lstRolActivo = dbo.spObtenerRoles(1).ToList();
            return Json(lstRolActivo, JsonRequestBehavior.AllowGet);
        }


        [HttpGet]
        public ActionResult MenuRolAsoc(string IdRol)
        {
            try
            {
                List<spObtenerMenuRol_Result> lstMenuRolAsoc = dbo.spObtenerMenuRol(Convert.ToInt32(IdRol), 1).ToList();
                return Json(lstMenuRolAsoc, JsonRequestBehavior.AllowGet);
            }
            catch (Exception es)
            {
                throw es;
            }
        }

        [HttpGet]
        public ActionResult MenuRolNoAsoc(string IdRol)
        {
            try
            {
                List<spObtenerMenuRol_Result> lstMenuRolAsoc = dbo.spObtenerMenuRol(Convert.ToInt32(IdRol), 0).ToList();
                return Json(lstMenuRolAsoc, JsonRequestBehavior.AllowGet);
            }
            catch (Exception es)
            {
                throw es;
            }
        }


        [HttpGet]
        public ActionResult DesAsociarMenuRol(int IdRol, int IdMenu)
        {
            dbo.spActualizarMenuRol(IdRol, IdMenu, 0);
            List<spObtenerMenuRol_Result> lstMenuRolAsoc = dbo.spObtenerMenuRol(Convert.ToInt32(IdRol), 1).ToList();
            return Json(lstMenuRolAsoc, JsonRequestBehavior.AllowGet);
        }


        [HttpGet]
        public ActionResult TableUpdMenuRolNoAso(int IdRol)
        {
            List<spObtenerMenuRol_Result> lstMenuRolNoAsoc = dbo.spObtenerMenuRol(IdRol, 0).ToList();
            return Json(lstMenuRolNoAsoc, JsonRequestBehavior.AllowGet);
        }


        [HttpGet]
        public ActionResult AsociarMenuRol(int IdRol, int IdMenu)
        {
            dbo.spActualizarMenuRol(IdRol, IdMenu, 1);
            List<spObtenerMenuRol_Result> lstMenuRolNoAsoc = dbo.spObtenerMenuRol(IdRol, 0).ToList();
            return Json(lstMenuRolNoAsoc, JsonRequestBehavior.AllowGet);
        }


        [HttpGet]
        public ActionResult TableUpdMenuRolAso(int IdRol)
        {
            List<spObtenerMenuRol_Result> lstMenuRolAsoc = dbo.spObtenerMenuRol(IdRol, 1).ToList();
            return Json(lstMenuRolAsoc, JsonRequestBehavior.AllowGet);
        }


    }
}
