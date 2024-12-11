import { DataTypes } from "sequelize";

export function createModelCollaboratore(database) {
  database.define('Collaboratore', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    password: {
          type: DataTypes.STRING,
          allowNull: false,
      }
  }, {

  });
}