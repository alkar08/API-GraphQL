// const { sequelize, Sequelize } = require(".");

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "variablesGlobales",
    {
      vgl_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      vgl_nombre: {
        type: DataTypes.STRING(50),
      },
      vgl_valor:{
        type: DataTypes.STRING(50),
      },
      vgl_usuarioCreacion: {
        type: DataTypes.STRING(50),
      },        
      vgl_usuarioModificacion: {
        type: DataTypes.STRING(50),
      },   
      vgl_idAplicacion: {
        type: DataTypes.INTEGER,
      }         
    },
    {
      // tableName: "variablesGlobales",
      freezeTableName: true,
      // underscored: true,
      updatedAt: "vgl_updated",
      createdAt: "vgl_created",
    }
  );
};
