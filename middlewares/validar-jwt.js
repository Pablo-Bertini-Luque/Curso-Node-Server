import jwt from "jsonwebtoken";
import dotenv from "dotenv/config";
import Usuario from "../models/usuario.js";

const validarJWT = async (req, res, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la peticion",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPUBLICKEY);
    const usuario = await Usuario.findById(uid);
    if (!usuario) {
      return res.status(401).json({
        msg: "Token no valido - usuario no existe en la base de datos",
      });
    }
    //Verificar si el uid tiene estado en true
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Token no valido - usuario con estado en false",
      });
    }
    req.usuario = usuario;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      msg: "Token invalido",
    });
  }
};

export { validarJWT };
