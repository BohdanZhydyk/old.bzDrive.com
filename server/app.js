const express = require('express')
const cors = require('cors')
const fileupload = require('express-fileupload')
const bodyParser = require('body-parser')

const { unixToDateTimeConverter } = require('./functions.js')


const { getState }			= require('./routes/getState')
const { getWorkshop }		= require('./routes/getWorkshop')
const { getOffice }			= require('./routes/getOffice')
const { getTraffic }		= require('./routes/getTraffic')
const { getCV }					= require('./routes/getCV')
const { getCookies }		= require('./routes/getCookies')
const { getPass }				= require('./routes/getPass')
const { getFin }				= require('./routes/getFin')
const { getProfile }		= require('./routes/getProfile')
const { uploadFile }		= require('./routes/uploadFile')
const { deleteFile }		= require('./routes/deleteFile')
const { auth }					= require('./routes/auth/auth')

const { ChangeDB }			= require('./safe/ChangeDB')


const app = express()
app.use( cors() )
app.use( express.json() )
app.use(fileupload())
app.use(express.static("files"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/*', (req, res) => res.sendFile( __dirname + "/public/index.html" ) )

app.use(express.static('public'))
app.use('/files', express.static('files'))

app.post('/getState', 			(req, res)=> getState(req, res) 		)
app.post('/getWorkshop', 		(req, res)=> getWorkshop(req, res) 	)
app.post('/getOffice', 			(req, res)=> getOffice(req, res) 		)
app.post('/getTraffic', 		(req, res)=> getTraffic(req, res) 	)
app.post('/getCV', 					(req, res)=> getCV(req, res) 				)
app.post('/getPass', 				(req, res)=> getPass(req, res) 			)
app.post('/getFin', 				(req, res)=> getFin(req, res) 			)
app.post('/getProfile', 		(req, res)=> getProfile(req, res) 	)
app.post('/getCookies', 		(req, res)=> getCookies(req, res) 	)
app.post('/uploadFile', 		(req, res)=> uploadFile(req, res) 	)
app.post('/deleteFile', 		(req, res)=> deleteFile(req, res) 	)

app.post('/auth', (req, res)=> auth(req, res) )


// ChangeDB() // for czanges in DB

const PORT = 5000
let DT = unixToDateTimeConverter()
let txt = `API started on PORT ${PORT} - ${DT.hour}:${DT.min}:${DT.sec}-${DT.day}/${DT.month}/${DT.year}`
app.listen( PORT, ()=> console.log(txt) )