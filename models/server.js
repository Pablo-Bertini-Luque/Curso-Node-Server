import express from "express";
import cors from "cors";
import { router } from "../routes/usuarios.js";
import { dbConnection } from "../database/config.js";
import { routerAuth } from "../routes/auth.js";
const app = express();

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.middlewares();
    this.routes();
    this.usuariosPath = "/api/usuarios";
    this.conectarDB();
    this.authPath = "/api/auth/";
  }

  //ConectarBase de datos

  async conectarDB() {
    await dbConnection();
  }

  //Middlewares
  middlewares() {
    this.app.use(express.static("public"));
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use("/api/usuarios", router);
    this.app.use("/api/auth", routerAuth);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en puerto, ${this.port}`);
    });
  }
}

export { Server };
