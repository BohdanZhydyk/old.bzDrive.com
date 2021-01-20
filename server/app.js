const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongo = require('mongodb')
const mongoClient = mongo.MongoClient
const ObjectID = mongo.ObjectID
const { check, validationResult } = require('express-validator');
const { url, dbName } = require('./safe/safe')


const app = express()

app.use( cors() )

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


app.get('/', function(req, res){ res.send('error! no file index.html') })



mongoClient.connect(url, { useUnifiedTopology: true }, (error, client)=>{
	if (error){ console.log("can't connect to the DB") }
	else{

		let db = client.db(dbName)

		let statistic = (bzToken, from, IP, callback)=>{

			let generateToken = (len)=>{
				let char, id = ""; const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
				for(let i=0; i<len; i++){ char = Math.floor(Math.random() * Math.floor(chars.length)); id += chars[char] }
				return( id );
			}

			db.collection('bzAuth').findOne( {bzToken}, (error, result)=>{
				if(error){ if(error){ console.log(error) } }
				else{
					if(result){
						bzToken = result.bzToken,
						USER = result.USER
					}
					else{
						bzToken = generateToken(64)
						USER = {
							login: "man",
							role: "guest",
							email: false,
							lang: false,
							sex: false,
							ava: false
						}
					}
				}

				if( !IP ){ IP = "undefined" }

				db.collection('bzAuth').insertOne( {bzToken, from, USER, IP} )

				callback( {bzToken, USER} )
			})
			
		}

		app.get('/news', function(req, res){
			db.collection('bz_news').find({}).toArray( (error, result)=>{
				if(error){ console.log(error) }
				else{ res.send( result ) }
			})			
		})

		app.post('/start', function(req, res){
			statistic( req.body.bzToken, req.body.from, req.body.IP, (data)=>{
				db.collection('startData').findOne({ _id: new ObjectID('5fe7f755ec292415da008350')}, (error, result)=>{
					if(error){ console.log(error) }
					else{ res.send( {result, bzToken: data.bzToken, USER: data.USER} ) }
				})
			})
		})

		app.post('/auth',
			[
				check('login').isLength({ min:4, max:16 }).withMessage(' - musi zawierać od 4 do 16 znaków!'),
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
				statistic( req.body.bzToken, req.body.from, req.body.IP, (data)=>{

					const errValid = validationResult(req)
					let err = {}
					for(let i=0; i<errValid.errors.length; i++){
						if( errValid.errors[i].param === "login" 	){ err.login 	= errValid.errors[i].msg }
						if( errValid.errors[i].param === "email" 	){ err.email 	= errValid.errors[i].msg }
						if( errValid.errors[i].param === "pass" 	){ err.pass 	= errValid.errors[i].msg }
						if( errValid.errors[i].param === "pass1" 	){ err.pass1 	= errValid.errors[i].msg }
						if( errValid.errors[i].param === "pass2" 	){ err.pass2 	= errValid.errors[i].msg }
					}

					if(req.body.form === "login" && !err.login && !err.pass){
						db.collection('bzUsers').findOne({ login: req.body.login }, (error, result)=>{
							console.log(req.body.pass)
							console.log(result)
							if(error){ console.log(error) }
							else{
								if(!result){
									err.login = ' - niema takiego usera w bazie danych!'
									res.send( {err, bzToken: data.bzToken} )
								}
								else{
									if(req.body.pass !== result.pass){
										err.pass = ' - wprowadzone nieprawidlowe haslo!'
										res.send( {err, bzToken: data.bzToken} )
									}
									else{
										res.send({
											err: false,
											bzToken: data.bzToken,
											USER: {
												login: result.login,
												role: result.role,
												email: result.email,
												lang: result.lang,
												sex: result.sex,
												ava: result.ava
											}
										})
									}
								}
							}
						})
					}
					else if(req.body.form === "signin" && !err.login && !err.email && !err.pass1 && !err.pass2){
						err.form = req.body.form
						err.ok = true
						err.msg = "signin OK"
					}
					else if(req.body.form === "forgot" && !err.email && !err.pass1 && !err.pass2){
						err.form = req.body.form
						err.ok = true
						err.msg = "forgot OK"
					}
					else{
						res.send( {err, bzToken: data.bzToken, USER: data.USER} )
					}

					// console.log('body', req.body)
					// console.log('data', data)
					// console.log('err', err)

				})
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