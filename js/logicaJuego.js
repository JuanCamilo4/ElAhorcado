$(document).ready(function () {
    //Inicializar objetos
    const containerPantallaInicio = $('#container-pantalla-inicial');
    const containerPantallaJuego = $('#container-pantalla-juego');
    const btnJugar = $('#btn-jugar');
    const btnRespuestaUsuario = $('#btn-respuesta-usuario');
    const palabraSistema = $('#txt-palabra-sistema');
    const numeroLetrasPalabra = $('#txt-numero-letras span');
    const btnPista = $('#btn-pista');
    const containerInfoPista = $('.container-info-pista');
    const minuto = $('#minuto');
    const segundos = $('#segundos');
    const respuestaPlayer = $('#txt-respuesta-usuario');
    const btnBorrarHistorial = $('#borrar-historial');

    //Inicializar variables y constantes
    let palabras = {
        perro : ["Tiene 4 patas", "Tiene cola", "Le gusta jugar con los humanos"],
        gato : ["Tiene 4 patas", "Tiene cola"],
        hamster: ["Le gusta las semillas de girasol", "Tiene cola larga", "Tiene 4 pata"],
        pajaro: ["Tiene 2 patas", "Tiene plumas", "Puede volar"],
        tigre: ["Es carnivoro", "Se camufla muy bien", "Caza de noche", "Tiene dientes largos"]
    }
    let tiempo = {
        milisegundo : 0,
        segundo: 0,
        minuto: 0,
        horas: 0
    };
    let datosJugador = {
        nombre: "",
        tiempo: 0,
        resultado: ""
    }
    let numeroJugador = 0;
    let numeroJugadorTotal = 0;
    let resultadoJuego = false;
    let intervalContador;
    let palabra;
    let countErrores = 0;
    let palabraFinalUsuario = "";
    let respuestaPlayerAux = "";
    let arrayPalabra;

    containerInfoPista.hide();
    mostrarHistorial();

    //Eventos
    btnJugar.click(function (e) {  //Boton jugar de la pantalla inicial
        e.preventDefault();
        if(containerPantallaJuego.hasClass('activado')){
            activdorCronometro();
            inicializarPalabra();
            respuestaPlayer.focus();
        }
    });
    containerPantallaInicio.keydown(function (e) { 
        const keyName = event.key;
        if (keyName == 'Enter') {
            if(containerPantallaJuego.hasClass('activado')){
                activdorCronometro();
                inicializarPalabra();
                respuestaPlayer.focus();
            }
        }
    });
    containerPantallaJuego.keydown(function (e) { 
        const keyName = event.key;
        if (keyName == 'Enter') {
            jugar();
        }
    });
    btnRespuestaUsuario.click(function (e) { 
        e.preventDefault();
        jugar();
    });
    btnPista.click(function(e){
        containerInfoPista.show();
        mostrarPista();
    });
    btnBorrarHistorial.click(function(e){
        let confirmacionEliminar = confirm('¿En serio desea eliminar todo el historial?');
        if (confirmacionEliminar) {
            localStorage.clear();
            $('.resultado-partida').remove();
        }
    });
    $('#btn-cerrar').click(function (e) { 
        e.preventDefault();
        containerInfoPista.hide();
    });

    //Funciones
    const seleccionarPalabra = () =>{
        let countPalabras = 0;
        let posicionPalabraSeleccionada = 1;
        let anteriorPosicionPalabraSeleccionada = 0;
        let palabraSeleccionada = "";
        
        for (let p in palabras) { //For para rcorrer el array y saber su logitud
            countPalabras++
        }

        let numeroRandom = Math.ceil(Math.random() * countPalabras);
        while(anteriorPosicionPalabraSeleccionada == numeroRandom){ //Este bucle es para evitar se repitan las palabras de una ronda a otra
            numeroRandom = Math.ceil(Math.random() * countPalabras); //Numero Random para elegir la palabra
        }
        anteriorPosicionPalabraSeleccionada = numeroRandom;

        for (let p in palabras) {
            if (posicionPalabraSeleccionada == numeroRandom) { //Seleccionar la palabra de acuerdo a su posición
                palabraSeleccionada = p;
                break;
            }
            posicionPalabraSeleccionada++;
        }
        return palabraSeleccionada;
        
    }
    const inicializarPalabra = () =>{
        palabra = seleccionarPalabra();
        numeroLetrasPalabra.text(palabra.length);
        arrayPalabra = new Array(palabra.length);
        let aux = "";
        for (let i = 0; i < arrayPalabra.length; i++) {
            arrayPalabra[i] = "_";
            aux += "_ ";
        }
        palabraSistema.text(aux);
        console.log(palabra)
    }
    inicializarPalabra();
    console.log(palabra)
    const buscarLetra = () =>{
        respuestaPlayerAux = respuestaPlayer.val().trim().toLowerCase() //Obtiene valor, LE quita los espacios y Lo comvierte en minuscula

        if(palabra.includes(respuestaPlayerAux) && respuestaPlayerAux != '' && respuestaPlayerAux != null) return true; //Verifica si la palabra se encuentra
        return false
        
    }
    const managerMuñeco = resultadoPlayer =>{ //Método para quitar las partes del muñeco cuando se equivoque
        if (!resultadoPlayer) {
            countErrores++;
            if (countErrores == 6) {
                $('.cabeza').css('visibility', 'hidden');
                resultadoJuego = false;
                terminarJuego(false);
            } else if (countErrores == 5) {
                $('.torso').css('visibility', 'hidden');
            } else if (countErrores == 4) {
                $('.brazo-izquierdo').css('visibility', 'hidden');
            } else if (countErrores == 3) {
                $('.brazo-derecho').css('visibility', 'hidden');
            } else if (countErrores == 2) {
                $('.pierna-izquierda').css('visibility', 'hidden');
            } else if (countErrores == 1) {
                $('.pierna-derecha').css('visibility', 'hidden');
            } 
        }
    }
    const validarPalabra = resultadoPlayer =>{ //Función para ordenar la palabra
        let respuestaPlayerAux = respuestaPlayer.val() //Obtiene valor
        let respuestaPlayerSinEspacios = respuestaPlayerAux.trim(); //LE quita los espacions
        let respuestaPlayerFinal = respuestaPlayerSinEspacios.toLowerCase(); //Lo comvierte en minuscula

        if (resultadoPlayer) {
            for(let i = 0; i < palabra.length; i++){
                if (palabra[i] == respuestaPlayerFinal) {
                    arrayPalabra[i] = respuestaPlayerFinal;
                }
            }
        }
        console.log(arrayPalabra);
        palabraSistema.text(arrayPalabra.join(' '));
    }
    let pistaSeleccionada = 0;
    let anteriorPistaSeleccionada = 0; //2
    const mostrarPista = () =>{
        pistaSeleccionada = Math.floor(Math.random()*palabras[palabra].length);
        while (anteriorPistaSeleccionada == pistaSeleccionada) {
            pistaSeleccionada = Math.floor(Math.random()*palabras[palabra].length);
        }
        anteriorPistaSeleccionada = pistaSeleccionada;
        
        $('#pista').text(palabras[palabra][pistaSeleccionada]);

    }
    const jugar = () =>{
        respuestaPlayerAux = respuestaPlayer.val().trim().toLowerCase()
        if (buscarLetra()) {
            console.log(buscarLetra());
        } else {
            console.log(buscarLetra());
        }
        managerMuñeco(buscarLetra());
        validarPalabra(buscarLetra());
        palabraFinalUsuario = arrayPalabra.join('');
        if (palabraFinalUsuario == palabra || respuestaPlayerAux == palabra) {
            palabraSistema.text(palabra);
            resultadoJuego = true;
            terminarJuego(true);
        }
        respuestaPlayer.val("");
    }
    const terminarJuego = resultado =>{
        let msg = "";
        palabraSistema.css('color', '#FFD369');
        pausarCronometro();
        if (resultado) {
            msg = "Juego Terminado \n" + 
            "Ganó \n" + 
            `La palabra era: ${palabra} \n` + 
            `Su tiempo fué: ${tiempo.minuto} minutos y ${tiempo.segundo} segundos`;
        } else {
            msg = "Juego Terminado \n" + 
            "Perdió \n" + 
            `La palabra era: ${palabra} \n` +
            `Su tiempo fué: ${tiempo.minuto} minutos y ${tiempo.segundo} segundos`;
        }
        alert(msg);
        guardarLocal();
        mostrarHistorial();
        countErrores = 0;
        containerPantallaJuego.fadeOut().hide();
        containerPantallaInicio.show(500);
        containerInfoPista.hide();
        detenerCronometro();
        palabraSistema.css('color', '#EEEEEE');

        $('.cabeza').css('visibility', 'visible');
        $('.torso').css('visibility', 'visible');
        $('.brazo-izquierdo').css('visibility', 'visible');
        $('.brazo-derecho').css('visibility', 'visible');
        $('.pierna-izquierda').css('visibility', 'visible');
        $('.pierna-derecha').css('visibility', 'visible');
    }
    const guardarLocal = () =>{ //Guarda los resultados en el localStorage
        datosJugador['nombre'] = $('#nombre-jugador').val();
        datosJugador['tiempo'] = `${tiempo.minuto} : ${tiempo.segundo}`;
        if (resultadoJuego) {
            datosJugador['resultado'] = "Ganó";
        } else {
            datosJugador['resultado'] = "Perdió";
        }
        console.log(datosJugador);
        numeroJugador = localStorage.getItem('numeroJugador');
        numeroJugador++;
        console.log(numeroJugador);
        localStorage.setItem(`jugador${numeroJugador}`, JSON.stringify(datosJugador));
        localStorage.setItem('numeroJugador', numeroJugador);
    }
    function mostrarHistorial(){ //Muestra los resultados del LocalStorage
        numeroJugadorTotal = localStorage.getItem('numeroJugador');
        $('.resultado-partida').remove();

        for (let i = 1; i <= numeroJugadorTotal; i++) {
            $('#historial-juegos').append(
                "<tr class='resultado-partida'>"+
                    `<th>${JSON.parse(localStorage.getItem(`jugador${i}`))['nombre']}</th>`+
                    `<th>${JSON.parse(localStorage.getItem(`jugador${i}`))['tiempo']}</th>`+
                    `<th style="color: #FFD369;">${JSON.parse(localStorage.getItem(`jugador${i}`))['resultado']}</th>`+
                "</tr>"
            );
        }
    }
    const activdorCronometro = () =>{
        intervalContador = setInterval(function(e){contador()}, 10);
    }
    const pausarCronometro = () =>{
        clearInterval(intervalContador);
    }
    const detenerCronometro = () =>{
        pausarCronometro();
        tiempo.milisegundo = 0;
        tiempo.segundo = 0;
        tiempo.minuto = 0;
        tiempo.horas = 0;
        contador();
    }
    const contador = () =>{   
        if(tiempo.segundo < 10){
            segundos.text(`0${tiempo.segundo}`);
        } else {
            segundos.text(tiempo.segundo);
        }
    
        if(tiempo.minuto < 10){
            minuto.text(`0${tiempo.minuto}`);
        } else {
            minuto.text(tiempo.minuto);
        }
        
        tiempo.milisegundo++;
        if(tiempo.milisegundo >= 100){
            tiempo.milisegundo = 0;
            tiempo.segundo++;
        }
        if(tiempo.segundo >= 60){
            tiempo.segundo = 0;
            tiempo.minuto++;
        }
        if(tiempo.minuto >= 60){
            tiempo.minuto = 0;
            tiempo.horas++;
        }
    }
});