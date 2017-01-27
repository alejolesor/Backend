using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EverProV2.Models;
using Telerik.Web.Mvc;
using System.Web.UI.WebControls;
using EverProV2.Controllers;

namespace EverProV2.Controllers
{
    public class FuncionariosController : Controller
    {
        //
        // GET: /Funcionarios/

        Asignador_SGDEntities data = new Asignador_SGDEntities();
       // EverisProduccionEntities dba = new EverisProduccionEntities();

        public ActionResult Funcionarios()
       
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

        public LideresInfoController nuevoForm = new LideresInfoController();

        public string Lideres(int id)
        {
            var lideres = nuevoForm.ListaLideres(id);
            return lideres;
        }

        public void generarCampos()
        {
            CrearFormularios formulario = new CrearFormularios();
            List<ts_Campos> lstCampos = obtenerCamposEnvio();
            Table ta = new Table();

            string campos = formulario.GenerarCampos(ta, lstCampos, null, 1, 0, "0", 0, 0);
            campos = campos.Replace('"', '\'');
            ViewData["Funcionarios"] = campos;
        }

        public List<ts_Campos> obtenerCamposEnvio()
        {

            var query = (from a in data.ts_Campos
                         where a.CodFormulario == 3
                         select a);
            return query.ToList();
        }


         

        public ActionResult ListFuncionarios(DatosForm3 DatosForm3)
        {
            Session["Lider"] = DatosForm3.lst_10;
            Session["proces"] = DatosForm3.lst_9;

            //ListFunc.FuncionarioLider(lideres, proces);
            //ListFunc.FuncionarioApoyoLider(lideres);
            return View();
        }

        ListaFuncionariosController ListFunc = new ListaFuncionariosController();

        [HttpGet]
        public JsonResult FuncLider(string Proces, string Lider)
        {
            try
            {
                List<spObtenerPersonasPorLiderSGD_Result> lstFuncionarios = data.spObtenerPersonasPorLiderSGD(Lider).ToList();//dba.spObtenerPersonasPorLiderSGD(Lider, Convert.ToInt32(Proces)).ToList();
                return Json(lstFuncionarios, JsonRequestBehavior.AllowGet);
            }
            catch (Exception es)
            {
                throw es;
            }

        }

        [HttpGet]
        public JsonResult FuncApoyoLid(string Lider)
        {
            try
            {
                List<spFuncionarioApoyo_Result> lstFuncApoyo = data.spFuncionarioApoyo(Lider).ToList();
                return Json(lstFuncApoyo, JsonRequestBehavior.AllowGet);
            }
            catch(Exception es)
            {
                throw es;
            }
           

        }
    }
     public class DatosForm3
     {
         public string lst_9 {get; set;}
         public string lst_10 { get; set;}                             
     }

}
