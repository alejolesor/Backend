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
    
    public partial class spObtenerCamposFormulario_Result
    {
        public long FormularioCampoId { get; set; }
        public Nullable<long> FormularioId { get; set; }
        public Nullable<long> CampoId { get; set; }
        public Nullable<int> Orden { get; set; }
        public Nullable<bool> Editable { get; set; }
        public Nullable<bool> Obligatorio { get; set; }
        public Nullable<long> TipoCampoId { get; set; }
        public Nullable<long> PadreId { get; set; }
        public Nullable<long> CampoIdDependiente { get; set; }
        public Nullable<bool> DobleCaptura { get; set; }
        public string Evento { get; set; }
        public string Funcion { get; set; }
        public string FuenteOrigen { get; set; }
        public Nullable<bool> FuenteParametros { get; set; }
        public string Mensaje { get; set; }
        public Nullable<bool> Activo { get; set; }
        public string Descripcion { get; set; }
        public Nullable<int> DimensionAlto { get; set; }
        public Nullable<int> DimensionAncho { get; set; }
        public Nullable<int> LongMin { get; set; }
        public Nullable<int> LongMax { get; set; }
        public Nullable<System.Guid> UserId { get; set; }
        public Nullable<System.DateTime> FechaCreacion { get; set; }
    }
}