import { Link } from "react-router-dom";
// Agregar en NotFound(isErrorRole = false)

export default function NotFound() {
  return (
    <>
      <main>
        <p>Error 404</p>
        <h1>
        Oh! Creo que te perdiste...
          {/*{isErrorRole ? "Acceso denegado" : "Oh! Creo que te perdiste..."} */}
        </h1>
        <p>
        Al parecer la página a la cual intentaste acceder no existe.
        {/* {
            isErrorRole
            ? "Tu usuario no tiene los permisos para acceder a esta ruta."
            : "Al parecer la página a la cual intentaste acceder no existe."
        } */}
        </p>
        <div>
          <Link to="/">Volver al inicio</Link>
        </div>
      </main>
    </>
  );
}