const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoClient = require('mongodb').MongoClient
const { url, dbName } = require('./safe/safe')


const app = express()

app.use( cors() )

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


app.get('/', function(req, res){ res.send('error! no file index.html') })


app.get('/news', function(req, res){

	mongoClient.connect(url, {}, (error, client)=>{
		if (error){ console.log("can't connect to the DB") }
		else{
			client.db(dbName).collection('users').find({
				name: 'bz'
			}).toArray( (error, result)=>{
				console.log(result)
				res.send( result )
			})
		}
	})
	
})


app.listen(5000, function(){
	console.log('API app started on port 5000')
})