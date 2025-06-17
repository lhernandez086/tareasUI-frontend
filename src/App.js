import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistroForm from './registroForm';
import LoginPage from './login'; // Pagina Login a completar
import MenuSeccion from './MenuSeccion';
import TareasUI from './tareasUI';  

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/registroForm" element={<RegistroForm />} /> 
        <Route path="/MenuSeccion" element={<MenuSeccion />} /> 
        <Route path="/TareasUI" element={<TareasUI />} /> 
      </Routes>
    </Router>
  );
}

export default App;