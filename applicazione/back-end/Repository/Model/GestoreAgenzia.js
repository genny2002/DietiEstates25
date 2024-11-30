import { DataTypes } from "sequelize";

export function createModelGestoreAgenzia(database) {
  database.define('GestoreAgenzia', {
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
    },
    NomeAgenzia: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    IndirizzoAgenzia: {
        type: DataTypes.STRING,
        allowNull: false,
    }
  });
}