using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text;
using System.Diagnostics;
using System.Collections;
using System.IO;
using System.Security.Permissions;
using System.Configuration;

namespace EverProV2.Clases
{
   
    class LogRepo
    {
        //static DataClasses1DataContext dbo = new DataClasses1DataContext();
        private string srtCadenaLog;
        public static void registro(string mensaje)
        {
            try
            {
                //Pass the filepath and filename to the StreamWriter Constructor
                string srtCadenaLog = ConfigurationManager.AppSettings["URLCARPETALOG"].ToString();

                //var param1 = dbo.sp_RUTA_Log_Errores().ToList();
                if (!Directory.Exists(@"" + srtCadenaLog))
                {
                    Directory.CreateDirectory(@"" + srtCadenaLog);
                }

                string p = srtCadenaLog;

                StreamWriter sw = new StreamWriter(@p + "logSGD.txt", true);

                //Write a line of text
                sw.WriteLine(DateTime.Now + " " + mensaje);

                //Close the file
                sw.Close();
            }
            catch (Exception e)
            {
                Console.WriteLine("Exception: " + e.Message);
            }
            finally
            {
                Console.WriteLine("Executing finally block.");
            }
        }

    }
}