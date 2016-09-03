/*
   支出的管理CRUD
 */
var  connection = require('../user/conn.js').localConnect();
var tools = require('../user/tools.js');
var sql = require('../user/sql.js');
module.exports.show= function(req,res){
    //获取当前日期
    var today_date = tools.format(new Date());

    var sql1 = "select HF_ID,HF_CONTENT,HF_MONEY from table_zc where HF_FLAG='0' and HF_DATE=\'"+today_date+"\'"+" order by HF_ID DESC";
    var sql2 = "select SUM(HF_MONEY) as today_money from table_zc where  HF_FLAG='0' and HF_DATE=\'"+today_date+"\'";
    sql.query(sql1, function(error,result) {
            //console.log(result1);
            var today_money = 0;
            for(i=0;i<result.length;i++){
                today_money = parseFloat(today_money)+parseFloat(result[i].HF_MONEY);
            }
            today_money = today_money.toFixed(2);
            res.render('dy_zhichu',{ data:result,today_money:today_money,today_date:today_date});
        }
    );

};

//  如果穿过来的消费日期和列表中的消费记录的日期不相同的话，则需要进行查询
module.exports.add= function(req,res){
    var input =  req.body;
    //如果传过来的时间为空，那么就自动设置为当前时间
    var date = null;
    if(input['zcForm[hfdate]'] == ''){
        date = tools.format(new Date());
    }else{
        date = tools.format(input['zcForm[hfdate]']);
    }
    console.log(date);
    //var input = req.body.zcForm[0];
    //console.log(input);
    //这里没办法啊，数据要这么才能获得，后面优化吧
    var zcForm  = {
        HF_DATE:date,
        HF_ADDRESS:input['zcForm[hfplace]'],
        HF_KIND: input['zcForm[hfkind]'],
        HF_CONTENT: input['zcForm[hfcontent]'],
        HF_MONEY: input['zcForm[hfmoney]'],
        HF_MARK: input['zcForm[hfmark]'],
        HF_STAR: tools.changehfStar(input['zcForm[hfstar]'])
    };
    var today_flag=req.body.today_flag;
    var sql1 = "INSERT INTO table_zc set ? ";
    var sql2 = "select HF_ID,HF_CONTENT,HF_MONEY from table_zc where  HF_FLAG='0' and HF_DATE=\'"+date+"\'"+" order by HF_ID DESC";
        sql.add(sql1, zcForm, function (error, result) {
            if (error) {
                console.log("有错误");
            }
            //返回左边列表栏需要的值
            var reslut = {
                HF_ID: result.insertId,
                HF_MONEY: zcForm.HF_MONEY,
                HF_CONTENT: zcForm.HF_CONTENT
            }
            if(today_flag==1){
                res.send(reslut);
            }else{
                sql.query(sql2,function(error,result2){
                    if(error){
                        console.log("有错误");
                    }
                    res.send(result2);
                });
            }
        });
};

module.exports.detail = function(req,res){
    var HF_ID = req.body.HF_ID;
    //console.log(HF_ID);
    var sql1 = "select * from table_zc where HF_FLAG='0' and HF_ID="+HF_ID;

    console.log(sql1);
    sql.query(sql1,function(error,result){
        if(error){
            console.log("有错误");
        }
        //传递数据到Ajax
        res.send(result);
    });
};


module.exports.del = function(req,res){
    var HF_ID = req.body.HF_ID;
    var sql1 = "update table_zc set HF_FLAG='1' where HF_ID="+HF_ID;
    sql.query(sql1,function(error,result){
        if(error){
            console.log("有错误");
        }
        res.send(result);
    });
};


