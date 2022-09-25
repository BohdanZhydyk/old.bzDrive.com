import React from 'react'

import './ProfileAva.scss'
import { UploadFile } from '../../../All/UploadFile'


const ProfileAva = ({ props:{query, fileAddr, oldFile, newFile, profile, ProFn, dl} })=>{

  let ava = profile?.ava ? profile.ava : (profile?.sex ? `${profile.sex}.png` : `male.png`)

  let props = {
    txt:`Zmień awatar...`,
    fileAddr,
    fileName:newFile,
    accept:`image/png`,
    multiple:false,
    callback: (cbData)=> ProFn({type:"CHG_AVA", query, fileAddr, oldFile, newFile, cbData})
  }

  return(
    <div className="ProfileAva flex wrap">

      <div className="AvaImg flex">
        <img src={`https://bzdrive.com/${fileAddr}${ava}`} alt="ava" />
      </div>

      {
        dl &&
        <div className="DownloadAva flex">

          <UploadFile props={props}/>
          
        </div>
      }

    </div>
  )
}

export default ProfileAva