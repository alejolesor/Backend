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
    
    public partial class Auditoria
    {
        public int aud_id { get; set; }
        public decimal aud_idUsuario { get; set; }
        public System.DateTime aud_fechaHora { get; set; }
        public string aud_evento { get; set; }
        public string aud_valorAnt { get; set; }
        public string aud_vanorNuev { get; set; }
        public string aud_observaciones { get; set; }
    
        public virtual Usuarios Usuarios { get; set; }
    }
}
