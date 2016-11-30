'use strict'
var models  = require('../models');
var express = require('express');
var router  = express.Router();
var co = require('co-express');

router.post('/list',co(function* (req,res){
    var zhichuDate = req.body.zhichuDate;
    var pageNow = req.body.pageNow;
    console.log(req.body.pageNow);
    console.log(zhichuDate)
    var zhichuList = yield models.zhichu.findAll({
        attributes:['HF_ID','HF_CONTENT','HF_MONEY','HF_FLAG'],
        where: {
            HF_FLAG: "0",
            HF_DATE: zhichuDate
        },
        order: 'HF_ID DESC',
        limit: 5,
        offset: 5 * ( pageNow- 1)
    });
    //console.log(zhichuList);
    var zhichuMoney = yield  models.zhichu.sum('HF_MONEY',{
        where:{
            HF_FLAG:"0",
            HF_DATE:zhichuDate,
        }
    });
    if(zhichuMoney==null){
        zhichuMoney = parseFloat(0).toFixed(2);
    }else{
        zhichuMoney = parseFloat(zhichuMoney).toFixed(2);
    }

    var zhichuCount = yield  models.zhichu.count({
        where:{
            HF_FLAG:"0",
            HF_DATE:zhichuDate,
        }
    });

    res.send({zhichuList:zhichuList,zhichuMoney:zhichuMoney,zhichuCount:zhichuCount})
}));

router.post('/add',co(function* (req,res){
    //console.log(req.body.zhichu.HF_DATE);
    var addFlag = yield models.zhichu.create({
        HF_DATE:req.body.zhichu.HF_DATE,
        HF_ADDRESS:req.body.zhichu.HF_ADDRESS,
        HF_CONTENT:req.body.zhichu.HF_CONTENT,
        HF_KIND:req.body.zhichu.HF_KIND,
        HF_STAR:req.body.zhichu.HF_STAR,
        HF_MONEY:req.body.zhichu.HF_MONEY,
        HF_MARK:req.body.zhichu.HF_MARK,
    })
    //console.log(addFlag);
    res.send(addFlag);
}));

router.post('/detail',co(function* (req,res){
    //console.log("haha");
    var zhichu = yield models.zhichu.findOne({
       where:{
           HF_ID:req.body.HF_ID
       }
    });

    res.send({zhichu:zhichu});
}));

router.post('/del',co(function* (req,res){
    //console.log(req.body.HF_ID);
    var flag = yield models.zhichu.update({HF_FLAG: '1'},
        {
            where:
            {
                HF_ID: req.body.HF_ID
            }
        });
    res.send(flag)
}));

router.post('/edit',co(function* (req,res){
    console.log(req.body.zhichu);
    var flag = yield models.zhichu.update(
        {
            HF_DATE:req.body.zhichu.HF_DATE,
            HF_ADDRESS:req.body.zhichu.HF_ADDRESS,
            HF_CONTENT:req.body.zhichu.HF_CONTENT,
            HF_KIND:req.body.zhichu.HF_KIND,
            HF_STAR:req.body.zhichu.HF_STAR,
            HF_MONEY:req.body.zhichu.HF_MONEY,
            HF_MARK:req.body.zhichu.HF_MARK,
        },
        {
            where:
            {
                HF_ID: req.body.zhichu.HF_ID
            }
        });
    res.send(true);
}));

module.exports = router;