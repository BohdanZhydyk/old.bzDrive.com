const express = require('express')
const cors = require('cors')

var bodyParser = require('body-parser')

const { InOut } = require('./InOut')

const { statistic }	= require('./routes/statistic')

const { auth }	= require('./routes/auth/auth')



const app = express()

app.use( cors() )

app.use(bodyParser.json())


app.all('/', (req, res)=>{ InOut(req.route.path, req, res) })

app.post('/statistic', (req, res)=>{ statistic(req, res) })


const port = 5000

app.listen(port, ()=>{
	console.log(`API app started on port ${port}`)
})
