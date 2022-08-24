import jwt from "jsonwebtoken";
import dotenv from "dotenv/config";

const generarJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.SECRETORPUBLICKEY,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se puedo generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

export { generarJWT };
