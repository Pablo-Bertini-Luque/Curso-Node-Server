import mongoose from "mongoose";
import Usuario from "./usuario.js";
const { Schema, model } = mongoose;

const CategoriaSchema = Schema({
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
});

CategoriaSchema.methods.toJSON = function () {
  const { __v, estado, ...data } = this.toObject();
  return data;
};

export default model("Categoria", CategoriaSchema);
