/**
 * Created by lzf on 2016/11/26.
 */
module.exports = function(sequelize,DataTypes){
    var user = sequelize.define("users",{
        USER_ID:DataTypes.STRING,
        USER_NAME:DataTypes.STRING,
        USER_PWD:DataTypes.STRING,
    },{
        timestamps: false,
        //freezeTableName: true,
    });
    return user;
};
