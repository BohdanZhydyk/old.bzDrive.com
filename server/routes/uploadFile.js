const fs = require('fs')

exports.uploadFile = (req, res)=>{
  
  const file = req.files.file
  
  const fileAddr = __dirname + "/../public/" + req.body.fileAddr
  let fileName = (req?.body?.fileName === true) ? req.body.fileName : file.name

  fs.mkdir( fileAddr, { recursive: true }, (err)=>{

    if(err) throw err
    
    file.mv(`${fileAddr}${fileName}`, (err)=>{

      if(err) res.status(500).send({ message:"File upload failed" })

      res.status(200).send({
        name:file.name,
        size:file.size,
        mimetype:file.mimetype
      })

    })

  })

}