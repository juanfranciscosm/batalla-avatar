const express = require("express")
const cors = require("cors")
const app= express()

const jugadores = []
app.use(express.static('public'))
app.use(cors()) //le decimos a express que use cors para que no salga error de cors
app.use(express.json()) // habilitamos el recibir petisione post en forma de json

class Jugador {
    constructor(id){
        this.id = id
    }

    asignarAvatar(avatar){
        this.avatar=avatar
    }

    actualizarPosicion(x,y){
        this.x = x
        this.y = y
    }

    asignarAtaques(ataques){
        this.ataques = ataques
    }
}

class Avatar {
    constructor(nombre){
        this.nombre=nombre
    }
}

app.get("/unirse",(req,res)=>{
    const id =`${Math.random()}`
    const jugador = new Jugador(id)
    jugadores.push(jugador)
    res.setHeader("Access-Control-Allow-Origin", "*") //le decimos al servidor que permita solicitudes desde cualquier origen, en este caso nuestro juego

    res.send(id)
})

app.post("/avatar/:jugadorId",(req, res)=>{
    const jugadorId = req.params.jugadorId || ""//accedemos a la variable definida en express dentro del url
    const nombre = req.body.avatar ||""
    const avatar = new Avatar(nombre)

    const jugadorIndex = jugadores.findIndex((jugador)=> jugadorId === jugador.id)
    if (jugadorIndex >= 0){
        jugadores[jugadorIndex].asignarAvatar(avatar)
    }
    console.log(jugadores)
    console.log(jugadorId)
    res.end()
})

app.post("/avatar/:jugadorId/posicion",(req,res)=>{
    const jugadorId = req.params.jugadorId || ""//accedemos a la variable definida en express dentro del url
    const x = req.body.x || 0
    const y = req.body.y || 0
    
    const jugadorIndex = jugadores.findIndex((jugador)=> jugadorId === jugador.id)
    if (jugadorIndex >= 0){
        jugadores[jugadorIndex].actualizarPosicion(x, y)
    }
    
    let enemigos = jugadores.filter((jugador) => jugadorId != jugador.id)
    res.send({enemigos})
})


app.post("/avatar/:jugadorId/ataques",(req,res)=>{
    const jugadorId = req.params.jugadorId || ""//accedemos a la variable definida en express dentro del url
    const ataques = req.body.ataques || []
    
    const jugadorIndex = jugadores.findIndex((jugador)=> jugadorId === jugador.id)
    if (jugadorIndex >= 0){
        jugadores[jugadorIndex].asignarAtaques(ataques)
    }
    
    res.end()
})

app.get("/avatar/:jugadorId/ataques",(req,res)=>{
    const jugadorId = req.params.jugadorId || ""
    const jugador=jugadores.find((jugador)=> jugador.id === jugadorId)
    res.send({
        ataques: jugador.ataques || []

    })
})
app.listen(8080, () => {
    console.log("servidor funcionando")
    })