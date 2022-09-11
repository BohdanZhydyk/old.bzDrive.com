import React from 'react'

import { DigLen, bzBytesCalc } from '../../../../../state/functions'
import { UploadFile } from "../../../../All/UploadFile"


export const ElFiles = ({ props:{nr, files, print, AreaFn} })=>{

  let icoShow = "https://bzdrive.com/files/ico/icoShow.png"
  let icoDelete = "https://bzdrive.com/files/ico/icoDelete.png"
  let icoDownload = "https://bzdrive.com/files/ico/icoDownload.png"
  let icoPlus = "https://bzdrive.com/files/ico/icoPlus.png"

  let FileTypeToIco = (type)=>{
    switch(type){
      case "text/plain":                return {type:"txt", ico:"https://bzdrive.com/files/ico/fileTXT.png"}
      case "application/octet-stream":  return {type:"bin", ico:"https://bzdrive.com/files/ico/fileBIN.png"}
      case "image/png":                 return {type:"png", ico:"https://bzdrive.com/files/ico/filePNG.png"}
      case "application/pdf":           return {type:"pdf", ico:"https://bzdrive.com/files/ico/filePDF.png"}
      default:                          return {type:"def", ico:"https://bzdrive.com/files/ico/fileDEF.png"}
    }
  }

  let fileAddr = `files/ZL/${DigLen(nr.year, 4)}${DigLen(nr.month, 2)}${DigLen(nr.sign, 4)}/`

  let props = {
    txt:`dodać plik...`,
    fileAddr,
    fileName:false,
    accept:false,
    multiple:false,
    callback: (data)=>{
      AreaFn({
        type:`ADD_FILE`,
        file:{
          fileAddr,
          fileName:data.name,
          fileSize:data.size,
          fileType:data.mimetype
        }
      })
    }
  }

  return(
    <>
    {
      (!print) &&
      <div className="ElFiles flex wrap">

        <div className="title bold flex start">
          {"Pliki"}
        </div>

        {
          files &&
          <div className="File flex">
            <div className="FileName txtYlw flex start bold">{`Nazwa`}</div>
            <div className="FileSize txtYlw flex start bold">{`Rozmiar`}</div>
            <div className="FileBtns txtYlw flex bold">{`Akcje`}</div>
          </div>
        }

        {
          files &&
          files.map( (file, n)=>{

            let key = `FileLine${n}`
            let href = `${window.location.origin}/${file.fileAddr}${file.fileName}`
            
            return(
              <div className="File FileActive flex" key={key}>
                <div className="FileName flex start">
                  <img src={FileTypeToIco(file.fileType).ico} alt={FileTypeToIco(file.fileType).type} />
                  <span>{file.fileName}</span>
                </div>
                <div className="FileSize flex start">{bzBytesCalc(file.fileSize)}</div>
                <div className="FileBtns flex end">

                  {/* <img className="imgBtn" src={icoShow} title="usunąć plik" alt="show" /> */}

                  <a href={href} download={file.fileName} target="_blank" rel="noreferrer" >
                    <img className="imgBtn" src={icoDownload} title="pobrać plik" alt="download" />
                  </a>

                  <img className="imgBtn" src={icoDelete} title="usunąć plik" alt="delete" />

                </div>
              </div>
            )
          })
        }

        <div className="AddNewFileArea flex">
          <UploadFile props={props}/>
        </div>

      </div>
    }
    </>
  )
}