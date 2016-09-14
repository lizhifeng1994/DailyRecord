/**
 *支出的管理CRUD
 */
var  connection = require('../user/conn.js').localConnect();
var tools = require('../user/tools.js');
var sql = require('../user/sql.js');

module.exports.show= function(req,res){
    //获取当前日期
    var today_date = tools.format(new Date());

    //一进来当前页肯定是1
    var pageNow = 1;

    var sql1 = "select HF_ID,HF_CONTENT,HF_MONEY from table_zc  where HF_FLAG='0' and HF_DATE=\'"+today_date+"\'"+" order by HF_ID DESC limit 0,5";
    //var sql2 = "select SUM(HF_MONEY) as today_money from table_zc where  HF_FLAG='0' and HF_DATE=\'"+today_date+"\'";
    sql.query(sql1, function(error,result) {
            //console.log(result1);
            var today_money = 0;
            for(i=0;i<result.length;i++){
                today_money = parseFloat(today_money)+parseFloat(result[i].HF_MONEY);
            }
            today_money = today_money.toFixed(2);
            res.render('dy_zhichu',{ data:result,today_money:today_money,today_date:today_date,pageNow:pageNow});
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
    //console.log(date);
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
    var sql2 = "select HF_ID,HF_CONTENT,HF_MONEY from table_zc where  HF_FLAG='0' and HF_DATE=\'"+date+"\'"+" order by HF_ID DESC limit 0,5";
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

//删除
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

//更新
module.exports.update = function(req,res){

    var input =  req.body;
    //如果传过来的时间为空，那么就自动设置为当前时间
    var date = null;
    if(input['zcForm[hfdate]'] == ''){
        date = tools.format(new Date());
    }else{
        date = tools.format(input['zcForm[hfdate]']);
    }
    //var input = req.body.zcForm[0];
    //console.log(input);
    //这里没办法啊，数据要这么才能获得，后面优化吧
    var HF_ID = req.body.HF_ID;
    var zcForm  = {
        HF_DATE:date,
        HF_ADDRESS:input['zcForm[hfplace]'],
        HF_KIND: input['zcForm[hfkind]'],
        HF_CONTENT: input['zcForm[hfcontent]'],
        HF_MONEY: input['zcForm[hfmoney]'],
        HF_MARK: input['zcForm[hfmark]'],
        HF_STAR: tools.changehfStar(input['zcForm[hfstar]'])
    };

    console.log(zcForm);

    var sql1 = "UPDATE table_zc set ?  where HF_ID=?";

    sql.update(sql1,zcForm,HF_ID,function(error,result){
        if(error){
            console.log("有错误");
        }

        var result = {
            HF_CONTENT: zcForm.HF_CONTENT,
            HF_MONEY: zcForm.HF_MONEY
        }
        res.send(result);
    });

};


module.exports.page =function(req,res){
    if(req.body.date=="今日消费"){
        var today_date = tools.format(new Date());
    }else{
        var reg=new RegExp("/","g");
        var today_date = req.body.date.replace(reg,"-");
    }

    console.log(today_date);

    var pageSize = 5;

    var pageNow = req.body.pageNow;

    console.log(pageNow);
    //if(pageNow==1){
        var pageStart = (pageSize*pageNow-pageSize);
    //}else{
    //    var pageStart = (pageSize*pageNow-pageSize)+1;
    //}

    var sql1 = "select HF_ID,HF_CONTENT,HF_MONEY from table_zc  where HF_FLAG='0' and HF_DATE=\'"+today_date+"\'"+" order by HF_ID DESC limit "+pageStart+","+pageSize;
    sql.query(sql1, function(error,result) {
            if(error){
                console.log("有错误");
            }

            res.send(result)
        }
    );
}

//得到你要删除的下一条数据
module.exports.next = function(req,res){
    if(req.body.date=="今日消费"){
        var date = tools.format(new Date());
    }else{
        var reg=new RegExp("/","g");
        var date = req.body.date.replace(reg,"-");
    }

    var HF_ID = req.body.HF_ID;

    HF_ID = parseInt(HF_ID);

    console.log(HF_ID);
    var sql1 = "select HF_ID,HF_CONTENT,HF_MONEY  from table_zc where HF_ID = (select HF_ID from table_zc where HF_ID < "
    +HF_ID+" and HF_FLAG='0' order by HF_ID DESC limit 1) and HF_FLAG='0' and HF_DATE=\'"+date+"\'";

    //console.log("sql语句"+sql1);

    sql.query(sql1,function(error,result){
        if(error){
            console.log("有错误");
        }
        console.log(result);
        res.send(result);
    });
    //res.send(1);

}

