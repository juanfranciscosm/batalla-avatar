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
const botonReiniciar = document.getElementById("boton-reiniciar")
const spanVidasJugador = document.getElementById("vidas-jugador")
const spanVidasOponente = document.getElementById("vidas-oponente")
const resultadoAtaque=document.getElementById("resultado")  
const AtaquesDelJugador=document.getElementById("ataque-jugador")    
const AtaquesDelOponente=document.getElementById("ataque-oponente") 
const spanPersonajeOponente= document.getElementById("personaje-oponente-batalla")
const sectionPersonajes = document.getElementById("Escoger-personaje")
const contenedorTarjetas = document.getElementById("contenedor-tarjetas")
const contenedorBotonesAtaques= document.getElementById("contenedor-botones-ataques")
const spanJugadorBatalla=document.getElementById("personaje-jugador-batalla")

let personajeJugador = ""
let personajeOponente = ""
let ataqueJugador = ""
let ataqueOponente = ""
let opcionDeAvatares 
let opcionDeAtaques
let impactoJugador
let impactoOponente
let vidasOponente = 10
let vidasJugador = 10
let resultado = ""
let consecuencia = ""
//Arreglo de los objetos o personajes
let avatares = []
let inputkatara
let inputZuko
let inputToph
let botonFuego1
let botonFuego2 
let botonFuego3
let botonFuego4              
let botonTierra1
let botonTierra2
let botonTierra3
let botonTierra4
let botonAgua1  
let botonAgua2
let botonAgua3
let botonAgua4
let botonAireA
let botonAguaA
let botonTierraA
let botonFuegoA

//Creamos una clase para los personajes y asi definirles una estructura
class Avatar { 
    // definimos los atributos de la clase
    constructor(nombre, foto, vida, ataques) {
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
    {nombre: 'Agua 1 🌊', id: 'boton-agua1', impactoataque: 5},
    {nombre: 'Agua 2 🌊', id: 'boton-agua2', impactoataque: 4},
    {nombre: 'Agua 3 🌊', id: 'boton-agua3', impactoataque: 3},
    {nombre: 'Agua 4 🌊', id: 'boton-agua4', impactoataque: 2},
    )
toph.ataques.push(
    {nombre: 'Tierra 1 🌄', id: 'boton-tierra1', impactoataque: 5},
    {nombre: 'Tierra 2 🌄', id: 'boton-tierra2', impactoataque: 3},
    {nombre: 'Tierra 3 🌄', id: 'boton-tierra3', impactoataque: 2},
    {nombre: 'Tierra 4 🌄', id: 'boton-tierra4', impactoataque: 1}
    )
zuko.ataques.push(
    {nombre: 'Fuego 1 🔥', id: 'boton-fuego1', impactoataque: 5},
    {nombre: 'Fuego 2 🔥', id: 'boton-fuego2', impactoataque: 4},
    {nombre: 'Fuego 3 🔥', id: 'boton-fuego3', impactoataque: 3},
    {nombre: 'Fuego 4 🔥', id: 'boton-fuego4', impactoataque: 2},
    )

aang.ataques.push(
    {nombre: 'Aire 🌀', id: 'boton-aireA', impactoataque: 5},
    {nombre: 'Agua 🌊', id: 'boton-aguaA', impactoataque: 4},
    {nombre: 'Fuego 🔥', id: 'boton-fuegoA', impactoataque: 2},
    {nombre: 'Tierra 🌄', id: 'boton-tierraA', impactoataque: 3}
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
    botonReiniciar.addEventListener("click", reiniciarJuego)
    botonReiniciar.style.display='none'

}
function reiniciarJuego(){
    location.reload() //metodo para refrescar la pagina
}
function seleccionAtaqueOponente(){
    ataqueOponente=ataques[aleatorio(5,0)]
}
function ataqueFuego1 (){
    ataqueJugador="Fuego 1 🔥"
    console.log(ataquesJugador)
    seleccionAtaqueOponente()
    batalla()
}
function ataqueFuego2 (){
    ataqueJugador="Fuego 2 🔥"
    seleccionAtaqueOponente()
    batalla()
}
function ataqueFuego3 (){
    ataqueJugador="Fuego 3 🔥"
    seleccionAtaqueOponente()
    batalla()
}
function ataqueFuego4 (){
    ataqueJugador="Fuego 4 🔥"
    seleccionAtaqueOponente()
    batalla()
}
function ataqueAgua1 (){
    ataqueJugador="Agua 1 🌊"
    seleccionAtaqueOponente()
    batalla()
}
function ataqueAgua2 (){
    ataqueJugador="Agua 2 🌊"
    seleccionAtaqueOponente()
    batalla()
}
function ataqueAgua3 (){
    ataqueJugador="Agua 3 🌊"
    seleccionAtaqueOponente()
    batalla()
}
function ataqueAgua4 (){
    ataqueJugador="Agua 4 🌊"
    seleccionAtaqueOponente()
    batalla()
}
function ataqueTierra1 (){
    ataqueJugador="Tierra 1 🌄"
    seleccionAtaqueOponente()
    batalla()
}
function ataqueTierra2 (){
    ataqueJugador="Tierra 2 🌄"
    seleccionAtaqueOponente()
    batalla()
}
function ataqueTierra3 (){
    ataqueJugador="Tierra 3 🌄"
    seleccionAtaqueOponente()
    batalla()
}
function ataqueTierra4 (){
    ataqueJugador="Tierra 4 🌄"
    seleccionAtaqueOponente()
    batalla()
}
function ataqueAireA (){
    ataqueJugador="Aire A"
    seleccionAtaqueOponente()
    batalla()
}
function ataqueTierraA (){
    ataqueJugador="Tierra A"
    seleccionAtaqueOponente()
    batalla()
}
function ataqueAguaA (){
    ataqueJugador="Agua A"
    seleccionAtaqueOponente()
    batalla()
}
function ataqueFuegoA (){
    ataqueJugador="Fuego A"
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
    console.log(avatares)
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
    //Ahora mandamos a extraer los ataques que pertenecen a este personaje seleccionado
    extraerAtaquesJugador(personajeJugador)
    /*Ahora mostramos dentro del html que el personaje del jugador modificando el 
    texto dinamico del html(el que esta entre las etiquetas <span>)*/
    //creamos una variable que represente este elemento dinamico 
    //le asignamos el valor correspondiente que vendria a ser el nombre del personaje seleccionado
    spanJugadorBatalla.innerHTML=personajeJugador
    /*Una vez el usuario escoge su personaje, el sistema escogera el suyo de modo que no sea el mismo que el del usuario*/
    seleccionarOponente()
}

function extraerAtaquesJugador(avatar){
    //creamos una variable que guarde los ataques extraidos del objeto
    let ataquesJugador = []
    //recorremos los nombres de perosnajes
    for (let i = 0; i < avatares.length; i++) {
        //si el personaje evaluado en el for es igual al personaje seleccionado...
        if (avatar === avatares[i].nombre) {
            //guardamos los atauqes del personaje seleccionado en la variable de ataques
            ataquesJugador = avatares[i].ataques
        }
    }
    console.log(ataquesJugador)
    mostrarAtaquesJugador(ataquesJugador)
}

function mostrarAtaquesJugador(ataquesJugador){
    ataquesJugador.forEach((ataque)=>{
        //creamos templates iterarios que nos permitira implementar en html los valores de las variables
        opcionDeAtaques=`
        <button id="${ataque.id}" class="boton-ataque"> ${ataque.nombre} </button>`
        contenedorBotonesAtaques.innerHTML+= opcionDeAtaques
    })
    //despues que se crearon los id en html, le damos el valor a las variables de los inputs de cada personaje
    if (personajeJugador=="Katara") {
        botonAgua1=document.getElementById('boton-agua1')   
        botonAgua2=document.getElementById('boton-agua2') 
        botonAgua3=document.getElementById('boton-agua3') 
        botonAgua4=document.getElementById('boton-agua4') 
        botonAgua1.addEventListener("click", ataqueAgua1) 
        botonAgua2.addEventListener("click", ataqueAgua2)
        botonAgua3.addEventListener("click", ataqueAgua3)
        botonAgua4.addEventListener("click", ataqueAgua4)
    }
    else if (personajeJugador=="Zuko"){
        botonFuego1=document.getElementById('boton-fuego1') 
        botonFuego2=document.getElementById('boton-fuego2')   
        botonFuego3=document.getElementById('boton-fuego3')   
        botonFuego4=document.getElementById('boton-fuego4')
        botonFuego1.addEventListener("click", ataqueFuego1)
        botonFuego2.addEventListener("click", ataqueFuego2)
        botonFuego3.addEventListener("click", ataqueFuego3)   
        botonFuego4.addEventListener("click", ataqueFuego4)    
    }
    else if (personajeJugador=="Toph"){
        botonTierra1=document.getElementById('boton-tierra1') 
        botonTierra2=document.getElementById('boton-tierra2')   
        botonTierra3=document.getElementById('boton-tierra3')   
        botonTierra4=document.getElementById('boton-tierra4')
        botonTierra1.addEventListener("click", ataqueTierra1)
        botonTierra2.addEventListener("click", ataqueTierra2) 
        botonTierra3.addEventListener("click", ataqueTierra3)
        botonTierra4.addEventListener("click", ataqueTierra4)
    }
    else if (personajeJugador=="Aang"){
        botonAireA=document.getElementById('boton-aireA')
        botonAguaA=document.getElementById('boton-aguaA')
        botonTierraA=document.getElementById('boton-TierraA')
        botonFuegoA=document.getElementById('boton-FuegoA')
        botonAireA.addEventListener("click", ataqueAireA)
        botonAguaA.addEventListener("click", ataqueAguaA)
        botonTierraA.addEventListener("click", ataqueTierraA)
        botonFuegoA.addEventListener("click", ataqueFuegoA)
    }
        
}

window.addEventListener("load",iniciarJuego) /*con esta linea permitimos que el html cargue antes de ejecutar la funcion raiz de inicio del juego*/

