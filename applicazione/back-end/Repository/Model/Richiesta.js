import { DataTypes } from "sequelize";

export function createModelRichiesta(database) {
  database.define('Richiesta', {
    IDRichiesta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    stato: { 
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "InAttesa"
    },
    offerta: {
      type: DataTypes.FLOAT,
    },
    data: {
      type: DataTypes.DATE,
    }
  }, {

  });
}