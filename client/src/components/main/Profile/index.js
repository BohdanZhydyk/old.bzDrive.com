import React, { useState } from 'react'

import './Profile.scss'
import { bzGetUser } from './../../../state/functions'
import { ScreenSaver } from '../../All/ScreenSaver'
import { Information } from './Information'
import { Security } from './Security'
import { Activity } from './Activity'
import { Protection } from './Protection'
import { ProfileAva } from './ProfileAva'


const ProfileApp = ()=>{

  const [profile, setProfile] = useState( bzGetUser() )

  const [sections, setSections] = useState([
    {txt:"Informacja", component:<Information props={{ profile }} />, act:true},
    {txt:"Bezpieczeństwo", component:<Security props={{}} />},
    {txt:"Historja aktywnośći", component:<Activity props={{}} />},
    {txt:"Ochrona danych", component:<Protection props={{}} />}
  ])

  let OPEN = (i)=> setSections(
    sections.map( (el, n)=>
      (n === i) ? {...el, act:true} : {...el, act:false}
    )
  )

  return(
    <>
    {
      !profile
      ?
      <ScreenSaver />
      :
      <div className="Profile flex stretch wrap">

        <ProfileAva props={{profile}} />
      
        <div className="ProfileInfo">
        {
          sections.map( (el, i)=>{
            return(
              <section key={`ProfileInfo_${el.txt}_${el.i}`}>

                <div className="ProfileTheme bold" onClick={ ()=>OPEN(i) }>{el.txt}</div>

                { el.act && <div>{el.component}</div> }

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