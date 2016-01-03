var mongoose = require('mongoose');
var db       = mongoose.createConnection('mongodb://localhost:27017/store'); 
var Schema   = mongoose.Schema;

// 链接错误
db.on('error', function(error) {
    console.log(error);
});


var userSchema = new Schema({
	u_name:{type: String,default:'xzh'},
	u_age:{type:Number,min:18,index:true},
	u_date:{type:Date,default:Date.now}
})

var userModel = db.model('mongoose',userSchema);

var doc = {u_name:'xuzhaohui2',u_age:26}
var userEntity = new userModel(doc);
userModel.create(doc, function(error){
    if(error) {
        console.log(error);
    } else {
        console.log('save ok');
    }    
    db.close();
});
