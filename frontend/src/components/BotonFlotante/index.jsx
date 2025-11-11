import { FaWhatsapp } from "react-icons/fa";
import '../../styles/botonflotante.css'

const BotonFlotante = () => {
    const handleWhatsappClick = () => {
      const whatsappNumber = '5493813468940'; // Reemplaza con tu número de teléfono
    //   const whatsappMessage = 'Hola, ¿en qué puedo ayudarte?'; Reemplaza con el mensaje que desees
      const url = `https://wa.me/${whatsappNumber}`;
      window.open(url, '_blank');
    };
  
    return (
      <div className="boton-flotante-whatsapp">
        <button className="boton-whatsapp" onClick={handleWhatsappClick}>
          <FaWhatsapp className="iconWp" size={30} color="#fff" />
        </button>
      </div>
    );
  };

  export default BotonFlotante;