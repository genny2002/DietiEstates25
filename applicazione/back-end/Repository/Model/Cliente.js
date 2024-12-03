import { DataTypes } from "sequelize";

export function createModelCliente(database) {
  database.define('Cliente', {
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
  });
}