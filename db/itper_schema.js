// 链接 itper 集合
var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://127.0.0.1:27017/itper');

// 链接错误
db.on('error', function(error) {
  console.log(error);
});

// Schema 结构
var Schema = mongoose.Schema;
var userlistScheMa = new Schema({
  name	   : {type : String},
  numbers  : {type : String},
  majior   : {type : Number},
  sex      : {type : Number},
  character: {type : Number} 
});

var adminlistScheMa = new Schema({
	user     : {type : String, unique : true},
	password : {type : String}
});
// 关联表
exports.infolist = db.model('infos', userlistScheMa);
exports.adminlist =  db.model('admins', adminlistScheMa);
exports.db = db;