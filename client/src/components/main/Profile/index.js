import React, { useState, useEffect } from 'react'

import './Profile.scss'
import {
  GET_PROFILE, GET_TRAFFIC, GET_USERS, CHG_AVA
} from "./actions"
import { bzGetUser } from './../../../state/functions'
import { ScreenSaver } from '../../All/ScreenSaver'
import { ProfileSection } from './ProfileSection'
import { Users } from './Users'


const ProfileApp = ({ props:{appFn} })=>{

  const [profile, setProfile] = useState(false)

  let ProFn = (action)=>{
    switch(action.type){
      case "GET_PROFILE":    GET_PROFILE(action, profile, setProfile);      break
      case "GET_TRAFFIC":    GET_TRAFFIC(action);                           break
      case "GET_USERS":      GET_USERS(action);                             break
      case "CHG_AVA":        CHG_AVA(action, profile, setProfile, appFn);   break
      default: return
    }
  }

  useEffect( ()=>{ !profile && ProFn({ type:"GET_PROFILE", login:bzGetUser().login }) },[])

  return(
    <div className="Profile flex column">

    {
      !profile
      ?
      <ScreenSaver />
      :
      <>
        <div className="ProfileTitle bold flex">{`Mój profil`}</div>
  
        <ProfileSection props={{full:true, profile, ProFn, dl:true}} />
  
        { profile.role === "admin" && <Users props={{profile, ProFn}} /> }
      </>
    }

    </div>
  )
}

export default ProfileApp