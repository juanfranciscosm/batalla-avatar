/*
Este juego tiene diferentes personajes y diferentes ataques
Dependiendo del personaje, el ataque tendra mayor o menor impacto
El impacto son las vidas que le quita al oponente con el ataque
El impacto mayor es el que gana y reduce el valor de la diferencias de impacto
en la vida del contrincante perdedor

Para el personaje Katara
- El ataque de Agua tiene un impacto de 5
- El ataque de Fuego tiene un impacto de 1
- El ataque de Tierra tiene un impacto de 1

Para el personaje Zuko
- El ataque de Agua tiene un impacto de 1cd 
- El ataque de Fuego tiene un impacto de 5
- El ataque de Tierra tiene un impacto de 3

Para el personaje Toph
- El ataque de Agua tiene un impacto de 1
- El ataque de Fuego tiene un impacto de 2
- El ataque de Tierra tiene un impacto de 5

Si hay empate se le reduce de vida a cada personaje un valor de 2
Cada jugador inicia con 10 puntos de vida

*/

// Primero declaramos las variables que se van a usar en el juego

let personajes = ["Katara", "Zuko", "Toph"]
let ataques = ["AGUA","FUEGO","TIERRA"]
let personajeJugador = ""
let personajeOponente = ""
let ataqueJugador = ""
let ataqueOponente = ""
let impactoJugador = 0
let impactoOponente = 0
let vidasOponente = 10
let vidasJugador = 10
let resultado = ""
let consecuencia = ""



function iniciarJuego(){
    let sectionSeleccionarAtaque = document.getElementById("Escoger-ataque")
    sectionSeleccionarAtaque.style.display = 'none'

    let sectionConteoVidas = document.getElementById("conteo-vidas")
    sectionConteoVidas.style.display = 'none'

    let sectionBatalla = document.getElementById("batalla")
    sectionBatalla.style.display = 'none'
    
    let botonPersonaje=document.getElementById("boton-personaje")
    botonPersonaje.addEventListener("click", seleccionarPersonajeJugador)

    let botonFuego = document.getElementById("boton-fuego")
    botonFuego.addEventListener("click", ataqueFuego)
    let botonAgua = document.getElementById("boton-agua")
    botonAgua.addEventListener("click", ataqueAgua)
    let botonTierra = document.getElementById("boton-tierra")
    botonTierra.addEventListener("click", ataqueTierra)

    let botonReiniciar = document.getElementById("boton-reiniciar")
    botonReiniciar.addEventListener("click", reiniciarJuego)
    botonReiniciar.style.display='none'
}

function reiniciarJuego(){
    location.reload() //metodo para refrescar la pagina
}

function seleccionAtaqueOponente(){
    ataqueOponente=ataques[aleatorio(2,0)]
}

function ataqueFuego (){
    ataqueJugador="FUEGO"
    seleccionAtaqueOponente()
    batalla()
}

function ataqueAgua (){
    ataqueJugador="AGUA"
    seleccionAtaqueOponente()
    batalla()
}

function ataqueTierra (){
    ataqueJugador="TIERRA"
    seleccionAtaqueOponente()
    batalla()
}

function batalla(){
    //Se asigna variables al numero de vidas y al resultado mostrado en pantalla
    let spanVidasJugador = document.getElementById("vidas-jugador")
    let spanVidasOponente = document.getElementById("vidas-oponente")
    //Se asigna el valor del impacto del ataque del jugador
    if (personajeJugador=="Katara"){
        if(ataqueJugador=="AGUA"){
            impactoJugador=5
        }
        else if (ataqueJugador=="FUEGO"){
            impactoJugador=1
        }
        else if (ataqueJugador=="TIERRA"){
            impactoJugador=1
        }
    }
    else if (personajeJugador=="Zuko"){
        if(ataqueJugador=="AGUA"){
            impactoJugador=1
        }
        else if (ataqueJugador=="FUEGO"){
            impactoJugador=5
        }
        else if (ataqueJugador=="TIERRA"){
            impactoJugador=3
        }
    }
    else if (personajeJugador=="Toph"){
        if(ataqueJugador=="AGUA"){
            impactoJugador=1
        }
        else if (ataqueJugador=="FUEGO"){
            impactoJugador=2
        }
        else if (ataqueJugador=="TIERRA"){
            impactoJugador=5
        }
    }
    //Se asigna el valor del impacto del ataque del oponente
    if (personajeOponente=="Katara"){
        if(ataqueOponente=="AGUA"){
            impactoOponente=5
        }
        else if (ataqueOponente=="FUEGO"){
            impactoOponente=1
        }
        else if (ataqueOponente=="TIERRA"){
            impactoOponente=1
        }
    }
    else if (personajeOponente=="Zuko"){
        if(ataqueOponente=="AGUA"){
            impactoOponente=1
        }
        else if (ataqueOponente=="FUEGO"){
            impactoOponente=5
        }
        else if (ataqueOponente=="TIERRA"){
            impactoOponente=3
        }
    }
    else if (personajeOponente=="Toph"){
        if(ataqueOponente=="AGUA"){
            impactoOponente=1
        }
        else if (ataqueOponente=="FUEGO"){
            impactoOponente=2
        }
        else if (ataqueOponente=="TIERRA"){
            impactoOponente=5
        }
    }
    //Se calcula la reduccion de vidas segun el resultado de la batalla
    if (impactoJugador==impactoOponente){
        vidasOponente=vidasOponente-2
        vidasJugador=vidasJugador-2
        spanVidasJugador.innerHTML=vidasJugador.toString()
        spanVidasOponente.innerHTML=vidasOponente.toString()
        crearMensaje("EMPATE"," Ambos pierden 2 vidas")
    }
    else if(impactoJugador>impactoOponente){
        let reduccionVidas=impactoJugador-impactoOponente
        vidasOponente=vidasOponente-reduccionVidas
        spanVidasOponente.innerHTML=vidasOponente.toString()
        crearMensaje("Lograste herirlo!!. ",personajeOponente+" pierde " + reduccionVidas + " vidas")
    }
    else if(impactoOponente>impactoJugador){
        vidasOponente=vidasOponente-2
        let reduccionVidas=impactoOponente-impactoJugador
        vidasJugador=vidasJugador-reduccionVidas
        spanVidasJugador.innerHTML=vidasJugador.toString() 
        crearMensaje("Te hirieron."," Pierdes " + reduccionVidas + " vidas." )
    }

    revisarVidas()
}

function crearMensaje (resultado, consecuencia){
    //especificamos la seccion donde aparecera los mensajes
    let resultadoAtaque=document.getElementById("resultado")  
    let AtaquesDelJugador=document.getElementById("ataque-jugador")    
    let AtaquesDelOponente=document.getElementById("ataque-oponente") 
    //creamos el elemento que encapsula el mensaje
    let nuevoAtaqueDelJugador= document.createElement('p') 
    let nuevoAtaqueDelOponente= document.createElement('p') 

    //al nuevo elemento se le asigna el mensaje
    resultadoAtaque.innerHTML= resultado+consecuencia
    nuevoAtaqueDelJugador.innerHTML=ataqueJugador
    nuevoAtaqueDelOponente.innerHTML=ataqueOponente
    //con appenchild asignamos un elemento hijo a un elemento padre (padre.appendChild(hijo))
    AtaquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    AtaquesDelOponente.appendChild(nuevoAtaqueDelOponente)
}

function crearMensajeFinal (resultadoFinal){
    //especificamos las secciones o divs donde aparecera los mensajes
    let notificacionFinal=document.getElementById("resultado")
    //al nuevo elemento se le asigna el mensaje
    notificacionFinal.innerHTML= resultadoFinal
    //se deshabilitan los botones una vez que se define un ganador cuando uno de los contadores de vida llega a cero
    let botonFuego = document.getElementById("boton-fuego")
    botonFuego.disabled= true
    let botonAgua = document.getElementById("boton-agua")
    botonAgua.disabled=true
    let botonTierra = document.getElementById("boton-tierra")
    botonTierra.disabled=true
    let botonReiniciar = document.getElementById("boton-reiniciar")
    botonReiniciar.style.display='block'
}

function revisarVidas(){
    if (vidasJugador<=0){
        crearMensajeFinal("lo siento, perdiste :(")
    }
    else if (vidasOponente<=0){
        crearMensajeFinal("FELICIDADES!! GANASTE :)")

    }
}

function aleatorio(max,min){
        return Math.floor(Math.random()*(max-min+1)+min)
}
    

function seleccionarOponente (){
    let spanPersonajeOponente= document.getElementById("personaje-oponente-batalla")
    //Selecciona un oponente que no sea el mismo que escogio" el jugador
    personajeOponente = personajes[aleatorio(2,0)]
    while (personajeJugador == personajeOponente) {
        personajeOponente = personajes[aleatorio(2,0)]
    }
    spanPersonajeOponente.innerHTML= personajeOponente
    let sectionSeleccionarAtaque = document.getElementById("Escoger-ataque")
    sectionSeleccionarAtaque.style.display = 'flex'
    let sectionConteoVidas = document.getElementById("conteo-vidas")
    sectionConteoVidas.style.display = 'flex'
    let sectionBatalla = document.getElementById("batalla")
    sectionBatalla.style.display = 'flex'
    
    let sectionPersonajes = document.getElementById("Escoger-personaje")
    sectionPersonajes.style.display='none'

}
    
function seleccionarPersonajeJugador(){
    
    //se le asigna el valor a la variable personajeJugador
    //Empezamos creando las variables para los inputs de seleccion de cada personaje
    let inputkatara=document.getElementById('katara')
    let inputZuko=document.getElementById('zuko')
    let inputToph=document.getElementById('toph')
    //Ya que son inputs, verificamos si tienen el check cada uno de los inputs
    //dependiendo del que sea verdadero, se le asigna un valor al personajeJugador
    if (inputkatara.checked){
        personajeJugador="Katara"
    } else if (inputZuko.checked) {
        personajeJugador="Zuko"
    } else if (inputToph.checked){
        personajeJugador="Toph"
    } else {
        alert('no seleccionaste nada, debes seleccionar un personaje')
        exit
    }
    /*Ahora mostramos dentro del html que el personaje del jugador modificando el 
    texto dinamico del html(el que esta entre las etiquetas <span>)*/
    //creamos una variable que represente este elemento dinamico 
    let spanJugadorBatalla=document.getElementById("personaje-jugador-batalla")
    //le asignamos el valor correspondiente que vendria a ser el nombre del personaje seleccionado
    spanJugadorBatalla.innerHTML=personajeJugador
    /*Una vez el usuario escoge su personaje, el sistema escogera el suyo de modo que no 
    sea el mismo que el del usuario*/
    
    seleccionarOponente()
}

window.addEventListener("load",iniciarJuego) /*con esta linea permitimos que el html cargue 
antes de ejecutar la funcion raiz de inicio del juego*/

