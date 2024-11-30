import { DataTypes } from "sequelize";

export function createModelAbnnuncio(database) {
  database.define('Annuncio', {
    IDimmobile: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    Foto: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Descrizione: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Prezzo: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Dimesioni: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Citta: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ViaENumeroCivico: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Comune: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    NumeroDiStanze: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Piano: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Acensore: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    ClasseEnergetica: {
        type: DataTypes.CHAR,
        allowNull: false,
    },
    AltriServizzi: {
        type: DataTypes.STRING,
        allowNull: false,
    },


  });
}