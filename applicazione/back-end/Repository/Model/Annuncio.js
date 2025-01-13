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
        type: DataTypes.STRING,
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
    dimensioni: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    indirizzo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    numeroStanze: {
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
    altriServizi: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  }, {

  });
}