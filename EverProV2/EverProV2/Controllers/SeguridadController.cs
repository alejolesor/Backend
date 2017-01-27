using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EverProV2.Models;
using Telerik.Web.Mvc.UI;



namespace EverProV2.Controllers
{
    public class SeguridadController : Controller
    {
        //
        // GET: /Seguridad/
        //private System.Diagnostics.EventLog eventLog = new System.Diagnostics.EventLog("LogGestorDocumental");
        public string prefijo_menu = "";

        //EverProEntities data = new EverProEntities();
        Asignador_SGDEntities data = new Asignador_SGDEntities();
        public ActionResult Index()
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


        public ActionResult Login()
        {
            ViewData["Respuesta"] = "";
            return View();
        }

        public ActionResult Logout()
        {
            Auditoria aud = new Auditoria();

            aud.aud_evento = "logout";
            aud.aud_fechaHora = DateTime.Now;
            aud.aud_idUsuario = ((Usuarios)Session["USUARIO"]).IdUsuario;

            //data.AddToAuditoria(aud);
            data.SaveChanges();

            Session.RemoveAll();
            Session.Clear();
            Session.Abandon();
            return base.Redirect("/Seguridad/Login");
        }

        public ActionResult Inicio()
        {
            return View();
        }

        /*
         * **********************************
         EN BASE A UN PADRE CARGO SUS HIJOS DINAMICAMENTE POR AJAX
         * **********************************
         */

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult CargarHijosMenu(TreeViewItem node)
        {
            try
            {
                int? parentId = !string.IsNullOrEmpty(node.Value) ? (int?)Convert.ToInt32(node.Value) : null;

                MenuController controlador = new MenuController();
                List<spObtenerMenuHijosPerfil_Result> menus = controlador.ObtenerHijosPerfil((int)parentId, (int)Session["ROL_USUARIO"]);
                IEnumerable nodes = from item in menus

                                    select new TreeViewItemModel
                                    {
                                        Text = item.DescMenu,
                                        NavigateUrl = prefijo_menu + item.Url,
                                        LoadOnDemand = false,
                                        Enabled = true
                                    };

                return new JsonResult { Data = nodes };
            }
            catch (Exception exception)
            {
                LogRepository.registro("Error en SeguridadController metodo CargarHijosMenu " + exception.Message + " stack trace " + exception.StackTrace);
                throw;
            }


        }

        [HttpGet]
        public ActionResult CargarHijosMenu(int parentId)
        {
            try
            {
                MenuController controlador = new MenuController();
                List<spObtenerMenuHijosPerfil_Result> menus = controlador.ObtenerHijosPerfil((int)parentId, (int)Session["ROL_USUARIO"]);

                return Json(menus, JsonRequestBehavior.AllowGet);
            }
            catch (Exception exception)
            {
                LogRepository.registro("Error en SeguridadController metodo CargarHijosMenu " + exception.Message + " stack trace " + exception.StackTrace);
                throw;
            }
        }

        //Modificado desde aqui
        /*
        * **********************************
        EN BASE A UN PADRE CARGO SUS Nietos DINAMICAMENTE POR AJAX
        * **********************************
        */
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult CargarNietosMenu(TreeViewItem node)
        {
            try
            {
                int? parentId = !string.IsNullOrEmpty(node.Value) ? (int?)Convert.ToInt32(node.Value) : null;

                MenuController controlador = new MenuController();
                List<spObtenerMenuNietosPerfil_Result> menus = controlador.ObtenerNietosPerfil((int)parentId, (int)Session["ROL_USUARIO"]);
                IEnumerable nodes = from item in menus

                                    select new TreeViewItemModel
                                    {
                                        Text = item.DescMenu,
                                        NavigateUrl = prefijo_menu + item.Url,
                                        LoadOnDemand = false,
                                        Enabled = true
                                    };

                return new JsonResult { Data = nodes };
            }
            catch (Exception exception)
            {
                LogRepository.registro("Error en SeguridadController metodo CargarNietosMenu " + exception.Message + " stack trace " + exception.StackTrace);
                throw;
            }


        }

        [HttpGet]
        public ActionResult CargarNietosMenu(int parentId)
        {
            try
            {
                MenuController controlador = new MenuController();
                List<spObtenerMenuNietosPerfil_Result> menus = controlador.ObtenerNietosPerfil((int)parentId, (int)Session["ROL_USUARIO"]);

                return Json(menus, JsonRequestBehavior.AllowGet);
            }
            catch (Exception exception)
            {
                LogRepository.registro("Error en SeguridadController metodo CargarNietosMenu " + exception.Message + " stack trace " + exception.StackTrace);
                throw;
            }
        }
        //Modificado hasta aca


        public ActionResult ValidarUsuario(String txtUsuario, String txtContrasena)
        {
            string respuesta = "";

            try
            {
                //Validar si la seguridad de las contraseñas esta habilitada o no lo esta

                ControlUsuariosController ctrl = new ControlUsuariosController();
                bool seguridadHabilitada = ctrl.ConsultaSeguridadHabilitada();

                UsuariosController busu = new UsuariosController();
                decimal idUsuario = Convert.ToDecimal(txtUsuario);
                List<spObtenerNombreUsu_Result> nombre = data.spObtenerNombreUsu(idUsuario).ToList();

                Usuarios usu = new Usuarios {
                    IdUsuario = idUsuario,
                    PassCodeUsuario = txtContrasena,
                    NomUsuario = nombre[0].NomUsuario
                };

                Session["USUARIO_LOGUEADO"] = usu;

                if (busu.ValidarUsuarios(usu))
                {
                    string claveDefault = System.Configuration.ConfigurationManager.AppSettings["KeyDefault"];
                    //Verificar si la contraseña ingresada es igual a la contraseña por default que asigna el sistema para que el usuario la cambie


                    //if (claveDefault == txtContrasena)
                    //{
                    //    Response.Redirect("../Usuarios/RestablecerContrasena");
                    //    return null;
                    //}

                    Session["USUARIO"] = usu;
                    Session["NombreUsuario"] = usu.NomUsuario;
                    Session["IdUsuario"] = usu.IdUsuario;
                    Session["ROL_USUARIO"] = data.Usuarios.Where(c => c.IdUsuario == usu.IdUsuario).First().IdRol;

                    //SETEO EL PARAMETRO QUE ME DEFINIRA LOS BOTONES QUE SE MUESTRAN EN LA BARRA DEL ALTERNATIFF
                    Parametros param = data.Parametros.First(c => c.codigo == "TOOL_VIS");
                    Session["TOOL_BAR"] = param.valor;

                    //VALIDAR SI EL APLICATIVO TIENE HABILITADA LA SEGURIDAD DE USUARIOS

                    if (seguridadHabilitada)
                    {
                        //Validar si la contraseña se encuentra proxima a expirar
                        UsuariosController a = new UsuariosController();
                        if (a.obtenerTipoLogin() == 1)
                        {
                            string mensaje = busu.ValidarCaducidadContrasena(usu.IdUsuario.ToString(), txtContrasena);
                            if (mensaje.Equals("Caducada"))
                            {
                                throw new Exception("Su contraseña ha Caducado");
                            }

                            if (mensaje.Contains("cambiarla"))
                            {
                                System.Web.HttpContext.Current.Session["Mensaje"] = mensaje;
                            }
                        }
                    }

                    Auditoria aud = new Auditoria();

                    aud.aud_evento = "login";
                    aud.aud_fechaHora = DateTime.Now;
                    aud.aud_idUsuario = usu.IdUsuario;

                    data.Auditoria.Add(aud);

                    //data. AddToAuditoria(aud);

                    data.SaveChanges();

                    //IMPORTANTE USAR EL BASE REDIRECT TAL CUAL PARA QUE ENLACE BIEN LA SESSION
                    return base.Redirect("/Home/Index");

                }
                else
                {
                    respuesta = "El usuario o contraseña digitados no coinciden";
                }
            }

            catch (Exception exception)
            {
                LogRepository.registro("Error en SeguridadController metodo ValidarUsuario " + exception.Message + " stack trace " + exception.StackTrace);
                respuesta = exception.Message;
            }
            ViewData["Respuesta"] = respuesta;
            return View("Login");
        }
    }
}
