import { DataTypes } from "sequelize";

export function createModelGestoreAgenzia(database) {
  database.define('GestoreAgenzia', {
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
    },
    nomeAgenzia: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    indirizzoAgenzia: {
        type: DataTypes.STRING,
        allowNull: false,
    }
  }, {

  });
}