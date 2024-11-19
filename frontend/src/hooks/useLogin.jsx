import { useState } from "react";
// import UsuarioService from "../api/users";
// import { Navigate } from "react-router-dom";
// o useNavigate

// const navigate = Navigate()

const useLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({ email: "", password: "", general: "" });
    const [loading, setLoading] = useState(false);
    // const { setUser, setIsAuthenticated } = useContext(AuthContext);
    // const navigate = useNavigate();
  
    const submitLogin = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        setError({
          email: "",
          password: "",
          general: "",
        });
        if (!email.trim())
          throw new Error(
            "Es obligatorio rellenar el campo de correo electrónico"
          );
        if (!password.trim())
          throw new Error("Es obligatorio rellenar el campo de contraseña");
  
        // const response = await UsuarioService.login({ email, password });
        // setUser(response.data);
        // // setIsAuthenticated(true);
        // localStorage.setItem("user", JSON.stringify(response.data));
        // navigate("/dashboard");
        
      } catch (err) {
        console.log(err);
        const errorResponse = err.response.data;
        setError((prevErrors) => ({
          ...prevErrors,
          [errorResponse.field]: errorResponse.message,
        }));
      } finally {
        setLoading(false);
      }
    };
    return {
      email,
      setEmail,
      password,
      setPassword,
      submitLogin,
      error,
      loading,
    };
  };
  
  export default useLogin;