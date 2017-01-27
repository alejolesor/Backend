using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EverProV2.Models;


namespace EverProV2.Controllers
{
    public class ProductosController : Controller
    {
        Asignador_SGDEntities dbo = new Asignador_SGDEntities();


        [HttpGet]
        public ActionResult CamposDelFormulario(int IdFormulario, int IdCampoCompuesto)
        {
            try
            {
                List<spCamposDelFormulario_Result> Campos = dbo.spCamposDelFormulario(IdFormulario, IdCampoCompuesto).ToList();
                //En produccion el sp se llama spCamposDelFormulario1
                //En pruebas el sp se llama spCamposDelFormulario
                return Json(Campos, JsonRequestBehavior.AllowGet);

            }
            catch (Exception es)
            {
                throw es;
            }
            
        }


        [HttpGet]
        public ActionResult ListaItemsDependientes(int idCampo, string idCampo_Listas, string CuotaAnio, string Segmento)
        {
            if (idCampo_Listas == "null")
                idCampo_Listas = null;

            if (CuotaAnio == "null")
                CuotaAnio = null;

            if (Segmento == "null")
                Segmento = null;

            List<spObtenerItemsListaCampo_Result> ListaItems = dbo.spObtenerItemsListaCampo(idCampo, idCampo_Listas, CuotaAnio, Segmento).ToList();

            return Json(ListaItems, JsonRequestBehavior.AllowGet);
        }


    }


}
