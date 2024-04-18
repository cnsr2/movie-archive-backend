const { DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    const Otp = sequelize.define(
        "otp",
        {
            code:{
                type:DataTypes.INTEGER,
            },
            userId:{
                type:DataTypes.INTEGER,
            }
        }
    )
    return Otp;  
}