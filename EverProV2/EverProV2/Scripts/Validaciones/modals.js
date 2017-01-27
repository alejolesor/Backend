var popUp;

function VentanaDialogModal(PaginaWeb, Ancho, Alto)
{
    x = (screen.width - Ancho) / 2;
    y = (screen.height - Alto) / 2;

    popUp = window.open(PaginaWeb, 'popupcal', 'width=' + Ancho + ', height=' + Alto + ',left=' + x + ',top=' + y + '');
}