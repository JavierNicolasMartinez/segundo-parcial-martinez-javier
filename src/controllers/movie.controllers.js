import { sequelize } from "../config/database.js";
import movie from "../models/movie.model.js";

export const createMovie = async (req, res) => {
  const { title, director, duration, genre, description } = req.body;
  if (req.body) {
    for (let valor in req.body) {
      if (typeof req.body[valor] === "string") {
        req.body[valor] = req.body[valor].trim();
      }
    }
  }
  try {
    if (title === undefined || title === "") {
      return res
        .status(400)
        .json({ Message: "El título no puede estar vacío" });
    }
    if (director === undefined || director === "") {
      return res
        .status(400)
        .json({ Message: "El título no puede estar vacío" });
    }
    if (duration === undefined || duration === "") {
      return res
        .status(400)
        .json({ Message: "El título no puede estar vacío" });
    }
    if (genre === undefined || genre === "") {
      return res
        .status(400)
        .json({ Message: "El título no puede estar vacío" });
    }

    const verEntero = duration.IsInterger();
    if (verEntero !== true && verEntero < 0) {
      return res.status(400).json({
        Message: "La duración debe estar en minutos y debe ser positiva.",
      });
    }

    const nombreUnico = await movie.findOne({ where: { title } });
    if (nombreUnico !== null) {
      res.status(400).json({ Mesagge: "Título ya existente." });
    }

    const movie = await movie.create({
      title,
      director,
      duration,
      genre,
      description,
    });
    res.status(201).json({ Message: "El personaje fue creado con exito" });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};
