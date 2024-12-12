import { Container, Col, Row, Image} from 'react-bootstrap';

import portadaAmp from "../assets/portadaAmp.png";
import estudioAmp from "../imgs/estudioAmp.jpg";
import logoAmp from '../logos/logoAmpNav.png';
import '../styles/inicio.css'

import ValoresSection from '../components/ValoresSection';
import BotonFlotante from '../components/BotonFlotante';

const Inicio = () => {
    return (
    <main>
        <Container fluid>
            <div>
                <img
                className="imagenAmp"
                src={portadaAmp}
                alt="Portada del estudio Ampuero"
                style={{ width: '100%', height: 'auto' }}/>
            </div>
            <div className="titleBox">
                <h1 className="title">Bienvenido al Sistema web del Estudio Contable Ampuero & Asoc.</h1>
                <p className="subtitleInicio">Tu socio estratégico en gestión contable y financiera</p>
            </div>

            <Container className="sobre-nosotros-section p-1" fluid>
                <Row className="sobreNosotros m-4">
                    <Col md={8} className='parrafoInicio'>
                    <img src={logoAmp} className='logoAmpShow'/>
                    <h2 className="text-start text-uppercase">Sobre Nosotros</h2>
                        <p>
                            En <strong>Estudio Contable Ampuero</strong>, nos destacamos por ofrecer un enfoque personalizado para cada cliente. Nuestra misión es brindarte soluciones efectivas que potencien tu crecimiento financiero. 
                        </p>
                        <p>
                            Con años de experiencia en el sector, nuestro equipo está conformado por profesionales altamente capacitados, comprometidos con tus objetivos. Creemos en la importancia de construir relaciones duraderas, basadas en la confianza y la transparencia.
                        </p>
                        <p>
                            Ya sea que necesites asesoramiento contable, gestión de impuestos o análisis financiero, estamos aquí para ayudarte a navegar con éxito en el mundo de las finanzas.
                        </p>
                        <p>Si quieres saber más sobre el equipo del estudio, puede seguir en este link:</p>
                        <a href='#' className='link-equipo'>Nuestro equipo → </a>
                    </Col>
                    <Col md={4} className="estudioImagen">
                        <Image src={estudioAmp} alt="Sobre Nosotros" fluid/>
                    </Col>
                </Row>
            </Container>
            <ValoresSection className="m-2"/>
        </Container>
        <BotonFlotante/> 
    </main>
    );
};

export default Inicio;