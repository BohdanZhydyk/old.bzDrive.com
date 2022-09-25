const fs = require('fs')

exports.deleteFile = (req, res)=>{
  
  const fileAddr = __dirname + "/../public/" + req.body.fileAddr
  const fileName = req.body.fileName

  fs.stat(`${fileAddr}${fileName}`, (err, stats)=>{

    // console.log(stats) //here we got all information of file in stats variable

    if(err) return console.error(err)

    fs.unlink(`${fileAddr}${fileName}`, (err)=>{

      if(err) throw err

      let msg = `File "https://bzdrive.com/${req.body.fileAddr}${fileName}" deleted successfully!`

      res.status(200).send({ message: msg, stats })

    })

  })

}