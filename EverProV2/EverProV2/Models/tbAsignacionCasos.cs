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
    
    public partial class tbAsignacionCasos
    {
        public int idAsigCasos { get; set; }
        public string identFuncionario { get; set; }
        public System.DateTime FechaCreacionCaso { get; set; }
        public int Ncaso { get; set; }
        public string NivelClasif { get; set; }
        public int EstadoCaso { get; set; }
        public System.DateTime FechaAsignacionCaso { get; set; }
        public int Proceso { get; set; }
        public Nullable<System.DateTime> Horainicio { get; set; }
        public Nullable<System.DateTime> HoraFin { get; set; }
        public string NombreCaso { get; set; }
    
        public virtual tbTipologiaConvenio tbTipologiaConvenio { get; set; }
    }
}
