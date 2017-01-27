using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EverProV2.Models;
using System.Web.UI.WebControls;
using EverProV2.Controllers;
using System.Collections;
using EverProV2.Clases;
using System.Diagnostics;

namespace EverProV2.Controllers
{
    /// <summary>
    /// Clase Listado Colas
    /// </summary>
    public class ListadoColasController : Controller
    {
        //
        // GET: /ListadoColas/

        Asignador_SGDEntities modelo = new Asignador_SGDEntities();
        EverisProduccionEntities dba = new EverisProduccionEntities();

        /// <summary>
        /// Index Pagina Inicial y validacion de sesion 
        /// </summary>
        /// <returns>Despliega la vista incial y valida la  sesion de usuario </returns>
        public ActionResult Index()
        {

            if (Session["IdUsuario"] != null)
            {
                string idLider = Session["idLider"].ToString();
                string idproceso = Session["idproceso"].ToString();


                var lider = Convert.ToInt32(idLider);

                var producto = BtnDactiloscopia(lider);

                ViewData["producto"] = producto;
                return View();
            }
            else
            {
                Response.Redirect("../Seguridad/Login");
                return null;
            }
        }
        /// <summary>
        /// Boton de Dactiloscopia , Consulta los casos en smartFile para consultar los casos que se puedan asignar 
        /// </summary>
        /// <param name="idLider"></param>
        /// <returns>Retorna los casos disponibles para poderlos poner en la lista de  cola </returns>
        public string BtnDactiloscopia(int idLider)
        {
            var producto = "";
            var Rproducto = modelo.BtnDactiloscopia(idLider).ToList();

            if (Rproducto.Count() == 0)
            {

                producto = "null";
            }
            else
            {
                producto = Rproducto[0].Descripcion;
            }

            modelo.Dispose();
            return producto;
        }


        // no lo utilizamos  
        /// <summary>
        ///  Metodo que recibe un parametro y con este se ejecuta un sp que nos consulta segun el parametro la tabla correspondiente al proceso
        /// </summary>
        /// <param name="idProceso"></param>
        /// <param name="idLider"></param>
        /// <returns> Retorna la lista de casos en cola de acuerdo al  lider indicado</returns>
        //[HttpGet]
        //public JsonResult ListaColas(string idProceso, string idLider)
        //{
        //    try
        //    {
        //        List<spListaColas_Result> listaColas = modelo.spListaColas(Convert.ToInt32(idProceso), idLider).ToList();

        //        modelo.Dispose();
        //        return Json(listaColas, JsonRequestBehavior.AllowGet);

        //    }
        //    catch (Exception es)
        //    {
        //        throw es;
        //    }



        //}

        /// <summary>
        /// 
        /// </summary>
        /// <param name="idLider"></param>
        /// <returns></returns>
        //[HttpGet]
        //public JsonResult FuncionariosAsignar(string idLider)
        //{
        //    try
        //    {
        //        List<spObtenerFunColas_Result> listfunColas = modelo.spObtenerFunColas(Convert.ToInt32(idLider)).ToList();
        //        return Json(listfunColas, JsonRequestBehavior.AllowGet);
        //    }
        //    catch (Exception es)
        //    {
        //        throw es;
        //    }


        //}

        /// <summary>
        /// Consulta la lista Total de los casos y personas para la asignacion de sgd   
        /// </summary>
        /// <param name="idLider"> Recibe el numero de identificacion para consultar las personas asociadas al Lider </param>
        /// <returns>Retorna la lista de acuerdo a la invocacion de store procedure en en el metodo
        /// </returns>
        [HttpGet]
        public JsonResult trazaCasosFuncionarios(int idLider)
        {
            try
            {
                List<trazaFuncCasosOptim_Result> lisTraza = modelo.trazaFuncCasosOptim(idLider).ToList();
                return Json(lisTraza, JsonRequestBehavior.AllowGet);

            }
            catch (Exception es)
            {
                throw es;
            }

        }

        /// <summary>
        /// Obtiene Nombre de los procesos  
        /// </summary>
        /// <param name="idProceso"></param>
        /// <returns>Se consulta el nombre de los casos segun el proceso de acuerdo al idproceso</returns>
        [HttpGet]
        public JsonResult listaProcesos(int idProceso)
        {
            try
            {
                var list = modelo.spObtenerNombreCaso(idProceso).ToList();
                modelo.Dispose();
                return Json(list, JsonRequestBehavior.AllowGet);

            }
            catch (Exception e)
            {
                throw e;
            }

        }

        /// <summary>
        /// Se consulta los niveles de los casos para asi proceder a la asignacion 
        /// </summary>
        /// <param name="idProceso"></param>
        /// <returns>Todos los niveles de los casos </returns>
        [HttpGet]
        public JsonResult listaNiveles(int idProceso)
        {
            try
            {
                var lista = modelo.spObtenerNiveles(idProceso).ToList();

                modelo.Dispose();
                GC.Collect();
                return Json(lista, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw ex;

            }
        }

        /// <summary>
        /// Organiza caso Prioritario para establecerlo de primeras en la cola 
        /// </summary>
        /// <param name="nomProceso"></param>
        /// <param name="noCaso"></param>
        /// <param name="nivel"></param>
        /// <param name="monto"></param>
        /// <param name="idLider"></param>
        /// <param name="idProceso"></param>
        /// <returns> Retorna  El caso Prioritario con el fin de lanzarlo en la cola  </returns>
        [HttpGet]
        public ActionResult CasoPrioritario(string nomProceso, int noCaso, string nivel, int monto, string idLider, string idProceso)
        {
            Asignador_SGDEntities data = new Asignador_SGDEntities();

            try
            {
                var newCase = data.spCasoPrioritario(nomProceso, noCaso, nivel, idLider, Convert.ToInt32(idProceso), monto).ToList();

                //Libera memoria automaticamente del objeto que ya no esta siendo administrado o utilizado y el GC lo toma de manera mas facil 
                data.Dispose();


                // Forzar una recolección de basura para demostrar cómo la Data será manejado como objeto //
                GC.Collect();
                //Suspende el proceso actual  hasta que el subproceso que esta procesando la cola de finalizadores vacíe dicha cola
                GC.WaitForPendingFinalizers();
                GC.Collect();


                var mensaje = "";
                if (newCase[0].Mensaje == 1)
                {
                    mensaje = "Se ha ingresado correctamente el caso con prioridad Especial ";
                    LogRepo.registro("El usuario con CC: " + Session["IdUsuario"] + " ha ingresado el caso Nº: " + noCaso + " al proceso: " + nomProceso + " con lider: " + idLider);
                }
                else
                {
                    mensaje = "No es posible ingraser el caso, este ya existe o esta asignado ";
                    LogRepo.registro("El usuario con CC: " + Session["IdUsuario"] + " ha intentado ingresar el caso Nº: " + noCaso + " al proceso: " + nomProceso + " con lider: " + idLider + " sin exito por que el caso  ya existe o esta asignado ");
                }

                // Llamar GC.KeepAlive (Data) en este punto para mantener una referencia a Data. 
                // Esto evitará que el recolector de basura se acumule en el objeto  durante la ejecución del método   CasoPrioritario().
                GC.KeepAlive(data);

                return Json(mensaje, JsonRequestBehavior.AllowGet);

            }
            catch (Exception es)
            {
                throw es;
            }




        }

        /// <summary>
        /// Realiza la accion de verificar personal disponible para la asignacion manual de casos 
        /// </summary>
        /// <param name="AsignaMan"></param>
        /// <returns> La lista del personal disponible para la asignacion de casos </returns>
        [HttpPost]
        public ActionResult AsignaCasoManual(List<ClsListadoColas> AsignaMan)
        {
            try
            {

                var mensaje = "";
                ArrayList Asignados = new ArrayList();
                ArrayList NoAsignados = new ArrayList();
                ArrayList Anteriores = new ArrayList();

                foreach (var ValorCampo in AsignaMan)
                {
                    string identFunc = ValorCampo.identFuncionario;

                    int nCaso = Convert.ToInt32(ValorCampo.Ncaso),
                        idProcesos = Convert.ToInt32(ValorCampo.IdProceso);
                    Asignador_SGDEntities data = new Asignador_SGDEntities();

                    List<spAsignacionManual_Result> insert = data.spAsignacionManual(identFunc, nCaso, idProcesos).ToList();

                    //Libera memoria automaticamente del objeto que ya no esta siendo administrado o utilizado y el GC lo toma de manera mas facil
                    data.Dispose();

                    GC.Collect();
                    GC.WaitForPendingFinalizers();
                    GC.Collect();


                    GC.KeepAlive(data);
                    if (insert[0].Mensaje.ToString() == "1")
                    {
                        //mensaje = "El funcionario se encuentra ocupado";
                        Anteriores.Add(nCaso);

                    }
                    else
                    {
                        if (insert[0].Mensaje.ToString() == "2")
                        {
                            NoAsignados.Add(nCaso);
                        }
                        else
                        {
                            Asignados.Add(nCaso);
                            LogRepo.registro("El funcionario con CC: " + Session["IdUsuario"] + " Ha asignado de forma manual el caso Nº: " + nCaso + " al funcionario con CC: " + identFunc);
                        }
                    }
                }


                if (Asignados.Count > 0)
                {
                    string casosAsig = "";

                    foreach (var asig in Asignados)
                    {
                        casosAsig += asig.ToString() + " - ";
                    }
                    mensaje += "Casos Asignados: " + casosAsig + "\n";

                }

                if (NoAsignados.Count > 0)
                {
                    string casosnoasig = "";
                    foreach (var noasig in NoAsignados)
                    {
                        casosnoasig += noasig.ToString() + " - ";
                    }
                    mensaje += "El usuario no cuenta con los permisos necesarios para asignarle los siguientes casos: " + casosnoasig + "\n";
                }

                if (Anteriores.Count > 0)
                {
                    string casosAnteiores = "";

                    foreach (var ant in Asignados)
                    {
                        casosAnteiores += ant.ToString() + " - ";
                    }
                    mensaje += "Casos no Asignados ya los realizo con anterioridad en otra etapa: " + casosAnteiores + "\n";
                }
                return Json(mensaje, JsonRequestBehavior.AllowGet);
            }
            catch (Exception es)
            {
                throw es;
            }
        }


        /// <summary>
        /// Consultar los casos que se encuentran en cola 
        /// </summary>
        /// <param name="idLider"></param>
        /// <param name="idProceso"></param>
        /// <returns> Retorna la lista total de los casos que se encuentran en cola</returns>
        [HttpGet]
        public JsonResult ListCasoManual(string idLider, string idProceso)
        {
            try
            {

                List<spVerCasosEnCola_Result> listaCasoManual = modelo.spVerCasosEnCola(Convert.ToInt32(idLider), Convert.ToInt32(idProceso)).ToList();

                return Json(listaCasoManual, JsonRequestBehavior.AllowGet);
            }
            catch (Exception es)
            {
                throw es;
            }

        }


        public string idproceso { get; set; }
    }


}
