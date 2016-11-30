'use strict'
var express = require('express');
var mongodb = require('mongodb')
//返回一个路由器实例

var router = express.Router();
//var zhichu_Manage = require('../user/zhichu_Manage.js');
var shouru_Manage = require('../user/shouru_Manage.js');
var home_Manage = require('../user/home_Manage.js');
var tools = require('../user/tools.js');
router.get('/', function(req, res){
	return res.redirect('/home');
});

router.get('/home',function(req,res){
	var date = new Date();
	date = tools.format(date);
	res.render('home',{title:'我的生活账本',date:date});
});

router.post('/home/total',home_Manage.show);
router.post('/home/detail',home_Manage.getDetail);
router.post('/home/cancelStar',home_Manage.cancelStar);

//router.get('/home',home_Manage.show);

router.get('/shouru',function(req,res){
	var date = new Date();
	date = tools.format(date);
	res.render('dy_shouru',{date:date});
});


router.get('/zhichu/analysis',function(req,res){
	res.render('zhichu_Analysis');
});

//router.post('/shouru/list',shouru_Manage.show);
//router.post('/shouru/add',shouru_Manage.add);
//router.post('/shouru/del',shouru_Manage.del);
//router.post('/shouru/update',shouru_Manage.update);

router.get('/zhichu',function(req,res){
	var date = new Date();
	date = tools.format(date);
	res.render('dy_zhichu',{date:date});
});

//router.post('/zhichu/add',zhichu_Manage.add);

//显示明细信息
//router.post('/zhichu/detail',zhichu_Manage.detail);

//router.post('/zhichu/del',zhichu_Manage.del);

//router.post('/zhichu/update',zhichu_Manage.update);

//router.post('/zhichu/page',zhichu_Manage.page);

//router.post('/zhichu/next',zhichu_Manage.next);

//根据日期展示当天记录
//router.post('/zhichu/dateshow',zhichu_Manage.dateshow);

module.exports = router;