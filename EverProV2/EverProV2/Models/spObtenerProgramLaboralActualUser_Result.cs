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
    
    public partial class spObtenerProgramLaboralActualUser_Result
    {
        public long ProgramacionLaboralId { get; set; }
        public Nullable<long> PersonaId { get; set; }
        public Nullable<System.DateTime> FechaTurno { get; set; }
        public Nullable<System.TimeSpan> HoraInicio { get; set; }
        public Nullable<System.TimeSpan> HoraFin { get; set; }
        public Nullable<long> PersonaIdRegistro { get; set; }
        public Nullable<System.DateTime> FechaRegistro { get; set; }
        public Nullable<System.TimeSpan> HExtrasAprobadas { get; set; }
        public Nullable<bool> AprobarExtras { get; set; }
        public Nullable<System.DateTime> FechaAprobacion { get; set; }
        public Nullable<long> PersonaIdAprobador { get; set; }
        public Nullable<bool> Activo { get; set; }
        public Nullable<int> TurnoId { get; set; }
        public string HorasExtras { get; set; }
    }
}
