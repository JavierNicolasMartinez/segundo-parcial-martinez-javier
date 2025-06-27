import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const movie = sequelize.define("movie", {
  title: { //título de la pelicula
    type: DataTypes.STRING,
    allowNull: false,
  },
  director: { //director
    type: DataTypes.STRING,
    allowNull: false,
  },
  duration: { //duración en minutos
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  genre: { //género cinematográfico.
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: { //sipnosis.
    type: DataTypes.STRING,
  },
});

export default movie;

