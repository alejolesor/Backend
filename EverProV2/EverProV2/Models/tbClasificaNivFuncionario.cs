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
    
    public partial class tbClasificaNivFuncionario
    {
        public string identFuncionario { get; set; }
        public string NivelClasificacion { get; set; }
        public int Proceso { get; set; }
    
        public virtual tbUsuariosPorLider tbUsuariosPorLider { get; set; }
        public virtual tbTipologiaConvenio tbTipologiaConvenio { get; set; }
    }
}
