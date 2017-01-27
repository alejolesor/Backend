using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EverProV2.Models;
using System.Web.UI.WebControls;


namespace EverProV2.Controllers
{
    public class FuncPorLiderDetalleController : Controller
    {
        //
        // GET: /FuncPorLiderDetalle/
        Asignador_SGDEntities data = new Asignador_SGDEntities();
        EverisProduccionEntities dba = new EverisProduccionEntities(); 

        public ActionResult FuncPorLiderDetalle()
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
        public ActionResult VistaSelectEstados()
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


        //YULY MONTOYA
        [HttpGet]
        public JsonResult SelectFuncLider(int idLider, int estado)
        {
            try
            {
                List<SelectFuncionariosEstado_Result> listCountFunc = data.SelectFuncionariosEstado(idLider, estado).ToList();
                return Json(listCountFunc, JsonRequestBehavior.AllowGet);
            }
            catch (Exception es)
            {
                throw es;
            }
        }


       // [HttpGet]

        public ActionResult MallaTurnos()
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

        public ActionResult EstadoTurnos()
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
        public ActionResult PintaTurnosMalla(int idLider)
        {
           // PintaMallaTurnos(idLider);
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
        public JsonResult VerMallaTurnos(string fdesde, string fhasta, int idLider, int turno)
        {
            try
            {
                if(turno == 1){

                    var listMallaTurnos = data.PintaMalla_1(Convert.ToDateTime(fdesde), Convert.ToDateTime(fhasta), idLider, turno).ToList();
                   return Json(listMallaTurnos, JsonRequestBehavior.AllowGet);
                }
                else if(turno == 3){
                     var listMallaTurnos = data.PintaMalla_3(Convert.ToDateTime(fdesde), Convert.ToDateTime(fhasta), idLider, turno).ToList();
                   return Json(listMallaTurnos, JsonRequestBehavior.AllowGet);
                }
                else if (turno == 4)
                {
                    var listMallaTurnos = data.PintaMalla_4(Convert.ToDateTime(fdesde), Convert.ToDateTime(fhasta), idLider, turno).ToList();
                    return Json(listMallaTurnos, JsonRequestBehavior.AllowGet);
                }
                else if(turno == 2){
                    var listMallaTurnos = data.PintaMalla2(Convert.ToDateTime(fdesde), Convert.ToDateTime(fhasta), idLider, turno).ToList();
                    return Json(listMallaTurnos, JsonRequestBehavior.AllowGet);
                }
                else if(turno == 5 ){
                    var listMallaTurnos =  data.PintaMalla_5(Convert.ToDateTime(fdesde), Convert.ToDateTime(fhasta), idLider, turno).ToList();
                    return Json(listMallaTurnos, JsonRequestBehavior.AllowGet);
                }
                else if (turno == 6)
                {
                    var listMallaTurnos = data.PintaMalla_6(Convert.ToDateTime(fdesde), Convert.ToDateTime(fhasta), idLider, turno).ToList();
                    return Json(listMallaTurnos, JsonRequestBehavior.AllowGet);
                }
                else if (turno == 8)
                {
                    var listMallaTurnos = data.PintaMalla_8(Convert.ToDateTime(fdesde), Convert.ToDateTime(fhasta), idLider, turno).ToList();
                    return Json(listMallaTurnos, JsonRequestBehavior.AllowGet);
                }
                else if (turno == 9)
                {
                    var listMallaTurnos = data.PintaMalla9(Convert.ToDateTime(fdesde), Convert.ToDateTime(fhasta), idLider, turno).ToList();
                    return Json(listMallaTurnos, JsonRequestBehavior.AllowGet);
                }
                return Json("", JsonRequestBehavior.AllowGet);

            }
            catch (Exception es)
            {
                throw es;
            }
        }

        [HttpGet]
        public JsonResult InfoTurnos()
        {
            try
            {
                List<InfoTurnos_Result> listInfoTurnos = data.InfoTurnos().ToList();
                return Json(listInfoTurnos, JsonRequestBehavior.AllowGet);
            }
            catch(Exception es)
            {
                throw es;
            }
        }
        
        [HttpGet]
        public JsonResult ListaFuncionariosMalla(string idLider)
        {
            try
            {
                List<FuncionariosMallaTurnos_Result> listfumMalla = data.FuncionariosMallaTurnos(Convert.ToInt32(idLider)).ToList();
                return Json(listfumMalla, JsonRequestBehavior.AllowGet);
            }
            catch (Exception es)
            {
                throw es;
            }
        }
        [HttpGet]
        public JsonResult ListaTurnos()
        {
            try
            {
                List<ProgramacionMallaTurnos_Result> listTurnos = data.ProgramacionMallaTurnos().ToList();
                return Json(listTurnos, JsonRequestBehavior.AllowGet);
            }
            catch (Exception es)
            {
                throw es;
            }
        }
        [HttpGet]
        public JsonResult InsertTurnos(int IdFuncionario, int turno, string fdesde, string fhasta, int idLider)
        
        {
           
            try
            {
                var turnos = data.CrearProgramacionMallas(IdFuncionario, Convert.ToDateTime(fdesde), Convert.ToDateTime(fhasta), idLider, turno);
                var mensaje = "";
                return Json(mensaje, JsonRequestBehavior.AllowGet);

            }
            catch(Exception es)
            {
                throw es;

            }
        }

        [HttpGet]
        public void PintaMallaTurnos(int idLider)
        {
            try
            {
               DateTime fecha = DateTime.Now;
               int dia = fecha.Day;
               int mes = fecha.Month;
               int anio = fecha.Year;
               List<PintaMallaTurnos_Result> listPintaMalla = data.PintaMallaTurnos(idLider,dia,mes,anio).ToList();

               Table Tablet = new Table();
               string TablaMalla = TableMallaTurnos(Tablet, listPintaMalla );
               ViewData["MallaTurnos"] = TablaMalla;
                
            }
            catch (Exception es)
            {
                throw es;
            }
        }

        public string TableMallaTurnos(Table Tablet, List<PintaMallaTurnos_Result> listPintaMalla)
        {
            try
            {
                string tblMalla = "";
                string color = "";
                //string rojo = "#FE2E2E";

                for (int i = 0; i < listPintaMalla.Count; i++)
                {
                    tblMalla += "<tr>"
                        + "<td>" + listPintaMalla[i].NombreCompleto + "</td>"
                        + "<td>" + listPintaMalla[i].Dia + "</td>";

                    for (int x = 8; x <= 21; x++)
                    {
                        var dato = 0;
                        if (x == 8) { if (listPintaMalla[i].C08_00 == null) { dato = 12; } else { dato = listPintaMalla[i].C08_00.Value; } }
                        if (x == 9) { if (listPintaMalla[i].C09_00 == null) { dato = 12; } else { dato = listPintaMalla[i].C09_00.Value; } }
                        if (x == 10) { if (listPintaMalla[i].C10_00 == null) { dato = 12; } else { dato = listPintaMalla[i].C10_00.Value; } }
                        if (x == 11) { if (listPintaMalla[i].C11_00 == null) { dato = 12; } else { dato = listPintaMalla[i].C11_00.Value; } }
                        if (x == 12) { if (listPintaMalla[i].C12_00 == null) { dato = 12; } else { dato = listPintaMalla[i].C12_00.Value; } }
                        if (x == 13) { if (listPintaMalla[i].C13_00 == null) { dato = 12; } else { dato = listPintaMalla[i].C13_00.Value; } }
                        if (x == 14) { if (listPintaMalla[i].C14_00 == null) { dato = 12; } else { dato = listPintaMalla[i].C14_00.Value; } }
                        if (x == 15) { if (listPintaMalla[i].C15_00 == null) { dato = 12; } else { dato = listPintaMalla[i].C15_00.Value; } }
                        if (x == 16) { if (listPintaMalla[i].C16_00 == null) { dato = 12; } else { dato = listPintaMalla[i].C16_00.Value; } }
                        if (x == 17) { if (listPintaMalla[i].C17_00 == null) { dato = 12; } else { dato = listPintaMalla[i].C17_00.Value; } }
                        if (x == 18) { if (listPintaMalla[i].C18_00 == null) { dato = 12; } else { dato = listPintaMalla[i].C18_00.Value; } }
                        if (x == 19) { if (listPintaMalla[i].C19_00 == null) { dato = 12; } else { dato = listPintaMalla[i].C19_00.Value; } }
                        if (x == 20) { if (listPintaMalla[i].C20_00 == null) { dato = 12; } else { dato = listPintaMalla[i].C20_00.Value; } }
                        if (x == 21) { if (listPintaMalla[i].C21_00 == null) { dato = 12; } else { dato = listPintaMalla[i].C21_00.Value; } }
                        

                        if (dato == 11 || dato == null)
                        {
                            color = "<input type='button' class='Turno' id='idHora_" + i + "_" + x + "' style='background-color: green;width: 100%;height: 100%;' " + ">";
                        }else
                        {
                            color = "<input type='button' class='Turno' id='idHora_" + i + "_" + x + "' style='background-color: red;width: 100%;height: 100%;' " + ">";
                        }

                        tblMalla += "<td>" + color + "</td>";
                    }
                       
                       tblMalla += "</tr>";

                }

      
                    return tblMalla;
            }
            catch (Exception es)
            {
                throw es;
            }
        }


        [HttpGet]
        public JsonResult CountFuncLider(int idLider)
        {
            try
            {
                List<CountFuncionariosEstado_Result> listCountFunc = data.CountFuncionariosEstado(idLider).ToList();
                return Json(listCountFunc, JsonRequestBehavior.AllowGet);
            }
            catch (Exception es)
            {
                throw es;
            }
        }

        [HttpGet]
        public JsonResult ConteoCasos(int idLider, string fechaIni, string fechaFin)
        {
            try
            {
                List<ConteoCasos_Result> listCountCase = data.ConteoCasos(idLider, fechaIni, fechaFin).ToList();
                return Json(listCountCase, JsonRequestBehavior.AllowGet);

            }
            catch(Exception es)
            {
                throw es;
            }
        }
        public ActionResult VistaProductividad()
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
        public JsonResult Productividad(string idLider)
        {
            try
            {
               DateTime fecha = DateTime.Now;
               int dia = fecha.Day;
               int mes = fecha.Month;
               int anio = fecha.Year;
               string horaIni = "00:00:00";
               string horaFin = "23:59:00";

               string fechaIni = dia + "/" + mes + "/" + anio + " " + horaIni;
               string fechaFin = dia + "/" + mes + "/" + anio + " " + horaFin;

               List<ProductividadDiaria_Result> listProduct = data.ProductividadDiaria(Convert.ToInt32(idLider), fechaIni, fechaFin).ToList();
                return Json(listProduct, JsonRequestBehavior.AllowGet);
            }
            catch (Exception es)
            {
                throw es;
            }
        }



    }
}
