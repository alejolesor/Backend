using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EverProV2.Models;
using System.Web.UI.WebControls;


namespace EverProV2.Controllers
{
    public class EverProRRHHController : Controller
    {
               //
        // GET: /EverProRRHH/
        private Asignador_SGDEntities gd = new Asignador_SGDEntities();


        public ActionResult EverProRRHH()
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

        public ActionResult EverProModuloEveris()
        {
           // generarCamposModuloEveris();
            if (Session["IdUsuario"] != null)
            {
                generarCamposModuloEveris();
                return View();
            }
            else
            {
                Response.Redirect("../Seguridad/Login");
                return null;
            }
        }

        public ActionResult EverProModuloEverPro()
        {
            generarCamposModuloEverPro();
            return View();
        }

        public ActionResult EverProConsultas()
        {
           // consultarFuncEverPro(1);
            return View();
        }

        public void generarCampos()
        {
            CrearFormularios formulario = new CrearFormularios();
            List<ts_Campos> lstCampos = obtenerCamposEnvio();
            Table ta = new Table();

            string campos = formulario.GenerarCampos(ta, lstCampos, null, 1, 0, "0", 0, 0);
            campos = campos.Replace('"', '\'');
            ViewData["RRHHDatosPrin"] = campos;
        }

        public void generarCamposModuloEveris()
        {
            CrearFormularios formulario = new CrearFormularios();
            List<ts_Campos> lstCampos = obtenerCamposModuloEveris();
            Table ta = new Table();

            string campos = formulario.GenerarCampos(ta, lstCampos, null, 1, 0, "0", 0, 0);
            campos = campos.Replace('"', '\'');
            TempData["RRHHModuloeveris"] = campos;
        }


        public void generarCamposModuloEverPro()
        {
            CrearFormularios formulario = new CrearFormularios();
            List<ts_Campos> lstCampos = obtenerCamposModuloEverPro();
            Table ta = new Table();

            string campos = formulario.GenerarCampos(ta, lstCampos, null, 1, 0, "0", 0, 0);
            campos = campos.Replace('"', '\'');
            TempData["RRHHModuloEverProLideres"] = campos;
        }

        public List<ts_Campos> obtenerCamposEnvio()
        {

            var query = (from a in gd.ts_Campos
                         where a.CodFormulario == 4
                         select a);
            return query.ToList();
        }

        public List<ts_Campos> obtenerCamposModuloEveris()
        {

            var query = (from a in gd.ts_Campos
                         where a.CodFormulario == 5
                         select a);
            return query.ToList();
        }

        public List<ts_Campos> obtenerCamposModuloEverPro()
        {

            var query = (from a in gd.ts_Campos
                         where a.CodFormulario == 6
                         select a);
            return query.ToList();
        }

        [HttpPost]
        public ActionResult InsertDatosPersonal(RRHH RRHH)
        {

            try
            {
                Session["CedulaFunc"] = RRHH.Cedula;
                List<spInsertaDatosPersonal_Result> insert = gd.spInsertaDatosPersonal(RRHH.Cedula, RRHH.NombreCompleto, RRHH.FechaNacimiento,
                    RRHH.Edad,RRHH.TelefonoCelular, RRHH.TelefonoContato,RRHH.Direccion,RRHH.IdMotivoIngreso,RRHH.IdTipoDocumento,
                    RRHH.IdGenero,RRHH.IdCiudad,RRHH.IdLocalidad,RRHH.IdCarreraEducativa).ToList();

                if (insert[0].Mensaje.ToString() != "0")
                {
                    var mensaje = "El funcionario ya se encuentra registrado en la base";
                    return Json(mensaje, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    var mensaje = "Se han registrado los datos correctamente";
                    return Json(mensaje, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        [HttpPost]
        public ActionResult ActualizaDatosPersonalesEverPro(RRHH RRHH)
        {
            Session["CedulaFunc"] = RRHH.Cedula;
            gd.spActualizaDatosPersonal(RRHH.Cedula, RRHH.NombreCompleto, RRHH.FechaNacimiento,
                    RRHH.Edad, RRHH.TelefonoCelular, RRHH.TelefonoContato, RRHH.Direccion, RRHH.IdMotivoIngreso, RRHH.IdTipoDocumento,
                    RRHH.IdGenero, RRHH.IdCiudad, RRHH.IdLocalidad, RRHH.IdCarreraEducativa);

            var mensaje = "Se han registrado los datos correctamente";
            return Json(mensaje, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult InsertDatosmoduloEveris(RRHHModEveris RRHHModEveris)
        {

            try
            {


                List<spInsertaModuloEveris_Result> insert = gd.spInsertaModuloEveris(Convert.ToInt32(Session["CedulaFunc"].ToString()), RRHHModEveris.Empresa, RRHHModEveris.FecContratacionTemporal,
                    RRHHModEveris.FecContratacionEveris, RRHHModEveris.SalarioEveris, RRHHModEveris.CsrGeco, RRHHModEveris.Pais, RRHHModEveris.Cliente, RRHHModEveris.Proyecto,
                    RRHHModEveris.Cargo, RRHHModEveris.Categoria, RRHHModEveris.Nivel).ToList();

                if (insert[0].Mensaje.ToString() != "0")
                {
                    var mensaje = "El funcionario ya se encuentra registrado en la base";
                    return Json(mensaje, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    var mensaje = "Se han registrado los datos correctamente";
                    return Json(mensaje, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }


        [HttpPost]
        public ActionResult ActualizaModuloEverisEverPro(RRHHModEveris RRHHModEveris)
        {
            gd.spActualizaModuloEveris(Convert.ToInt32(Session["CedulaFunc"].ToString()), RRHHModEveris.Empresa, RRHHModEveris.FecContratacionTemporal,
                    RRHHModEveris.FecContratacionEveris, RRHHModEveris.SalarioEveris, RRHHModEveris.CsrGeco, RRHHModEveris.Pais, RRHHModEveris.Cliente, RRHHModEveris.Proyecto,
                    RRHHModEveris.Cargo, RRHHModEveris.Categoria, RRHHModEveris.Nivel);

            var mensaje = "Se han registrado los datos correctamente";
            return Json(mensaje, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public ActionResult InsertDatosDatosEverPro(RRHHEverProLideres RRHHEverProLideres)
        {

            try
            {       List<spInsertaModuloEverPro_Result> insert = gd.spInsertaModuloEverPro(Convert.ToInt32(Session["CedulaFunc"].ToString()), RRHHEverProLideres.IdHC,
                    RRHHEverProLideres.IdRol, RRHHEverProLideres.CodigoDeEmpleado, RRHHEverProLideres.CedJefe, RRHHEverProLideres.CedPsl, RRHHEverProLideres.CedPtl,
                    RRHHEverProLideres.CedPsc, RRHHEverProLideres.IdArea, RRHHEverProLideres.IdProceso, RRHHEverProLideres.IdClasificacion, RRHHEverProLideres.IdLugarDeTrabajo,
                    RRHHEverProLideres.IdTurno, RRHHEverProLideres.CedLiderSGD).ToList();

                if (insert[0].Mensaje.ToString() != "0")
                {
                    var mensaje = "El funcionario ya se encuentra registrado en la base";
                    return Json(mensaje, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    var mensaje = "Se han registrado los datos correctamente";
                    return Json(mensaje, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }


        [HttpPost]
        public ActionResult ActualizaModuloEverPro(RRHHEverProLideres RRHHEverProLideres)
        {
            try
            {
                gd.spActualizaModuloEverProLideres(Convert.ToInt32(Session["CedulaFunc"].ToString()), RRHHEverProLideres.IdHC,
           RRHHEverProLideres.IdRol, RRHHEverProLideres.CodigoDeEmpleado, RRHHEverProLideres.CedJefe, RRHHEverProLideres.CedPsl, RRHHEverProLideres.CedPtl,
           RRHHEverProLideres.CedPsc, RRHHEverProLideres.IdArea, RRHHEverProLideres.IdProceso, RRHHEverProLideres.IdClasificacion, RRHHEverProLideres.IdLugarDeTrabajo,
           RRHHEverProLideres.IdTurno, RRHHEverProLideres.CedLiderSGD);

                var mensaje = "Se han registrado los datos correctamente";
                return Json(mensaje, JsonRequestBehavior.AllowGet);

            }catch(Exception es){
                throw es;
            }
           
        }


        [HttpGet]
        public JsonResult consultarFuncEverPro(int Cedula)
        {
            try
            {
                List<spConsultaFuncionariosEverPro_Result> listClientes = gd.spConsultaFuncionariosEverPro(Cedula).ToList();
                return Json(listClientes, JsonRequestBehavior.AllowGet);
            }
            catch (Exception es)
            {
                throw es;
            }
        }

        [HttpGet]
        public JsonResult consultarDatosPersonales(int Cedula)
        {
            try
            {
                List<spConsultaDatosPersonales_Result> listClientes = gd.spConsultaDatosPersonales(Cedula).ToList();
                return Json(listClientes, JsonRequestBehavior.AllowGet);
            }
            catch (Exception es)
            {
                throw es;
            }
        }

        [HttpGet]
        public JsonResult consultarModuloEveris(int Cedula)
        {
            try
            {
                List<spConsultaModuloEveris_Result> listClientes = gd.spConsultaModuloEveris(Cedula).ToList();
                return Json(listClientes, JsonRequestBehavior.AllowGet);
            }
            catch (Exception es)
            {
                throw es;
            }
        }

        [HttpGet]
        public JsonResult consultarModuloEverProLideres(int Cedula)
        {
            try
            {
                List<spConsultaModuloEverProLideres_Result> listClientes = gd.spConsultaModuloEverProLideres(Cedula).ToList();
                return Json(listClientes, JsonRequestBehavior.AllowGet);
            }
            catch (Exception es)
            {
                throw es;
            }
        }

        [HttpGet]
        public JsonResult obtenerPsl(int perfil)
        {
            return Json(new SelectList(gd.spConsultaLideresEverPro(perfil).ToList(), "Cedula", "NombreCompleto"),
                JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult obtenerlideresSGD(int area)
        {
            return Json(new SelectList(gd.spObtenerLideres(area).ToList(), "Cedula", "NombreCompleto", "idArea"),
                JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult obtenerCategoriaEverPro(int empresa)
        {
            List<spConsultaCategoriaEverPro_Result> a = gd.spConsultaCategoriaEverPro(empresa).ToList();

            return Json(new SelectList(gd.spConsultaCategoriaEverPro(empresa).ToList(), "Codigo", "Descripcion"),
                JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult obtenerNivelesEverPro(int empresa)
        {
            List<spConsultaNivelEverPro_Result> a = gd.spConsultaNivelEverPro(empresa).ToList();

            return Json(new SelectList(gd.spConsultaNivelEverPro(empresa).ToList(), "Codigo", "Descripcion"),
                JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult obtenerLocalidades()
        {
            List<spConsultaLocalidades_Result> a = gd.spConsultaLocalidades().ToList();

            return Json(new SelectList(gd.spConsultaLocalidades().ToList(), "Codigo", "Descripcion"),
                JsonRequestBehavior.AllowGet);
        }

        public class DatosForm4
        {
            public string lst_11 { get; set; }
            
        }

        public class RRHH
        {
            public int Cedula { get; set; }
            public string NombreCompleto { get; set; }
            public DateTime FechaNacimiento { get; set; }
            public string Edad { get; set; }
            public string TelefonoCelular { get; set; }
            public string TelefonoContato { get; set; }
            public string Direccion { get; set; }
            public int IdMotivoIngreso { get; set; }
            public int IdTipoDocumento { get; set; }
            public int IdGenero { get; set; }
            public int IdCiudad { get; set; }
            public int IdLocalidad { get; set; }
            public int IdCarreraEducativa { get; set; }
        }

        public class RRHHModEveris
        {
            public int Cedula { get; set; }
            public int Empresa { get; set; }
            public DateTime FecContratacionTemporal { get; set; }
            public DateTime FecContratacionEveris { get; set; }
            public string SalarioEveris { get; set; }
            public int CsrGeco { get; set; }
            public int Pais { get; set; }
            public int Cliente { get; set; }
            public int Proyecto { get; set; }
            public int Cargo { get; set; }
            public int Categoria { get; set; }
            public int Nivel { get; set; }
        }

        public class RRHHEverProLideres
        {
            public int Cedula { get; set; }
            public int IdHC { get; set; }
            public int IdRol { get; set; }
            public int CodigoDeEmpleado { get; set; }
            public int CedJefe { get; set; }
            public int CedPsl { get; set; }
            public int CedPtl { get; set; }
            public int CedPsc { get; set; }
            public int IdArea { get; set; }
            public int IdProceso { get; set; }
            public int IdClasificacion { get; set; }
            public int IdLugarDeTrabajo { get; set; }
            public int IdTurno { get; set; }
            public int CedLiderSGD { get; set; }
        }


    }

}
