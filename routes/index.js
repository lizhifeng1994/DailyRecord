'use strict'
var express = require('express');
//返回一个路由器实例

var router = express.Router();
//var zhichu_Manage = require('../user/zhichu_Manage.js');
var shouru_Manage = require('../user/shouru_Manage.js');
var home_Manage = require('../user/home_Manage.js');
var tools = require('../user/tools.js');
router.get('/',function(req,res){
	if(req.cookies.user){
		return res.redirect('/home');
	}
	return res.redirect('/login');
	//res.render('zone');
	//console.log("进来");
});

router.get('/login', function(req, res){
	//return res.redirect('/home');
	res.render('login');
});

router.get('/register', function(req, res){
	//return res.redirect('/home');
	res.render('register');
});

router.get('/shouru',function(req,res){
	var date = new Date();
	date = tools.format(date);
	res.render('dy_shouru',{date:date,USER_NAME:req.cookies.user.USER_NAME});
});

router.get('/zhichu',function(req,res){
	var date = new Date();
	date = tools.format(date);
	res.render('dy_zhichu',{date:date,USER_NAME:req.cookies.user.USER_NAME});
});


module.exports = router;