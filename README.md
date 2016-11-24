# DailyRecord

>DailyRecord是一个用于生活记账的网站

## 所用技术

**Express**

基于NodeJS的Web开发框架

这个项目也就用了路由得到请求地址，然后用一个管理模块来管理增删改查，一个SQL模块进行数据库操作，就是MVC

[官方地址](http://www.expressjs.com.cn/)


**BootStrap**

页面是用BootStrap写的，像我这种后端开发人员，BootStrap写的页面布局简单，简洁大方

**JQuery**

单页应用用JQuery总觉得有点作死，DOM操作太多了

**DateTime Picker**

BootSTrap风格的日期选择插件

[GitHub地址](https://github.com/smalot/bootstrap-datetimepicker)

**bootstrapvalidator**

基于JQuery的BootStrap 表单验证插件

我也就用到了了，表单验证，自带ajax，感觉不好用，还有其他的一功能，慢慢探索吧

[官网地址](http://bv.doc.javake.cn/)

**VUE 2.0**

[GitHub地址](https://github.com/vuejs/vue)


**vue-resource**

[GitHub地址](https://github.com/pagekit/vue-resource)


**MySQL**

开始是用的简单的SQL语句

在收入用了一个视图，来获取每个月的收入总金额、收入账目数

用一个存储过程，来获得总的账目数、收入金额、支出金额，极大的简化了SQL语句

对收入和支出表写了update和insert触发器，用来对table_star表进行操作

## 项目心得

- 不同的项目需求选择不同的框架，像我这个记账的，轻量级，就不要用SSM这种框架来写了
- 不精通前端，还是老老实实用BootStrap来写
- 多用Google和[stackoverflow](http://stackoverflow.com/)来查找问题，事半功倍


## 完成进度

2016/09/21：可以选择日期进行显示消费记录
2016/10/21：支出Jquery写的单页面CRUD，DOM操作居多，非常不方便
2016/11/21：收入VUE+VUE_RESOUCE写的CRUD，非常方便
2016/11/24：完成我的首页功能模块
