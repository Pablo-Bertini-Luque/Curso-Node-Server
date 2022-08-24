import Role from "../models/role.js";
import Usuario from "../models/usuario.js";

const esRoleValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no es un rol permitdo`);
  }
};

const emailValido = async (correo = "") => {
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El correo ${correo} ya está registrado`);
  }
};

const existeUsuarioPorId = async (id) => {
  const existeId = await Usuario.findById(id);
  if (!existeId) {
    throw new Error(`El id ${id} no existe`);
  }
};

export { esRoleValido, emailValido, existeUsuarioPorId };
