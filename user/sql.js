/**
 * Created by lzf on 2016/8/14.
 */
var  connection = require('../user/conn.js').localConnect();
var tools = require('../user/tools.js');

//查询,更新貌似都能用这个……
module.exports.query = function(sql,callback){
   connection.query(sql,function(error, results, fields){
        if(error)
            console.log("Error Selecting : %s ",error);
        //console.log(today);
        callback(error,results);
    });
}

//增加

module.exports.add = function(sql,zcForm,callback){

    connection.query(sql,zcForm,function(error, results){
        if(error)
            console.log("Error Selecting : %s ",error);
        //console.log(today);
        callback(error,results);
    });
}

module.exports.update = function(sql,zcForm,HF_ID,callback){
    connection.query(sql,[zcForm,HF_ID],function(error, results){
        if(error)
            console.log("Error Selecting : %s ",error);
        //console.log(today);
        callback(error,results);
    });

}



