$(document).ready(function () {
    //Animación de la información
    $('#btn-mostrar-info').click(function (e) { 
        e.preventDefault();
        $('#informacion').addClass('mostrar-info');
    });

    //Inicializar objetos
    const containerPantallaJuego = $('#container-pantalla-juego');
    const containerPantallaInicio = $('#container-pantalla-inicial');
    const btnJugar = $('#btn-jugar');
    const nombreJugador = $('#nombre-jugador');
    const txtNombreJugador = $('#txt-nombre-jugador');

    //Variables
    let saludo = "Hola";

    containerPantallaJuego.hide();
    txtNombreJugador.focus();

    //Eventos
    btnJugar.click(function (e) { 
        e.preventDefault();
        if (validarNombre()) {
            cambiarPagina();
            containerPantallaJuego.addClass('activado');
        }
    });

    containerPantallaInicio.keydown(function (e) { 
        const keyName = event.key;
        if (keyName == 'Enter') {
            if (validarNombre()) {
                containerPantallaJuego.addClass('activado');
                cambiarPagina();
            }
        }
    });

    //Funciones
    const cambiarPagina = () =>{
        containerPantallaInicio.fadeOut().hide();
        containerPantallaJuego.show(800);
        txtNombreJugador.text(nombreJugador.val());
        txtNombreJugador.css('color', '#FFD369');
    }
    const validarNombre = () =>{
        let nombre = nombreJugador.val();
        if (nombre == "") {
            alert('Debe escribir un nombre para poder pasar');
            return false;
        }
        if (nombre.length > 14) {
            alert('Debe escribir un nombre que tenga máximo 14 caracteres');
            return false;
        }
        return true;
    }
});