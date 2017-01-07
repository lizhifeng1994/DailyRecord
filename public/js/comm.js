/**
 * Created by lzf on 2016/9/5.
 * 这里放的是一些公共的JS方法
 */

//  把一些DOM操作封装
"use strict";
function getFormatDate(){
    var day = new Date();
    var Year = 0;
    var Month = 0;
    var Day = 0;
    var CurrentDate = "";
    Year= day.getFullYear();//ie火狐下都可以
    Month= day.getMonth()+1;
    Day = day.getDate();
    CurrentDate += Year + "-";
    if (Month >= 10 )
    {
        CurrentDate += Month + "-";
    }
    else
    {
        CurrentDate += "0" + Month + "-";
    }
    if (Day >= 10 )
    {
        CurrentDate += Day ;
    }
    else
    {
        CurrentDate += "0" + Day ;
    }
    return CurrentDate;
}

function showPages (page, total) {

    var str = page + '';

    for (var i = 1; i <= 3; i++) {
        if (page - i > 1) {
            str = page - i + ',' + str;
        }
        if (page + i < total) {
            str = str + ',' + (page + i);
        }
    }

    if (page - 4 > 1) {
        str = '...,' + str;
    }

    if (page > 1) {
        str = '上一页,' + 1 + ',' + str;
    }

    if (page + 4 < total) {
        str = str + ',...';
    }

    if (page < total) {
        str = str + ',' + total + ',下一页';
    }

    return str.split(',');
}

//  根据传过来的数据生成相应的li元素
