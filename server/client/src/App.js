import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import {v4 as uuid} from 'uuid';

import Docs from './item/Docs';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate replace to = {`/docs/${uuid()}`} />} />
        <Route path='/docs/:id' element={<Docs/>} />
      </Routes>
    </Router>
  );
}

export default App;
