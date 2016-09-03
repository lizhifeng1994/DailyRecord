var express = require('express');
var router = express.Router();
var zhichu_Manage = require('../user/zhichu_Manage.js');
router.get('/', function(req, res){
	return res.redirect('/home');
});

router.get('/home', function(req, res){
	res.render('home', { title: '我的生活账本'});
});

router.get('/shouru',function(req,res){
	res.render('dy_shouru',{title:'我的生活账本-收入'});
});

router.get('/zhichu',zhichu_Manage.show);
//router.get('/zhichu',function(req,res){
//	res.render('dy_zhichu',{title:'我的生活账本-支出'});
//});


router.post('/zhichu/add',zhichu_Manage.add);

//删除时显示明细信息
router.post('/zhichu/detail',zhichu_Manage.detail);


router.post('/zhichu/del',zhichu_Manage.del);
module.exports = router;