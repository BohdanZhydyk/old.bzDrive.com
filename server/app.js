const express = require('express')
const cors = require('cors')

const { InOut } = require('./InOut')


const app = express()
app.use( cors() )
app.use( express.json() )


app.all('/', (req, res)=>{ InOut(req.route.path, req, res) })


const port = 5000

app.listen(port, ()=>{
	console.log(`API app started on port ${port}`)
})
