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
    
    public partial class spCamposDelFormulario_Result
    {
        public int IdCampo { get; set; }
        public string Descripcion { get; set; }
        public Nullable<int> IdPadre { get; set; }
        public Nullable<int> Orden { get; set; }
        public Nullable<int> DimensionAlto { get; set; }
        public Nullable<int> DimensionAncho { get; set; }
        public Nullable<bool> Obligatorio { get; set; }
        public Nullable<int> IdTipoCampo { get; set; }
        public Nullable<bool> Editable { get; set; }
        public Nullable<bool> DobleCaptura { get; set; }
        public Nullable<int> LongMax { get; set; }
        public Nullable<int> LongMin { get; set; }
        public string Evento { get; set; }
        public string FuncionValidacion { get; set; }
        public string MensajeError { get; set; }
        public Nullable<bool> Activo { get; set; }
    }
}