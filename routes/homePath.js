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
    var result = yield models.sequelize.query('CALL getTotal(@total_zc,@total_sr,@total_zm);');
    res.render('home',
        {
            title:'我的生活账本',
            date:date,
            total_SR:result[0].total_SR,
            total_ZC:result[0].total_ZC,
            total_ZM:result[0].total_ZM
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
                ]
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




module.exports = router;