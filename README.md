# DailyRecord

>DailyRecord是一个用于生活记账的网站

## 所用技术

**Express**

基于NodeJS的Web开发框架


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

**sequelize**

[GitHub地址](https://github.com/sequelize/sequelize)

只用到了一些基本功能，比起手写sql语句不知道高到哪里去了，只有英文文档，也还好

钩子，事物等一些高级功能没有用到

**highcharts**

[官网地址](http://www.highcharts.com/)

[中文地址](https://www.hcharts.cn/)

数据可视化图标插件，个人觉得非常好用，API文档非常详细，有中文文档，一些配置也很简单

在我的这个个人项目中，我的支出收入种类所占比例图（比如说，今年，书籍花了多少，占你的支出的百分比），还有全年的收入和支出的趋势图


## 完成进度

2016/09/21：可以选择日期进行显示消费记录

2016/10/21：支出Jquery写的单页面CRUD，DOM操作居多，非常不方便

2016/11/21：收入VUE+VUE_RESOUCE写的CRUD，非常方便

2016/11/24：完成我的首页功能模块

2016/12/02：将以前的手写sql转成ORM框架 首页新增标注列表查询

2016/01/07：完成个人中心，包括年度支出和收入的趋势，查看特定日期和特定种类的收入和支出列表和图
