import { MovieModel } from "../models/movie.model.js";

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

    const durationEntero = Math.floor(duration);
    if (duration !== durationEntero) {
      return res.status(400).json({
        Message: "La duracion debe estar en minutos y debe ser entero.",
      });
    }

    const nombreUnico = await MovieModel.findOne({ where: { title } });
    if (nombreUnico !== null) {
      res.status(400).json({ Mesagge: "Título ya existente." });
    }

    const movie = await MovieModel.create({
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

export const updateMovie = async (req, res) => {
  const { title, director, duration, genre, description } = req.body;
  if (req.body) {
    for (let valor in req.body) {
      if (typeof req.body[valor] === "string") {
        req.body[valor] = req.body[valor].trim();
      }
    }
  }
  try {
    if (title) {
      if (title === undefined || title === "") {
        return res
          .status(400)
          .json({ Message: "El título no puede estar vacío" });
      }
    }
    if (director) {
      if (director === undefined || director === "") {
        return res
          .status(400)
          .json({ Message: "El título no puede estar vacío" });
      }
    }
    if (duration === undefined || duration === "") {
      return res
        .status(400)
        .json({ Message: "El título no puede estar vacío" });
    }
    if (genre) {
      if (genre === undefined || genre === "") {
        return res
          .status(400)
          .json({ Message: "El título no puede estar vacío" });
      }
    }

    if (duration) {
      const durationEntero = Math.floor(duration);
      if (duration !== durationEntero) {
        return res.status(400).json({
          Message: "La duracion debe estar en minutos y debe ser entero.",
        });
      }
    }

    if (title) {
      const nombreUnico = await MovieModel.findOne({ where: { title } });
      if (nombreUnico !== null) {
        res.status(400).json({ Mesagge: "Título ya existente." });
      }
    }

    const [updated] = await MovieModel.update(
      { title, director, duration, genre, description },
      { where: { id: req.params.id } }
    );
    if (updated === 0) {
      return res.status(404).json({ Message: "La pelicula no existe." });
    }
    res.status(200).json({ Message: "Se actualizo una pelicula" });
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};

export const buscarPelis = async (req, res) => {
  try {
    const pelis = await MovieModel.findAll();
    if (pelis.length === 0) {
      return res
        .status(404)
        .json({ Message: "No hay nada en la base de datos de peliculas" });
    }
    return res.status(200).json(pelis);
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};
export const buscarPelisID = async (req, res) => {
  try {
    const peli = await MovieModel.findByPk(req.params.id);
    if (peli) {
      return res.status(200).json(peli);
    }
    return res.status(404).json({ Message: "La pelicula no fue encontrada." });
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const deleted = await MovieModel.destroy({ where: { id: req.params.id } });
    if (deleted === 0)
      return res.status(404).json({ Message: "Pelicula no encontrada" });
    res.status(200).json({ Message: "Pelicula eliminada." });
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};
