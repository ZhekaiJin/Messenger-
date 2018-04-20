const express = require('express')
const utils = require('utility') //for md5
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const _filter = {'pwd':0,'__v':0} //dont show passwd in response


Router.get('/list',function(req, res){
	// User.remove({},function(e,d){}) use this if you want to clear all users
	User.find({},function(err,doc){
		return res.json(doc)
	})
})
Router.post('/login', function(req,res){
	const {user, pwd} = req.body
	User.findOne({user,pwd:md5Pwd(pwd)},_filter,function(err,doc){
		if (!doc) {
			return res.json({code:1,msg:'Username or password error'})
		}
		res.cookie('userid', doc._id) //save userid in cookie
		return res.json({code:0,data:doc})
	})
})
Router.post('/register', function(req, res){
	const {user, pwd, type} = req.body
	//check duplicate
	User.findOne({user},function(err,doc){
		if (doc) {
			return res.json({code:1,msg:'Username duplicate'})
		}
		const userModel = new User({user,type,pwd:md5Pwd(pwd)})
		userModel.save(function(e,d){
			if (e) {
				return res.json({code:1,msg:'Backend went wrong'})
			}
			const {user, type, _id} = d
			res.cookie('userid', _id)
			return res.json({code:0,data:{user, type, _id}})
		})
	})
})
Router.get('/info',function(req, res){
	const {userid} = req.cookies //get cookie
	if (!userid) {
		return res.json({code:1})  //plz go login
	}
	User.findOne({_id:userid} , _filter , function(err,doc){
		if (err) {
			return res.json({code:1, msg:'Backend went wrong'})
		}
		if (doc) {
			return res.json({code:0,data:doc})  //sccuess
		}
	})
})

function md5Pwd(pwd){
	const salt = 'scott is genuis !@#IUHJh~~'
	return utils.md5(utils.md5(pwd+salt))
}


module.exports = Router
