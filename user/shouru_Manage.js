/**
 * Created by lzf on 2016/10/3.
 * 收入的一些基本操作
 */

'use strict'

var  connection = require('../user/conn.js').localConnect();
var tools = require('../user/tools.js');
var sql = require('../user/sql.js');

module.exports.show = function(req,res){
    var monthDate = req.body.monthDate+"%";
    var pageNow = req.body.pageNow;
    var page = (pageNow-1)*5;
    var sql1 = "select * from table_sr where SR_FLAG='0' and SR_DATE like \'"+monthDate+"\' order by SR_ID DESC limit "+page+",5;"
                +"select SR_MONEY,SR_COUNT from sr_month_view where SR_MONTH="+"'"+req.body.monthDate+"'";
    //console.log(sql1)
    sql.query(sql1,function(error,result){
        if(error){
            console.log("有错误");
        }
        var total_money = 0;
        var count = 0;
        if(result[1][0]==undefined){
            total_money = parseFloat(0).toFixed(2);
            count = 0;
        }else{
            total_money = result[1][0].SR_MONEY
            count = result[1][0].SR_COUNT;
        }
        //if(result[1][0].SR_MONEY==undefined){
        //    total_money = parseFloat(0).toFixed(2);
        //}else{
        //    //total_money = result[1][0].SR_MONEY
        //}
        res.send({list:result[0],total_money:total_money,monthList:count});
    });
};

module.exports.add = function(req,res){
    var sql1 = "INSERT INTO table_sr set ? ";
    sql.add(sql1,req.body.shouru,function(error,result){
        if(error){
            console.log("有错误");
        }
        console.log(result);
        //传递数据到Ajax
        res.send(result);
    });
};

module.exports.del = function(req,res){
    var sql1 = "update table_sr set SR_FLAG='1' where SR_ID="+req.body.SR_ID;
    sql.query(sql1,function(error,result){
        if(error){
            console.log("有错误");
        }
        res.send(result);
    });
};

module.exports.update = function(req,res){
    var SR_ID = req.body.shouru.SR_ID
    var sql1 = "UPDATE table_sr set ?  where SR_ID=?";
    sql.update(sql1,req.body.shouru,SR_ID,function(error,result){
        if(error){
            console.log("有错误");
        }
        res.send(result);
    });
};