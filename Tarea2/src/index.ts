import express, {static as static_} from 'express';
import { engine } from 'express-handlebars';
import { Server } from 'http';
import {Server as SocketServer} from 'socket.io'

import routes from './app/routes';

const app = express();

app.use(routes);

app.get('', (req, res) => {
    res.render('index')
})

const port = process.env.PORT || 3000;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/app/views');

const server: Server = app.listen(port, () => {
    console.log(`La api esta corriendo en tu puerto ${port}`)
})

const io = new SocketServer(server, {
    cors: {
        origin: '*'
    }
})

io.on('connection', (socket) => {
    console.log("Se creo una nueva connection")
    socket.emit("confirmacion")

    socket.on('buttonClick', (datos) => {
        console.log("El usuario hizo click", datos)
    })
    
    socket.on('messageSent', (mensajes)=> {
            console.log("El usuario mando un mensaje", mensajes)
            // socket.broadcast.emit('messageReceived', mensajes)   //me excluiyo
            io.emit('messageReceived', mensajes)
        })

    socket.on('disconnect', () => {
        console.log('alguien se salio')
    })

});

