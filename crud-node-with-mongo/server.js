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

app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static(__dirname + '/'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html')
})

app.get('/registerUser', (req, res) => {
	res.sendFile(__dirname + '/registerUser.html')	
})


app.post('/sendData', (req, res) =>{
	
	console.log(req.body)

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


app.delete("/delData/:v1", (req, res) =>{
    /*    const idx = req.params.v1
    
    for(var i = 0; i < DataArray.length; i++){
        var obj = DataArray[i]

        if (DataArray[i].idx == idx){
            DataArray.pop(obj)
            return
        }
    } */
})



app.put("/putData/:v1", (req, res) => {
    /* const idx = req.params.v1
    const name = req.body.name
    const value = req.body.value
    
    for(var i = 0; i < DataArray.length; i++){
        var obj = DataArray[i]

        if (DataArray[i].idx == idx){
            DataArray[i].name = name
            DataArray[i].value = value
            return
        }
    } */
})




