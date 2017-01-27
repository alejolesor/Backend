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
    public class LideresInfoController : Controller
    {
        //
        // GET: /LideresInfo/
        Asignador_SGDEntities dataLideres = new Asignador_SGDEntities();
       // EverisProduccionEntities dba = new EverisProduccionEntities(); 

        public ActionResult LideresInfo()
        {
            Session["procesoInfo"] = "";
            Session["liderinfo"] = "";
            Session["idproceso"] = "";
            Session["idLider"] = "";

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
        public string ListaLideres(int id)
        {
            List<spObtenerLideres_Result> Lideres = dataLideres.spObtenerLideres(id).ToList();
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
            ViewData["infoLideres"] = campos;
        }
        public List<ts_Campos> obtenerCamposEnvio()
        {

            var query = (from a in dataLideres.ts_Campos
                         where a.CodFormulario == 2
                         select a);
            return query.ToList();
        }

        public ActionResult  EstadoFuncionarioLider( DatosForm2 DatosForm2){

            Session["idProceso"] = DatosForm2.lst_4;
            Session["idLider"] = DatosForm2.lst_7;
           
            var lider = Convert.ToInt32(Session["idLider"]);

            var producto = BtnDactiloscopia(lider);

            ViewData["producto"] = producto;
            return View();
        }

        public string BtnDactiloscopia(int idLider)
        {
            var producto = "";
            var Rproducto = dataLideres.BtnDactiloscopia(idLider).ToList();

            if (Rproducto.Count() == 0)
            {
               
                producto = "null";
            }
            else{
                producto = Rproducto[0].Descripcion;
            }
            return producto;
        }

        private ListadoColasController listColas = new ListadoColasController();

        [HttpGet]
        public JsonResult ListaColas(string idProceso, string idLider)
        {            
            try
            {

                List<spListaColas2_Result> listaColas = dataLideres.spListaColas2(Convert.ToInt32(idProceso), idLider).ToList();

                return Json(listaColas, JsonRequestBehavior.AllowGet);
            }
            catch (Exception es)
            {
                throw es;
            }

        }

        //[HttpGet]
        //public JsonResult FuncionariosAsignar(string idLider)
        //{
        //    try
        //    {
        //        List<spObtenerFunColas_Result> listfunColas = data.spObtenerFunColas(Convert.ToInt32(idLider)).ToList();
        //        return Json(listfunColas, JsonRequestBehavior.AllowGet);
        //    }
        //    catch (Exception es)
        //    {
        //        throw es;
        //    }
        //}

        [HttpGet]
        public JsonResult Datos_LiderProceso(string idProceso, string idLider)
        {
            Lider_Procesos lp = new Lider_Procesos();
            try
            {
                var nproceso = dataLideres.spObtenerNombreProceso(idProceso).ToList();
                lp.Nom_proceso = nproceso[0].codDescripcion.ToString();
                var nombre = dataLideres.spObtenerNombreLider(Convert.ToInt32(idLider)).ToList();//spObtenerNombreLider(idLider).ToList();
                lp.Nom_lider = nombre[0].ToString();

                return Json(lp, JsonRequestBehavior.AllowGet);
            }
            catch (Exception es)
            {
                throw es;
            }

        }



    }


    public class DatosForm2{
        public string lst_4 { get; set; }
        public string lst_7 { get; set; }
    }

    public class Lider_Procesos
    {
        public string Nom_proceso { get; set; }
        public string Nom_lider { get; set; }
    }
}
