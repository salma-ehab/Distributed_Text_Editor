import { Server } from 'socket.io';
import Connection from './database/mongoDB.js';
import { getDocument, updateDocument } from './logic/docLogic.js';
import express from 'express';
import {createServer} from 'http';

const PORT = process.env.PORT || 9000;
const URL = process.env.MONGODB_URI || `mongodb+srv://distributed-text-editor-user:distributed-text-editor-user@distributed-text-editor.gdjffbc.mongodb.net/?retryWrites=true&w=majority`;

Connection(URL);

const app = express();

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
}
app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'client/build'}),
);

const httpServer = createServer(app);
httpServer.listen(PORT);

const inOut = new Server(httpServer);

inOut.on('connection', socket => {

    socket.on('get-document', async documentId => {

        const docTable = await getDocument(documentId);
        socket.join(documentId);
        socket.emit('load-document', docTable.content);

        socket.on('send-changes', delta => {
            console.log(delta);
            socket.broadcast.to(documentId).emit('receive-changes', delta);
        })

        socket.on('save-document', async content => {
            await updateDocument(documentId, content);
        })
    })
    
});



