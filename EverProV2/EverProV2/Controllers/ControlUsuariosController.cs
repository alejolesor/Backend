using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EverProV2.Models;

namespace EverProV2.Controllers
{
    public class ControlUsuariosController : Controller
    {
        //
        // GET: /ControlUsuarios/

        public ActionResult Index()
        {
            return View();
        }

        // GET: /ControlUsuarios/

        //EverProEntities dbo = new EverProEntities();
        Asignador_SGDEntities dbo = new Asignador_SGDEntities();

        public bool ConsultaSeguridadHabilitada()
        {
            var query = (from a in dbo.Parametros
                         where a.codigo == "CONTROL_USUARIOS"
                         select a).FirstOrDefault();

            if (query.valor.Equals("1"))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public bool validarUsuario(string _usuario, string contrasena)
        {
            string respuesta = dbo.spValidarUsuario(_usuario, contrasena).First();

            if (respuesta == "1")
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public int contadorErrores(bool resultadoLogin)
        {
            if (resultadoLogin == false)
            {
                return 1;
            }
            return 0;
        }

        public void bloquearUsuario(string usuario, int intentos)
        {
            try
            {
                UsuariosBloqueados data = new UsuariosBloqueados()
                {
                    IdUsuario = Convert.ToDecimal(usuario),
                    FechaBloqueo = DateTime.Now,
                    Bloqueado = true

                };

                dbo.UsuariosBloqueados.Add(data);
                dbo.SaveChanges();
            }

            catch(Exception ex)
            {
                 throw new Exception("Error en el método de bloquarUsuario: " + ex.Message);
            }
        }

        public void desbloquearUsuario(string usuario)
        {
            try
            {
                decimal _usuario = Convert.ToDecimal(usuario);
                List<UsuariosBloqueados> lista = (from a in dbo.UsuariosBloqueados
                                                  where a.IdUsuario == _usuario
                                                  select a).ToList();
                foreach (UsuariosBloqueados data in lista)
                {
                    //dbo.UsuariosBloqueados.DeleteObject(data);
                    dbo.UsuariosBloqueados.Remove(data);
                    dbo.SaveChanges();
                }
            }

            catch (Exception ex)
            {
                throw new Exception("Error en el método desbloquearUsuario: " + ex.Message);
            }
        }

        public bool consultarUsuarioBloqueado(string usuario)
        {
            decimal _usuario = Convert.ToDecimal(usuario);
            List<UsuariosBloqueados> lista = (from a in dbo.UsuariosBloqueados
                                              where a.IdUsuario == _usuario && a.Bloqueado == true
                                              select a).ToList();
            if (lista.Count > 0)
            {
                return true;
            }
            return false;
        }

        public bool consultarUsuarioExistente(string usuario)
        {
            decimal _usuario = Convert.ToDecimal(usuario);
            List<Usuarios> lista = (from a in dbo.Usuarios
                                    where a.IdUsuario == _usuario
                                    select a).ToList();
            if (lista.Count > 0)
            {
                return true;
            }
            return false;
        }

        public bool ConsultarHistoricos(string idUsuario, string passActual)
        {
            decimal _idusuario = Convert.ToDecimal(idUsuario);
            List<UsuariosHistorico> lista = (from a in dbo.UsuariosHistorico
                                             where a.IdUsuario == _idusuario && a.PassCodeUsuario == passActual
                                             select a).ToList();
            if (lista.Count > 0)
            { return true; }
            else
            { return false; }
        }

        public bool ConsultarTotalHistoricos(string idUsuario)
        {
            decimal _idUsuario = Convert.ToDecimal(idUsuario);
            List<UsuariosHistorico> lista = (from a in dbo.UsuariosHistorico
                                             where a.IdUsuario == _idUsuario
                                             select a).ToList();
            if (lista.Count >= 4)
            { return true; }
            else
            { return false; }
        }

        public void actualizarHistoricos(string idUsuario, string passActual)
        {
            decimal _idUsuario = Convert.ToDecimal(idUsuario);
            var query = (from a in dbo.UsuariosHistorico
                         where a.IdUsuario == _idUsuario
                         select a).OrderBy(x => x.FechaCaducidad).FirstOrDefault();

            List<UsuariosHistorico> lista = (from b in dbo.UsuariosHistorico
                                             where b.IdHistorico == query.IdHistorico
                                             select b).ToList();

            //Borrar registro nuevo
            if (lista.Count > 0)
            {
                foreach (UsuariosHistorico data in lista)
                {
                    //dbo.UsuariosHistorico.DeleteObject(data);
                    dbo.UsuariosHistorico.Remove(data);
                    dbo.SaveChanges();
                }
            }

        //Crear uno nuevo reemplazando el antiguo
            UsuariosHistorico dataHistorico = new UsuariosHistorico()
            {
                IdUsuario = Convert.ToDecimal(idUsuario),
                PassCodeUsuario = passActual,
                FechaCaducidad = DateTime.Now.AddMonths(3),
                Activo = true
            };

            //dbo.AddToUsuariosHistorico(dataHistorico);
            dbo.UsuariosHistorico.Add(dataHistorico);
            dbo.SaveChanges();
        }

        public string ConsultarCaducidad(string idUsuario, string passActual)
        {
            decimal _idUsuario = Convert.ToDecimal(idUsuario);
            var query = (from a in dbo.Usuarios
                         where a.IdUsuario == _idUsuario && a.PassCodeUsuario == passActual
                         select a).FirstOrDefault();

            if (query.FechaCaducidad == null)
            {
                return "NO";
            }

            DateTime fechaCaducidad = Convert.ToDateTime(query.FechaCaducidad);
            int dias = ((TimeSpan)(fechaCaducidad - DateTime.Now)).Days;

            if (dias == 0)
            {
                return "Caducada";
            }
            else if (dias <= 3)
            {
                return "Su contraseña Caducará en: " + dias + " dias por favor cambiarla";
            }
            else
            {
                return "NO";
            }
        }
    }
}
