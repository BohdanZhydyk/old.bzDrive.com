const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoClient = require('mongodb').MongoClient
const { check, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
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

				check('login').isAlphanumeric().withMessage(' - musi zawierac symboli (a-z A-Z 0-9)!')
											.isLength({ min:8, max:16 }).withMessage(' - musi zawierac od 8 do 16 symboli!')
											.isLength({ min:1 }).withMessage(' - nie moze byc puste!'),

				// check('email').isEmail().withMessage(' - nieprawidlowy!')
				// 							.isLength({ min:1 }).withMessage(' - nie moze byc puste!'),

				check('pass')	.isAlphanumeric().withMessage(' - musi zawierac symboli (a-z A-Z 0-9)!')
											.isLength({ min:8, max:16 }).withMessage(' - musi zawierac od 8 do 16 symboli!')
											.isLength({ min:1 }).withMessage(' - nie moze byc puste!'),

			],
			(req, res) => {

				const errors = validationResult(req)
				
				console.log(errors.errors)

				// login .trim()
				// email .normalizeEmail().toLowerCase()
			
				console.log( {login:req.body.login, email:req.body.email, pass:req.body.pass} )

				// (req, res, next) => {
				// 		// Extract the validation errors from a request.
				// 		const errors = validationResult(req);
				
				// 		if (!errors.isEmpty()) {
				// 				// There are errors. Render form again with sanitized values/errors messages.
				// 				// Error messages can be returned in an array using `errors.array()`.
				// 				}
				// 		else {
				// 				// Data from form is valid.
				// 		}
				// }
				

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