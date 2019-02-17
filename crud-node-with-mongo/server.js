const express = require('express');
const bodyParser  = require('body-parser')
const app = express();

var MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017/mydb"
var dbo 

MongoClient.connect(url,function (err, db){
	
	if (err) throw err;

	dbo = db.db("mydb")
	app.listen(3000, () =>{
		console.log('listening 3000')
	})	

})

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html')
})

app.post('/sendData', (req, res) =>{
	dbo.collection('customers').save(req.body, (err, result) => {
		if (err) return console.log(err)
		console.log('saved to databases')
		res.redirect('/')
	})
})

app.get('/getData', (req, res)=>{	
	dbo.collection('customers').find().toArray((err, result) =>{
		if (err)return console.log(err)		
		res.send(result)		
	})	
})

app.delete("/delData/:id", (req, res) =>{
    let query = { id : req.params.id }        
    dbo.collection("customers").deleteOne(query, function (err, obj){
        if (err) throw err
        console.log("1 document deleted")
    })
})

app.put("/putData/:id", (req, res) => {            
    let query = { id : req.params.id }
    let newValues = { $set : { name : req.body.name, surname : req.body.surname }}

    dbo.collection("customers").updateOne(query, newValues, function(err, res){
        if (err) throw err
        console.log("1 document updated")
        
    })    
})




