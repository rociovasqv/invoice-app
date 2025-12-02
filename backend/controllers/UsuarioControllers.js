const {conection} = require("../config/DB")
const bcrypt = require ('bcrypt')

const AllUsers = async (req,res) => {
    const query = `
     Select u.id,u.nombre,r.nombre_rol
     from usuarios u 
     join roles r on u.rol_id = r.id_rol
     where disponibleU = 1`
    conection.query(query,(err,results)=> {
        if (err) throw err;
        res.json(results)
    })
}
const register = async (req,res)=>{
    const {nombre,password,rol} = req.body;
    const rolId = parseInt(rol, 10);

    if (!nombre || !password || isNaN(rolId)) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios y el rol debe ser un número válido' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = `insert into usuarios(nombre,password,rol_id) values ('${nombre}','${hashedPassword}','${rol}')`;
        conection.query(query, (err,result)=> {
            if (err) {
                console.error('❌ Error al registrar usuario:', err);
                return res.status(500).json({ error: 'Error al registrar usuario' });
            }
            res.status(201).json({message: 'Usuario registrado'})
        })
    } catch (err) {
        console.error('💥 Error en hashing o registro:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const login = async (req,res) => {
    const nombre = req.body.nombre;
    const password = req.body.password;

    const query = `SELECT * FROM usuarios WHERE nombre = '${nombre}'`
    conection.query (query , async (err, results)=>{
        if (err) {
            return res.status(500).json({ error: err });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Usuario o contraseña erroneo' });
        }

        const usuario = results[0];
        try{

            const isMatch = await bcrypt.compare(password, usuario.password)

            if (isMatch) {
                res.status(200).json({ message: 'Inicio de sesión exitoso' });
            } else {
                res.status(401).json({ message: 'Usuario o contraseña erroneo' });
            }
        }catch(err){
            res.status(500).json({error:'Error al Verificar la contraseña'})
        }

    })
}

module.exports = {AllUsers,register,login}