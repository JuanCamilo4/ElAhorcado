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
        perro : [
            "Es un animal mamífero", 
            "Se puede considerar un animal domestico", 
            "Tiene 4 patas",
            "Tiene cola", 
            "Es muy cariñoso con los humanos", 
            "Tiene un sentido del olfato muy agudo", 
            "Tiene un  hocico alargado"
        ],
        gato : [
            "Es un animal mamífero",
            "Se puede considerar un animal domestico",
            "Tiene 4 patas",
            "Tiene cola",
            "Puede mostrar y ocultar sus garras a voluntad",
            "Cuentan con una gran flexibilidad y elasticidad",
            "Es una animal carnívoro",
            "Son de hábitos solitarios."
        ],
        hamster: [
            "Es un animal mamífero",
            "Le gusta las semillas de girasol",
            "Pesa entre 30 a 180 gr y puede medir hasta 18cm",
            "Tiene 4 pata",
            "Es de reproducción vivípara",
            "Es omnivoro",
            "Su esperanza de vida es de 2 a 3 años",
            "Acotumbra estar en ambientes nocturnos"
        ],
        pájaro: [
            "Es un animal",
            "Tiene 2 patas",
            "Tiene plumas",
            "Puede volar",
            "Tiene pico",
            "Son de sangre caliente"
        ],
        tigre: [
            "Es un animal terrestre",
            "Es carnívoro",
            "Vive exclusivamente en Asia",
            "Viven de forma solitaria",
            "Los machos pueden llegar a medir hasta 330cm y las hembras hasta 275cm",
            "Están en peligro de extinción",
            "Cuenta con un pelaje rayado",
            "Los machos suelen ser bastantes territoriales"
        ],
        serpiente: [
            "Es un animal terrestre",
            "Son reptiles",
            "Algunas especies presentan un veneno tan potente que puede llegar a ser letal",
            "No poseen patas", "Son carnívoras",
            "Son muy sensibles a las vibraciones del suelo",
            "La mayoria viven en zonas cálidas o de clima moderado",
            "Para capturar a sus presas los paralizan y después los mata",
            "Su piel se compone de escamas epidérmicas"
        ],
        pez: [
            "Es un animal marino",
            "Son vertebrados",
            "Su cuerpo está recubierto por escamas",
            "Tienen temperatura variable",
            "Se reproducen por huevos",
            "Su circulación es sencilla y completa",
            "Son de gran importancia tanto econónomica como alimenticia para el ser humano",
            "Al ingerirlo se pueden diferentes vitaminas",
            "Con el se pueden realizar diferentes productos industriales",
            "Son de sangre fría"
        ],
        mono: [
            "Es un animal terrestre",
            "Son primates con una gran inteligencia",
            "Se encuentran mayormente en centroamerica y sudamerica",
            "Se asemeja físicamente a un humano",
            "La gran mayoría vive en los arboles",
            "Les gusta los platanos",
            "Se pueden encontrar en zonas cálidas y selváticas"
        ],
        hipopótamo: [
            "Es un animal terrestre",
            "Es un mamífero",
            "Posee un cuerpo muy grande, mucho lo comparan con un barril",
            "Tiene grandes dientes",
            "Por lo general tienen patas cortas y gruesas",
            "Generalmente pesan 3 toneladas",
            "Suele ser bastante agresivo",
            "Suelen comer 150 libras de pasto",
            "Tienen una piel rojiza",
            "Habitan principalmente en los lagos y ríos de África",
            "Se alimentan de platna y hierbas"
        ],
        zorro: [
            "Es un animal terrestre",
            "Tiene 4 patas",
            "Es mamífero",
            "Su apariencia es semejante a la de un perro de tamaño medio",
            "Se alimentan de lo que sea",
            "Tiene hábitos de cazador y depredador",
            "Emplean su fino olfato y oído para detectar pequeños roedores",
            "Aunque viven en todos los contienentes se sabe que las especies más comunes prefieren cilmas temperados",
            "Viven entre 5 y 7 años",
            "Es la especie animal más ampliamente repartida en el mundo"
        ],
        jirafa: [
            "Es un animal terrestre",
            "Es el animal más alto del mundo",
            "Es un mamífero",
            "Habita en Africa, principalmentes en sabanas, praderas, bosques y campos",
            "Es un animal terrestre",
            "Los machos pesan alrededor de 1600kg y las hembras alcazan los 825kg",
            "Son herbívoras y es comun verlas comiendo frutas frescas de las copas de los árboles",
            "Estos animales beben poca agua y pueden pasar 3 días sin hacerlo",
            "Este animal se encuentra en peligro de extinción"
        ],
        pulpo: [
            "Es un animal marino invertebrado",
            "Estan dentro del orden de los octópodos",
            "Es considerado el molusco más inteligente",
            "Se encuentran practicamente en todos los océanos, en especial en los arrecifes coralinos y otras regiones que les faciliten el escondite",
            "Son básicamentes omnivoros, osea que pueden comer cualquier cosa",
            "Son capaces de imitar hasta 15 diferentes especies",
            "Cuenta con depósitos de tinta negra que puede emitir en el agua",
            "Cuentan con mordedura venenosa",
            "Su piel es un perfecto mecanismo de camuflaje",
            "Este animal es considerado un manjar en muchas gastronomías costeras"
        ],
        ballena: [
            "Es un animal marino",
            "Es de los mamíferos con mayor tamaño",
            "Son animales de sangre caliente",
            "Miden entre 15 y 17 metros",
            "Pesan entre 50 y 80 toneladas",
            "Ellas respiran tomando el aire a través de su espiráculo",
            "Se alimenta de peces, crustáceos, calamares, camarones, krill",
            "Viven alrededor de 30 años",
            "Tienen pelo en su superficie, pero es muy fino",
            "Viven en grupos pequeños",
            "Pueden sumergirse a una gran profundidad"
        ],
        rinoceronte: [
            "Es un animal terrestre",
            "Estos animales suelen pesar entre 800 y 1400 kg",
            "Son solitarios y muy territoriales",
            "Las esperanza de vida en las condiciones más favorables es de 60 años",
            "Se pueden encontrar viviendo en África, Asia, India, Malasia e Indonesia",
            "Este animal se encuentra en peligro de extinción",
            "Cuenta con un gran cuerno en la cabeza, este mismo es bastante codiciado por el humano",
            "Son anmales herbívoros"
        ],
        elefante: [
            "Es de los animales terrestre más grandes",
            "Es mamífero",
            "Su inteligencia en algunos casos es similar a la de los seres humanos",
            "Suelen pesar 7000kg",
            "Viven entre 60 y 70 años",
            "Este animal se encuentra en peligro de extinción",
            "Cuenta con una larga trompa con diferentes funciones como emitir sonidos y distinguir sonidos",
            "Cuentan con dos colmillos en forma curva",
            "Cuentan con grandes orejas, las cuales están muy vascularizadas",
            "Son animales herbívoros, ósea comen plantas",
            "Viven tanto enselvas como en sabanas"
        ]
    }
    let tiempo = {
        milisegundo : 0,
        segundo: 0,
        minuto: 0,
        horas: 0
    };
    let datosJugador = { //Datos que se van a mostrar en la tabla del historial
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
            console.warn("No intentes hacer nada malo");
        }
    });
    containerPantallaInicio.keydown(function (e) { 
        const keyName = event.key;
        if (keyName == 'Enter') {
            if(containerPantallaJuego.hasClass('activado')){
                activdorCronometro();
                inicializarPalabra();
                respuestaPlayer.focus();
                console.warn("No intentes hacer nada malo");
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
        palabraSeleccionada = darFormato(palabraSeleccionada);
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
        //console.log(palabra)
    }
    inicializarPalabra();
    //console.log(palabra)
    const buscarLetra = () =>{
        respuestaPlayerAux = respuestaPlayer.val().trim().toLowerCase() //Obtiene valor, LE quita los espacios y Lo comvierte en minuscula
        respuestaPlayerAux = darFormato(respuestaPlayerAux);
        //console.log(respuestaPlayerAux);

        if(palabra.includes(respuestaPlayerAux)) return true; //Verifica si la palabra se encuentra
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
        respuestaPlayerFinal = darFormato(respuestaPlayerFinal);

        if (resultadoPlayer) {
            for(let i = 0; i < palabra.length; i++){
                if (palabra[i] == respuestaPlayerFinal) {
                    arrayPalabra[i] = respuestaPlayerFinal;
                }
            }
        }
        //console.log(arrayPalabra);
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
        respuestaPlayerAux = darFormato(respuestaPlayerAux);
        if (buscarLetra()) {
            //console.log(buscarLetra());
        } else {
            //console.log(buscarLetra());
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
        //console.log(datosJugador);
        numeroJugador = localStorage.getItem('numeroJugador');
        numeroJugador++;
        //console.log(numeroJugador);
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
                    `<th>${JSON.parse(localStorage.getItem(`jugador${i}`))['resultado']}</th>`+
                "</tr>"
            );
        }
    }
    function darFormato(cadena){
        let aMayus = cadena.replace(/[ÁÀÄÂ]/g,'A');
        let aMinus = aMayus.replace(/[áàäâ]/g,'a');
        let eMayus = aMinus.replace(/[ÉÈËÊ]/g,'E');
        let eMinus = eMayus.replace(/[éèëê]/g,'e');
        let iMayus = eMinus.replace(/[ÍÌÏÎ]/g,'I');
        let iMinus = iMayus.replace(/[íìïî]/g,'i');
        let oMayus = iMinus.replace(/[ÓÒÖÔ]/g,'O');
        let oMinus = oMayus.replace(/[óòöô]/g,'o');
        let uMayus = oMinus.replace(/[ÚÙÜÛ]/g,'U');
        let uMinus = uMayus.replace(/[úùüû]/g,'u');
        let enieMayus = uMinus.replace(/[Ñ]/g,'N');
        let enieMinus = enieMayus.replace(/[ñ]/g,'n');
        let resultado = enieMinus.replace(/['|°¬!^`~"#$%&/()Çç=?¿{}_,.´+<>¡¨*:;]/gi,'');

        return resultado;
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