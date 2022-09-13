import React, { useState } from 'react'

import axios from 'axios'


export const UploadFile = ({ props:{txt, fileAddr, fileName, accept, multiple, callback} })=>{

  const [file, setFile] = useState()

  const [err, setErr] = useState()

  const CHANGE = (e)=> setFile(e.target.files[0])

  const CLEAR = ()=> setFile()

  const UPLOADED = (data)=>{
    CLEAR()
    callback(data)
  }
  
  const SUBMIT = (e)=>{

    e.preventDefault()

    const formData = new FormData()

    formData.append('file', file)
    formData.append('fileName', fileName ? fileName : file.name)
    formData.append('fileAddr', fileAddr)

    const config = { headers: {'content-type': 'multipart/form-data'} }

    let link = 'https://bzdrive.com/uploadFile' //'http://localhost:5000/uploadFile'
    
    axios.post( link, formData, config).then( (res)=>{
      res.status === 200
      ? UPLOADED(res.data) //res.data = {name, size, mimetype}
      : setErr(res.data.message)
    })

  }

  return(
    <form className="UploadInput flex column" onSubmit={SUBMIT}>

      <label htmlFor="InputTag" className="InputTag flex wrap">

      { !file?.name && <span>{ txt ? txt : `Select File` }</span> }

        { file?.name && <span className="FileName flex">{file.name}</span> }

        <input
          id="InputTag"
          type="file"
          style={{display:"none"}}
          onChange={CHANGE}
          accept={accept} // image/png, image/jpg, image/gif, image/jpeg
          multiple={multiple}
        />

      </label>

      { err && <div>error</div> }

      {
        file?.name &&
        <div className="UplBtns flex">
          <input className="UplBtn redBtn flex" type="button" value="oczyscic" onClick={CLEAR} />
          <input className="UplBtn grnBtn flex" type="submit" value="przeslac" />
        </div>
      }

    </form>
  )
}