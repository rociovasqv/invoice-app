// src/pages/Inicio.jsx
import portadaAmp from "../assets/portadaAmp.png";

// import './inicio.css';

const Inicio = () => {
    return (
        <div>
            <img className="imagenAmp" src={portadaAmp} alt="Portada del estudio Ampuero" style={{ width: '100%', height: 'auto' }} /> {/* Ajusta el estilo según sea necesario */}
            <h1>Bienvenido a la página de inicio</h1>
            <p>Este es el contenido centrado dentro de un contenedor.</p>
        </div>
    );
};

export default Inicio;