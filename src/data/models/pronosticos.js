module.exports = function(sequelize, DataTypes) {
    const Pronosticos = sequelize.define("Pronosticos", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            game_id:{
                type: DataTypes.BIGINT(10),
            },
            user_id:{
                type: DataTypes.BIGINT(10),
            },
            equipo1:{
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            equipo2:{
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            puntos:{
                type: DataTypes.INTEGER,
                allowNull: true,
            },
    },{
        tableName: "pronostico",
        tiemstamps: false
    });
    Pronosticos.associate = function(models){
        Pronosticos.belongsTo(models.Partidos, {
            as: "partido",
            foreignKey: "game_id",
        })
        Pronosticos.belongsTo(models.User, {
            as: "usuario",
            foreignKey: "user_id",
        })
    }

    return Pronosticos
}