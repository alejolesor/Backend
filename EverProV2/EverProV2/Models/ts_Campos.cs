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
    
    public partial class ts_Campos
    {
        public long CampoId { get; set; }
        public string Descripcion { get; set; }
        public Nullable<int> DimensionAlto { get; set; }
        public Nullable<int> DimensionAncho { get; set; }
        public Nullable<int> LongMin { get; set; }
        public Nullable<int> LongMax { get; set; }
        public Nullable<System.DateTime> FechaCreacion { get; set; }
        public Nullable<int> idTipoCampo { get; set; }
        public Nullable<int> idPadre { get; set; }
        public bool CampObligatorio { get; set; }
        public Nullable<int> CampDependiente { get; set; }
        public Nullable<int> CodFormulario { get; set; }
    
        public virtual TiposCampo TiposCampo { get; set; }
    }
}
