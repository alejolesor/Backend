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
    
    public partial class spObtenerDatosPersonal_Result
    {
        public long DetallePersonaId { get; set; }
        public Nullable<long> PersonaId { get; set; }
        public Nullable<long> FormularioCampoId { get; set; }
        public string VALOR { get; set; }
        public Nullable<int> NoCaptura { get; set; }
        public Nullable<System.Guid> UserId { get; set; }
        public Nullable<System.DateTime> FechaRegistro { get; set; }
        public Nullable<long> TipoCampoId { get; set; }
    }
}