import { response, request } from "express";
import Usuario from "../models/usuario.js";
import bycrptjs from "bcryptjs";

const usuariosGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(desde).limit(limite),
  ]);
  res.json({ total, usuarios });
};

const usuariosPost = async (req, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  //Encriptar la contraseña
  const salt = bycrptjs.genSaltSync();
  usuario.password = bycrptjs.hashSync(password, salt);

  await usuario.save();

  res.json(usuario);
};

const usuariosPut = async (req, res = response) => {
  const { id } = req.params;
  const { password, google, _id, ...resto } = req.body;
  //TODO VALIDAR CONTRA BASE DE DATOS
  if (password) {
    const salt = bycrptjs.genSaltSync();
    resto.password = bycrptjs.hashSync(password, salt);
  }
  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json(usuario);
};

const usuariosDelete = async (req, res = response) => {
  const { id } = req.params;
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
  res.json({ usuario });
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "PATCH API - controlador",
  });
};

export {
  usuariosGet,
  usuariosDelete,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
};
