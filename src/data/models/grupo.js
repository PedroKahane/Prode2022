module.exports = function(sequelize, DataTypes) {
    const Grupos = sequelize.define("Grupos", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nombre:{
                type: DataTypes.STRING,
                allowNull: true,
                unique: true
            },
            activo:{
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            KnockStage:{
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
    },{
        tableName: "grupos",
        tiemstamps: false
    })
    Grupos.associate = function(models){
        Grupos.hasMany(models.Partidos, {
            as: "grupos",
            foreignKey: "grupo",
        })
    }
    return Grupos
}