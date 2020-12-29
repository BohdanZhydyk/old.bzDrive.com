const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoClient = require('mongodb').MongoClient
const { check, validationResult } = require('express-validator/check');
const { url, dbName } = require('./safe/safe')



const app = express()

app.use( cors() )

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


app.get('/', function(req, res){ res.send('error! no file index.html') })



mongoClient.connect(url, {}, (error, client)=>{
	if (error){ console.log("can't connect to the DB") }
	else{

		let db = client.db(dbName)

		app.get('/news', function(req, res){
			db.collection('bz_news').find({}).toArray( (error, result)=>{
				if(error){ console.log(error) }
				else{ res.send( result ) }
			})			
		})

		app.get('/start', function(req, res){
			db.collection('startData').find({}).toArray( (error, result)=>{
				if(error){ console.log(error) }
				else{ res.send( result ) }
			})
		})

		app.post('/login',
			[
				check('login').isLength({ min:8, max:16 }).withMessage(' - musi zawierać od 8 do 16 znaków!'),
				check('login').isAlphanumeric().withMessage(' - może zawierać cyfry 0-9 i litery A-Z a-z!'),
				check('email').isEmail().withMessage(' - wprowadzono nieprawidłowy e-mail!'),
				check('email').isLength({ min:1 }).withMessage(' - wypełnij dane pole!'),
				check('login').isLength({ min:1 }).withMessage(' - wypełnij dane pole!'),
				check('pass')	.isLength({ min:8, max:16 }).withMessage(' - musi zawierać od 8 do 16 znaków!'),
				check('pass')	.isAlphanumeric().withMessage(' - może zawierać cyfry 0-9 i litery A-Z a-z!'),
				check('pass')	.isLength({ min:1 }).withMessage(' - wypełnij dane pole!'),
				check('pass1').isLength({ min:8, max:16 }).withMessage(' - musi zawierać od 8 do 16 znaków!'),
				check('pass1').isAlphanumeric().withMessage(' - może zawierać cyfry 0-9 i litery A-Z a-z!'),
				check('pass1').isLength({ min:1 }).withMessage(' - wypełnij dane pole!'),
				check('pass2').isLength({ min:8, max:16 }).withMessage(' - musi zawierać od 8 do 16 znaków!'),
				check('pass2').isAlphanumeric().withMessage(' - może zawierać cyfry 0-9 i litery A-Z a-z!'),
				check('pass2').isLength({ min:1 }).withMessage(' - wypełnij dane pole!'),
			],
			(req, res) => {
				const errValid = validationResult(req)
				let err = {}
				for(let i=0; i<errValid.errors.length; i++){
					if( errValid.errors[i].param === "login" 	){ err.login 	= errValid.errors[i].msg }
					if( errValid.errors[i].param === "email" 	){ err.email 	= errValid.errors[i].msg }
					if( errValid.errors[i].param === "pass" 	){ err.pass 	= errValid.errors[i].msg }
					if( errValid.errors[i].param === "pass1" 	){ err.pass1 	= errValid.errors[i].msg }
					if( errValid.errors[i].param === "pass2" 	){ err.pass2 	= errValid.errors[i].msg }
				}
				res.send( err )
		})

	}
})





// app.route('/book')
//   .get(function(req, res) {
//     res.send('Get a random book');
//   })
//   .post(function(req, res) {
//     res.send('Add a book');
//   })
//   .put(function(req, res) {
//     res.send('Update the book');
//   });

// app.post('/login', function(req, res){

// 	res.json( req.body )
	
// })



app.listen(5000, function(){
	console.log('API app started on port 5000')
})