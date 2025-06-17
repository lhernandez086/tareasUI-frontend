import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate



const RegistroForm = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const [formData, setFormData] = useState({
        usuario: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const realizaSubmit = async (e) => {
        e.preventDefault();
        console.log('Datos del formulario:', formData); 
        try { 
            const api_guardar = API_URL + '/guardarReg.php';
            const res = await fetch(api_guardar, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })/*.then(response => {
                 
                return response; // Get the response as text
            })
                .then(text => {
                    console.log('text '  + text); // Log the response text
                    if (text) {
                        return JSON.parse(text); // Parse JSON if text is not empty
                    } else {
                        throw new Error("Empty response");
                    }
                })
                .then(data => {
                    // Process your data
                })
                .catch(error => {
                    console.error('Error:', error);
                })*/
                ;

            //console.log(res.json());
            const result =  await res.json();
            console.log(result);

            if (result) {
                console.log('¡Registro exitoso!');
                alert('¡Registro exitoso! El usuario es: ' +result.usuario );
                navigate('/');

            } else {
                console.log(result);
            }
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            console.log('Hubo un error al procesar la solicitud.');
        }

    };

    return (

        <div>

            <div className="container mt-5">
                <section
                    className="py-xl-16 pt-lg-8"
                    style={{
                        backgroundImage: 'url(/test-fondo.jpg)',
                        backgroundRepeat: 'round',
                        backgroundSize: 'cover'
                    }}
                ></section>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h3 className="card-title text-center mb-4">Registro de Usuario</h3>
                                <form onSubmit={realizaSubmit}>
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

                                    {/* Email */}
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Correo Electrónico</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            placeholder="ejemplo@correo.com"
                                            value={formData.email}
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
                                            placeholder="Contraseña segura"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    {/* Botón */}
                                    <div className="d-grid">
                                        <button type="submit" className="btn btn-primary">Registrarse</button>
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

export default RegistroForm;