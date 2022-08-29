import Router from "express";
import { check } from "express-validator";
import {
  borrarCategoria,
  crearCategoria,
  actualizarCategoria,
  obtenerCategoria,
} from "../controllers/categorias.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { obtenerCategorias } from "../controllers/categorias.js";
import { existeCategoriaPorId } from "../helpers/db-validators.js";
import { esAdminRole } from "../middlewares/validar-roles.js";

const routerCategorias = Router();

/**
 * {{url}}/api/categorias
 */

//Obtener todas las categorias - publico
routerCategorias.get("/", obtenerCategorias);

//Obtener una categoria por id - publico
routerCategorias.get(
  "/:id",
  [
    check("id", "No es un id de Mongo valido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
  ],
  obtenerCategoria
);

//Crear categoria - privado - cualquier persona con un token valido
routerCategorias.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearCategoria
);

//Actualizar categoria - privado - cualquier persona con un token valido
routerCategorias.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
  ],
  actualizarCategoria
);

//Borrar una categoria - Admin
routerCategorias.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
  ],
  borrarCategoria
);

export { routerCategorias };
