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
    
    public partial class tbUsuariosPorLider
    {
        public tbUsuariosPorLider()
        {
            this.tbClasificaNivFuncionario = new HashSet<tbClasificaNivFuncionario>();
        }
    
        public string idLider { get; set; }
        public string NombreCompleto { get; set; }
        public string Cedula { get; set; }
        public Nullable<bool> Apoyo { get; set; }
        public Nullable<int> Estado { get; set; }
    
        public virtual ICollection<tbClasificaNivFuncionario> tbClasificaNivFuncionario { get; set; }
        public virtual Estados Estados { get; set; }
    }
}
