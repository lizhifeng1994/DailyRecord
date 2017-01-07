/**
 * Created by lzf on 2016/12/18.
 */
"use strict";
var models  = require('../models');
var express = require('express');
var router  = express.Router();
var co = require('co-express');
var tools = require('../user/tools.js');
var sequelize = require("sequelize");

router.get('',co(function* (req,res){
    var user = yield models.user.findOne({
        attributes:['USER_JOIN_TIME'],
        where:{
            USER_NAME:req.cookies.user.USER_NAME,
            USER_FLAG:'0'
        }
    });
    var date = user.USER_JOIN_TIME.toLocaleString().substr(0,10);
    res.render('zone',{USER_NAME:req.cookies.user.USER_NAME,USER_JOIN_TIME:date});
}));

//根据ID和年月获取具体的当前月收入和支出
router.post('/monthMoney',co(function* (req,res){
    var monthDate = req.body.monthDate.year+"-"+req.body.monthDate.month+"%";

    var id = req.cookies.user.USER_ID;

    var sql = 'CALL getMonthMoney('+req.cookies.user.USER_ID+",'"+monthDate+"'"+',@month_zc,@month_sr);';

    var result = yield models.sequelize.query(sql);

    res.send(
        {
            zhichuMoney:result[0].month_zc==null?0:result[0].month_zc,
            shouruMoney:result[0].month_sr==null?0:result[0].month_sr
        }
    );
}));

//获取当年的收入和支出
router.post("/yearMoney",co(function* (req,res){

    var year = new Date().getFullYear()+"%";

    var sql_zhichu = "SELECT HF_MONTH,HF_MONEY from zc_month_view where USER_ID="+ parseInt(req.cookies.user.USER_ID)+" AND HF_MONTH LIKE '"+year+"';";

    var result_zhichu = yield models.sequelize.query(sql_zhichu);
    //console.log(typeof result[0][0].HF_MONTH);

    var sql_shouru = "SELECT SR_MONTH,SR_MONEY from sr_month_view where USER_ID="+parseInt(req.cookies.user.USER_ID)+" AND SR_MONTH LIKE '"+year+"';";

    var result_shouru = yield models.sequelize.query(sql_shouru);

    var zhichu_money = tools.zhichuMonth(result_zhichu);

    var shoru_money = tools.shouruMonth(result_shouru);

    console.log(shoru_money);
    res.send({zhichu_money:zhichu_money,shoru_money:shoru_money});
}));

//根据日期和种类获得列表数据
router.post("/zhichuList",co(function* (req,res){
    var pageNow = req.body.zhichuPageNow;
    var zhichuList = yield models.zhichu.findAll({
        attributes:['HF_DATE','HF_CONTENT','HF_KIND','HF_MONEY'],
        where: {
            HF_KIND:{
                $in: req.body.HF_KIND,
            },
            HF_DATE:{
                $between: [req.body.zhichu_start_date, req.body.zhichu_end_date],
            },
            HF_FLAG: "0",
        },
        order: 'HF_ID DESC',
        limit: 5,
        offset: 5 * ( pageNow- 1)
    });


    var zhichuCount =  yield models.zhichu.count({
        where: {
            HF_KIND:{
                $in: req.body.HF_KIND,
            },
            HF_DATE:{
                $between: [req.body.zhichu_start_date, req.body.zhichu_end_date],
            },
            HF_FLAG: "0",
        }
    });

    var zhichuAll = Math.ceil(zhichuCount/5);
    //console.log(zhichuAll);
    res.send({zhichuList:zhichuList,zhichuAll:zhichuAll});
}));


//根据日期和种类获取图表数据
//要拼接成这样的数据格式
//[
//["一日三餐",10],
//    ["日常用品",26.8],
//    ["交通",12.8],
//    ["衣着",8.5],
//    ["生活其他",6.2],
//    ["书籍",0.7]
//]
router.post("/zhichuChart",co(function* (req,res){
    var zhichuData = yield models.zhichu.findAll({
        attributes:['HF_KIND',[sequelize.fn('SUM', sequelize.col('HF_MONEY')), 'HF_MONEY']],
        where: {
            HF_KIND:{
                $in: req.body.HF_KIND,
            },
            HF_DATE:{
                $between: [req.body.zhichu_start_date, req.body.zhichu_end_date],
            },
            HF_FLAG: "0"
        },
        group: ["HF_KIND"],
    });
    //console.log((zhichuData[0].HF_MONEY) instanceof  float);
    var zhichuAll = new Array();
    for(var i=0;i<zhichuData.length;i++){
        var temp = new Array();
        temp.push(tools.zhichuKind(zhichuData[i].HF_KIND));
        //var money = zhichuData[i].HF_MONEY;
        //console.log(typeof zhichuData[i].HF_MONEY);
        temp.push(zhichuData[i].HF_MONEY);
        zhichuAll.push(temp);
    }
    res.send({zhichuChart:zhichuAll});
}));

//得到收入列表
router.post("/shouruList",co(function* (req,res){
    //console.log(req.body.SR_KIND);
    //console.log(req.body.shouru_start_date);
    //console.log(req.body.shouru_end_date);
    //console.log(req.body.shouruPageNow);
    var pageNow = req.body.shouruPageNow;
    var shouruList = yield models.shouru.findAll({
        attributes:['SR_DATE','SR_CONTENT','SR_KIND','SR_MONEY'],
        where: {
            SR_KIND:{
                $in: req.body.SR_KIND,
            },
            SR_DATE:{
                $between: [req.body.shouru_start_date, req.body.shouru_end_date],
            },
            SR_FLAG: "0",
        },
        order: 'SR_ID DESC',
        limit: 5,
        offset: 5 * ( pageNow- 1)
    });

    var shouruCount =  yield models.shouru.count({
        where: {
            SR_KIND:{
                $in: req.body.SR_KIND,
            },
            SR_DATE:{
                $between: [req.body.shouru_start_date, req.body.shouru_end_date],
            },
            SR_FLAG: "0",
        }
    });

    var shouruAll = Math.ceil(shouruCount/5);
    res.send({shouruList:shouruList,shouruAll:shouruAll});
}));

router.post("/shouruChart",co(function* (req,res){
    var shouruData = yield models.shouru.findAll({
        attributes:['SR_KIND',[sequelize.fn('SUM', sequelize.col('SR_MONEY')), 'SR_MONEY']],
        where: {
            SR_KIND:{
                $in: req.body.SR_KIND,
            },
            SR_DATE:{
                $between: [req.body.shouru_start_date, req.body.shouru_end_date],
            },
            SR_FLAG: "0",
        },
        group: ["SR_KIND"],
    });
    //console.log((zhichuData[0].HF_MONEY) instanceof  float);
    var shouruAll = new Array();
    for(var i=0;i<shouruData.length;i++){
        var temp = new Array();
        temp.push(tools.shouruKind(shouruData[i].SR_KIND));
        //var money = zhichuData[i].HF_MONEY;
        //console.log(typeof zhichuData[i].HF_MONEY);
        temp.push(shouruData[i].SR_MONEY);
        shouruAll.push(temp);
    }
    res.send({shouruChart:shouruAll});
}));
module.exports = router;