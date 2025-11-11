import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import { Nav} from 'react-bootstrap';

const CerrarSesion = ({setUsuarioLogeado,setIsLogin}) => {
    const navigate = useNavigate();
    const handleCerrarSesion = () => {
        Swal.fire({
            title: '¿Estás seguro que deseas cerrar sesión?',
            text: "Se cerrará tu sesión",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, cerrar sesión',
            cancelButtonText: 'No, cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                setUsuarioLogeado({});
                sessionStorage.removeItem("usuario");
                setIsLogin(false);
                Swal.fire({
                    title: '¡Sesión cerrada!',
                    text: 'Has cerrado sesión exitosamente.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    navigate("/inicio-sesion");
                });
            }
        });
    };
    return (<Nav.Link onClick={handleCerrarSesion}>Cerrar Sesión</Nav.Link>)
};

CerrarSesion.propTypes = {
    setUsuarioLogeado: PropTypes.func.isRequired,
    setIsLogin: PropTypes.func.isRequired
  };

  export default CerrarSesion;