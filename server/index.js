import { Server } from 'socket.io'

const PORT = 9000;

const inOut = new Server(PORT,{
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET','POST']
    }
});

inOut.on('connection', socket => {

    socket.on('get-document', documentId => {
        const content = "";
        socket.join(documentId);
        socket.emit('load-document', content);

        socket.on('send-changes', delta => {
            console.log(delta);
            socket.broadcast.to(documentId).emit('receive-changes', delta);
        })
    })
    
});

