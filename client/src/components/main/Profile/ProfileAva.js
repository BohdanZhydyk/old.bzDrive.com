import React from 'react'

import { bzGetUser } from './../../../state/functions'
import { UploadFile } from '../../All/UploadFile'


export const ProfileAva = ({ props:{profile} })=>{

  let img = `https://bzdrive.com/files/users/${profile.login ? profile.login : `man`}.png`

  let props = {
    txt:`zmienic avatarkę...`,
    fileAddr:`files/users/`,
    fileName:`${bzGetUser().login}.png`,
    accept:`image/png`,
    multiple:false
  }

  return(
    <div className="ProfileAva flex wrap">

      <img src={img} alt="ava" />
    
      <div className="DownloadAva flex">

        <UploadFile props={props}/>
        
      </div>

    </div>
  )
}