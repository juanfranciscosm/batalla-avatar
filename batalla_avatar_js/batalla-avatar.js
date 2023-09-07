/*
Este juego tiene diferentes personajes y diferentes ataques
Dependiendo del personaje, el ataque tendra mayor o menor impacto
El impacto son las vidas que le quita al oponente con el ataque
El impacto mayor es el que gana y reduce ese valor de impacto al contrincante

Para el personaje Katara
- El ataque de Agua tiene un impacto de 5
- El ataque de Fuego tiene un impacto de 1
- El ataque de Tierra tiene un impacto de 1

Para el personaje Zuko
- El ataque de Agua tiene un impacto de 1
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
let personajeJugador =""
let personajeOponente = personajes[aleatorio(2,0)]
let ataqueJugador = ""
let ataqueOponente = ""


function iniciarJuego(){
    alert('Selecciona a tu personaje')
    let botonPersonaje=document.getElementById("boton-personaje")
    botonPersonaje.addEventListener("click", seleccionarPersonajeJugador)

    let botonFuego = document.getElementById("boton-fuego")
    botonFuego.addEventListener("click", ataqueFuego)
    let botonAgua = document.getElementById("boton-agua")
    botonAgua.addEventListener("click", ataqueAgua)
    let botonTierra = document.getElementById("boton-tierra")
    botonTierra.addEventListener("click", ataqueTierra)
}
   
function ataqueFuego (){
    ataqueJugador="FUEGO"
    alert (ataqueJugador)
}

function ataqueAgua (){
    ataqueJugador="AGUA"
    alert (ataqueJugador)
}

function ataqueTierra (){
    ataqueJugador="TIERRA"
    alert (ataqueJugador)
}

function aleatorio(max,min){
        return Math.floor(Math.random()*(max-min+1)+min)
}
    

function seleccionarOponente (){
    let spamPersonajeOponente= document.getElementById("personaje-oponente")
    //Selecciona un oponente que no sea el mismo que escogio el jugador
    while (personajeJugador == personajeOponente) {
        personajeOponente = personajes[aleatorio(2,0)]
    }
    spamPersonajeOponente.innerHTML= personajeOponente
    alert("Tu oponente es "+ personajeOponente)
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
    alert ("Tu personaje es " + personajeJugador)
    /*Ahora mostramos dentro del html que el personaje del jugador modificando el 
    texto dinamico del html(el que esta entre las etiquetas <span>)*/
    //creamos una variable que represente este elemento dinamico
    let spanPersonajeJugador= document.getElementById("personaje-jugador") 
    //le asignamos el valor correspondiente que vendria a ser el nombre del personaje seleccionado
    spanPersonajeJugador.innerHTML = personajeJugador
    /*Una vez el usuario escoge su personaje, el sistema escogera el suyo de modo que no 
    sea el mismo que el del usuario*/
    seleccionarOponente()
}
   

window.addEventListener("load",iniciarJuego) /*con esta linea permitimos que el html cargue 
antes de ejecutar la funcion raiz de inicio del juego*/

