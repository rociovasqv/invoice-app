import { useState } from "react";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import { URL_REGISTER } from "../constants/constantes";

const useUsuario = ( ) =>
{
    const [usuario, setUsuario] = useState({
        nombre: "",
        password: "",
        rol_id: "",
    });

const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const navigate = useNavigate();

const actualizarUsuario = (e) => {
    const { name, value } = e.target;
    setUsuario((prev) => ({ ...prev, [name]: value }));
};

const handleSubmitUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try{
        let response = await axios.post(URL_REGISTER,{
            nombre: usuario.nombre,
            password: usuario.password,
            rol_id: usuario.rol_id,
        })
        console.log(response.data)
        navigate("/usuarios");
    }
    catch(err){
        setError(
            err.response?.data?.message ||
              `Error al Registrar usuario`
          );
          setLoading(false);
    }
};
return{ usuario, setUsuario, loading, setLoading, error, setError, handleSubmitUser, actualizarUsuario}
}

export default useUsuario;