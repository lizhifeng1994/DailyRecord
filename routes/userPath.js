//var express = require('express');
//var router = express.Router();
//
///* GET users listing. */
//router.get('/', function(req, res, next) {
//  res.send('respond with a resource');
//});
//
//module.exports = router;
'use strict'
var models  = require('../models');
var express = require('express');
var router  = express.Router();
var co = require('co-express');

//用户名是否存在
router.post('/nameExist',co(function* (req,res){
    var USER_NAME=req.body.userName;
    var user = yield models.user.findOne({
        attributes:['USER_NAME'],
        where:{
            USER_NAME:USER_NAME,
            USER_FLAG:'0'
        }
    });
    if(user==null){
        res.send({valid:true});
    }else{
        res.send({valid:false});
    }

}));

router.post('/emailExist',co(function* (req,res){
    var USER_EMAIL=req.body.userEmail;
    var user = yield models.user.findOne({
        attributes:['USER_NAME'],
        where:{
            USER_EMAIL:USER_EMAIL,
            USER_FLAG:'0'
        }
    });
    if(user==null){
        res.send({valid:true});
    }else{
        res.send({valid:false});
    }
}));

router.post('/add',co(function* (req,res){
    //console.log(req.body.user);

    var addUser = yield models.user.create({
        USER_NAME:req.body.user.USER_NAME,
        USER_EMAIL:req.body.user.USER_EMAIL,
        USER_PWD:req.body.user.USER_PWD
    });
    var user = {};
    user.USER_ID = addUser.USER_ID;
    user.USER_NAME = addUser.USER_NAME
    res.cookie('user',user);
    res.send(addUser);
}));

router.post('/login',co(function* (req,res){
    var user = yield models.user.findOne({
        attributes:['USER_ID','USER_NAME'],
        where:{
            USER_EMAIL:req.body.user.USER_EMAIL,
            USER_PWD:req.body.user.USER_PWD,
            USER_FLAG:'0'
        }
    });
    if(user==null){
        res.send({flag:false});
    }else{
        res.cookie('user',user);
        res.send({flag:true});
    }
}));

router.get('/logout',co(function* (req,res){
    res.clearCookie('user');
    res.redirect('/login');
}));

module.exports = router;