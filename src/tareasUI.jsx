import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import { useNavigate } from 'react-router-dom';

const TareasUI = () => {
    const API_URL = process.env.REACT_APP_API_URL;

    const [usuarioValido, setUsuarioValido] = useState(false);
    const [tareas, setTareas] = useState([]);
    const [titulo, setTitulo] = useState('');
    const [descripcionc, setDescripcion] = useState('');
    const [fecha_limite, setFechaLimite] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [dirLogin, setdirLogin] = useState('');


    useEffect(() => {
        // Simulación de usuario en localStorage
        const usuario = localStorage.getItem('usuario');
        if (usuario) {
            setUsuarioValido(true);
            obtenerTareas(); // Al cargar, obtenemos las tareas
        } else {
            setUsuarioValido(false);
            setMensaje('⚠️ Debes iniciar sesión primero.');
            setdirLogin(true);


        }
    }, []);

    const obtenerTareas = async () => {
        try {
            const api_lista = API_URL + '/tareas.php?action=obtenerLista';
            const res = await fetch(api_lista);
            const data = await res.json();
            setTareas(data.tareas);
        } catch (error) {
            console.error('Error al obtener tareas:', error);
            setMensaje('❌ Error al obtener tareas.');
        }
    };

    const handleAgregarTarea = async (e) => {
        e.preventDefault();

        if (!usuarioValido) {
            setMensaje('⚠️ No puedes agregar tareas sin iniciar sesión.');
            return;
        }

        if (!titulo.trim() || !descripcionc.trim() || !fecha_limite.trim()) {
            setMensaje('⚠️ Todos los campos son obligatorios.');
            return;
        }

        try {
            const api_guardar = API_URL + '/tareas.php?action=guardarTarea';
            const res = await fetch(api_guardar, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    titulo,
                    descripcionc,
                    fecha_limite,
                }),
            });

            const data = await res.json();

            if (data.valido) {

                setTareas([...tareas, data.tarea]);
                setTitulo('');
                setDescripcion('');
                setFechaLimite('');
                setMensaje('✅ Tarea agregada correctamente.');
                setTimeout(() => setMensaje(''), 3000);
            } else {
                setMensaje('❌ Error al agregar tarea.');
            }
        } catch (error) {
            console.error('Error al agregar tarea:', error);
            setMensaje('❌ Error al agregar tarea.');
        }


        // Borrar mensaje después de 3 seg
        setTimeout(() => setMensaje(''), 3000);
    };

    const handleEliminarTarea = async (id) => {
        if (!window.confirm('¿Estás seguro de eliminar esta tarea?')) {
            return;
        }
        try {
            const api_eliminar = API_URL + '/tareas.php';
            const res = await fetch(api_eliminar, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            const data = await res.json();

            if (data.valido) {
                setTareas(tareas.filter((tarea) => tarea.id !== id));
                setMensaje('✅ Tarea eliminada correctamente.');
                setTimeout(() => setMensaje(''), 3000);
            } else {
                setMensaje(`❌ Error al eliminar tarea: ${data.error}`);
            }
        } catch (error) {
            console.error('Error al eliminar tarea:', error);
            setMensaje('❌ Error al eliminar tarea.');
        }

    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">📋 Lista de Tareas</h2>

            {mensaje && (
                <div className="alert alert-info" role="alert">
                    {mensaje}
                    {dirLogin && (
                        <a className="icon-link icon-link-hover" href="./">
                            Inicia sesion
                            <svg xmlns="http://www.w3.org/2000/svg" className="bi" viewBox="0 0 16 16" aria-hidden="true">
                                <path d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                            </svg>
                        </a>
                    )}
                </div>
            )}

            {!usuarioValido && (
                <div className="alert alert-warning">
                    No puedes usar la aplicación. Por favor, inicia sesión.
                </div>
            )}

            <form onSubmit={handleAgregarTarea} className="mb-4">
                <div className="mb-3">
                    <label className="form-label">Título</label>
                    <input
                        type="text"
                        className="form-control"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        disabled={!usuarioValido}
                        maxLength="100"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Descripción corta</label>
                    <input
                        type="text"
                        className="form-control"
                        value={descripcionc}
                        onChange={(e) => setDescripcion(e.target.value)}
                        disabled={!usuarioValido}
                        maxLength="250"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Fecha límite</label>
                    <input
                        type="date"
                        className="form-control"
                        value={fecha_limite}
                        onChange={(e) => setFechaLimite(e.target.value)}
                        disabled={!usuarioValido}
                    />
                </div>
                <input type='hidden' id='usuario_crea' value={localStorage.getItem('usuario')} />
                <button type="submit" className="btn btn-primary" disabled={!usuarioValido}>
                    Agregar Tarea
                </button>
            </form>

            <h3>Tareas:</h3>
            {tareas.length === 0 ? (
                <p>No hay tareas aún.</p>
            ) : (
                <ul className="list-group">
                    {tareas.map((tarea) => (
                        <li key={tarea.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <strong>{tarea.titulo}</strong> <br />
                                {tarea.descripcionc} <br />
                                Fecha límite: {tarea.fecha_limite}
                            </div>
                            <button className="btn btn-danger btn-sm" onClick={() => handleEliminarTarea(tarea.id)}>
                                Eliminar
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TareasUI;