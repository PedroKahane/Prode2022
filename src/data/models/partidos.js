module.exports = function(sequelize, DataTypes) {
    const Partidos = sequelize.define("Partidos", {
            game_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            fecha:{
                type: DataTypes.DATEONLY,
                allowNull: false,
                unique: true
            },
            goles1:{
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            goles2:{
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            equipo1:{
                type: DataTypes.BIGINT(10),
            },
            equipo2:{
                type: DataTypes.BIGINT(10),
            },
            grupo:{
                type: DataTypes.BIGINT(10),
            },
    },{
        tableName: "partidos",
        tiemstamps: false
    });
    Partidos.associate = function(models){
        Partidos.belongsTo(models.Equipos, {
            as: "equipos1",
            foreignKey: "equipo1",
        })
        Partidos.belongsTo(models.Equipos, {
            as: "equipos2",
            foreignKey: "equipo2",
        })
        Partidos.belongsTo(models.Grupos, {
            as: "grupos",
            foreignKey: "grupo",
        })
        Partidos.hasMany(models.Pronosticos, {
            as: "partido",
            foreignKey: "game_id",
        })
    }

    return Partidos
}