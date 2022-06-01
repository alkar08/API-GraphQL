// const { sequelize, Sequelize } = require(".");

module.exports = function(sequelize, DataTypes) {
  return sequelize.define( "aplicacion",
    {
      plc_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      plc_nombre: {
        type: DataTypes.STRING(100),
      },
      plc_prefijo: {
        type: DataTypes.STRING(10),
      },
      plc_palabraSecreta: {
        type: DataTypes.STRING(50),
      },
      plc_ruta: {
        type: DataTypes.STRING(50),
      }, 
      plc_conexionDB: {
        type: DataTypes.STRING(250),
      },  
      plc_estado: {
        type: DataTypes.STRING(50),
      },   
      plc_usuarioCreacion: {
        type: DataTypes.STRING(50),
      },     
      plc_usuarioModificacion: {
        type: DataTypes.STRING(50),
      },   
      pcl_formatoCarpetaLote: {
        type: DataTypes.STRING(50),
        
      },          
    },
    {
      // tableName: "aplicacion",
      freezeTableName: true,
      // underscored: true,
      updatedAt: "plc_updated",
      createdAt: "plc_created",
    }
  );
};

