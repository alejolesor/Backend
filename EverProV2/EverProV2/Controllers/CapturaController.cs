using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Transactions;
using EverProV2.Models;

namespace EverProV2.Controllers
{
    public class CapturaController : Controller
    {
        private Asignador_SGDEntities gd;

        //INSERTO LA CAPTURA EN LA TABLA
        public void InsertLibranza(List<tbLibranza> lstLibranza)
        {
            try
            {
                this.gd = new Asignador_SGDEntities();
                using (TransactionScope scope = new TransactionScope())
                {
                    foreach (tbLibranza captura in lstLibranza)
                    {
                        this.gd.tbLibranza.Add(captura);
                        this.gd.SaveChanges();
                    }
                    scope.Complete();
                }
            }
            catch (Exception exception)
            {
                LogRepository.registro("Error en CapturaController metodo InsertarCaptura " + exception.Message + " stack trace " + exception.StackTrace);
                throw exception;
            }
        }

        public void InsertFormalizacion(List<tbFormalizacion> listFormalizacion)
        {
            try
            {
                this.gd = new Asignador_SGDEntities();
                using (TransactionScope scope = new TransactionScope())
                {
                    foreach (tbFormalizacion captura in listFormalizacion)
                    {
                        this.gd.tbFormalizacion.Add(captura);
                        this.gd.SaveChanges();
                    }
                    scope.Complete();
                }
            }
            catch (Exception exception)
            {
                LogRepository.registro("Error en CapturaController metodo InsertarCaptura " + exception.Message + " stack trace " + exception.StackTrace);
                throw exception;
            }
        }

        public void InsertProcesosMasivos(List<tbProcesosMasivos> listProcesosMasivos)
        {
            try
            {
                this.gd = new Asignador_SGDEntities();
                using (TransactionScope scope = new TransactionScope())
                {
                    foreach (tbProcesosMasivos captura in listProcesosMasivos)
                    {
                        this.gd.tbProcesosMasivos.Add(captura);
                        this.gd.SaveChanges();
                    }
                    scope.Complete();
                }
            }
            catch (Exception exception)
            {
                LogRepository.registro("Error en CapturaController metodo InsertarCaptura " + exception.Message + " stack trace " + exception.StackTrace);
                throw exception;
            }
        }

    }
}
