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
    
    public partial class ProgramacionTurnos
    {
        public int idTurnosMalla { get; set; }
        public string CodigoTurno { get; set; }
        public int Entrada { get; set; }
        public Nullable<int> MediosEntrada { get; set; }
        public int Salida { get; set; }
        public Nullable<int> MediosSalida { get; set; }
        public int Sabado { get; set; }
        public Nullable<int> MediosSabado { get; set; }
        public int Break1 { get; set; }
        public Nullable<int> MediosBreak1 { get; set; }
        public int Break2 { get; set; }
        public Nullable<int> MediosBreak2 { get; set; }
        public int HoraAlmuerzo { get; set; }
        public int HorasLaborales { get; set; }
        public Nullable<int> MediosHorasLaborales { get; set; }
        public string Justificacion { get; set; }
    }
}
