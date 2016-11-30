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

router.get('/123',function(req,res){
    //models.user.create({USER_ID:"2",USER_NAME:"123",USER_PWD:"234"})
    //    .then(function(user){
    //        console.log(user);
    //})
    models.zhichu.findAll({
    }).then(function(users){
        console.log("panda  "+JSON.stringify(users));
        res.render('test',{user:users});
    });
});

module.exports = router;