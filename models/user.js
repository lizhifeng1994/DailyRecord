/**
 * Created by lzf on 2016/11/30.
 */
"use strict";
module.exports = function(sequelize,DataTypes){
    var user = sequelize.define("user",{
        USER_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        USER_NAME: DataTypes.INTEGER,
        USER_EMAIL: DataTypes.STRING,
        USER_PWD: DataTypes.STRING,
        USER_JOIN_TIME: DataTypes.STRING,
        USER_FLAG: DataTypes.STRING
    },{
        timestamps: false,
        tableName: 'table_user',
        underscored: false
    },{
        classMethods: {
            associate: function(models) {
                user.hasMany(models.zhichu);
                user.hasMany(models.shouru);
            },
        }
    });
    return user;
};
