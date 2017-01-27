using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EverProV2.Models;
using System.Web.UI.WebControls;


namespace EverProV2.Controllers
{
    public class ListaFuncionariosController : Controller
    {
        //
        // GET: /ListaFuncionarios/

        public ActionResult ListaFuncionarios()
        {
            if (Session["IdUsuario"] != null)
            {
                string idlideres = Session["idLider"].ToString();
                string proceso = Session["idproceso"].ToString();
                if (idlideres != null && idlideres != "")
                {
                    FuncionarioLider(idlideres, proceso);
                    FuncionarioApoyoLider(idlideres);
                    return View();
                }
                else
                {
                    Response.Redirect("../CargueInformacion/CargueInformacion");
                    return null;
                }

            }
            else
            {
                Response.Redirect("../Seguridad/Login");
                return null;
            }

        }

        //[HttpPost]
        public void FuncionarioLider(string idLider, string proceso)
        {

            //EverisProduccionEntities dba = new EverisProduccionEntities();
            try
            {
                Asignador_SGDEntities data = new Asignador_SGDEntities();
                var cedLider = idLider;

                //var proces = proceso;
                //ViewData['proces'] = proces.ToString();
                var nproceso = data.spObtenerNombreProceso(proceso).ToList();
                ViewData["proceso"] = nproceso[0].codDescripcion.ToString();

                ViewData["cedLider"] = cedLider.ToString();

                //var nombre = data.spObtenerNombreLider(Convert.ToInt32(idLider).T;


               // ViewData["nombre_lider"] = nombre[0].ToString();
                List<spObtenerPersonasPorLiderSGD_Result> lstFuncionarios = data.spObtenerPersonasPorLiderSGD(idLider).ToList();

                Table ta = new Table();
                string TablaFuncionarios = Funcionarios(ta, lstFuncionarios);
                ViewData["_TableUsua"] = TablaFuncionarios;
                //List<spInsertaFuncionario_Result> insert = data.spInsertaFuncionario(idLider, Nombre, cedula).ToList();

            }
            catch (Exception es)
            {
                throw es;
            }

        }
        //Yulymont
        [HttpGet]
        public ActionResult FuncAsignaManual()
        {
            string idlideres = Session["idLider"].ToString();
            string proceso = Session["idproceso"].ToString();

            //EverisProduccionEntities dba = new EverisProduccionEntities();
            try
            {
                Asignador_SGDEntities data = new Asignador_SGDEntities();
                //var cedLider = idLider;

                List<spObtieneFuncXlider_Result> lstFuncionarios = data.spObtieneFuncXlider(idlideres).ToList();

                Table ta = new Table();
                string TablaFuncionarios = PintaFuncionariosXlider(ta, lstFuncionarios);
                return Json(TablaFuncionarios, JsonRequestBehavior.AllowGet);
                //List<spInsertaFuncionario_Result> insert = data.spInsertaFuncionario(idLider, Nombre, cedula).ToList();

            }
            catch (Exception es)
            {
                throw es;
            }

        }
        //Yulymont
        public string PintaFuncionariosXlider(Table Ta, List<spObtieneFuncXlider_Result> lstFuncionarios)
        {
            try
            {
                string tblUsu = "";
                for (int i = 0; i < lstFuncionarios.Count; i++)
                {

                    tblUsu += "<tr id='AsignaCasoMan' style='cursor: pointer;'>"
                    + " <td>" + lstFuncionarios[i].Cedula + "</td>"
                    + " <td>" + lstFuncionarios[i].NombreCompleto + "</td>"
                    + " <td>" + lstFuncionarios[i].Nivel + "</td>"
                    + " </tr>";

                }
                return tblUsu;
            }
            catch (Exception es)
            {
                throw es;
            }
        }
  

        public void FuncionarioApoyoLider(string idLider)
        {

            Asignador_SGDEntities dba = new Asignador_SGDEntities();
            try
            {
                //Asignador_SGDEntities data = new Asignador_SGDEntities();
                //var cedLider = idLider;
                //ViewData["cedLider"] = cedLider.ToString();
                //var nombre = dba.spObtenerNombreLider(idLider).ToList();
                //ViewData["nombre_lider"] = nombre[0].ToString();
                List<spFuncionarioApoyo_Result> lstFuncionarios = dba.spFuncionarioApoyo(idLider).ToList();

                Table ta = new Table();
                string TablaFuncionarios = FuncionariosApoyo(ta, lstFuncionarios);
                ViewData["_TableUsuaApoyo"] = TablaFuncionarios;
                //List<spInsertaFuncionario_Result> insert = data.spInsertaFuncionario(idLider, Nombre, cedula).ToList();

            }
            catch (Exception es)
            {
                throw es;
            }

        }

        public string Funcionarios(Table Ta, List<spObtenerPersonasPorLiderSGD_Result> lstFuncionarios)
        {
            try
            {
                string tblUsu = "";
                for (int i = 0; i < lstFuncionarios.Count; i++)
                {

                    tblUsu += "<tr>"
                    + " <td>" + lstFuncionarios[i].Cedula + "</td>"
                    + " <td>" + lstFuncionarios[i].NombreCompleto + "</td>"
                    + " <td> <img src='../../Images/Gride/pencil.png' id='editar' class='buttonEdit' style='margin-left:10%;' /></td>"

                    + "</tr>";

                }
                return tblUsu;
            }
            catch (Exception es)
            {
                throw es;
            }
        }

        public string FuncionariosApoyo(Table Ta, List<spFuncionarioApoyo_Result> lstFuncionarios)
        {
            try
            {
                string tblUsu = "";
                for (int i = 0; i < lstFuncionarios.Count; i++)
                {

                    tblUsu += "<tr>"
                    + " <td>" + lstFuncionarios[i].Cedula + "</td>"
                    + " <td>" + lstFuncionarios[i].NombreCompleto + "</td>"
                    + " <td> <img src='../../Images/Gride/pencil.png' id='editar' class='buttonEdit' style='margin-left:10%;' /></td>"
                    + " <td> <img src='../../Images/Gride/trashcan.png' id='delete' class='buttonDelete' style='margin-left:10%;'  /></td>"
                    + "</tr>";

                }
                return tblUsu;
            }
            catch (Exception es)
            {
                throw es;
            }
        }

        //Yulymont
        [HttpGet]
        public ActionResult _InsertAjaxEditing(string idLider, string Nombre, string cedula, string idProceso)
        {
            //try
            //{

            //    Asignador_SGDEntities data = new Asignador_SGDEntities();
            //    List<spInsertaFuncionario_Result> insert = data.spInsertaFuncionario(Convert.ToInt32(idLider), Nombre, cedula, Convert.ToInt32(idProceso)).ToList();
            //    if (insert[0].Mensaje.ToString() != "0")
            //    {
            //        var mensaje = "El funcionario ya existe como apoyo de otro lider, debe eliminarse para poder reasignar";
            //        return Json(mensaje, JsonRequestBehavior.AllowGet);
            //    }
            //    else
            //    {
            //        var mensaje = "La creación del funcionario de apoyo fue exitosa";
            //        return Json(mensaje, JsonRequestBehavior.AllowGet);
            //    }
            //}
            try
            {

                Asignador_SGDEntities data = new Asignador_SGDEntities();
                List<spInsertaFuncionario_Result> insert = data.spInsertaFuncionario(Convert.ToInt32(idLider), Nombre, cedula, Convert.ToInt32(idProceso)).ToList();

                if (insert[0].Mensaje.ToString() == "1")
                {
                    var mensaje = "El funcionario ya existe como apoyo de otro lider, debe eliminarse para poder reasignar";
                    return Json(mensaje, JsonRequestBehavior.AllowGet);
                }
                else if (insert[0].Mensaje.ToString() == "2")
                {
                    var mensaje = "El funcionario no existe en la base de EverPro";
                    return Json(mensaje, JsonRequestBehavior.AllowGet);
                }
                else if (insert[0].Mensaje.ToString() == "3")
                {
                    var mensaje = "El funcionario ya existe con este lider ";
                    return Json(mensaje, JsonRequestBehavior.AllowGet);
                }
                //else  (insert[0].Mensaje.ToString() == "0")
                else
                {
                    var mensaje = "La creación del funcionario de apoyo fue exitosa";
                    return Json(mensaje, JsonRequestBehavior.AllowGet);
                }
            }

            catch (Exception es)
            {
                throw es;
            }
        }

        [HttpGet]
        public ActionResult _DeleteAjaxEditing(string identFuncionario)
        {
            try
            {

                Asignador_SGDEntities dba = new Asignador_SGDEntities();
                dba.spEliminarFunciApoyo(identFuncionario);

                var mensaje = "Funcionario de apoyo eliminado con Exito.";
                return Json(mensaje, JsonRequestBehavior.AllowGet);

            }
            catch (Exception es)
            {
                throw es;
            }

        }

        public ActionResult ClasificacionNiveles(string identFunc, int proceso, int idLider)
        {
            CargaNivelesPorFunc(identFunc, proceso, idLider);
            CargaNiveles(identFunc, proceso, idLider);
            ViewData["_identFunc"] = identFunc;
            return View();
        }

        [HttpGet]
        public void CargaNiveles(string identFunc, int proceso, int idLider)
        {
            try
            {
                Asignador_SGDEntities dba = new Asignador_SGDEntities();
                List<spClasificacionNivelPorFunc_Result> Nivel1 = dba.spClasificacionNivelPorFunc(identFunc, 2, proceso, idLider).ToList();

                Table ta2 = new Table();
                string TablaNiveles = CargaClaisificacion(ta2, Nivel1);
                ViewData["_TableNiveles"] = TablaNiveles;



            }
            catch (Exception es)
            {
                throw es;
            }

        }

        public string CargaClaisificacion(Table Ta2, List<spClasificacionNivelPorFunc_Result> Nivel1)
        {

            try
            {
                string tblUsu = "";
                for (int i = 0; i < Nivel1.Count; i++)
                {

                    tblUsu += "<tr id='PintaNiveles' style='cursor: pointer;'>"
                    + " <td>" + Nivel1[i].NivelConvenio + "</td>"
                    + " <td>" + Nivel1[i].Complejidad + "</td>"
                    + "</tr>";

                }
                return tblUsu;
            }
            catch (Exception es)
            {
                throw es;
            }

        }

        [HttpGet]
        public void CargaNivelesPorFunc(string identFunc, int proceso, int idLider)
        {
            try
            {
                Asignador_SGDEntities dba = new Asignador_SGDEntities();
                List<spClasificacionNivelPorFunc_Result> Nivel = dba.spClasificacionNivelPorFunc(identFunc, 1, proceso, idLider).ToList();

                Table ta = new Table();
                string TablaNiveles = PintaCargaNivelesPorFunc(ta, Nivel);
                ViewData["_TableNivelesFunc"] = TablaNiveles;



            }
            catch (Exception es)
            {
                throw es;
            }

        }

        public string PintaCargaNivelesPorFunc(Table Ta, List<spClasificacionNivelPorFunc_Result> Nivel)
        {

            try
            {
                string tblUsu = "";
                for (int i = 0; i < Nivel.Count; i++)
                {

                    tblUsu += "<tr id='PintaNivelesFunc' style='cursor: pointer;'>"
                    + " <td>" + Nivel[i].NivelConvenio + "</td>"
                    + " <td>" + Nivel[i].Complejidad + "</td>"
                    + "</tr>";

                }
                return tblUsu;
            }
            catch (Exception es)
            {
                throw es;
            }

        }

        [HttpGet]
        public ActionResult InsertaCargaNivelesPorFunc(string identFunc, string NivelClasi, int proceso)
        {
            try
            {

                Asignador_SGDEntities data = new Asignador_SGDEntities();
                List<spInsertNivelFunc_Result> insert = data.spInsertNivelFunc(identFunc, NivelClasi, proceso).ToList();

                var mensaje = "Se asignó el nivel correctamente";
                return Json(mensaje, JsonRequestBehavior.AllowGet);

            }
            catch (Exception es)
            {
                throw es;
            }
        }

        [HttpGet]
        public ActionResult EliminarCargaNivelesPorFunc(string identFunc, string NivelClasi, int proceso)
        {
            try
            {

                Asignador_SGDEntities data = new Asignador_SGDEntities();
                List<spEliminarNivelFunc_Result> insert = data.spEliminarNivelFunc(identFunc, NivelClasi, proceso).ToList();

                var mensaje = "Se eliminó  el nivel correctamente";
                return Json(mensaje, JsonRequestBehavior.AllowGet);

            }
            catch (Exception es)
            {
                throw es;
            }
        }



    }

}
