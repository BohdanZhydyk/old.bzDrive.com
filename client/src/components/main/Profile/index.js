import React, { useState, useEffect } from 'react'

import './Profile.scss'
import {
  GET_PROFILE, OPEN_SECTION, CHG_AVA
} from "./actions"
import { bzGetUser } from './../../../state/functions'
import { ScreenSaver } from '../../All/ScreenSaver'
import { Information } from './Information'
import { Security } from './Security'
import { Activity } from './Activity'
import { Protection } from './Protection'
import { ProfileAva } from './ProfileAva'


const ProfileApp = ()=>{

  const [profile, setProfile] = useState(false)

  const [sections, setSections] = useState([
    { txt:"Informacja",          component:<Information props={{profile}} />, act:true  },
    { txt:"Bezpieczeństwo",      component:<Security props={{}} />                      },
    { txt:"Historja aktywnośći", component:<Activity props={{}} />                      },
    { txt:"Ochrona danych",      component:<Protection props={{}} />                    }
  ])

  let ProFn = (action)=>{
    console.log("action",action)
    switch(action.type){
      case "GET_PROFILE":    GET_PROFILE(action, profile, setProfile);      break
      case "OPEN_SECTION":   OPEN_SECTION(action, sections, setSections);   break
      case "CHG_AVA":        CHG_AVA(action, profile, setProfile);          break
      default: return
    }
  }

  useEffect( ()=>{ !profile && ProFn({ type:"GET_PROFILE", login:bzGetUser().login }) },[])

  console.log("profile",profile)

  return(
    <>
    {
      !profile
      ?
      <ScreenSaver />
      :
      <div className="Profile flex stretch wrap">

        <ProfileAva props={{profile, ProFn}} />
      
        <div className="ProfileInfo">
        {
          sections.map( (el, i)=>{
            return(
              <section key={`ProfileInfo_${el.txt}_${el.i}`}>

                <div className="ProfileTheme bold" onClick={ ()=> ProFn({type:"OPEN_SECTION", nr:i}) }>
                  {el.txt}
                </div>

                {
                  el.act &&
                  <div>{el.component}</div>
                }

              </section>
            )
          })
        }
        </div>

      </div>
    }

    </>
  )
}

export default ProfileApp