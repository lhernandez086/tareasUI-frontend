import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';



const MenuSeccion = () => {
  return (
    <section 
      className="py-xl-16 pt-lg-8" 
      style={{
        backgroundImage: 'url(./test-fondo.jpg)', 
        backgroundRepeat: 'round', 
        backgroundSize: 'cover'
      }}
    >
      <div>
        <div className="container px-4 px-lg-0">
          {/* Hero Section */}
          <div className="row align-items-center justify-content-center text-center">
            <div className="col-lg-8 col-md-12 py-6 py-xl-0">
              <div className="mb-4 text-center">
                {/* Caption */}
                <h1 className="display-3 fw-bold mb-3 ls-sm">
                  <span className="text-primary">Tareas UI</span> 
                  <br />
                  Mas orden
                </h1>
                <p className="mb-6 lead">
                  Entra a un mundo mas ordenado con Tareas UI.
                </p>
                {/* List */}
                <div className="mt-5 mb-3 d-flex justify-content-center">
                  <a 
                    href="./registroForm" 
                    className="btn btn-outline-secondary" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <i className="bi bi-star-fill"></i>
                    <img src="/pencil-square.svg" alt="" className="me-2" />
                    Ir a registrarme
                  </a> 
                </div>
                <div className="mt-5">
                  <div>
                    <div className="badge bg-transparent text-dark border border-dark border-opacity-25 me-2">
                      <i className="bi bi-star-fill text-warning me-1"></i>
                      5.0
                    </div>

                    Comienza 
                    <span className="text-dark fw-bold"> sesion </span>
                    de forma segura.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuSeccion;
