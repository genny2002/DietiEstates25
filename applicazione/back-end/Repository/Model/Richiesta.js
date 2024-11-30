import { DataTypes } from "sequelize";

export function createModelRichiesta(database) {
  database.define('Richiesta', {
    IdRichiesta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    stato: {
        type: DataTypes.STRING,
        allowNull: false,
    }
  });
}