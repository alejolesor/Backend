using System;
using System.IO;
using System.Web.Mvc;
using System.Web;
using EverProV2.Controllers;
using System.Linq;


namespace EverProV2.Models
{
    public class LogRepository
    {
       // private static EverisProduccionEntities bdo = new EverisProduccionEntities();

        //private static EverProEntities bdo = new EverProEntities();
        private static Asignador_SGDEntities bdo = new Asignador_SGDEntities();

        public static void registro(string mensaje)
        {
            try
            {
                //Pass the filepath and filename to the StreamWriter Constructor
               
                Parametros param1 = bdo.Parametros.First(c => c.codigo == "PATH_LOG");
          
                StreamWriter sw = new StreamWriter(param1.valor, true);
                 
                
                //Write a line of text
                sw.WriteLine(DateTime.Now + " " + mensaje);

                //Close the file
                sw.Close();
            }
            catch (Exception e)
            {
                //Console.WriteLine("Exception: " + e.Message);
            }
            finally
            {
                //Console.WriteLine("Executing finally block.");
            }
        }
    }
}