using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Serialization;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using System.Net;

namespace EverProV2.Models
{
    public class UsuariosModel
    {
        
    }
    public class ListaRoles
    {
        public string _codigo { get; set; }
        public string _descripcion { get; set; }
    }

    public class UsuariosPropiedades
    {
        public decimal idUsuario { get; set; }
       // public string usuarioDominio { get; set; }
        public string Nombre { get; set; }
        public string rol { get; set; }
        public bool? activo { get; set; }
        public DateTime? FechaRegistro { get; set; }
        public DateTime? FechaCaducidad { get; set; }
        public string SecurityPin { get; set; }
    }
}