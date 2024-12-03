import { DataTypes } from "sequelize";

export function createModelAgenteImmobiliare(database) {
  database.define('AgenteImmobiliare', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    password: {
          type: DataTypes.STRING,
          allowNull: false,
      },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    }
  }, {

  });
}