import Router from "express";
import { check } from "express-validator";
import {
  usuariosDelete,
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
} from "../controllers/usuarios.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import {
  esRoleValido,
  emailValido,
  existeUsuarioPorId,
} from "../helpers/db-validators.js";
import { esAdminRole, tieneRole } from "../middlewares/validar-roles.js";

const router = Router();

router.get("/", usuariosGet);

router.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  usuariosPut
);

router.post(
  "/",
  [
    check("correo").custom(emailValido),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password es obligatorio").isLength({ min: 6 }),
    // check("rol", "No es un rol permitido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("rol").custom(esRoleValido),

    validarCampos,
  ],
  usuariosPost
);

router.delete(
  "/:id",
  validarJWT,
  // esAdminRole,
  tieneRole("ADMIN_ROLE", "USER_ROLE"),
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  usuariosDelete
);

router.patch("/", usuariosPatch);

export { router };
