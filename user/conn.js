/*
	数据库的连接
 */
var db = function localConnect(){
	return require('mysql').createConnection({
		host   : 'localhost',
		user   : 'root',
		password : '123456',
		charset : 'utf8_general_ci',
		database: 'dailyrecord',
		//开启多语句查询
		multipleStatements:true
	});

	connection.connect();
}

module.exports.localConnect = db;
