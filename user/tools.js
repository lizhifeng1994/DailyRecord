/**
 * Created by lzf on 2016/8/14.
 */
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
