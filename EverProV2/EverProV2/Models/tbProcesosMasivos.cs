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
    
    public partial class tbProcesosMasivos
    {
        public int idProcMasivo { get; set; }
        public string N { get; set; }
        public int C { get; set; }
        public string E { get; set; }
        public string NV { get; set; }
        public Nullable<System.DateTime> FI { get; set; }
        public System.DateTime FA { get; set; }
        public string R { get; set; }
        public int Estado { get; set; }
        public string idlider { get; set; }
        public int idProceso { get; set; }
    
        public virtual Estados Estados { get; set; }
    }
}