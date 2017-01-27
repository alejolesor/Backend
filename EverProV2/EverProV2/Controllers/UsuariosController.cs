using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EverProV2.Models;
using System.Security.Cryptography;
using System.Text;
using EverProV2.Controllers;
using System.Web.UI.WebControls;
using System.Web.UI;



namespace EverProV2.Controllers
{
    public class UsuariosController : Controller
    {
        //
        // GET: /Usuarios/


       // private EverProEntities gd = new EverProEntities();
        private Asignador_SGDEntities gd = new Asignador_SGDEntities();

        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// Cambia la contraña de usuario
        /// </summary>
        /// 
        public ActionResult CambiarContrasena(string passActual, string confPass, string mobilePin)
        {
            try
            {
                var mensaje = "";
                ControlUsuariosController val = new ControlUsuariosController();
                Usuarios user = new Usuarios();
                user.IdUsuario = ((Usuarios)Session["USUARIO_LOGUEADO"]).IdUsuario;

                if (mobilePin != null)
                {
                    List<sp_ValidarMobilePIN_Result> resultPin = gd.sp_ValidarMobilePIN(user.IdUsuario, mobilePin).ToList();

                    if (resultPin[0].resultado == 1)
                    {
                        //Validar que la contraseña nueva ingresada no exista en los historicos.
                        string passEncript = this.encryptar(confPass);
                        bool resultadoValidacion = val.ConsultarHistoricos(user.IdUsuario.ToString(), passEncript);

                        if (resultadoValidacion)
                        {

                            mensaje = "La nueva contraseña ingresada fue usada anteriormente, verifique";
                            TempData["Mensaje"] = mensaje;
                            Response.Redirect("../Usuarios/CambiarContrasena");
                            return null;
                            //throw new Exception("La nueva contraseña ingresada fue usada anteriormente.");
                        }

                        string password = gd.Usuarios.Where(x => x.IdUsuario == user.IdUsuario).Select(z => z.PassCodeUsuario).First().ToString();
                        if (this.encryptar(passActual).Equals(password))
                        {
                            bool totalHistoricos = val.ConsultarTotalHistoricos(user.IdUsuario.ToString());
                            if (totalHistoricos)
                            {
                                //Cuando pase de 4 borra el registro mas antiguo y crea uno nuevo
                                val.actualizarHistoricos(user.IdUsuario.ToString(), passEncript);
                            }
                            else
                            {
                                //Cuando el total de registros no supera 4 se debe insertar uno nuevo
                                UsuariosHistorico dataHistorico = new UsuariosHistorico()
                                {
                                    IdUsuario = Convert.ToDecimal(user.IdUsuario.ToString()),
                                    PassCodeUsuario = this.encryptar(confPass),
                                    FechaCaducidad = DateTime.Now.AddMonths(3),
                                    Activo = true
                                };

                                //EverProEntities dbo = new EverProEntities();
                                Asignador_SGDEntities dbo = new Asignador_SGDEntities();
                                //dbo.AddToUsuariosHistorico(dataHistorico);
                                dbo.UsuariosHistorico.Add(dataHistorico);
                                dbo.SaveChanges();
                            }
                            gd.sp_CambioPassword(int.Parse(user.IdUsuario.ToString()), confPass);
                        }
                        else
                        {
                            mensaje = "La Contraseña actual no coincide";
                            TempData["Mensaje"] = mensaje;
                            Response.Redirect("../Usuarios/CambiarContrasena");
                            return null;
                        }
                    }
                    else
                    {
                        mensaje = "El Pin de seguridad ingresado es incorrecto, verifique";
                        TempData["Mensaje"] = mensaje;
                        Response.Redirect("../Usuarios/CambiarContrasena");
                        return null;
                    }
                    mensaje = "La contraseña ha sido cambiada con exito";
                    TempData["Mensaje"] = mensaje;
                    Response.Redirect("../Usuarios/CambiarContrasena");
                    return null;
                }
                else
                {
                    return View();
                }
            }
            catch (Exception e)
            {
                LogRepository.registro("Error en UsuariosController metodo CambioContrasena " + e.Message + " stack trace " + e.StackTrace);
                return View();
                throw;
            }
        }

        static string GetMd5Hash(MD5 md5Hash, string input)
        {

            // Convert the input string to a byte array and compute the hash.
            byte[] data = md5Hash.ComputeHash(Encoding.UTF8.GetBytes(input));

            // Create a new Stringbuilder to collect the bytes
            // and create a string.
            StringBuilder sBuilder = new StringBuilder();

            // Loop through each byte of the hashed data 
            // and format each one as a hexadecimal string.
            for (int i = 0; i < data.Length; i++)
            {
                sBuilder.Append(data[i].ToString("x2"));
            }

            // Return the hexadecimal string.
            return sBuilder.ToString();
        }

        public string encryptar(string password)
        {
            using (MD5 md5Hash = MD5.Create())
            {
                string hash = GetMd5Hash(md5Hash, password);
                return hash;
            }

        }

        public bool ValidarUsuarios(Usuarios Usu)
        {
            ControlUsuariosController ctrl = new ControlUsuariosController();

            bool seguridadHabilitada = ctrl.ConsultaSeguridadHabilitada();

            if (seguridadHabilitada)
            {
                bool respuestaOn = ValUsuariosSeguridadOn(Usu);
                return respuestaOn;
            }
            else
            {
                bool respuestaOff = ValUsuariosSeguridadOff(Usu);
                return respuestaOff;
            }
        }

        public int obtenerTipoLogin()
        {
            //EverProEntities dbo = new EverProEntities();
            Asignador_SGDEntities dbo = new Asignador_SGDEntities();
            var query = (from a in dbo.Parametros
                         where a.codigo == "TIPO_LOGIN"
                         select a.valor).SingleOrDefault();
            return Convert.ToInt32(query);
        }

        public ActionResult NuevoUsuario()
        {
            SelectAjaxEditing();
            return View();
        }

        public void SelectAjaxEditing()
        {
            try
            {
                List<spUsuariosAplicacion_Result> lstUsurios = gd.spUsuariosAplicacion().ToList();
                Table ta = new Table();
                string TableUsuarios = UsuariosApli(ta, lstUsurios);
                ViewData["TableUsu"] = TableUsuarios;

            }
            catch (Exception es)
            {
                throw es;
            }
        }

        public string UsuariosApli( Table ta, List<spUsuariosAplicacion_Result> lstUsu)
        {
            try
            {
                string tblUsu = "";
                string Estado = "";
                string btnDelete = "";
                for (int i = 0; i < lstUsu.Count; i++)
                {
                    if (lstUsu[i].Activo == true)
                    {
                        Estado = "ACTIVO";
                        btnDelete = "<img src='../../Images/Gride/activo.png' id='delete' class='buttonDelete' style='margin-left:10%;' />";
                    }
                    else
                    {
                        Estado = "INACTIVO";
                        btnDelete = "<img src='../../Images/Gride/inactivo.png' id='delete' class='buttonDelete' onclick='EditarUsuarios()' style='margin-left:10%;'  />";
                    }
                    tblUsu += "<tr>"
                        + "   <td>" + lstUsu[i].IdUsuario + "</td>"
                         + "  <td>" + lstUsu[i].NomUsuario + "</td>"
                        + "   <td>" + lstUsu[i].DescRol + "</td>"
                        + "   <td>" + Estado + "</td>"
                        + "   <td>" + lstUsu[i].FecRegistro + "</td>"
                        + "   <td>" + lstUsu[i].FechaCaducidad + "</td>"
                        + "   <td>" + lstUsu[i].SecurityPin + "</td>"
                        + "   <td style='display:none'>" + lstUsu[i].IdRol + "</td>"
                        + "   <td> <img src='../../Images/Gride/pencil.png' id='editarUsuario' style='margin-left:10%; cursor:pointer;' /></td>"
                        + "   <td>" + btnDelete + "</td>"
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
        public ActionResult OptionSelect()
        {
            try
            {
                var query = (from rol in gd.Roles
                             where rol.Activo == true
                             orderby rol.IdRol
                             select rol);

                List<ListaRoles> lstRol = new List<ListaRoles>();
                foreach (var item in query.ToList())
                {
                    ListaRoles data = new ListaRoles();
                    data._codigo = item.IdRol.ToString();
                    data._descripcion = item.DescRol.ToString();

                    lstRol.Add(data);
                }

                return Json(lstRol, JsonRequestBehavior.AllowGet);
            }
            catch (Exception es)
            {
                throw es;
            }
        }

        [HttpGet]
        public ActionResult _InsertAjaxEditing(string idUsuario, string Nombre, string rol)
        {
            try
            {
                //Create a new instance of the EditableProduct class.
                UsuariosPropiedades usuario = new UsuariosPropiedades();
                //Perform model binding (fill the product properties and validate it).
                string claveDefault = System.Configuration.ConfigurationManager.AppSettings["KeyDefault"];
                List<sp_GuardarNuevoUsuario_Result> insert = gd.sp_GuardarNuevoUsuario(long.Parse(idUsuario.ToString()), Nombre.ToString(), int.Parse(rol.ToString()), true, claveDefault.ToString()).ToList();
                if (insert[0].Mensaje.ToString() != "0")
                {
                    var mensaje = "El usuario ya existe , Verifique";
                    return Json(mensaje, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    string pass = System.Configuration.ConfigurationManager.AppSettings["KeyDefault"].ToString();
                    var mensaje = "Se realizo la creación del usuario correctamente, recuerde que la contraseña por defecto para ingresar a la herramienta es: " + pass;
                    return Json(mensaje, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception es)
            {
                throw es;
            }
        }


        [HttpGet]
        public ActionResult _SaveAjaxEditing(string idUsuario, string Nombre, string rol)
        {
            try
            {
                //Create a new instance of the EditableProduct class.
                UsuariosPropiedades usuario = new UsuariosPropiedades();
                List<sp_ActualizarUsuario_Result> update = gd.sp_ActualizarUsuario(Convert.ToInt32(idUsuario),Nombre, Convert.ToInt32(rol)).ToList();
             
                
                    var mensaje = "Se realizo la modificaciòn del usuario " + idUsuario + " correctamente";
                    return Json(mensaje, JsonRequestBehavior.AllowGet);
                
            }
            catch (Exception es)
            {
                throw es;
            }
        }

        [HttpGet]
        public ActionResult _DeleteAjaxEditing(string idUsuario, string estado)
        {
            try
            {
                bool Estado;
                string EstadoMen, mensaje;
                if (estado == "ACTIVO")
                {
                    Estado = false;
                    EstadoMen = "Inactivo";
                }
                else
                {
                    Estado = true;
                    EstadoMen = "Activo";
                }

                List<sp_EstadoUsuario_Result> delete = gd.sp_EstadoUsuario(long.Parse(idUsuario.ToString()), Estado).ToList();
                if (delete[0].Mensaje.ToString() == "0")
                {
                    mensaje = "Registro se " + EstadoMen + " con Exito.";
                    return Json(mensaje, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    mensaje = "Error al " + EstadoMen + " el registro, Intente de nuevo.";
                    return Json(mensaje, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception es)
            {
                throw es;
            }

        }


        public bool ValUsuariosSeguridadOn(Usuarios Usu)
        {
            try
            {
                ControlUsuariosController db = new ControlUsuariosController();
                if (System.Web.HttpContext.Current.Session["contador"] == null)
                {
                    System.Web.HttpContext.Current.Session["contador"] = 0;
                }

                bool usuarioBloq = db.consultarUsuarioBloqueado(Usu.IdUsuario.ToString());
                if (!usuarioBloq)
                {
                    bool respuesta = true;
                    if (obtenerTipoLogin() == 1)
                    {
                        respuesta = db.validarUsuario(Usu.IdUsuario.ToString(), Usu.PassCodeUsuario.ToString());
                    }
                    //else
                    //{
                    //    //string usuarioWS = obtenerUsuarioWS(Usu.IdUsuario);
                    //    //SingleSignOn access = new SingleSignOn();
                    //    //bool resultado = access.AutenticarUsuario(usuarioWS, Usu.PassCodeUsuario);
                    //    //if (resultado)
                    //    //    respuesta = true;
                    //    //else
                    //    //    respuesta = false;
                    //}

                    if (respuesta)
                    {
                        System.Web.HttpContext.Current.Session["contador"] = null;
                        return true;
                    }
                    else
                    {
                        bool verificarUsuario = db.consultarUsuarioExistente(Usu.IdUsuario.ToString());
                        if (verificarUsuario)
                        {
                            int contador = Convert.ToInt32(System.Web.HttpContext.Current.Session["contador"].ToString());

                            contador = contador + db.contadorErrores(false);
                            if (contador == 3)
                            {
                                db.bloquearUsuario(Usu.IdUsuario.ToString(), contador);
                                System.Web.HttpContext.Current.Session["contador"] = null;
                                throw new Exception("El usuario: " + Usu.IdUsuario.ToString() + " ha sido bloqueado");
                            }
                            System.Web.HttpContext.Current.Session["contador"] = contador;
                        }
                        return false;
                    }
                }
                else
                {
                    System.Web.HttpContext.Current.Session["contador"] = null;
                    throw new Exception("El usuario se encuentra bloqueado");
                }
            }
            catch (Exception exception)
            {
                LogRepository.registro("Error en UsuariosController metodo ValidarUsuarios " + exception.Message);
                throw exception;
            }
        }

        public bool ValUsuariosSeguridadOff(Usuarios Usu)
        {
            bool flag = false;
            try
            {
                if (obtenerTipoLogin() == 1)
                {
                    string respuesta = this.gd.spValidarUsuario(Usu.UsuarioDominio, Usu.PassCodeUsuario).First();
                    if (respuesta.Equals("1"))
                    {
                        flag = true;
                    }
                }
                //else
                //{
                //    string usuarioWS = obtenerUsuarioWS(Usu.IdUsuario);
                //    SingleSignOn access = new SingleSignOn();
                //    bool resultado = access.AutenticarUsuario(usuarioWS, Usu.PassCodeUsuario);
                //    if (resultado)
                //    {
                //        flag = true;
                //    }
                //}
            }
            catch (Exception exception)
            {
                LogRepository.registro("Error en UsuariosController metodo ValidarUsuarios " + exception.Message);
                throw exception;
            }
            return flag;
        }

        public string ValidarCaducidadContrasena(string idUsuario, string passActual)
        {
            ControlUsuariosController valUsuarios = new ControlUsuariosController();
            string passEncript = encryptar(passActual);

            string respuesta = valUsuarios.ConsultarCaducidad(idUsuario, passEncript);
            return respuesta;
        }

        [HttpGet]
        public ActionResult Resetear_Contra(string idUsuario)
        {
            try
            {
                string claveDefault = System.Configuration.ConfigurationManager.AppSettings["KeyDefault"];
                List<spResetearUsuario_Result> Method_ResetPass = gd.spResetearUsuario(long.Parse(idUsuario.ToString()), claveDefault).ToList();
                var mensaje = "Se reseteo el usuario correctamente, recuerde que la contraseña por defecto para ingresar a la herramienta es: " + claveDefault;
                return Json(mensaje, JsonRequestBehavior.AllowGet);
            }
            catch (Exception es)
            {
                throw es ;
            }

        }
    }
}
