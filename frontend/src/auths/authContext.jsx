// import React, { createContext, useState, useEffect } from "react";
// import { URL_LOGIN } from "../constants/constantes";

// const AuthContext = createContext();

// const AuthProvider = ({children}) =>
// {
//     const [isAuth, setIsAuth] = useState(!!localStorage.getItem("usuario"));
//     const [usuario, setUsuario] = useState(JSON.parse(localStorage.getItem("usuario")));

//     useEffect(() => {
//         const fetchUsuario = async () => {
//           try {
//             const response = await URL_LOGIN;
//             setIsAuth(true);
//             setUsuario(response.data);
//             localStorage.setItem("usuario", JSON.stringify(response.data));
//           } catch (error) {
//             setIsAuth(false);
//             setUsuario(null);
//             localStorage.removeItem("usuario");
//           }
//         };
    
//         if (!usuario) {
//           fetchUsuario();
//         }
//       }, [usuario]);
    
//       return (
//         <AuthContext.Provider
//           value={{ isAuth, setIsAuth, usuario, setUsuario }}
//         >
//           {children}
//         </AuthContext.Provider>
//       );
// }

// export { AuthProvider, AuthContext };