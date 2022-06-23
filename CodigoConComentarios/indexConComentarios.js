/**
 * iniciar el proyecto con npm
 * > npm init -y
 * 
 * instalar el paquete express
 * > npm i express
 *  
 * instalar nodemon como dependencia de desarrollo
 * > npm i nodemon -D
 * 
 * levantar el servidor
 * > npx nodemon index.js
 */

const express = require('express');
const app = express();

let listaUsuarios = [
    'Juan',
    'Joselyn',
    'Astrid',
    'Maria',
    'Ignacia',
    'Javier',
    'Brian',
];


const listener = app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000")
});


app.use(express.static("assets"));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})


app.get('/abracadabra/usuarios', (req, res) => {
    res.json({ listaUsuarios });
});


app.use('/abracadabra/juego/:usuario', (req, res, next) => {
    const nombre = req.params.usuario;
    const validarUsuario = listaUsuarios.includes(nombre);

    console.log(nombre)
    console.log(validarUsuario)

    if (validarUsuario) {
        next();
    } else {
        res.sendFile(__dirname + '/assets/who.jpeg')
    }
})

app.get('/abracadabra/juego/:usuario', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})


app.get('/abracadabra/conejo/:n', (req, res) => {
    let numero = req.params.n;
    let random =  Math.floor(Math.random() * (4 - 1)) + 1;

    if (numero == random) {
        res.redirect('/conejito.jpg');
        //res.sendFile(__dirname + '/assets/conejito.jpg');
    } else {
        res.redirect('/voldemort.jpg');
        //res.sendFile(__dirname + '/assets/voldemort.jpg');
    }
});


app.get("*", (req, res) => {
    res.send("Esta página no existe...");
})
