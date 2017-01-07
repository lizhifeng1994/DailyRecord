/**
 * Created by lzf on 2016/11/30.
 */
"use strict";
var models  = require('../models');
var express = require('express');
var router  = express.Router();
var co = require('co-express');
var tools = require('../user/tools.js');

router.get('',co(function* (req,res){
    var date = new Date();
    date = tools.format(date);
    var sql = 'CALL getTotal('+req.cookies.user.USER_ID+',@total_zc,@total_sr,@total_zm);';
    var result = yield models.sequelize.query(sql);
    res.render('home',
        {
            title:'我的生活账本',
            date:date,
            total_SR:result[0].total_SR==null?0:result[0].total_SR,
            total_ZC:result[0].total_ZC==null?0:result[0].total_ZC,
            total_ZM:result[0].total_ZM,
            USER_NAME:req.cookies.user.USER_NAME
        });
}));

router.post('/starList',co(function* (req,res){
    var pageNow = req.body.pageNow;
    var STAR_TYPE = req.body.STAR_TYPE;
    var findConetnt = "%"+req.body.findConetnt+"%";
    var flag = true;
    if(STAR_TYPE==0){
        var starList = yield models.star.findAll({
            attributes:['ID','STAR_DATE','STAR_CONTENT','STAR_TYPE','STAR_MONEY'],
            where:{
                $or: [
                    {
                        STAR_CONTENT: {
                            $like: findConetnt
                        }
                    },
                    {
                        STAR_DATE: {
                            $like: findConetnt
                        }
                    }
                ],
                USER_ID: req.cookies.user.USER_ID
            },
            order: 'STAR_DATE DESC',
            limit: 5,
            offset: 5 * ( pageNow- 1)
        });
    }else{
        var starList = yield models.star.findAll({
            attributes:['ID','STAR_DATE','STAR_CONTENT','STAR_TYPE','STAR_MONEY'],
            where:{
                STAR_TYPE:STAR_TYPE,
                USER_ID: req.cookies.user.USER_ID,
                $or: [
                    {
                        STAR_CONTENT: {
                            $like: findConetnt
                        }
                    },
                    {
                        STAR_DATE: {
                            $like: findConetnt
                        }
                    }
                ]
            },
            order: 'STAR_DATE DESC',
            limit: 5,
            offset: 5 * ( pageNow- 1)
        });
    }
    var starCount = yield models.star.count({});
    res.send({starList:starList,starCount:starCount});
}));


router.post('/detail',co(function* (req,res){
    console.log("进来");
    var STAR_TYPE = req.body.STAR_TYPE;
    //var ID = req.body.ID;
    if(parseInt(STAR_TYPE)==2){
        var result = yield models.shouru.findOne({
            attributes: [
                ['SR_ID', 'ID'],
                ['SR_ADDRESS','ADDRESS'],
                ['SR_CONTENT','CONTENT'],
                ['SR_MONEY','MONEY'],
                ['SR_MARK','MARK']
            ],
            where:{
                SR_ID:req.body.ID
            }
        });
    }else{
        var result = yield models.zhichu.findOne({
            attributes: [
                ['HF_ID', 'ID'],
                ['HF_ADDRESS','ADDRESS'],
                ['HF_CONTENT','CONTENT'],
                ['HF_MONEY','MONEY'],
                ['HF_MARK','MARK']
            ],
            where:{
                HF_ID:req.body.ID
            }
        });
    }
    res.send({result:result});
}));


router.post('/cancelStar',co(function* (req,res){
    var STAR_TYPE = req.body.STAR_TYPE;
    var ID = req.body.ID;
    if(parseInt(STAR_TYPE)==1){
        var flag = yield models.zhichu.update(
            {
                HF_STAR:'0',
            },
            {
                where:
                {
                    HF_ID:req.body.ID
                }
            });
    }else{
        var flag = yield models.shouru.update(
            {
                SR_STAR:'0',
            },
            {
                where:
                {
                    SR_ID:req.body.ID
                }
            });
    }

    res.send({flag:flag});
}));


module.exports = router;