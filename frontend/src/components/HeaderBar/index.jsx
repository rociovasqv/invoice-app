import { Navbar, Container} from "react-bootstrap";
import logoAmp from "../../logos/logoAmpNav.png";
import { Link } from "react-router-dom";
import '../../styles/headerbar.css'

const HeaderBar = () => {
    return (
        <Navbar bg="light" fixed="top" expand="lg" className="p-2 headerbar">
            <Container fluid>
                <Navbar.Brand as={Link} to="/dashboard">
                    <img className="logonavsec" src={logoAmp} alt="Logo"/>
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
};
export default HeaderBar;
