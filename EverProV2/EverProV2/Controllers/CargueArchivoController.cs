using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.OleDb;
using System.Data;
using EverProV2.Models;
using System.IO;
using EverProV2.Controllers;
using EverProV2.Clases;

namespace EverProV2.Controllers
{
    public class CargueArchivoController : Controller
    {
        //
        // GET: /CargueArchivo/
        private Asignador_SGDEntities gd;
        public ActionResult Index()
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

        [HttpPost]
        public ActionResult CargueExcel(DatosForm DatosForm, HttpPostedFileBase Archivo)
        {
            string ArchivoFile = "";
            TempData["Error"] = "";


            if (Archivo != null || Archivo.ContentLength != 0)
            {
                if (Archivo.FileName == "SGD_Formalizacion_Libranza.xlsx" || Archivo.FileName == "SGD_Analisis_Libranza.xlsx" || Archivo.FileName == "SGD_Analisis_Vehiculo.xlsx" || Archivo.FileName == "SGD_Analisis_Consumo.xlsx" || Archivo.FileName == "SGD_Formalizacion_Vehiculo.xlsx"  || Archivo.FileName == "SGD_PM_Actualizacion.xlsx" || Archivo.FileName == "SGD_Procesos_Masivos_Actualizacion.xlsx")
                {
                    if (Archivo.FileName.EndsWith("xls") || Archivo.FileName.EndsWith("xlsx") || Archivo.FileName.EndsWith("csv"))
                    {
                        ArchivoFile = (DateTime.Now.ToString("yyyy-MM-dd-HH.mm.ss") + "-" + Archivo.FileName).ToLower();
                        string ruta = Server.MapPath("~/Content/Archivos/");

                        if (!System.IO.Directory.Exists(ruta))
                            System.IO.Directory.CreateDirectory(ruta);

                        Archivo.SaveAs(Server.MapPath("~/Content/Archivos/" + ArchivoFile));

                        if (System.IO.File.Exists(ruta + ArchivoFile))
                        {
                            TempData["Exito"] = 1;
                        }
                        else
                        {
                            TempData["Exito"] = 0;
                        }

                        //Obtener la estructura del archivo de Excel.
                        DataSet data = ReadDataFromExcelFiles("~/Content/Archivos/" + ArchivoFile);


                        //Extraer la informacion necesaria para el archivo Contabilizado
                        List<UploadExcel> lstExcel = extraerValoresExcel(data, DatosForm);
                        Session["contadorRegistros"] = lstExcel.Count.ToString();

                        //Guarda los datos de la contabilizacion en las Capturas
                        GuardarExcel(lstExcel, DatosForm.lst_1, DatosForm.lst_2);
                        LogRepo.registro("El archivo: " + ArchivoFile + " fue cargado con éxito por el usuario: " + Session["IdUsuario"]);

                    }
                    else
                    {
                        //    string mensaje = "Archivo no compatible, recuerde cargar un archivo con extencion xls o xlsx";
                        //    return Json(mensaje, JsonRequestBehavior.AllowGet);

                        TempData["Error"] += " Por favor seleccione un archivo con extension xlsx o xls ";
                        LogRepo.registro("El archivo: " + ArchivoFile + " No coincide con la extensión permitida Usuario: " + Session["IdUsuario"]);
                        return base.Redirect("/CargueInformacion/CargueInformacion");

                    }

                }

                else
                {
                    TempData["Error"] += "Por favor verifique el nombre del libro Excel ";
                    LogRepo.registro("El archivo: " + ArchivoFile + " No cumple con el nombre correspondiente al proceso  Usuario: " + Session["IdUsuario"]);
                    return base.Redirect("/CargueInformacion/CargueInformacion");
                }


            }
            ListaFuncionariosController funcionario = new ListaFuncionariosController();
            //funcionario.ListaFuncionarios(DatosForm.lst_2);
            Session["idLider"] = DatosForm.lst_2;
            Session["idproceso"] = DatosForm.lst_1;

            return base.Redirect("/ListaFuncionarios/ListaFuncionarios");
        }

        /// <summary>
        /// Extrae la informacion del libro de Excel subido y la guarda en un dataSet para ser procesado despues
        /// </summary>
        /// <param name="savedExcelFiles"></param>
        /// <returns></returns>
        private DataSet ReadDataFromExcelFiles(string savedExcelFiles)
        {
            //Crear la conexion
            var connectionString = string.Format("Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0};Extended Properties=Excel 12.0;", Server.MapPath(savedExcelFiles));             

            //Llenar el DataSet con las hojas del libro de excel
            var adapter = new OleDbDataAdapter("SELECT * FROM [CASOS_ASIGNAR$]", connectionString);
            var ds = new DataSet();

            adapter.Fill(ds);
            return ds;
        }

        /// <summary>
        /// Extrae los datos necesarios del archivo de Excel de Contabilizados.
        /// </summary>
        /// <param name="Exceldata"></param>
        /// <returns></returns>
        private List<UploadExcel> extraerValoresExcel(DataSet Exceldata, DatosForm DatosForm)
        {
            string Estado = "1";
            string idLider = DatosForm.lst_2;
            string idProceso = DatosForm.lst_1;

            List<UploadExcel> lstCargExcel = new List<UploadExcel>();
            for (int i = 0; i < Exceldata.Tables[0].Rows.Count; i++)
            {
                UploadExcel dao = new UploadExcel();
                dao._N = Exceldata.Tables[0].Rows[i][0].ToString();
                dao._C = Exceldata.Tables[0].Rows[i][1].ToString();
                dao._E = Exceldata.Tables[0].Rows[i][2].ToString();
                dao._NV = Exceldata.Tables[0].Rows[i][3].ToString();
                dao._FI = Exceldata.Tables[0].Rows[i][4].ToString();
                dao._UCE = Exceldata.Tables[0].Rows[i][5].ToString();
                dao._FA = Exceldata.Tables[0].Rows[i][6].ToString();
                dao._R = Exceldata.Tables[0].Rows[i][7].ToString();
                dao._Estado = Estado;
                dao._idLider = idLider;
                dao._idProceso = idProceso;
                lstCargExcel.Add(dao);
            }

            return lstCargExcel;
        }

        /// <summary>
        /// Guarda los datos de una contabilizacion exitosa en la tabla de Captura
        /// </summary>
        /// <param name="lstExcel"></param>
        public void GuardarExcel(List<UploadExcel> lstExcel, string Area, string lider)
        {
            this.gd = new Asignador_SGDEntities();
            CapturaController capCon = new CapturaController();

            switch (Area)
            {
                case "1":
                    //--------------libranzas---------------------//
                    foreach (UploadExcel item in lstExcel)
                    {
                        List<tbLibranza> listLibranza = new List<tbLibranza>();
                        tbLibranza nueva = new tbLibranza();

                        if (!item._C.Equals(""))
                        {
                            nueva.N = item._N;
                            nueva.C = Convert.ToInt32(item._C.ToString());
                            nueva.E = item._E;
                            nueva.NV = item._NV;
                            string Fi = item._FI.ToString();
                            if (Fi == "")
                            {
                                nueva.FI = null;
                            }
                            else
                            {
                                nueva.FI = Convert.ToDateTime(Fi);
                            }
                            nueva.FA = Convert.ToDateTime(item._FA.ToString());
                            nueva.R = item._R;
                            nueva.Estado = Convert.ToInt32(item._Estado);
                            nueva.idlider = item._idLider;
                            nueva.idProceso = Convert.ToInt32(item._idProceso);


                            // valido si el caso ya exixte en la cola y en estado 1 entonces no hace nada, simplemente no lo inserta de nuevo
                            var caso = gd.spVerificaCaso(nueva.C).ToList();
                            var num = Convert.ToInt32(caso[0].CASO.ToString());

                            if (num == 0)
                            {
                                listLibranza.Add(nueva);

                                //Inserto la lista de captura
                                capCon.InsertLibranza(listLibranza);
                            }
                        }         
                        
                    }
                    break;
                case "2":
                    //--------------Formalizacion---------------------//
                    foreach (UploadExcel item in lstExcel)
                    {
                        List<tbFormalizacion> listFormalizacion = new List<tbFormalizacion>();
                        tbFormalizacion nueva = new tbFormalizacion();
                        if (!item._C.Equals(""))
                        {

                            nueva.N = item._N;
                            nueva.C = Convert.ToInt32(item._C.ToString());
                            nueva.E = item._E;
                            nueva.NV = item._NV;
                            string Fi = item._FI.ToString();
                            if (Fi == "")
                            {
                                nueva.FI = null;
                            }
                            else
                            {
                                nueva.FI = Convert.ToDateTime(Fi);
                            }
                            nueva.FA = Convert.ToDateTime(item._FA.ToString());
                            nueva.R = item._R;
                            nueva.Estado = Convert.ToInt32(item._Estado);
                            nueva.idlider = item._idLider;
                            nueva.idProceso = Convert.ToInt32(item._idProceso);

                            // valido si el caso ya exixte en la cola y en estado 1 entonces no hace nada, simplemente no lo inserta de nuevo
                            var caso = gd.spVerificaCaso(nueva.C).ToList();
                            var num = Convert.ToInt32(caso[0].CASO.ToString());
                            
                            if (num == 0)
                            {
                                listFormalizacion.Add(nueva);

                                //Inserto la lista de captura
                                capCon.InsertFormalizacion(listFormalizacion);

                            }
                            
                        }
                    }
                     break;

                case "3":

                    TempData["Error"] += "Este modulo no se encuentra disponible en estos momentos ";
                    Response.Redirect("/CargueInformacion/CargueInformacion");
                    break;

                case "4":

                    TempData["Error"] += "Este modulo no se encuentra disponible en estos momentos ";
                    Response.Redirect("/CargueInformacion/CargueInformacion");
                    break;

                case "5":

                    TempData["Error"] += "Este modulo no se encuentra disponible en estos momentos ";
                    Response.Redirect("/CargueInformacion/CargueInformacion");
                    break;

                case "6":

                    TempData["Error"] += "Este modulo no se encuentra disponible en estos momentos ";
                    Response.Redirect("/CargueInformacion/CargueInformacion");
                    break;

                case "7":

                    TempData["Error"] += "Este modulo no se encuentra disponible en estos momentos ";
                    Response.Redirect("/CargueInformacion/CargueInformacion");
                    break;

                case "8":
                 
                  
                    foreach (UploadExcel item in lstExcel)
                    {
                        List<tbProcesosMasivos> listProcesosMasivos = new List<tbProcesosMasivos>();
                        tbProcesosMasivos nueva = new tbProcesosMasivos();

                        if (!item._C.Equals(""))
                        {
                            nueva.N = item._N;
                            nueva.C = Convert.ToInt32(item._C.ToString());
                            nueva.E = item._E;
                            nueva.NV = item._NV;
                            string Fi = item._FI.ToString();
                            if (Fi == "")
                            {
                                nueva.FI = null;
                            }
                            else
                            {
                                nueva.FI = Convert.ToDateTime(Fi);
                            }
                            //nueva.UCE = Convert.ToInt32(item._UCE);
                            nueva.FA = Convert.ToDateTime(item._FA.ToString());
                            nueva.R = item._R;
                            nueva.Estado = Convert.ToInt32(item._Estado);
                            nueva.idlider = item._idLider;
                            nueva.idProceso = Convert.ToInt32(item._idProceso);


                            // valido si el caso ya exixte en la cola y en estado 1 entonces no hace nada, simplemente no lo inserta de nuevo
                            var caso = gd.spVerificaCaso(nueva.C).ToList();
                            var num = Convert.ToInt32(caso[0].CASO.ToString());

                            if (num == 0)
                            {
                                listProcesosMasivos.Add(nueva);

                                //Inserto la lista de captura

                                capCon.InsertProcesosMasivos(listProcesosMasivos);
                              
                            }
                        }

                    }
                   
                    gd.ConsultarEstadoSabans(Convert.ToInt32(Area), lider);
                   
                    break;

                case "9":

                    TempData["Error"] += "Este modulo no se encuentra disponible en estos momentos ";
                    Response.Redirect("/CargueInformacion/CargueInformacion");
                    break;

                case "10":

                    TempData["Error"] += "Este modulo no se encuentra disponible en estos momentos ";
                    Response.Redirect("/CargueInformacion/CargueInformacion");
                    break;
            }

        }


    }


    public class DatosForm
    {
        public string lst_1 { get; set; }
        public string lst_2 { get; set; }
    }

    #region Clases parametricas para los archivos de Excel
    public class UploadExcel
    {
        public string _N { get; set; }
        public string _C { get; set; }
        public string _E { get; set; }
        public string _NV { get; set; }
        public string _FI { get; set; }
        public string _UCE { get; set; }
        public string _FA { get; set; }
        public string _R { get; set; }
        public string _Estado { get; set; }
        public string _idLider { get; set; }
        public string _idProceso { get; set; }

    }
    #endregion
}
