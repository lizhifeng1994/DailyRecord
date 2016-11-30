/**
 * Created by lzf on 2016/11/26.
 */
module.exports = function(sequelize,DataTypes){
    var ZhiChu = sequelize.define("zhichu",{
        HF_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        HF_DATE: DataTypes.STRING,
        HF_ADDRESS: DataTypes.STRING,
        HF_KIND: DataTypes.STRING,
        HF_CONTENT: DataTypes.STRING,
        HF_MONEY: DataTypes.STRING,
        HF_MARK: DataTypes.STRING,
        HF_STAR: DataTypes.STRING,
        HF_FLAG: DataTypes.STRING
    },{
        timestamps: false,
        tableName: 'table_zc',
        underscored: false
    });
    return ZhiChu;
};
