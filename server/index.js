import { Server } from 'socket.io'

const PORT = 9000;

const inOut = new Server(PORT,{
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET','POST']
    }
});

inOut.on('connection', socket => {
    
    socket.on('send-changes', delta => {
        console.log('connected with changes ', delta );

    })
});
