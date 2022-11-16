module.exports = function(sequelize, DataTypes) {
    const Equipos = sequelize.define("Equipos", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            pais:{
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            color:{
                type: DataTypes.STRING,
                allowNull: true,
            },
            imagen:{
                type: DataTypes.STRING
            },
    },{
        tableName: "equipos",
        tiemstamps: false
    });
    Equipos.associate = function(models){
        Equipos.hasMany(models.Partidos, {
            as: "equipos1",
            foreignKey: "equipo1",
        })
        Equipos.hasMany(models.Partidos, {
            as: "equipos2",
            foreignKey: "equipo2",
        })
        Equipos.hasMany(models.User, {
            as: "equipo",
            foreignKey: "campeon",
        })
    }

    return Equipos
}