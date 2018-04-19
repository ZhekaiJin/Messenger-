const express = require ('express')
const moogoose = require ('mongoose')

const DB_URL = 'mongodb://127.0.0.1:27017/imooc'
const app = express()

moogoose.connect(DB_URL)
moogoose.connection.on('connected', function(){
  console.log('mongo connect successedd')
})


const User = moogoose.model('user', new moogoose.Schema({
  user:{type:String, require:true},
  age:{type:Number, require:true}
}))

// User.create({
//   user:'scott',
//   age:18
//   },function(err,doc){
//     if(!err) {
//       console.log(doc)
//     }else{
//       console.log(err)
//     }
//   })
//
// User.remove({age:18},function(err,doc)){
//   console.log(doc)
// }

User.update({age:18},{'$set':{age:26}},function(err,doc){
  console.log(doc)
})
app.get('/', function (req,res){
  res.send('<h1>Hello world</h1>')
})

app.get('/data', function(req,res) {
  User.find({}, function(err,doc){
      res.json(doc)
  })
})

app.listen(9093, function() {
  console.log('Node app start at port 9093')
})
