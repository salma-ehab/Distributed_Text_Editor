import {useEffect} from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import {Box} from '@mui/material';
import styled from '@emotion/styled'

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

    useEffect(() => {
        const qServer = new Quill('#holder', {theme: 'snow', modules: {toolbar: toolbarOptions}})
    }, [])

    return(
        <El>
            <Box className="storage" id = "holder"> </Box>
        </El>
        
    )
}

export default Docs;