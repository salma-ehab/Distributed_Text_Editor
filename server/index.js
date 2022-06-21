import { Server } from 'socket.io'

const PORT = 9000;

const inOut = new Server(PORT,{
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET','POST']
    }
});

inOut.on('connection', socket => {
    console.log('connected2');
});