import {useEffect, useState} from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import {Box} from '@mui/material';
import styled from '@emotion/styled';
import {io} from 'socket.io-client';
import {useParams} from 'react-router-dom';
const El = styled.div`
    background: #A0BCC2;
`
const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],       
    ['blockquote', 'code-block'],
  
    [{ 'header': 1 }, { 'header': 2 }],             
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      
    [{ 'indent': '-1'}, { 'indent': '+1' }],          
    [{ 'direction': 'rtl' }],                     
  
    [{ 'size': ['small', false, 'large', 'huge'] }], 
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
    [{ 'color': [] }, { 'background': [] }],        
    [{ 'font': [] }],
    [{ 'align': [] }],
  
    ['clean']                                         
];

const Docs = () => {

   const[socket, setSocket] = useState();
   const[quill, setQuill] = useState();
   const {id} = useParams();

    useEffect(() => {
        const qServer = new Quill('#holder', {theme: 'snow', modules: {toolbar: toolbarOptions}})
        qServer.disable();
        qServer.setText('Loading doc ');
        setQuill(qServer);
    }, [])

    useEffect(() => {
        const socketServer = io('http://localhost:9000');
        setSocket(socketServer);
        
        return () => {
            socketServer.disconnect();
        }
    }, []);

    useEffect(() => {
        if(socket === null || quill === null) return;

        const integrateDelta = (delta, oldDelta, source) =>{
            if(source !== 'user') return;
            socket && socket.emit('send-changes', delta);
        }

        quill && quill.on('text-change', integrateDelta);
                  
        return () => {
            quill && quill.off('text-change', integrateDelta);
        }
    }, [quill, socket])

    useEffect(() => {
        if(socket === null || quill === null) return;

        const integrateDelta = (delta) =>{
            quill.updateContents(delta);
        }

        socket && socket.on('receive-changes', integrateDelta);
                  
        return () => {
            socket && socket.off('receive-changes', integrateDelta);
        }
    }, [quill, socket]);

    useEffect(() => {
        if(quill ===null || socket === null) return;
        socket && socket.once('load-document', document => {
            quill && quill.setContents(document);
            quill && quill.enable();
        })
        socket && socket.emit('get-document', id);

    }, [quill,socket,id]);

    useEffect(() => {
        if(quill ===null || socket === null) return;

        const interval = setInterval(() => {
            socket && socket.emit('save-document', quill.getContents())
        }, 2000);

        return () => {
           clearInterval(interval); 
        }
        
    }, [socket, quill]);

    return(
        <El>
            <Box className="storage" id = "holder"> </Box>
        </El>
        
    )
}

export default Docs;




