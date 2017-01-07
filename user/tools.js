/**
 * Created by lzf on 2016/8/14.
 */
"use strict";

function add0(m){return m<10?'0'+m:m }
module.exports.format = function(shijianchuo)
{
//shijianchuo是整数，否则要parseInt转换
    var time = new Date(shijianchuo);
    var y = time.getFullYear();
    var m = time.getMonth()+1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y+'-'+add0(m)+'-'+add0(d);
}

//如果账目被标注，则返回1，否则返回0
module.exports.changehfStar = function(value){
    if(value==undefined){
        return "0";
    }
    return "1";
}


module.exports.zhichuMonth = function(zhichu_result){
    var money = new Array(0,0,0,0,0,0,0,0,0,0,0,0);
    for(var i=1;i<=12;i++){
        for(var j=0;j<zhichu_result[0].length;j++){
            if(i==parseInt(zhichu_result[0][j].HF_MONTH.substr(5,6))){
                money[i-1] = parseFloat(parseFloat(zhichu_result[0][j].HF_MONEY).toFixed(2));
            }
        }
    }

    var nowMonth = new Date().getMonth();


    //如果大于当前月份，肯定是没有数据的，所以设置为0
    for(var i=0;i<money.length;i++){
        if((money[i]==0)&&(i>nowMonth)){
            money[i] = null;
        }
    }

    return money;
}


module.exports.shouruMonth = function(shouru_result){
    var money = new Array(0,0,0,0,0,0,0,0,0,0,0,0);
    for(var i=1;i<=12;i++){
        for(var j=0;j<shouru_result[0].length;j++){
            if(i==parseInt(shouru_result[0][j].SR_MONTH.substr(5,6))){
                money[i-1] = parseFloat(parseFloat(shouru_result[0][j].SR_MONEY).toFixed(2));
            }
        }
    }

    var nowMonth = new Date().getMonth();

    //如果大于当前月份，肯定是没有数据的，所以设置为0
    for(var i=0;i<money.length;i++){
        if((money[i]==0)&&(i>nowMonth)){
            money[i] = null;
        }
    }

    return money;
}

module.exports.zhichuKind = function (HF_KIND) {
    switch (HF_KIND) {
        case "1":return "一日三餐"; break;
        case "2":return "日常用品"; break;
        case "3":return "交通"; break;
        case "4":return "衣着"; break;
        case "5":return "生活其他"; break;
        case "6":return "书籍"; break;
    }
}

module.exports.shouruKind = function (SR_KIND) {
    switch (SR_KIND) {
        case "1":return "工资"; break;
        case "2":return "补贴"; break;
        case "3":return "项目奖金"; break;
        case "4":return "其他"; break;
    }
}