import Router from "express";
import { check } from "express-validator";
import {
  obtenerProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  borrarProducto,
} from "../controllers/productos.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import {
  existeProductoPorId,
  existeCategoriaPorId,
} from "../helpers/db-validators.js";
import { esAdminRole } from "../middlewares/validar-roles.js";

const routerProductos = Router();

/**
 * {{url}}/api/producto
 */

//Obtener todos los productos - publico
routerProductos.get("/", obtenerProductos);

//Obtener un producto por id - publico
routerProductos.get(
  "/:id",
  [
    check("id", "No es un id de Mongo valido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  obtenerProducto
);

//Crear producto - privado - cualquier persona con un token valido
routerProductos.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("categoria", "No es un id de Mongo").isMongoId(),
    check("categoria").custom(existeCategoriaPorId),
    validarCampos,
  ],
  crearProducto
);

//Actualizar producto - privado - cualquier persona con un token valido
routerProductos.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    //check("categoria", "No es un id de Mongo").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  actualizarProducto
);

//Borrar un producto - Admin
routerProductos.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  borrarProducto
);

export { routerProductos };
