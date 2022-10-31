module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define("User", {
            user_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            email:{
                type: DataTypes.STRING,
                allowNull: true,
                unique: true
            },
            user_name:{
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password:{
                type: DataTypes.STRING,
                allowNull: false,
            },
            image:{
                type: DataTypes.STRING
            },
            image_id:{
                type: DataTypes.STRING,
                allowNull:true,
            },
            admin:{
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },  
            confirm:{
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            token:{
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: null
            },
            puntos:{
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },  
            plenos:{
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            }
    },{
        tableName: "usuarios",
        tiemstamps: false
    });
    User.associate = function(models){
        User.hasMany(models.Pronosticos, {
            as: "usuario",
            foreignKey: "user_id",
        })
    }

    return User
}