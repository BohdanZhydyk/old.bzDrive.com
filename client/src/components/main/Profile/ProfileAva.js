import React from 'react'

import { UploadFile } from '../../All/UploadFile'


export const ProfileAva = ({ props:{profile, ProFn} })=>{

  let fileAddr = `files/users/`
  let fileName = `${profile.login}_${Date.now()}.png`

  let CHG_AVA = (data)=> ProFn({
    type:"CHG_AVA",
    login:profile.login,
    fileAddr,
    oldFile:profile.ava,
    newFile:fileName
  })

  let props = {
    txt:`zmienic avatarkę...`,
    fileAddr,
    fileName,
    accept:`image/png`,
    multiple:false,
    callback: (data)=> CHG_AVA(data)
  }

  return(
    <div className="ProfileAva flex wrap">

      <img src={`https://bzdrive.com/files/users/${profile.ava}`} alt="ava" />
    
      <div className="DownloadAva flex">

        <UploadFile props={props}/>
        
      </div>

    </div>
  )
}