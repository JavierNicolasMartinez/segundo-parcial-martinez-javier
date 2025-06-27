import express from "express";
import { createMovie } from "../controllers/movie.controllers.js";

const router = express.Router();

router.post("/movies", createMovie);
// router.get("/");

export default router;