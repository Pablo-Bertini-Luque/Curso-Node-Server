import mongoose from "mongoose";
import Usuario from "./usuario.js";
import categoria from "./categoria.js";
const { Schema, model } = mongoose;

const ProductoSchema = Schema({
  nombre: {
    type: String,
    require: [true, "El nombre es obligatorio"],
  },
  estado: {
    type: Boolean,
    default: true,
    require: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: Usuario,
    require: true,
  },
  precio: {
    type: Number,
    default: 0,
  },
  categoria: {
    type: Schema.Types.ObjectId,
    ref: categoria,
    require: true,
  },
  descripcion: { type: String },
  disponible: { type: Boolean, default: true },
});

ProductoSchema.methods.toJSON = function () {
  const { __v, estado, disponible, ...data } = this.toObject();
  return data;
};

export default model("Producto", ProductoSchema);
