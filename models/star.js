/**
 * Created by lzf on 2016/11/30.
 */
"use strict";
module.exports = function(sequelize,DataTypes){
    var star = sequelize.define("star",{
        STAR_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ID: DataTypes.INTEGER,
        STAR_DATE: DataTypes.STRING,
        STAR_CONTENT: DataTypes.STRING,
        STAR_TYPE: DataTypes.STRING,
        STAR_MONEY: DataTypes.STRING
    },{
        timestamps: false,
        tableName: 'table_star',
        underscored: false
    });
    return star;
};
