using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EverProV2.Models;
using Telerik.Web.Mvc;
using System.Web.UI.WebControls;
using Telerik.Web.Mvc.UI;

namespace EverProV2.Controllers
{
    public class CargueInformacionController : Controller
    {
        //
        // GET: /CargueInformacion/CargueInformacion

        Asignador_SGDEntities data = new Asignador_SGDEntities();

        public ActionResult CargueInformacion()
        {
            

            if (Session["IdUsuario"] != null)
            {
                Session["idproceso"] = "";
                Session["idLider"] = "";
                return View();
            }
            else
            {
                Response.Redirect("../Seguridad/Login");
                return null;
            }
        }

        //[HttpGet]
        //public ActionResult CamposDelFormulario(int IdFormulario, int IdCampoCompuesto)
        //{
        //    List<spCamposDelFormulario_Result> Campos = data.spCamposDelFormulario(IdFormulario, IdCampoCompuesto).ToList();
        //    return Json(Campos, JsonRequestBehavior.AllowGet);
        //}

        [HttpGet]
        public string ListaLideres(int id)
        {
            List<spObtenerLideres_Result> Lideres = data.spObtenerLideres(id).ToList();
            string option = "";
            //option = "<select class='form-control' value='' required='' name='2' id='lst_2'>";
            option = "<option value=''>Seleccione...</option>";
            foreach (var values in Lideres)
            {
                option += "<option  value=" + values.Cedula + ">" + values.NombreCompleto + "</option>";
            }
            option += "</select>";
            return option;

        }
        public void generarCampos()
        {
            CrearFormularios formulario = new CrearFormularios();
            List<ts_Campos> lstCampos = obtenerCamposEnvio();
            Table ta = new Table();

            string campos = formulario.GenerarCampos(ta, lstCampos, null, 1, 0, "0", 0, 0);
            campos = campos.Replace('"', '\'');
            ViewData["_camposEnvio"] = campos;
        }

        public List<ts_Campos> obtenerCamposEnvio()
        {
            
            var query = (from a in data.ts_Campos
                         where a.CodFormulario == 1
                         select a);
            return query.ToList();
        }


        ///**********************************Cascadas****************************/////////////



        [HttpGet]
        public JsonResult OptenerProducto(int idArea)
        {
            try
            {
                List<OptenerProducto_Result> listProducto = data.OptenerProducto(idArea).ToList();
                return Json(listProducto, JsonRequestBehavior.AllowGet);
            }
            catch (Exception es)
            {
                throw es;
            }
        }

        [HttpGet]
        public JsonResult ObtenerLider(int idProd, int idArea)
        {
            try
            {
                List<LiderPorProducto_Result> listLider = data.LiderPorProducto(idProd, idArea).ToList();
                return Json(listLider, JsonRequestBehavior.AllowGet);
            }
            catch (Exception es)
            {
                throw es;
            }
        }

        [HttpGet]
        public JsonResult ObtenerNomFile(int idProd, int idArea)
        {
            try
            {
                List<ObtenerNombFile_Result > nomFile = data.ObtenerNombFile(idProd, idArea).ToList();
                return Json(nomFile, JsonRequestBehavior.AllowGet);
            }
            catch (Exception es)
            {
                throw es;
            }
        }

    }
}
