const express = require('express')
const cors = require('cors')

const { InOut } = require('./InOut')


const app = express()
app.use( cors() )
app.use( express.json() )

app.get('/*', (req, res)=> InOut(req.route.path, req, res) )

app.post('/auth', (req, res)=> InOut(req.route.path, req, res) )
app.post('/drive', (req, res)=> InOut(req.route.path, req, res) )
app.post('/cv', (req, res)=> InOut(req.route.path, req, res) )
app.post('/news', (req, res)=> InOut(req.route.path, req, res) )
app.post('/office', (req, res)=> InOut(req.route.path, req, res) )
app.post('/workshop', (req, res)=> InOut(req.route.path, req, res) )
app.post('/statistic', (req, res)=> InOut(req.route.path, req, res) )


const port = 5000
app.listen(port, ()=>{
	console.log(`API app started on port ${port}`)
})
