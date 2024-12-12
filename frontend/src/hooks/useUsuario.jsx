import { useState } from "react";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import { URL_REGISTER } from "../constants/constantes";

const useUsuario = ( ) =>
{
    const [usuario, setUsuario] = useState({
        nombre: "",
        password: "",
        rol: "",
    });

const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const navigate = useNavigate();

const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prev) => ({ ...prev, [name]: value }));
};

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try{
        let response = await axios.post(URL_REGISTER,{
            nombre: usuario.nombre,
            password: usuario.password,
            rol: usuario.rol,
        })
        alert("Registro Exitoso")
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
return{ usuario, setUsuario, loading, setLoading, error, setError, handleSubmit, handleChange}
}

export default useUsuario;