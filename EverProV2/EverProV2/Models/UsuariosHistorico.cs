//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace EverProV2.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class UsuariosHistorico
    {
        public decimal IdHistorico { get; set; }
        public Nullable<decimal> IdUsuario { get; set; }
        public string PassCodeUsuario { get; set; }
        public Nullable<System.DateTime> FechaCaducidad { get; set; }
        public Nullable<bool> Activo { get; set; }
    
        public virtual Usuarios Usuarios { get; set; }
    }
}