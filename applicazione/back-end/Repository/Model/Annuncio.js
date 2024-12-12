import { DataTypes } from "sequelize";

export function createModelAnnuncio(database) {
  database.define('Annuncio', {
    IDimmobile: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    foto: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
    },
    descrizione: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    prezzo: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    dimesioni: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    citta: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    viaENumeroCivico: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    comune: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    numeroDiStanze: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    piano: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ascensore: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    classeEnergetica: {
        type: DataTypes.CHAR,
        allowNull: false,
    },
    altriServizzi: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  }, {

  });
}