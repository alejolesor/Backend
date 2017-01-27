using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Collections;
using System.Web.UI.WebControls;
using System.Drawing;
using EverProV2.Models;


namespace EverProV2.Controllers
{
    public class CrearFormularios
    {

        private Asignador_SGDEntities consultas = new Asignador_SGDEntities();
        private EverProV2.Controllers.CamposController bCampos = new CamposController();
        /// <summary>
        /// Genera los diferentes tipos de campos a Capturar en el formulario.
        /// </summary>
        /// <param name="Ta">La Tabla donde se almacenaran la descripcion de los campos</param>
        /// <param name="lstCampos">La lista de los campos a generar para el formulario</param>
        /// <param name="lstRespAnt">Si la Etapa es control de calidad se pintaran los resultados de las capturas 1 y 2</param>
        /// <param name="idGrupoDocumentos">El ID del grupo de documento asociado para pintar los campos</param>
        /// <param name="idEtapa">La etapa de la captura en la que se encuentra actualmente</param>
        /// <param name="noCaptura">El número de la captura actual</param>
        /// <param name="idDocumento">El documento actual que se va a pintar</param>
        /// <param name="NegID">El número del negocio que se esta pintando actualmente</param>
        /// <returns>Cadena de texto con formato HTML para pintar con los campos generados</returns>
        public string GenerarCampos(Table Ta, List<ts_Campos> lstCampos, List<string> lstRespAnt, int idGrupoDocumentos, int idEtapa, string noCaptura, int idDocumento, int NegID)
        {
            Panel pControls = new Panel();
            string cadenaCampos = "";
            try
            {
                int num = 0;
                Table child = new Table
                {
                    ID = "TBL_PRICIPAL" + idGrupoDocumentos,
                    EnableViewState = true
                };

                pControls.Controls.Add(child);
                if (idEtapa == 50)
                    child.Attributes.Add("data-work", "tablaPrincipalControlCalidad");
                else
                    child.Attributes.Add("data-work", "tablaPrincipal");

                using (List<ts_Campos>.Enumerator enumerator = lstCampos.GetEnumerator())
                {
                    EventHandler handler = null;
                    ts_Campos c;
                    while (enumerator.MoveNext())
                    {
                        RequiredFieldValidator validator2;

                        c = enumerator.Current;
                        TableRow row = new TableRow();
                        row.ID = "Trow_" + c.CampoId;

                        TableCell cell = new TableCell();
                        cell.ID = "TcellDesc_" + c.CampoId;

                        TableCell cell2 = new TableCell();
                        cell2.ID = "TcellCtrl_" + c.CampoId;

                        TableCell cell3 = new TableCell();
                        cell3.ID = "TcellError_" + c.CampoId;

                        row.Cells.Add(cell);
                        row.Cells.Add(cell2);
                        row.Cells.Add(cell3);

                        ///DE DEBEN CREAR DOS NUEVAS CELDAS EN LA PARTE IZQUIERDA DONDE SE DESPLIEGUEN LAS RESPUESTAS 1 Y 2
                        ///SE DEBE VALIDAR  QUE CORRESPONDA A LA ETAPA 3 

                        ///***************************************************************************************************



                        string obligatorio = "";
                        string funcionJavascript = "";
                        string funcionNegrilla = "";
                        string javascriptFocus = "";
                        string campoOculto = "";
                        string javascriptFechas = "";

                        switch (lstCampos[num].idTipoCampo)
                        {
                            //Textbox - Solo acepta Numeros
                            case 1:
                                if (Convert.ToBoolean(c.CampObligatorio))
                                {
                                    obligatorio = " required ";
                                    funcionNegrilla = " style = \"font-weight:bolder;\"";
                                }
                                else
                                    funcionNegrilla = " style = \"font-weight:normal;\"";

                                campoOculto = "<td><span class=\"lbl_" + c.CampoId + "\"></span></td>";

                                string txt1 = "<tr>" +
                                    "<td" + funcionNegrilla + ">" + c.Descripcion + "</td>" +
                                    "<td><input class=\"form-control cmenu1\" type='Text' " + obligatorio + " " + javascriptFocus + " onkeypress='return numbersonly(event);' onblur='infoAdicional(this.value, '_lbl" + c.CampoId + "');' maxlength='" +
                                    c.LongMax + "' name = '" + c.CampoId + "' id='txt_" +
                                    c.CampoId + "' Width = '" +
                                    c.DimensionAncho + "' />" + campoOculto + "</td>";

                                txt1 = txt1 + "</tr>";

                                cadenaCampos = cadenaCampos + txt1;
                                break;

                            //Textbox - Campo Alfanumerico
                            case 2:
                                if (Convert.ToBoolean(c.CampObligatorio))
                                {
                                    obligatorio = " required ";
                                    funcionNegrilla = " style = \"font-weight:bolder;\"";
                                }
                                else
                                    funcionNegrilla = " style = \"font-weight:normal;\"";

                                string txt2 = "<tr>" +
                                    "<td" + funcionNegrilla + ">" + c.Descripcion + "</td>" +
                                    "<td><input class=\"form-control cmenu1\" type='Text' " + obligatorio + " " + javascriptFocus + " onblur=\"infoAdicional(this.value, 'lbl_" + c.CampoId + "');\" maxlength='" +
                                    c.LongMax + "' name = '" + c.CampoId + "' id='txt_" +
                                    c.CampoId + "' Width = '" +
                                    c.DimensionAncho + "' />" + campoOculto + "</td>";

                                txt2 = txt2 + "</tr>";

                                cadenaCampos = cadenaCampos + txt2;
                                break;

                            //Textbox - Fecha
                            case 3:
                                if (Convert.ToBoolean(c.CampObligatorio))
                                {
                                    obligatorio = " required ";
                                    funcionNegrilla = " style = \"font-weight:bolder;\"";
                                }
                                else
                                    funcionNegrilla = " style = \"font-weight:normal;\"";

                                string txt3 = "<tr>" +
                                    "<td" + funcionNegrilla + ">" + c.Descripcion + "</td>" +
                                    "<td><input class=\"form-control dpms cmenu1\" type='Text'" + obligatorio + " " + javascriptFocus + " " + javascriptFechas + " maxlength='" +
                                    c.LongMax + "' name = '" + c.CampoId + "' id='txt_" +
                                    c.CampoId + "' Width = '" +
                                    c.DimensionAncho + "' /></td>";


                                txt3 = txt3 + "</tr>";

                                cadenaCampos = cadenaCampos + txt3;
                                break;

                            //Textbox - Hora
                            case 4:
                                if (Convert.ToBoolean(c.CampObligatorio))
                                {
                                    obligatorio = " required ";
                                    funcionNegrilla = " style = \"font-weight:bolder;\"";
                                }
                                else
                                    funcionNegrilla = " style = \"font-weight:normal;\"";


                                string txt4 = "<tr>" +
                                    "<td" + funcionNegrilla + ">" + c.Descripcion + "</td>" +
                                    "<td><input class=\"form-control dpms cmenu1\" type='Text'" + obligatorio + " " + javascriptFocus + " maxlength='" +
                                    c.LongMax + "' name = '" + c.CampoId + "' id='txt_" +
                                    c.CampoId + "' Width = '" +
                                    c.DimensionAncho + "' /></td>";

                                txt4 = txt4 + "</tr>";

                                cadenaCampos = cadenaCampos + txt4;
                                break;

                            //Listas de seleccion
                            case 5:
                                if (Convert.ToBoolean(c.CampObligatorio))
                                {
                                    obligatorio = " required ";
                                    funcionNegrilla = " style = \"font-weight:bolder;\"";
                                }
                                else
                                    funcionNegrilla = " style = \"font-weight:normal;\"";

                                ts_Campos camp = new ts_Campos();
                                camp.CampoId = c.CampoId;
                                string opcionesLista = "";

                                string txt5;
                                //string lst_= "lst_";
                                string javascriptPadre = "";
                                List<spConsultarHijos_Result> campoHijo = consultas.spConsultarHijos(Convert.ToInt32(c.CampoId)).ToList();
                                if (campoHijo.Count > 0)
                                {
                                    int _campoHijo = Convert.ToInt32(campoHijo[0].CampoId);
                                    //onclick=\"funcion('"+valor+"')\"
                                   // javascriptPadre ="onchange='llenarListasPadreHijo('lst_'" + _campoHijo + "','lst_" + c.CampoId + "')'";
                                    javascriptPadre = "onchange=\"llenarListasPadreHijo('lst_" + _campoHijo + "','lst_" + c.CampoId + "')\"";
                                    //javascriptPadre = "onchange=\"Alerta('"+lst_+"' )\"";
                                }
                                else
                                    javascriptPadre = "";

                                if (c.CampDependiente == null)
                                {
                                    List<CodigosCampo> lstCodigos = bCampos.obtenerCodigosCampo(camp);
                                    for (int i = 0; i < lstCodigos.Count; i++)
                                    {
                                        if (opcionesLista == "")
                                            opcionesLista = "<option value='" + lstCodigos[i].CodId + "'>" + lstCodigos[i].CodDescripcion +  "</option>";
                                        else
                                            opcionesLista = opcionesLista + "<option value='" + lstCodigos[i].CodId + "'>" + lstCodigos[i].CodDescripcion + "</option>";
                                    }

                                    txt5 = "<tr>" +
                                    "<td" + funcionNegrilla + ">" + c.Descripcion + "</td>" +
                                    "<td><select " + javascriptPadre + " class=\"form-control\"" + obligatorio + " name='lst_" + c.CampoId + "' id = 'lst_" +
                                    c.CampoId + "'>" + opcionesLista + "</select></td>";
                                }
                                else
                                {
                                    txt5 = "<tr>" +
                                    "<td" + funcionNegrilla + ">" + c.Descripcion + "</td>" +
                                    "<td><select class=\"form-control\"" + obligatorio + " name = 'lst_" + c.CampoId + "' id = 'lst_" + c.CampoId + "'>" +
                                    "</select></td>";
                                }

                                txt5 = txt5 + "</tr>";

                                cadenaCampos = cadenaCampos + txt5;
                                break;


                            //Campo Multilinea
                            case 8:
                                if (Convert.ToBoolean(c.CampObligatorio))
                                {
                                    obligatorio = " required ";
                                    funcionNegrilla = " style = \"font-weight:bolder;\"";
                                }
                                else
                                    funcionNegrilla = " style = \"font-weight:normal;\"";

                                campoOculto = "<td><span class=\"lbl_" + c.CampoId + "\"></span></td>";

                                string txt8 = "<tr>" +
                                    "<td" + funcionNegrilla + ">" + c.Descripcion + "</td></tr>" +
                                    "<tr><td><textarea class=\"form-control cmenu1\"" + obligatorio + " " + javascriptFocus + " onblur=\"infoAdicional(this.value, 'lbl_" + c.CampoId + "');\" maxlength='" +
                                    c.LongMax + "' name = '" + c.CampoId + "' id='txt_" +
                                    c.CampoId + "' Width = '" +
                                    c.DimensionAncho + "' />" + campoOculto + "</td>";

                                txt8 = txt8 + "</tr>";

                                cadenaCampos = cadenaCampos + txt8;
                                break;

                            //Campo CheckBox
                            case 11:
                                if (Convert.ToBoolean(c.CampObligatorio))
                                {
                                    obligatorio = " required ";
                                    funcionNegrilla = " style = \"font-weight:bolder;\"";
                                }
                                else
                                    funcionNegrilla = " style = \"font-weight:normal;\"";

                                string txt11 = "<tr>" +
                                    "<td" + funcionNegrilla + ">" + c.Descripcion + "</td>" +
                                    "<td><input type='checkbox' " + obligatorio + " name = '" +
                                    c.CampoId + "' id='chk_" + c.CampoId + "' Width = '" +
                                    c.DimensionAncho + "' /></td>";

                                txt11 = txt11 + "</tr>";

                                cadenaCampos = cadenaCampos + txt11;
                                break;

                            //Campo de fileUpload
                            case 13:
                                if (Convert.ToBoolean(c.CampObligatorio))
                                {
                                    obligatorio = " required ";
                                    funcionNegrilla = " style = \"font-weight:bolder;\"";
                                }
                                else
                                    funcionNegrilla = " style = \"font-weight:normal;\"";

                                 string txt13 = "<tr>" +
                                    "<td" + funcionNegrilla + ">" + c.Descripcion + "</td>" +
                                    "<td><input type='file' class=\"form-control dec cmenu1\" " + obligatorio + " " + javascriptFocus + " maxlength='" +
                                    c.DimensionAlto + "' name = '" + c.Descripcion + "' id=" +
                                    c.Descripcion + "' Width = '" +
                                    c.DimensionAncho + "'" + funcionJavascript + "/></td>";

                                txt13 = txt13 + "</tr>";

                                cadenaCampos = cadenaCampos + txt13;
                                break;

                            //Campo valor Decimal
                            case 16:
                                if (Convert.ToBoolean(c.CampObligatorio))
                                {
                                    obligatorio = " required ";
                                    funcionNegrilla = " style = \"font-weight:bolder;\"";
                                }
                                else
                                    funcionNegrilla = " style = \"font-weight:normal;\"";

                                string txt16 = "<tr>" +
                                    "<td" + funcionNegrilla + ">" + c.Descripcion + "</td>" +
                                    "<td><input type='Text' class=\"form-control dec cmenu1\" " + obligatorio + " " + javascriptFocus + " maxlength='" +
                                    c.LongMax + "' name = '" + c.CampoId + "' id='txt_" +
                                    c.CampoId + "' Width = '" +
                                    c.DimensionAncho + "'" + funcionJavascript + "/></td>";

                                txt16 = txt16 + "</tr>";

                                cadenaCampos = cadenaCampos + txt16;
                                break;
                        }
                        num++;
                    }
                }

                string tablaContenido = "<table class=\"TablaFormulario\">";
                if (lstRespAnt != null && lstRespAnt.Count > 0)
                {
                    string ccCampos = "<tr>" +
                        "<td></td><td></td>" +
                    "<td><center><b><a style=\" color:red \">Datos Captura Uno</a></b></center></td>" +
                    "<td><center><b><a style=\" color:blue \">Datos Captura Dos</a></b></center></td>" +
                        "</tr>";
                    return tablaContenido + ccCampos + cadenaCampos + "</table>";
                }

                if (String.IsNullOrEmpty(cadenaCampos))
                {
                    return "";
                }

                return "<table class=\"TablaFormulario\">" + cadenaCampos + "</table>";
            }
            catch (Exception exception)
            {
                LogRepository.registro("Error en CapturaInformacion.aspx metodo GenerarCampos " + exception.Message + " stack trace " + exception.StackTrace);
                throw;
            }
        }
    }
}