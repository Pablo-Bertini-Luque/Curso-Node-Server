import Producto from "../models/producto.js";
import { response, request } from "express";

//obtenerProductos - pagina - total - populate

const obtenerProductos = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };
  const [total, productos] = await Promise.all([
    Producto.countDocuments(query),
    Producto.find(query)
      .populate("usuario", "nombre")
      .populate("categoria", "nombre")
      .skip(Number(desde))
      .limit(Number(limite)),
  ]);
  res.json({ total, productos });
};

//obtenerCategoria - populate
const obtenerProducto = async (req, res) => {
  const { id } = req.params;
  const producto = await Producto.findById(id)
    .populate("usuario", "nombre")
    .populate("categoria", "nombre");
  return res.json(producto);
};

const crearProducto = async (req, res) => {
  const { estado, usuario, disponible, ...body } = req.body;
  const productoDB = await Producto.findOne({ nombre: body.nombre });
  if (productoDB) {
    return res.status(400).json({
      msg: `El producto ${productoDB.nombre} ya existe`,
    });
  }
  //Generar la data a guardar
  const data = {
    nombre: body.nombre.toUpperCase(),
    usuario: req.usuario._id,
    ...body,
  };

  const producto = new Producto(data);

  //Guardar DB
  await producto.save();

  res.status(201).json(producto);
};

//actualizarProducto
const actualizarProducto = async (req, res = response) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;
  if (data.nombre) {
    data.nombre = data.nombre.toUpperCase();
  }
  data.usuario = req.usuario._id;
  const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

  res.json(producto);
};

//borrar categoria - estado:false
const borrarProducto = async (req, res = response) => {
  const { id } = req.params;
  const producto = await Producto.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );
  res.json(producto);
};

export {
  obtenerProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  borrarProducto,
};
