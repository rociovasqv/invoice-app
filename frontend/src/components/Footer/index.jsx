import { useState, useEffect } from "react";
import { Container, Row, Col, Image, Stack } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faWhatsapp, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import logo from '../../logos/logoAmpuero.png';

import '../../styles/footer.css'

const Footer = () => {
    const [showTopBtn, setShowTopBtn] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 400) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const goTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <footer className="bg-dark text-white text-center py-3">
            <Container fluid>
                <Row>
                    <Col className='logoFooter mx-5'>
                        <Stack direction='horizontal'>
                            <Image src={logo} width={100} roundedCircle alt="Logo Estudio Contable Ampuero" />
                            <h2>Estudio Contable Ampuero & Asoc.</h2>
                        </Stack>
                    </Col>
                    <Col className='flex-column fs-5'>
                        <div className='linksFooter'>
                            <li>
                            <h5>Nuestros enlaces</h5>
                                <ul> <a href="#quienes-somos">¿Quiénes somos?</a></ul>
                                <ul><a href="#servicios">Servicios</a></ul>
                            </li>
                            <li>
                            <h5>Enlaces Externos</h5>
                                <ul><a href="https://www.afip.gob.ar" target="_blank" rel="noopener noreferrer">ARCA</a></ul>
                            </li>
                        </div>
                    </Col>
                    <Col id="tituloredes" className='m-4'>
                    <ul>
                    <h5 className="d-lg pb-3">Síguenos en:</h5>
                    <li> 
                        <a href='https://www.instagram.com/estudiocontable_ampuero/' target="_blank" rel="noopener noreferrer" className="mx-2">
                            <FontAwesomeIcon icon={faInstagram} size="lg" />
                        </a>
                    </li>
                    <li>
                    <a href='https://api.whatsapp.com/send?phone=%2B543815280077&context=ARCWGN6FECvwAALwH_e1iGsv_H-U03wDq7RZdcTeu7Df_LewZthZiitf9fi_G4yCYO0YIs8FIWaLB9tNewsMSMOGincsL_vpxeILdMhtES6rbGBaVVCjhRZeVJwr1Y8pvCrrNCCjxpRKu6iDo9wCuSmYJA&source=FB_Page&app=facebook&entry_point=page_cta&fbclid=IwZXh0bgNhZW0CMTAAAR2HH1ytHTTpmfYM6TaACkfgZKl0PH0bpGM2o3SyMNAs0psiJMMw1xHncJE_aem_njRRJtdx6dveaIaIZrGYtw' target="_blank" rel="noopener noreferrer" className="mx-2">
                            <FontAwesomeIcon icon={faWhatsapp} size="lg" />
                        </a>
                    </li>
                    <li>
                    <a href='https://www.facebook.com/profile.php?id=100092485160037' target="_blank" rel="noopener noreferrer" className="mx-2">
                            <FontAwesomeIcon icon={faFacebookF} size="lg" />
                        </a>
                    </li>
                    </ul>
                    </Col>
                </Row>
                <hr/>
                <div id='textFooter' className="fs-6">
                    <p className="mb-0">Copyright 2024 © <span style={{ fontWeight: 'bolder' }}>Estudio Contable Ampuero</span> - Todos los derechos reservados.</p>
                    <p>Diseñado por grupo 3 - Comisión 4</p>
                </div>
            </Container>
            {showTopBtn && (<div className="go-top" onClick={goTop}>
                    ↑
                </div>
            )}
        </footer>
    );
};

export default Footer;