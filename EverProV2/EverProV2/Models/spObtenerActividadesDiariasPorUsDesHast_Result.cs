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
    
    public partial class spObtenerActividadesDiariasPorUsDesHast_Result
    {
        public int ActividadDiariaId { get; set; }
        public int numActividad { get; set; }
        public string Area { get; set; }
        public string Procesos { get; set; }
        public string Actividad { get; set; }
        public string Producto { get; set; }
        public Nullable<System.TimeSpan> Tiempo { get; set; }
        public Nullable<long> Productividad { get; set; }
        public Nullable<System.TimeSpan> tiempoInactividad { get; set; }
        public Nullable<int> EstadoId { get; set; }
        public Nullable<System.DateTime> fechaproductiva { get; set; }
    }
}
