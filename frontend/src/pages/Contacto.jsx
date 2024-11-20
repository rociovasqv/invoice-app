// ContactPage.jsx
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaPhone, FaClock } from "react-icons/fa";
import '../styles/contactoPage.css'

const ContactoPage = () => {
    return (
        <main className="contact-page">
            {/* Portada con Google Maps */}
            <div className="map-container">
                <iframe
                    title="Google Maps Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.34362016962!2d-65.21345142534453!3d-26.82902098971072!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225c139ab68577%3A0xfb39c0733d0ec237!2sPcia%20de%20Salta%2078%2C%20T4000IRN%20San%20Miguel%20de%20Tucum%C3%A1n%2C%20Tucum%C3%A1n!5e0!3m2!1ses-419!2sar!4v1732074335879!5m2!1ses-419!2sar"
                    width="100%"
                    height="400"
                    style={{ border: "0" }}
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
            </div>

            {/* Título de contacto */}
            <Container>
                <h2 className="text-center text-uppercase mt-4">Contacto</h2>

                {/* Contenido */}
                <Row className="mt-4">
                    <Col md={6} className="mb-4">
                        <h5>Información de Contacto</h5>
                        <ul className="list-unstyled">
                            <li>
                                <FaMapMarkerAlt className="me-2" /> Dirección: Salta 78, San Miguel de Tucumán, Argentina
                            </li>
                            <li>
                                <FaPhone className="me-2" /> Teléfono: +54 9 381 346-8940
                            </li>
                            <li>
                                <FaEnvelope className="me-2" /> Correo: estudionjc@gmail.com
                            </li>
                            <li>
                                <FaClock className="me-2" /> Horarios: Lunes a Viernes de 9:00 hs - 18:00 hs
                            </li>
                        </ul>
                    </Col>
                    <Col md={6} className="mb-4">
                        <h5>Síguenos en Redes Sociales</h5>
                        <ul className="list-inline">
                            <li className="list-inline-item me-3">
                                <a
                                    href="https://www.facebook.com/profile.php?id=100092485160037"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-decoration-none"
                                >
                                    <FaFacebook className="me-2" /> Facebook
                                </a>
                            </li>
                            <li className="list-inline-item me-3">
                                <a
                                    href="https://www.instagram.com/estudiocontable_ampuero/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-decoration-none"
                                >
                                    <FaInstagram className="me-2" /> Instagram
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a
                                    href="https://api.whatsapp.com/send?phone=%2B543815280077&context=ARCWGN6FECvwAALwH_e1iGsv_H-U03wDq7RZdcTeu7Df_LewZthZiitf9fi_G4yCYO0YIs8FIWaLB9tNewsMSMOGincsL_vpxeILdMhtES6rbGBaVVCjhRZeVJwr1Y8pvCrrNCCjxpRKu6iDo9wCuSmYJA&source=FB_Page&app=facebook&entry_point=page_cta&fbclid=IwZXh0bgNhZW0CMTAAAR2HH1ytHTTpmfYM6TaACkfgZKl0PH0bpGM2o3SyMNAs0psiJMMw1xHncJE_aem_njRRJtdx6dveaIaIZrGYtw"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-decoration-none"
                                >
                                    <FaWhatsapp className="me-2" /> Whatsapp
                                </a>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </main>
    );
};

export default ContactoPage;
