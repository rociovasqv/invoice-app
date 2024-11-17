
import { Container} from "react-bootstrap";
import ServiceSection from "../components/ServiceSection";
import "../styles/servicePage.css";
import fondoLateral from "../imgs/fondoAmp.jpg"

const ServicePage = () => {
    return (
        <main className="pad service-page">
            <img src={fondoLateral} 
            className="service-bg"
            style={ {width: 'auto', height: '100%'} }/>
            <Container>
                <ServiceSection />
            </Container>
        </main>
    );
};

export default ServicePage;