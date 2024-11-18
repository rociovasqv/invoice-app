
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const api = 0 //Es para evitar errores y pueda visualizar el frontend, pero en ese caso de la api tiene que vincular con el backend con una api real

const useUsuario = ({isEdit = true}) =>
{
    const [usuario, setUsuario] = useState({
        nombre: "",
        apellido: "",
        email: "",
        dni: "",
        rol: "",
    });

const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const navigate = useNavigate();
const { id } = useParams();

useEffect( () => {
    if (isEdit && id) {
        const getOneUser = async () =>
        {
            setLoading(true);
            try{
                const res = api.getUserById(id);
                setUsuario(res.data);
                setLoading(false);
            }
            catch(err){
                setError(err.response?.data.message || "Error al cargar el usuario");
                setLoading(false);
            }
        };
        getOneUser();
    };
}, [isEdit, id])

const actualizarUsuario = (campo, valor) => {
    setUsuario((prev) => ({ ...prev, [campo]: valor }));
};

const handleSubmitUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try{
        if (isEdit){
            const {...restUsuario} = usuario;
            await api.updateUser(id, restUsuario);
        }else{
            const formData = new formData();
            const data = {
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                email: usuario.email,
                dni: usuario.dni,
                rol: usuario.rol,
            };
            formData.append("data", JSON.stringify(data))
            await api.createUser(formData);
        }
        navigate("/usuarios");
    }
    catch(err){
        setError(
            err.response?.data?.message ||
              `Error al ${isEdit ? "actualizar" : "crear"} usuario`
          );
          setLoading(false);
    }
};
return{ usuario, setUsuario, loading, setLoading, error, setError, isEdit, handleSubmitUser, actualizarUsuario}
}

export default useUsuario;