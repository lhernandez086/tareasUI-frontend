import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import MenuSeccion from './MenuSeccion'; // Importar el componente


const LoginPage = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    usuario: '',
    password: ''
  });
  const [mensaje, setMensaje] = useState(null); // para mensaje al usuario
  const [tipoMensaje, setTipoMensaje] = useState(''); // success o danger
  const navigate = useNavigate();

  localStorage.setItem('usuario', '');

  // Actualiza el estado cuando cambia el valor de un campo
  const handleChange = (e) => {
    setTimeout(() => {
      setMensaje(null);
      setTipoMensaje('');
    }, 1000);
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que la página se recargue al enviar el formulario

    // Aquí iría la lógica para autenticar al usuario
    //console.log('Datos de login:', formData);

    try {
      // Enviar los datos al servidor PHP
      var url = API_URL + '?action=comprobarClave&usuario=A1&clave=B1';
       
      url = url.replace('A1', formData.usuario);
      url = url.replace('B1', formData.password); 

      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const result = await res.json();
      console.log(result);

      if (result) {
        if (result.valido) {
          localStorage.setItem('usuario', formData.usuario); 
          navigate('/tareasUI');
        } else {

          setMensaje('❌ Usuario o clave incorrectos. ');
          setTipoMensaje('danger');
        }


      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      console.log('Hubo un error al procesar la solicitud.');
    }

    setTimeout(() => {
      setMensaje(null);
      setTipoMensaje('');
    }, 88000);
  };

  return (
    <div>
      <MenuSeccion />
      <div className="container mt-5">

        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-body">
                <h3 className="card-title text-center mb-4">Inicio de Sesión</h3>
                {mensaje && (
                  <div className={`alert alert-${tipoMensaje}`} role="alert">
                    {mensaje}
                    <a className="icon-link icon-link-hover" href="./registroForm">
                      &nbsp;¿Deseas registrarte? 
                      <svg xmlns="http://www.w3.org/2000/svg" className="bi" viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                      </svg>
                    </a>
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <input type='hidden' id='action' value='comprobarClave' />
                  {/* Usuario */}
                  <div className="mb-3">
                    <label htmlFor="usuario" className="form-label">Nombre de Usuario</label>
                    <input
                      type="text"
                      className="form-control"
                      id="usuario"
                      placeholder="Introduce tu nombre de usuario"
                      value={formData.usuario}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Contraseña */}
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Contraseña"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Botón */}
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;