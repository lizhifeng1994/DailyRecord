/**
 * Created by lzf on 2016/9/5.
 * 首页的一些操作
 */
'use strict'
var  connection = require('../user/conn.js').localConnect();
var tools = require('../user/tools.js');
var sql = require('../user/sql.js');
module.exports.show= function(req,res){
    //console.log(req.body.pageNow);
    var pageSize = (req.body.pageNow-1)*5;
    var STAR_TYPE=req.body.STAR_TYPE;
    console.log(STAR_TYPE);
    var sql_type = "";
    if(STAR_TYPE==0){
        sql_type="select ID,STAR_DATE,STAR_CONTENT,STAR_TYPE,STAR_MONEY from table_star ORDER BY STAR_DATE DESC limit "+pageSize+",5";
    }else{
        sql_type="select ID,STAR_DATE,STAR_CONTENT,STAR_TYPE,STAR_MONEY from table_star WHERE STAR_TYPE="+STAR_TYPE+" ORDER BY STAR_DATE DESC limit "+pageSize+",5";
    }
    console.log(sql_type);
    var sql1 = "CALL getTotal(@total_zc,@total_sr,@total_zm,@total_star);"+sql_type;
    var total = "";
    sql.query(sql1,function(error,result){
        if(error){
            console.log("有错误")
        }
        total = result[0][0];
        res.send({total:total,starList:result[2]});
    });
};

module.exports.getDetail = function(req,res){
    var STAR_TYPE = req.body.STAR_TYPE;
    var ID = req.body.ID;
    var sql1 = "";
    if(parseInt(STAR_TYPE)==1){
        sql1 = "select HF_ID AS ID,HF_ADDRESS AS ADDRESS,HF_CONTENT AS CONTENT,HF_MONEY AS MONEY,HF_MARK AS MARK  from table_zc where HF_ID='"+ID+"'";
    }else{
        sql1 = "select SR_ID AS ID,SR_ADDRESS AS ADDRESS,SR_CONTENT AS CONTENT,SR_MONEY AS MONEY,SR_MARK AS MARK  from table_sr where SR_ID='"+ID+"'";
    }
    sql.query(sql1,function(error,result){
        if(error){
            console.log(error);
        }
        res.send({result:result[0]});
    });
};

module.exports.cancelStar = function(req,res){
    var STAR_TYPE = req.body.STAR_TYPE;
    var ID = req.body.ID;
    var sql1 = "";
    if(parseInt(STAR_TYPE)==1){
        sql1 = "UPDATE table_zc SET HF_STAR='0' WHERE HF_ID='"+ID+"'";
    }else{
        sql1 = "UPDATE table_sr SET SR_STAR='0' WHERE SR_ID='"+ID+"'";
    }
    sql.query(sql1,function(error,result){
        if(error){
            console.log(error);
        }
        res.send(result);
    });
};