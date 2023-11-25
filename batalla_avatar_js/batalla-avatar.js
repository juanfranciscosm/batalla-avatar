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
const sectionConteoVidas = document.getElementById("conteo-vidas")
const sectionBatalla = document.getElementById("batalla")
const botonPersonaje=document.getElementById("boton-personaje")
const sectionSeleccionarAtaque = document.getElementById("Escoger-ataque")
const botonFuego = document.getElementById("boton-fuego")
const botonAgua = document.getElementById("boton-agua")
const botonTierra = document.getElementById("boton-tierra")
const botonAire = document.getElementById("boton-aire")
const botonReiniciar = document.getElementById("boton-reiniciar")
const spanVidasJugador = document.getElementById("vidas-jugador")
const spanVidasOponente = document.getElementById("vidas-oponente")
const resultadoAtaque=document.getElementById("resultado")  
const AtaquesDelJugador=document.getElementById("ataque-jugador")    
const AtaquesDelOponente=document.getElementById("ataque-oponente") 
const spanPersonajeOponente= document.getElementById("personaje-oponente-batalla")
const sectionPersonajes = document.getElementById("Escoger-personaje")
const contenedorTarjetas = document.getElementById("contenedor-tarjetas")
const spanJugadorBatalla=document.getElementById("personaje-jugador-batalla")

let personajeJugador = ""
let personajeOponente = ""
let ataqueJugador = ""
let ataqueOponente = ""
let opcionDeAvatares 
let impactoJugador = 0
let impactoOponente = 0
let vidasOponente = 10
let vidasJugador = 10
let resultado = ""
let consecuencia = ""
//Arreglo de los objetos o personajes
let avatares = []
let inputkatara
let inputZuko
let inputToph



//Creamos una clase para los personajes y asi definirles una estructura
class Avatar { 
    // definimos los atributos de la clase
    constructor(nombre, foto, vida) {
        //con this.atributo definimos la variable del atributo y la vinculamos al valor de la funcion constructor.
        this.nombre=nombre
        this.foto=foto
        this.vida=vida
        this.ataques=[]
    }
}

//Construimos los objetos como variables que heredaran los atributos de la clase definida
//let nombreDelObjeto= new NombreDeLaClase (valores, de las, variables, del, constructor)
//Para imagenes se usa las comillas simples
let katara = new Avatar ("Katara", 'ilustraciones/katara.png', 10)
let zuko = new Avatar  ("Zuko",'ilustraciones/zuko.png',10)
let toph = new Avatar ("Toph", 'ilustraciones/toph.png', 10)
let aang = new Avatar ("AANG", 'ilustraciones/aang.png', 10)

avatares.push(katara, zuko, toph, aang)

//agregamos los objetos de ataques al arreglo de ataques para cada personaje, los cuales tienen diferentes ataques distintos
katara.ataques.push(
    {nombre: 'Agua 🌊', id: 'boton-agua', impactoataque: 5},
    {nombre: 'Agua 🌊', id: 'boton-agua', impactoataque: 5},
    {nombre: 'Aire 🌀', id: 'boton-aire', impactoataque: 4},
    {nombre: 'Agua 🌊', id: 'boton-agua', impactoataque: 5},
    {nombre: 'Fuego 🔥', id: 'boton-fuego', impactoataque: 1},
    {nombre: 'Tierra 🌄', id: 'boton-tierra', impactoataque: 1}
    )
toph.ataques.push(
    {nombre: 'Agua 🌊', id: 'boton-agua', impactoataque: 1},
    {nombre: 'Fuego 🔥', id: 'boton-fuego', impactoataque: 2},
    {nombre: 'Aire 🌀', id: 'boton-aire', impactoataque: 4},
    {nombre: 'Tierra 🌄', id: 'boton-tierra', impactoataque: 5},
    {nombre: 'Tierra 🌄', id: 'boton-tierra', impactoataque: 5},
    {nombre: 'Tierra 🌄', id: 'boton-tierra', impactoataque: 5}
    )
zuko.ataques.push(
    {nombre: 'Agua 🌊', id: 'boton-agua', impactoataque: 1},
    {nombre: 'Fuego 🔥', id: 'boton-fuego', impactoataque: 5},
    {nombre: 'Aire 🌀', id: 'boton-aire', impactoataque: 4},
    {nombre: 'Fuego 🔥', id: 'boton-fuego', impactoataque: 5},
    {nombre: 'Fuego 🔥', id: 'boton-fuego', impactoataque: 5},
    {nombre: 'Tierra 🌄', id: 'boton-tierra', impactoataque: 3}
    )

aang.ataques.push(
        {nombre: 'Aire 🌀', id: 'boton-aire', impactoataque: 4},
        {nombre: 'Aire 🌀', id: 'boton-aire', impactoataque: 4},
        {nombre: 'Agua 🌊', id: 'boton-agua', impactoataque: 4},
        {nombre: 'Agua 🌊', id: 'boton-agua', impactoataque: 4},
        {nombre: 'Fuego 🔥', id: 'boton-fuego', impactoataque: 2},
        {nombre: 'Tierra 🌄', id: 'boton-tierra', impactoataque: 3}
)
function iniciarJuego(){
    sectionSeleccionarAtaque.style.display = 'none'
    sectionConteoVidas.style.display = 'none'
    sectionBatalla.style.display = 'none'

    avatares.forEach((avatar)=>{
        //creamos templates iterarios que nos permitira implementar en html los valores de las variables
        opcionDeAvatares=`
        <input type="radio" id="${avatar.nombre}" name="personaje"> <!---el input va antes ya que en css el hermano debe ser el siguiete label correspondiente-->
        <label for="${avatar.nombre}" class="tarjeta-personaje">
            <label for="${avatar.nombre}"> ${avatar.nombre} </label> <img id="foto-${avatar.nombre}" src="${avatar.foto}" height="80" >
        </label>   `
        contenedorTarjetas.innerHTML+= opcionDeAvatares

        //despues que se crearon los id en html, le damos el valor a las variables de los inputs de cada personaje
        inputkatara=document.getElementById('Katara')               
        inputZuko=document.getElementById('Zuko')
        inputToph=document.getElementById('Toph')
        inputAang=document.getElementById('AANG')
    })


    botonPersonaje.addEventListener("click", seleccionarPersonajeJugador)
    botonFuego.addEventListener("click", ataqueFuego)
    botonAgua.addEventListener("click", ataqueAgua)
    botonTierra.addEventListener("click", ataqueTierra)
    botonAire.addEventListener("click", ataqueAire)
    botonReiniciar.addEventListener("click", reiniciarJuego)
    botonReiniciar.style.display='none'

}
function reiniciarJuego(){
    location.reload() //metodo para refrescar la pagina
}
function seleccionAtaqueOponente(){
    ataqueOponente=ataques[aleatorio(5,0)].nombre
}
function ataqueFuego (){
    ataqueJugador="Fuego 🔥"
    seleccionAtaqueOponente()
    batalla()
}
function ataqueAgua (){
    ataqueJugador="Agua 🌊"
    seleccionAtaqueOponente()
    batalla()
}
function ataqueTierra (){
    ataqueJugador="Tierra 🌄"
    seleccionAtaqueOponente()
    batalla()
}

function ataqueAire (){
    ataqueJugador="Aire 🌀"
    seleccionAtaqueOponente()
    batalla()
}
function batalla(){
    //Se asigna variables al numero de vidas y al resultado mostrado en pantalla
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
        crearMensaje("EMPATE   "," Ambos pierden 2 vidas")
    }
    else if(impactoJugador>impactoOponente){
        let reduccionVidas=impactoJugador-impactoOponente
        vidasOponente=vidasOponente-reduccionVidas
        spanVidasOponente.innerHTML=vidasOponente.toString()
        crearMensaje("Lograste herirlo!! ",personajeOponente+" pierde " + reduccionVidas + " vidas")
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
    //al nuevo elemento se le asigna el mensaje
    resultadoAtaque.innerHTML= resultadoFinal
    //se deshabilitan los botones una vez que se define un ganador cuando uno de los contadores de vida llega a cero
    botonFuego.disabled= true
    botonAgua.disabled=true
    botonTierra.disabled=true
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
    //Selecciona un oponente que no sea el mismo que escogio" el jugador
    personajeOponente = avatares[aleatorio(avatares.length,0)].nombre
    while (personajeJugador == personajeOponente) {
        personajeOponente = avatares[aleatorio(avatares.length,0)].nombre
    }
    spanPersonajeOponente.innerHTML= personajeOponente
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionConteoVidas.style.display = 'flex'
    sectionBatalla.style.display = 'flex'  
    sectionPersonajes.style.display='none'

}
    
function seleccionarPersonajeJugador(){
    //se le asigna el valor a la variable personajeJugador
    //Empezamos creando las variables para los inputs de seleccion de cada personaje (arriba)
    //Ya que son inputs, verificamos si tienen el check cada uno de los inputs
    //dependiendo del que sea verdadero, se le asigna un valor al personajeJugador
    if (inputkatara.checked){
        personajeJugador= inputkatara.id //utilizamos la info de una sola fuente de verdad en vez de crear nueva info, asi la info se cambia en todo el flujo del codigo
    } else if (inputZuko.checked) {
        personajeJugador= inputZuko.id
    } else if (inputToph.checked){
        personajeJugador= inputToph.id
    } else if (inputAang.checked){
        personajeJugador=inputAang.id
    }else {
        alert('no seleccionaste nada, debes seleccionar un personaje')
        exit
    }
    /*Ahora mostramos dentro del html que el personaje del jugador modificando el 
    texto dinamico del html(el que esta entre las etiquetas <span>)*/
    //creamos una variable que represente este elemento dinamico 
    //le asignamos el valor correspondiente que vendria a ser el nombre del personaje seleccionado
    spanJugadorBatalla.innerHTML=personajeJugador
    /*Una vez el usuario escoge su personaje, el sistema escogera el suyo de modo que no sea el mismo que el del usuario*/
    seleccionarOponente()
}

window.addEventListener("load",iniciarJuego) /*con esta linea permitimos que el html cargue antes de ejecutar la funcion raiz de inicio del juego*/

