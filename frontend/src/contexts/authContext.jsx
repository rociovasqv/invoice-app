import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Crea el contexto
const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Estado para el usuario actual
    const [loading, setLoading] = useState(true); // Estado para manejar el loading durante la carga de la autenticación
    const navigate = useNavigate(); // Para redirigir después del login/logout

    // Recupera el usuario del almacenamiento local al cargar la app
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser)); // Si el usuario existe en localStorage, lo usa
        }
        setLoading(false); // Una vez que hemos cargado el usuario, dejamos de cargar
    }, []);

    // Función para iniciar sesión
    const login = (userData, remember = false) => {
        setUser(userData);
        if (remember) {
            localStorage.setItem("user", JSON.stringify(userData)); // Almacena el usuario en localStorage
        }
    };

    // Función para cerrar sesión
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user"); // Elimina el usuario del localStorage
        navigate("/inicio-sesion"); // Redirige a la página de inicio de sesión
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para usar el contexto
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe ser usado dentro de un AuthProvider");
    }
    return context;
};
