/**
 * Created by lzf on 2016/9/5.
 * 这里放的是一些公共的JS方法
 */

//  把一些DOM操作封装
function appendDiv(data){
    $("#today_hf").prepend(productLi(data));
}

//  根据传过来的数据生成相应的li元素
function productLi(data){
    var $li = $('<li>',{
        class:'list-group-item',
        style:'overflow:hidden',
        id:data.HF_ID
    });

    var $b = $('<b>',{
        text:data.HF_CONTENT
    })
//            var $li =  $('<li class="list-group-item" id="li_detail" style=" overflow:hidden;">');
    var $span = $('<span>',{
        class:'label label-danger pull-right',
        text:'-'+data.HF_MONEY+'元'
    });


    var $div = $('<div>',{
        class:"dask"
    });

    var $update = $('<button>',{
        class:'btn btn-primary',
        style:'margin-left: 20px;',
        text:'编辑'
    });


    var $del = $('<button>',{
        class:'btn btn btn-warning',
        style:'margin-left: 5px;',
        text:'删除'
    });
    //$del.click(function(event){
    //    event.preventDefault();
    //    $del.onclick = showDetail(data.HF_ID);
    //});

    $del.attr("onclick","showDetail("+data.HF_ID+")");

    //$update.click(function(event){
    //    event.preventDefault();
    //    $update.onclick = fillForm(data.HF_ID);
    //});

    $update.attr("onclick","fillForm("+data.HF_ID+")");

    $div.append($update);
    $div.append($del);
    $li.append($b);
    $li.append($span);
    $li.append($div);

    $li.hover(
        function () {
            $(this).find(".dask").stop().delay(50).animate({"top":0,opacity:0.5},300)
        },
        function () {
            $(this).find(".dask").stop().animate({"top":-200,opacity:0},300)
        }
    );
    return $li;
}

//  判断添加的是否和左侧列表栏的日期相符合（没有数据默认符合）
function isSampleDay(date1,date2){
//            获取日期，如果为今日消费就是今天的日期
    var today = date1;

    if(date1.toString()=="今日消费"){
        today = new Date().toLocaleDateString();
    }
//  获取日期输入框的值
    var reg=new RegExp("-","g");
    var input_date =date2.substring(0,10).replace(reg,"/");

//  getTime()方法，就可以返回日期对应的数值
    var today1 = new Date(today).getTime();
    var input_date1 =  new Date(input_date).getTime();

    if((today1==input_date1) || (date2.length==0)){
        return true;
    }else{
        return false;
    }
}

//  如果是今日，则改为今日消费，否则返回日期
function now_date(){
    var today = new Date().toLocaleDateString();
    var reg=new RegExp("-","g");
    var input_date = $("#dtp_input1").val().substring(0,10).replace(reg,"/");
    var today1 = new Date(today).getTime();
    var input_date1 =  new Date(input_date).getTime();
    if(today1==input_date1){
        return "今日消费"
    }else{
        return  input_date;
    }
}

//  序列化表单
function serializeForm(){
    var data = {};
    $("#zhichuForm").serializeArray().map(function(x){data[x.name] = x.value;});
    return data;
}

//  用于清空表单
function clean(){
    $('#zhichuForm').bootstrapValidator("resetForm",true);
    $("#validateBtn").attr("onclick","validateSubmit()");
    //$("#validateBtn").click(function(event){
    //    event.preventDefault();
    //    $("#validateBtn").onclick = validateSubmit();
    //});
    $("#validateBtn").text("保存");
}
