import { Container, Row, Col, Image, Stack} from 'react-bootstrap';
import instagramLogo from '../../logos/instagram.png';
import whatsappLogo from '../../logos/whatsapp.png';
import facebookLogo from '../../logos/facebook.png';
import logo from '../../logos/logoAmpuero.png'

const Footer = () => {
    return (
        <footer className="bg-dark text-white text-center py-3">
            <Container fluid>
                <Row>
                    <Col className='mx-5'>
                    <Stack direction='horizontal'>
                    <Image src={logo} width={100} roundedCircle></Image>
                    

                    </Stack>
                    
                    </Col>
                    <Col className='mx-5'>
                    
                    </Col>
                    <Col md-5 m-4>
                    <h3 id="tituloredes" className="d-lg-inline">Síguenos en:</h3>
                        <img src={instagramLogo} alt="Instagram" className="mx-2" style={{ width: '30px' }} />
                        <img src={whatsappLogo} alt="WhatsApp" className="mx-2" style={{ width: '30px' }} />
                        <img src={facebookLogo} alt="WhatsApp" className="mx-2" style={{ width: '30px' }} />
                    </Col>


                </Row>
            <div className="row justify-content-center">
                    <div className="col-12 col-md-5 m-4">
                      
                    </div>
                </div>
                <div id='textFooter'>
                    <small>
                        <p className="mb-0">Copyright 2024 © <strong>Estudio Contable Ampuero</strong> - Todos los derechos reservados.</p>
                        <p>Diseñado por grupo 3 - Comisión 4</p>
                        </small>
                    
                </div>
            </Container>
        </footer>
    );
};

export default Footer;