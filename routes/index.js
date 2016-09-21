var express = require('express');
var router = express.Router();
var zhichu_Manage = require('../user/zhichu_Manage.js');
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

router.get('/home/detail',home_Manage.show);

router.get('/shouru',function(req,res){

	res.render('dy_shouru',{title:'我的生活账本-收入'});
});



router.get('/zhichu',zhichu_Manage.show);

router.post('/zhichu/add',zhichu_Manage.add);

//显示明细信息
router.post('/zhichu/detail',zhichu_Manage.detail);

router.post('/zhichu/del',zhichu_Manage.del);

router.post('/zhichu/update',zhichu_Manage.update);

router.post('/zhichu/page',zhichu_Manage.page);

router.post('/zhichu/next',zhichu_Manage.next);

//根据日期展示当天记录
router.post('/zhichu/dateshow',zhichu_Manage.dateshow);
module.exports = router;