const mongoose = require('mongoose')
// link mongodb
const DB_URL = 'mongodb://localhost:27017/messenge'
mongoose.connect(DB_URL)


const models = {
	user:{
		'user':{type:String, 'require':true},
		'pwd':{type:String, 'require':true},
		'type':{'type':String, 'require':true},
		//avatar
		'avatar':{'type':String},
		// personal introduction
		'desc':{'type':String},
		// title
		'title':{'type':String},
		// if you are a professor
		'Department':{'type':String},
		'number':{'type':String}
	},
	chat:{
	}
}

for(let m in models){
	mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
	getModel:function(name){
		return mongoose.model(name)
	}
}
