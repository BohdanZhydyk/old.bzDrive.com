const express = require('express')
const cors = require('cors')

const { getState }			= require('./routes/getState')
const { getWorkshop }		= require('./routes/getWorkshop')
const { getOffice }			= require('./routes/getOffice')
const { getTraffic }		= require('./routes/getTraffic')
const { getCV }					= require('./routes/getCV')
const { getCookies }		= require('./routes/getCookies')
const { auth }					= require('./routes/auth/auth')

const { ChangeDB }			= require('./safe/ChangeDB')


const app = express()
app.use( cors() )
app.use( express.json() )

app.get('/*', (req, res) => res.sendFile( __dirname + "/public/index.html" ) )

app.post('/getState', (req, res)=> getState(req, res) )

app.post('/getWorkshop', 		(req, res)=> getWorkshop(req, res) 	)
app.post('/getOffice', 			(req, res)=> getOffice(req, res) 		)
app.post('/getTraffic', 		(req, res)=> getTraffic(req, res) 	)
app.post('/getCV', 					(req, res)=> getCV(req, res) 				)
app.post('/getCookies', 		(req, res)=> getCookies(req, res) 	)

app.post('/auth', (req, res)=> auth(req, res) )


// ChangeDB() // for czanges in DB


const port = 5000
app.listen(port, ()=>{
	console.log(`API app started on port ${port}`)
})