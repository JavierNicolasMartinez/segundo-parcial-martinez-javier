import express from "express";
import dotenv from "dotenv";
import { startDB } from "./src/config/database.js";
import router from "./src/routes/movie.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use("/api", router);

app.listen(PORT, async () => {
  await startDB();
  console.log("Servidor corriendo con exito en el puerto: ", PORT);
});
