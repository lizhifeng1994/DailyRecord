/**
 * Created by lzf on 2016/9/5.
 * 首页的一些操作
 */
'use strict'
var  connection = require('../user/conn.js').localConnect();
var tools = require('../user/tools.js');
var sql = require('../user/sql.js');
module.exports.show= function(req,res){
    console.log("123");
    var date = new Date();
    date = tools.format(date);
    console.log(date);
    var sql1 = "select COUNT(HF_ID) as zm_number,SUM(HF_MONEY) as total_zc from table_zc where HF_FLAG='0';"
        + "select HF_DATE,HF_CONTENT,HF_MONEY,HF_ID from table_zc where HF_FLAG='0' and HF_STAR='1';"
        + "select COUNT(SR_ID) as zm_number,SUM(SR_MONEY) as total_sr from table_sr where SR_FLAG='0';"
        + "select * from table_sr where SR_FLAG='0' and SR_STAR='1';";
    sql.query(sql1,function(error,result){
        //返回到anjularJS的数据
        //var total_zc = (result[0][0].total_zc+0).toFixed(2);
        //var total_sr = (result[2][0].total_sr+0).toFixed(2);
        //var total_zm_number = result[0][0].zm_number+result[2][0].zm_number;
        //var hf_star_list = result[1];
        //var sr_star_list = result[3];


        //console.log(result[1][0]);
        console.log(result)
        var data = {
            total_zc:(result[0][0].total_zc+0).toFixed(2),
            total_sr:(result[2][0].total_sr+0).toFixed(2),
            total_zm_number:result[0][0].zm_number+result[2][0].zm_number,
            hf_star_list:result[1],
            sr_star_list:result[3]
        };

        console.log(data.hf_star_list);

        res.render('home',{ data:data,date:date});
    });
    //res.render('home',{title:"我的生活账本"});
};