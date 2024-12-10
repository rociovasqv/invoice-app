import Sidebar from '../SideBar';
import HeaderBar from '../HeaderBar';
import '../../styles/navlateral.css';
import PropTypes from 'prop-types';

const NavLateral = ({ setUsuarioLogeado, setIsLogin }) => {
    return (
        <div className='navbarSec'>
            <HeaderBar/>
            <Sidebar setUsuarioLogeado={setUsuarioLogeado} setIsLogin={setIsLogin}/>
        </div>
    );
};
NavLateral.propTypes = {
    setUsuarioLogeado: PropTypes.func.isRequired,
    setIsLogin: PropTypes.func.isRequired
};
export default NavLateral;