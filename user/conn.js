/*
	数据库的连接
 */
var db = function localConnect(){
	return require('mysql').createConnection({
		host   : 'localhost',
		user   : 'root',
		password : '123456',
		charset : 'utf8_general_ci',
		database: 'dailyrecord'
	});

	connection.connect();
}

module.exports.localConnect = db;
