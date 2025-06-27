import express from "express";
import { createMovie, updateMovie, buscarPelis, buscarPelisID, deleteMovie } from "../controllers/movie.controllers.js";

const router = express.Router()
router.post("/movies", createMovie);
router.delete("/movies:id", deleteMovie);
router.get("/movies:id", buscarPelisID);
router.get("/movies", buscarPelis);
router.put("/movies/:id", updateMovie);


export default router;