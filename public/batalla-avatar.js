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
const spanVictoriasJugador = document.getElementById("victorias-jugador")
const spanVictoriasOponente = document.getElementById("victorias-oponente")
const resultadoAtaque=document.getElementById("resultado")  
const AtaquesDelJugador=document.getElementById("ataque-jugador")    
const AtaquesDelOponente=document.getElementById("ataque-oponente") 
const ResultadosDelAtaque=document.getElementById("resultados") 
const spanPersonajeOponente= document.getElementById("personaje-oponente-batalla")
const sectionPersonajes = document.getElementById("Escoger-personaje")
const contenedorTarjetas = document.getElementById("contenedor-tarjetas")
const contenedorBotonesAtaques= document.getElementById("contenedor-botones-ataques")
const spanJugadorBatalla=document.getElementById("personaje-jugador-batalla")
//asignamos una variable que represente la seccion ver mapa
const sectionVerMapa = document.getElementById("ver-mapa")
//asignamos una variable que representa el mapa en si
const mapa= document.getElementById("mapa")
let jugadorId=null
let enemigoId=null
let personajeJugador = ""
let personajeJugadorObjeto 
let personajeOponenteObjeto
let personajeOponente = ""
let ataquesJugador = []
let ataquesOponente = []
let opcionDeAvatares 
let opcionDeAtaques
let impactosJugador=[]
let impactosOponente=[]
let victoriasOponente = 0
let victoriasJugador = 0
let resultado = ""
let consecuencia = ""
//Arreglo de los objetos o personajes
let avatares = []
let avataresEnemigos = []
let inputkatara
let inputZuko
let inputToph
let botones = []
let alturaResponsive
let anchoDelMapa = window.innerWidth -40
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
//asignamos una variable que represente el mapa en un contexto 2d
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './Ilustraciones/background1.png'
const anchoMaximoDelMapa = 600


if (anchoDelMapa > anchoMaximoDelMapa){
    anchoDelMapa=anchoMaximoDelMapa-40
}

alturaResponsive = anchoDelMapa * 600/800
mapa.width = anchoDelMapa
mapa.height = alturaResponsive



//Creamos una clase para los personajes y asi definirles una estructura
class Avatar { 
    // definimos los atributos de la clase
    constructor(nombre, foto, vida, fotoMapa, id =null ) {
        //con this.atributo definimos la variable del atributo y la vinculamos al valor de la funcion constructor.
        this.nombre=nombre
        this.foto=foto
        this.vida=vida
        this.ataques=[]
        this.ancho = 80
        this.alto = 80
        this.x = aleatorio(mapa.width - this.ancho,0)
        this.y = aleatorio(mapa.height-this.alto,0)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
        this.id = id
    }

    pintarPersonaje() {
        lienzo.drawImage(
            this.mapaFoto, 
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

//Construimos los objetos como variables que heredaran los atributos de la clase definida
//let nombreDelObjeto= new NombreDeLaClase (valores, de las, variables, del, constructor)
//Para imagenes se usa las comillas simples
let katara = new Avatar ("Katara", './ilustraciones/katara.png', 10, './ilustraciones/katara_mapa.png')
let zuko = new Avatar  ("Zuko",'./ilustraciones/zuko.png',10, './ilustraciones/zuko_mapa.png')
let toph = new Avatar ("Toph", './ilustraciones/toph.png', 10, './ilustraciones/toph_mapa.png')
let aang = new Avatar ("AANG", './ilustraciones/aang.png', 10, './ilustraciones/aang_mapa.png')
avatares.push(katara, zuko, toph, aang)

const KATARA_ATAQUES = [{nombre: 'Agua 1 🌊', id: 'boton-agua1', impactoataque: 5},
{nombre: 'Agua 2 🌊', id: 'boton-agua2', impactoataque: 4},
{nombre: 'Agua 3 🌊', id: 'boton-agua3', impactoataque: 3},
{nombre: 'Agua 4 🌊', id: 'boton-agua4', impactoataque: 2}
]
const TOPH_ATAQUES =[{nombre: 'Tierra 1 🌄', id: 'boton-tierra1', impactoataque: 5},
{nombre: 'Tierra 2 🌄', id: 'boton-tierra2', impactoataque: 3},
{nombre: 'Tierra 3 🌄', id: 'boton-tierra3', impactoataque: 2},
{nombre: 'Tierra 4 🌄', id: 'boton-tierra4', impactoataque: 1}]
const ZUKO_ATAQUES = [{nombre: 'Fuego 1 🔥', id: 'boton-fuego1', impactoataque: 5},
{nombre: 'Fuego 2 🔥', id: 'boton-fuego2', impactoataque: 4},
{nombre: 'Fuego 3 🔥', id: 'boton-fuego3', impactoataque: 3},
{nombre: 'Fuego 4 🔥', id: 'boton-fuego4', impactoataque: 2}]
const AANG_ATAQUES = [{nombre: 'Aire 🌀', id: 'boton-aireA', impactoataque: 5},
{nombre: 'Agua 🌊', id: 'boton-aguaA', impactoataque: 4},
{nombre: 'Fuego 🔥', id: 'boton-fuegoA', impactoataque: 2},
{nombre: 'Tierra 🌄', id: 'boton-tierraA', impactoataque: 3}]

//agregamos los objetos de ataques al arreglo de ataques para cada personaje, los cuales tienen diferentes ataques distintos
katara.ataques.push(...KATARA_ATAQUES)
toph.ataques.push(...TOPH_ATAQUES)
zuko.ataques.push(...ZUKO_ATAQUES)
aang.ataques.push(...AANG_ATAQUES)

function iniciarJuego(){
    sectionSeleccionarAtaque.style.display = 'none'
    sectionConteoVidas.style.display = 'none'
    sectionBatalla.style.display = 'none'
    sectionVerMapa.style.display = 'none'

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
    unirseAlJuego()
}

function unirseAlJuego(){
    //en javascript, con la funcion fetch podemos hacer llamadas a otros servicios
    fetch("http://192.168.100.11:8080/unirse") //peticion asincrona
        .then(function (res) {
                if (res.ok){
                    res.text()
                        .then(function(respuesta){
                            console.log(respuesta)
                            jugadorId=respuesta
                        })
                }
        })
}

function reiniciarJuego(){
    location.reload() //metodo para refrescar la pagina
}

function seleccionAtaqueOponente(){
    let i=0
    let arrayAtaquesOponente=extraerAtaquesOponente(personajeOponente)
    while (i!=1){
        let ataqueExtraido =arrayAtaquesOponente[aleatorio(3,0)].id
        if (!ataquesOponente.includes(ataqueExtraido)){
            ataquesOponente.push(ataqueExtraido)
            i=1
        }
    }
    iniciarPelea()
}

function iniciarPelea() {
    if (ataquesJugador.length===4){
        batalla()
    }
}
function batalla(){
    clearInterval(intervalo)
    let ataqueActualJugador
    for (let i= 0; i < avatares.length; i++) {
        if (personajeJugador === avatares[i].nombre){
            for (let a = 0; a < ataquesJugador.length; a++) {
                ataqueActualJugador = ataquesJugador[a]
                if (ataqueActualJugador === 'boton-fuego1') {
                    impactosJugador.push(5)
                    ataquesJugador[a]="Fuego 1 🔥"
                } else if (ataqueActualJugador ==='boton-fuego2'){
                    impactosJugador.push(4)
                    ataquesJugador[a]="Fuego 2 🔥"
                } else if (ataqueActualJugador ==='boton-fuego3'){
                    impactosJugador.push(3)
                    ataquesJugador[a]="Fuego 3 🔥"
                } else if (ataqueActualJugador ==='boton-fuego4'){
                    impactosJugador.push(2)
                    ataquesJugador[a]="Fuego 4 🔥"
                } else if (ataqueActualJugador ==='boton-fuegoA'){
                    impactosJugador.push(2)
                    ataquesJugador[a]="Fuego 🔥"
                } else if (ataqueActualJugador ==='boton-agua1'){
                    impactosJugador.push(5)
                    ataquesJugador[a]="Agua 1 🌊"
                } else if (ataqueActualJugador==='boton-agua2'){
                    impactosJugador.push(4)
                    ataquesJugador[a]="Agua 2 🌊"
                } else if (ataqueActualJugador ==='boton-agua3'){
                    impactosJugador.push(3)
                    ataquesJugador[a]="Agua 3 🌊"
                } else if (ataqueActualJugador ==='boton-agua4'){
                    impactosJugador.push(2)
                    ataquesJugador[a]="Agua 4 🌊"
                } else if (ataqueActualJugador ==='boton-aguaA'){
                    impactosJugador.push(4)
                    ataquesJugador[a]="Agua 🌊"
                } else if (ataqueActualJugador ==='boton-tierra1'){
                    impactosJugador.push(5)
                    ataquesJugador[a]="Tierra 1 🌄"
                } else if (ataqueActualJugador==='boton-tierra2'){
                    impactosJugador.push(3)
                    ataquesJugador[a]="Tierra 2 🌄"
                } else if (ataqueActualJugador ==='boton-tierra3'){
                    impactosJugador.push(2)
                    ataquesJugador[a]="Tierra 3 🌄"
                } else if (ataqueActualJugador ==='boton-tierra4'){
                    impactosJugador.push(1)
                    ataquesJugador[a]="Tierra 4 🌄"
                } else if (ataqueActualJugador ==='boton-tierraA'){
                    impactosJugador.push(3)
                    ataquesJugador[a]="Tierra 🌄"
                } else if (ataqueActualJugador  ==='boton-aireA'){
                    impactosJugador.push(5)
                    ataquesJugador[a]="Aire 🌀"
                }   
            }
        }
    }

    let ataqueActualOponente
    for (let i= 0; i < avatares.length; i++) {
        if (personajeOponente === avatares[i].nombre){
            for (let a = 0; a < ataquesOponente.length; a++) {
                ataqueActualOponente = ataquesOponente[a]
                if (ataqueActualOponente === 'boton-fuego1') {
                    impactosOponente.push(5)
                    ataquesOponente[a]="Fuego 1 🔥"
                } else if (ataqueActualOponente ==='boton-fuego2'){
                    impactosOponente.push(4)
                    ataquesOponente[a]="Fuego 2 🔥"
                } else if (ataqueActualOponente ==='boton-fuego3'){
                    impactosOponente.push(3)
                    ataquesOponente[a]="Fuego 3 🔥"
                } else if (ataqueActualOponente ==='boton-fuego4'){
                    impactosOponente.push(2)
                    ataquesOponente[a]="Fuego 4 🔥"
                } else if (ataqueActualOponente ==='boton-fuegoA'){
                    impactosOponente.push(2)
                    ataquesOponente[a]="Fuego 🔥" 
                } else if (ataqueActualOponente ==='boton-agua1'){
                    impactosOponente.push(5)
                    ataquesOponente[a]="Agua 1 🌊"
                } else if (ataqueActualOponente==='boton-agua2'){
                    impactosOponente.push(4)
                    ataquesOponente[a]="Agua 2 🌊"
                } else if (ataqueActualOponente ==='boton-agua3'){
                    impactosOponente.push(3)
                    ataquesOponente[a]="Agua 3 🌊"
                } else if (ataqueActualOponente ==='boton-agua4'){
                    impactosOponente.push(2)
                    ataquesOponente[a]="Agua 4 🌊"
                } else if (ataqueActualOponente ==='boton-aguaA'){
                    impactosOponente.push(4)
                    ataquesOponente[a]="Agua 🌊"
                } else if (ataqueActualOponente ==='boton-tierra1'){
                    impactosOponente.push(5)
                    ataquesOponente[a]="Tierra 1 🌄"
                } else if (ataqueActualOponente==='boton-tierra2'){
                    impactosOponente.push(3)
                    ataquesOponente[a]="Tierra 2 🌄"
                } else if (ataqueActualOponente ==='boton-tierra3'){
                    impactosOponente.push(2)
                    ataquesOponente[a]="Tierra 3 🌄"
                } else if (ataqueActualOponente ==='boton-tierra4'){
                    impactosOponente.push(1)
                    ataquesOponente[a]="Tierra 4 🌄"
                } else if (ataqueActualOponente ==='boton-tierraA'){
                    impactosOponente.push(3)
                    ataquesOponente[a]="Tierra 🌄"
                } else if (ataqueActualOponente  ==='boton-aireA'){
                    impactosOponente.push(5)
                    ataquesOponente[a]="Aire 🌀"
                }   
            }
        }
    }

    for (let i = 0; i < impactosJugador.length; i++) {
        if (impactosJugador[i]==impactosOponente[i]){
            crearMensaje("EMPATE", ataquesJugador[i], ataquesOponente[i])
            
        }
        else if (impactosJugador[i]< impactosOponente[i]){
            crearMensaje("PERDISTE", ataquesJugador[i], ataquesOponente[i])
            victoriasOponente++
            spanVictoriasOponente.innerHTML=victoriasOponente
        }
        else if (impactosJugador[i]> impactosOponente[i]){
            crearMensaje("GANASTE", ataquesJugador[i], ataquesOponente[i])
            victoriasJugador++
            spanVictoriasJugador.innerHTML=victoriasJugador
        }
    }
    console.log(impactosJugador)
    console.log(impactosOponente)

    revisarVictorias()

}
function crearMensaje (resultado, ataqueJugador, ataqueOponente){
    //especificamos la seccion donde aparecera los mensajes
    //creamos el elemento que encapsula el mensaje
    let nuevoAtaqueDelJugador= document.createElement('p') 
    let nuevoAtaqueDelOponente= document.createElement('p') 
    let nuevoResultado =document.createElement('p')
    //al nuevo elemento se le asigna el mensaje
    nuevoResultado.innerHTML=resultado
    nuevoAtaqueDelJugador.innerHTML=ataqueJugador
    nuevoAtaqueDelOponente.innerHTML=ataqueOponente
    //con appenchild asignamos un elemento hijo a un elemento padre (padre.appendChild(hijo))
    AtaquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    AtaquesDelOponente.appendChild(nuevoAtaqueDelOponente)
    ResultadosDelAtaque.appendChild(nuevoResultado)


}
function crearMensajeFinal (resultadoFinal){
    //especificamos las secciones o divs donde aparecera los mensajes
    //al nuevo elemento se le asigna el mensaje
    resultadoAtaque.innerHTML= resultadoFinal
    //se deshabilitan los botones una vez que se define un ganador cuando uno de los contadores de vida llega a cero
    botonReiniciar.style.display='block'
}
function revisarVictorias(){
    if (victoriasJugador<victoriasOponente){
        crearMensajeFinal("lo siento, perdiste :(")
    }
    else if (victoriasJugador>victoriasOponente){
        crearMensajeFinal("FELICIDADES!! GANASTE :)")
    }
    else if (victoriasJugador===victoriasOponente){
        crearMensajeFinal("EMPATE")
    }
}
function aleatorio(max,min){
        return Math.floor(Math.random()*(max-min+1)+min)
}    

function seleccionarOponente(oponente) {    
    //Selecciona un oponente que no sea el mismo que escogio" el jugador
    console.log(avatares)
    personajeOponente = oponente
    spanPersonajeOponente.innerHTML= personajeOponente

}
function extraerAtaquesOponente(oponente){
    let ataquesOponente = []
    for(let i=0; i< avatares.length; i++){
        if (oponente === avatares[i].nombre){
            ataquesOponente=avatares[i].ataques
        }
    }

    return ataquesOponente
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
        alert('Selecciona un personaje')
        exit
    }

    seleccionarAvatar(personajeJugador)
    
    //Ahora mandamos a extraer los ataques que pertenecen a este personaje seleccionado
    extraerAtaquesJugador(personajeJugador)
    /*Ahora mostramos dentro del html que el personaje del jugador modificando el 
    texto dinamico del html(el que esta entre las etiquetas <span>)*/
    //creamos una variable que represente este elemento dinamico 
    //le asignamos el valor correspondiente que vendria a ser el nombre del personaje seleccionado
    spanJugadorBatalla.innerHTML=personajeJugador
    /*Una vez el usuario escoge su personaje, el sistema escogera el suyo de modo que no sea el mismo que el del usuario*/
    sectionVerMapa.style.display = 'flex'
    inciarMapa()
    secuenciaAtaque()    

}
function seleccionarAvatar(avatar){
    fetch(`http://192.168.100.11:8080/avatar/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            avatar: personajeJugador
        })
        
    })
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
        <button id="${ataque.id}" class="boton-ataque BAtaques"> ${ataque.nombre} </button>`
        contenedorBotonesAtaques.innerHTML+= opcionDeAtaques
    })
    //Ponemos todos los botones que se generen dentro de un arreglo con las siguiente linea (el arreglo se define al inicio de todo el programa)
    botones = document.querySelectorAll(".BAtaques")
    console.log(botones)

}
function secuenciaAtaque() {
    console.log("entre a la secuencia")
    console.log(botones)
    botones.forEach((boton)=> {
        boton.addEventListener('click',(e)=>{
            console.log(e)
            console.log(ataquesJugador)
            if (e.target.id === 'boton-fuego1') {
                ataquesJugador.push('boton-fuego1')
                console.log(ataquesJugador)
                boton.style.background = '#BDB76B'
                boton.disabled= true

            } else if (e.target.id ==='boton-fuego2'){
                ataquesJugador.push('boton-fuego2')
                console.log(ataquesJugador)
                boton.style.background = '#BDB76B'
                boton.disabled= true

            } else if (e.target.id ==='boton-fuego3'){
                ataquesJugador.push('boton-fuego3')
                console.log(ataquesJugador)
                boton.style.background = '#BDB76B'
                boton.disabled= true

            } else if (e.target.id ==='boton-fuego4'){
                ataquesJugador.push('boton-fuego4')
                console.log(ataquesJugador)
                boton.style.background = '#BDB76B'
                boton.disabled= true

            } else if (e.target.id ==='boton-fuegoA'){
                ataquesJugador.push('boton-fuegoA')
                console.log(ataquesJugador)
                boton.style.background = '#BDB76B'
                boton.disabled= true

            } else if (e.target.id ==='boton-agua1'){
                ataquesJugador.push('boton-agua1')
                console.log(ataquesJugador)
                boton.style.background = '#BDB76B'
                boton.disabled= true

            } else if (e.target.id ==='boton-agua2'){
                ataquesJugador.push('boton-agua2')
                console.log(ataquesJugador)
                boton.style.background = '#BDB76B'
                boton.disabled= true

            } else if (e.target.id ==='boton-agua3'){
                ataquesJugador.push('boton-agua3')
                console.log(ataquesJugador)
                boton.style.background = '#BDB76B'
                boton.disabled= true

            } else if (e.target.id ==='boton-agua4'){
                ataquesJugador.push('boton-agua4')
                console.log(ataquesJugador)
                boton.style.background = '#BDB76B'
                boton.disabled= true

            } else if (e.target.id ==='boton-aguaA'){
                ataquesJugador.push('boton-aguaA')
                console.log(ataquesJugador)
                boton.style.background = '#BDB76B'
                boton.disabled= true

            } else if (e.target.id ==='boton-tierra1'){
                ataquesJugador.push('boton-tierra1')
                console.log(ataquesJugador)
                boton.style.background = '#BDB76B'
                boton.disabled= true

            } else if (e.target.id ==='boton-tierra2'){
                ataquesJugador.push('boton-tierra2')
                console.log(ataquesJugador)
                boton.style.background = '#BDB76B'
                boton.disabled= true

            } else if (e.target.id ==='boton-tierra3'){
                ataquesJugador.push('boton-tierra3')
                console.log(ataquesJugador)
                boton.style.background = '#BDB76B'
                boton.disabled= true

            } else if (e.target.id ==='boton-tierra4'){
                ataquesJugador.push('boton-tierra4')
                console.log(ataquesJugador)
                boton.style.background = '#BDB76B'
                boton.disabled= true

            } else if (e.target.id ==='boton-tierraA'){
                ataquesJugador.push('boton-tierraA')
                console.log(ataquesJugador)
                boton.style.background = '#BDB76B'
                boton.disabled= true

            } else if (e.target.id ==='boton-aireA'){
                ataquesJugador.push('boton-aireA')
                console.log(ataquesJugador)
                boton.style.background = '#BDB76B'
                boton.disabled= true

            }     
            if (ataquesJugador.length===4){
                enviarAtaques()
            }    
            
        })
        
    })
    
} 

function enviarAtaques(){
    fetch(`http://192.168.100.11:8080/avatar/${jugadorId}/ataques`,{
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataquesJugador
        })
    })

    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques(){
    fetch(`http://192.168.100.11:8080/avatar/${enemigoId}/ataques`)
        .then(function(res){
            if (res.ok){
                console.log("entre aqui")
                res.json()
                    .then(function({ ataques }){
                        if (ataques.length === 4){
                            ataquesOponente = ataques
                            batalla()
                        }
                    })
            }
            
         })
}
function pintarCanvas(){
    personajeJugadorObjeto.x = personajeJugadorObjeto.x + personajeJugadorObjeto.velocidadX
    personajeJugadorObjeto.y = personajeJugadorObjeto.y + personajeJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,0,0,mapa.width, mapa.height
    )
    personajeJugadorObjeto.pintarPersonaje()

    enviarPosicion(personajeJugadorObjeto.x ,personajeJugadorObjeto.y )

    console.log(avataresEnemigos)
    avataresEnemigos.forEach(function(avatar){
        if(avatar != undefined){
        avatar.pintarPersonaje()
        revisarColision(avatar)
        }
    })
}

function enviarPosicion(x,y){
    console.log(`Enviando posición: x=${x}, y=${y}`);

    fetch(`http://192.168.100.11:8080/avatar/${jugadorId}/posicion`,{
        method:"post",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
        
    })
    .then(function(res){
        if (res.ok){
            res.json()
                .then(function({enemigos}){
                    console.log(enemigos)
                    avataresEnemigos = enemigos.map(function(enemigo){
                        let avatarEnemigo = null
                        if (enemigo.avatar!=undefined){
                            const avatarNombre = enemigo.avatar.nombre || ""
                            switch(avatarNombre)
                            {
                                case "Katara":
                                    avatarEnemigo = new Avatar ("Katara", './ilustraciones/katara.png', 10, './ilustraciones/katara_mapa.png',enemigo.Id)
                                    avatarEnemigo.id = enemigo.id
                                break
                                case "Zuko":
                                    avatarEnemigo = new Avatar  ("Zuko",'./ilustraciones/zuko.png',10, './ilustraciones/zuko_mapa.png',enemigo.Id)
                                    avatarEnemigo.id = enemigo.id
                                break
                                case "Toph":
                                    avatarEnemigo = new Avatar ("Toph", './ilustraciones/toph.png', 10, './ilustraciones/toph_mapa.png',enemigo.Id)
                                    avatarEnemigo.id = enemigo.id
                                break
                                case "AANG":
                                    avatarEnemigo = new Avatar ("AANG", './ilustraciones/aang.png', 10, './ilustraciones/aang_mapa.png',enemigo.Id)
                                    avatarEnemigo.id = enemigo.id
                                break
                            }
                            avatarEnemigo.x = enemigo.x
                            avatarEnemigo.y = enemigo.y
                        }
                        return avatarEnemigo
                    })

                    
                })
        }
    })
}

function moverDerecha(){
    personajeJugadorObjeto.velocidadX = 5
    pintarCanvas()
}
function moverIzquierda(){
    personajeJugadorObjeto.velocidadX = -5
    pintarCanvas()
}
function moverAbajo(){
    personajeJugadorObjeto.velocidadY=5
    pintarCanvas()
}
function moverArriba(){
   personajeJugadorObjeto.velocidadY=-5
   pintarCanvas()
}
function detenerMovimiento(){
    personajeJugadorObjeto.velocidadX=0
    personajeJugadorObjeto.velocidadY=0
}

function sePresionoUnaTecla (event){
    switch (event.key){
        case 'w':
            moverArriba()
            break;
        case 's':
            moverAbajo()
            break;
        case 'a':
            moverIzquierda()
            break;
        case 'd':
            moverDerecha()
             break;
        default:
            break;
    }
}

function inciarMapa(){
    sectionPersonajes.style.display='none'
    personajeJugadorObjeto = obtenerObjetoPersonaje(personajeJugador)
    personajeOponenteObjeto = obtenerObjetoPersonaje(personajeOponente)
    intervalo = setInterval(pintarCanvas, 50)
    window.addEventListener('keydown',sePresionoUnaTecla)
    window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjetoPersonaje(avatar){
    for (let i = 0; i < avatares.length; i++) {
        if (avatar === avatares[i].nombre) {
            return avatares[i]
        }
    }
}


function revisarColision (enemigo){
    console.log(enemigo.id)
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaJugador = personajeJugadorObjeto.y
    const abajoJugador = personajeJugadorObjeto.y + personajeJugadorObjeto.alto
    const derechaJugador = personajeJugadorObjeto.x + personajeJugadorObjeto.ancho
    const izquierdaJugador = personajeJugadorObjeto.x
    
    if (
        abajoJugador < arribaEnemigo || 
        arribaJugador > abajoEnemigo ||
        derechaJugador < izquierdaEnemigo ||
        izquierdaJugador > derechaEnemigo
    ){
        return
    }
    
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    sectionConteoVidas.style.display = 'flex'
    sectionBatalla.style.display = 'flex'  
    detenerMovimiento()
    clearInterval(intervalo)
    enemigoId = enemigo.id 
    console.log("revise colision")
    seleccionarOponente(enemigo.nombre)
    
}
window.addEventListener("load",iniciarJuego) /*con esta linea permitimos que el html cargue antes de ejecutar la funcion raiz de inicio del juego*/

