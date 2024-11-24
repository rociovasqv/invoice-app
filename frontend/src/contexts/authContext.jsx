import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const navigate = useNavigate(); 

    // Recupera el usuario del almacenamiento local al cargar la app
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser)); 
        }
        setLoading(false); 
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
        localStorage.removeItem("user"); 
        navigate("/inicio-sesion"); 
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
