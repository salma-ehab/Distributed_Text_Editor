import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Docs from './item/Docs';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Docs/>} />
      </Routes>
    </Router>
  );
}

export default App;
