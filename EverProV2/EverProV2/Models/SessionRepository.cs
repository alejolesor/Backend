using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Collections;
using EverProV2.Controllers;

namespace EverProV2.Models
{
    public class SessionRepository
    {
        
        //private static EverProEntities dbo = new EverProEntities();
        private static Asignador_SGDEntities dbo = new Asignador_SGDEntities();

        public static List<spObtenerMenuPadre_Result> AllPadres(Usuarios U)
        {
            List<spObtenerMenuPadre_Result> result =
                (List<spObtenerMenuPadre_Result>)HttpContext.Current.Session["PADRES_MENU_MVC"];
            if (result == null)
            {
                HttpContext.Current.Session["PADRES_MENU_MVC"] = result = dbo.spObtenerMenuPadre(U.IdUsuario).ToList<spObtenerMenuPadre_Result>();
            }

            return result;
        }

        public static void setAtributo(string nombre, object obj)
        {
            HttpContext.Current.Session[nombre] = obj;
        }

        public static object getAtributo(string nombre)
        {
            object obj = HttpContext.Current.Session[nombre];
            return obj;
        }
    }
}