/**
 * Created by lzf on 2016/11/30.
 */
"use strict";
var models  = require('../models');
var express = require('express');
var router  = express.Router();
var co = require('co-express');

router.post('/list',co(function* (req,res){
    //console.log("进来123");
    var monthDate = req.body.monthDate+"%";
    var pageNow = req.body.pageNow;
    var page = (pageNow-1)*5;
    var shouruList = yield models.shouru.findAll({
        attributes:['SR_ID','SR_CONTENT','SR_MONEY','SR_FLAG'],
        where: {
            SR_FLAG: "0",
            SR_DATE: {
                $like:monthDate
            }
        },
        order: 'SR_ID DESC',
        limit: 5,
        offset: 5 * ( pageNow- 1)
    });

    var shouruMoney = yield  models.shouru.sum('SR_MONEY',{
        where:{
            SR_FLAG:"0",
            SR_DATE: {
                $like:monthDate
            }
        }
    });

    if(shouruMoney==null){
        shouruMoney = parseFloat(0).toFixed(2);
    }else{
        shouruMoney = parseFloat(shouruMoney).toFixed(2);
    }

    var shouruCount = yield  models.shouru.count({
        where:{
            SR_FLAG:"0",
            SR_DATE: {
                $like:monthDate
            }
        }
    });

    res.send({list:shouruList,total_money:shouruMoney,monthList:shouruCount});


}));

router.post('/add',co(function* (req,res){
    console.log(req.body.shouru)
    var addFlag = yield models.shouru.create({
        SR_DATE:req.body.shouru.SR_DATE,
        SR_ADDRESS:req.body.shouru.SR_ADDRESS,
        SR_CONTENT:req.body.shouru.SR_CONTENT,
        SR_KIND:req.body.shouru.SR_KIND,
        SR_STAR:req.body.shouru.SR_STAR,
        SR_MONEY:req.body.shouru.SR_MONEY,
        SR_MARK:req.body.shouru.SR_MARK,
    });
    //console.log(addFlag);
    res.send(addFlag);
}));

router.post('/detail',co(function* (req,res){
    var shouru = yield models.shouru.findOne({
        where:{
            SR_ID:req.body.SR_ID
        }
    });

    res.send({shouru:shouru});
}));

router.post('/del',co(function* (req,res){
    var flag = yield models.shouru.update({SR_FLAG: '1'},
        {
            where:
            {
                SR_ID: req.body.SR_ID
            }
        });
    res.send(flag)
}));

router.post('/edit',co(function* (req,res){
    console.log(req.body.shouru)
    var flag = yield models.shouru.update(
        {
            SR_DATE:req.body.shouru.SR_DATE,
            SR_ADDRESS:req.body.shouru.SR_ADDRESS,
            SR_CONTENT:req.body.shouru.SR_CONTENT,
            SR_KIND:req.body.shouru.SR_KIND,
            SR_STAR:req.body.shouru.SR_STAR,
            SR_MONEY:req.body.shouru.SR_MONEY,
            SR_MARK:req.body.shouru.SR_MARK,
        },
        {
            where:
            {
                SR_ID: req.body.shouru.SR_ID
            }
        });
    res.send(flag);
}));


module.exports = router;
