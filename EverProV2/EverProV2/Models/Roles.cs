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
    
    public partial class Roles
    {
        public Roles()
        {
            this.RolesMenu = new HashSet<RolesMenu>();
            this.RolesMenu1 = new HashSet<RolesMenu>();
            this.Usuarios = new HashSet<Usuarios>();
        }
    
        public int IdRol { get; set; }
        public string DescRol { get; set; }
        public Nullable<bool> Activo { get; set; }
    
        public virtual ICollection<RolesMenu> RolesMenu { get; set; }
        public virtual ICollection<RolesMenu> RolesMenu1 { get; set; }
        public virtual ICollection<Usuarios> Usuarios { get; set; }
    }
}
