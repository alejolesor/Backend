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
    
    public partial class TiposCampo
    {
        public TiposCampo()
        {
            this.ts_Campos = new HashSet<ts_Campos>();
            this.Campos = new HashSet<Campos>();
        }
    
        public int TcId { get; set; }
        public string TcDescripcion { get; set; }
        public Nullable<bool> Activo { get; set; }
    
        public virtual ICollection<ts_Campos> ts_Campos { get; set; }
        public virtual ICollection<Campos> Campos { get; set; }
    }
}
