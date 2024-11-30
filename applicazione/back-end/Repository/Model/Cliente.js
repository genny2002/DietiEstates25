import { DataTypes } from "sequelize";

export function createModelCliente(database) {
  database.define('Cliente', {
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