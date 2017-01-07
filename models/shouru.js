/**
 * Created by lzf on 2016/11/30.
 */
module.exports = function(sequelize,DataTypes){
    var Shouru = sequelize.define("shouru",{
        SR_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        SR_DATE: DataTypes.STRING,
        SR_ADDRESS: DataTypes.STRING,
        SR_KIND: DataTypes.STRING,
        SR_CONTENT: DataTypes.STRING,
        SR_MONEY: DataTypes.STRING,
        SR_MARK: DataTypes.STRING,
        SR_STAR: DataTypes.STRING,
        SR_FLAG: DataTypes.STRING,
        USER_ID: DataTypes.INTEGER
    },{
        timestamps: false,
        tableName: 'table_sr',
        underscored: false
    },{
        classMethods: {
            associate: function(models) {
                shouru.belongsTo(models.user, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });
    return Shouru;
};
