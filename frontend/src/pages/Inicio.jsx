import portadaAmp from "../assets/portadaAmp.png";
import { Container } from 'react-bootstrap';
import '../styles/inicio.css'

const Inicio = () => {
    return (
       <main>
       <Container fluid>
    <img
        className="imagenAmp"
        src={portadaAmp}
        alt="Portada del estudio Ampuero"
        style={{ width: '100%', height: 'auto' }}
    />
    <h1>Bienvenido a la página de inicio</h1>
    <p>Este es el contenido centrado dentro de un contenedor.</p>
</Container>
       </main>  
    );
};

export default Inicio;