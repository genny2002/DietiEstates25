import { DataTypes } from "sequelize";

export function createModelAgenteImmobiliare(database) {
  database.define('AgenteImmobiliare', {
    Username: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    Password: {
          type: DataTypes.STRING,
          allowNull: false,
      },
    Email: {
        type: DataTypes.STRING,
        allowNull: false,
    }
  });
}