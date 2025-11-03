import express, {static as static_} from 'express';
import { engine } from 'express-handlebars';
import { Server } from 'http';
import {Server as SocketServer} from 'socket.io'
import routes from './app/routes';

const app = express();

app.use(routes);

app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
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
    console.log("Se creó una nueva conexión:", socket.id);
    socket.data.username = undefined;
    socket.data.currentRoom = undefined;
    socket.on('joinRoom', ({ username, room }) => {
        if (socket.data.currentRoom) {
            socket.to(socket.data.currentRoom).emit('systemMessage', {
                message: `**${socket.data.username || 'Un usuario'}** ha salido de la sala.`,
            });
            socket.leave(socket.data.currentRoom);
        }
        socket.data.username = username;
        socket.data.currentRoom = room;

        socket.join(room); 
        socket.to(room).emit('systemMessage', {
            message: ` **${username}** se ha unido a la sala **${room}**.`,
        });
    });

    socket.on('chatMessage', (msg: string) => {
        if (!socket.data.currentRoom || !socket.data.username) return; 
        
        const messageData = {
            username: socket.data.username,
            message: msg,
            timestamp: new Date().toISOString()
        };
        io.to(socket.data.currentRoom).emit('messageReceived', messageData);
    });
    
    socket.on('leaveRoom', () => {
        const room = socket.data.currentRoom;
        if (room && socket.data.username) {
            socket.leave(room);
            socket.to(room).emit('systemMessage', {
                message: `**${socket.data.username}** ha salido de la sala.`,
            });
            socket.data.currentRoom = undefined;
        }
    });

    socket.on('disconnect', () => {
        if (socket.data.username && socket.data.currentRoom) {
            io.to(socket.data.currentRoom).emit('systemMessage', {
                message: `**${socket.data.username}** se ha desconectado.`,
            });
        }
        console.log('Alguien se desconectó:', socket.id);
    });
});