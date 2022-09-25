import React, { useState } from 'react'

import './Profile.scss'
import { ScreenSaver } from '../../All/ScreenSaver'
import { Information } from './Information'
import { Security } from './Security'
import { Activity } from './Activity'
import { Protection } from './Protection'
import ProfileAva from './ProfileAva'


export const ProfileSection = ({ props:{full, profile, ProFn, dl} })=>{

  let login = profile.login
  let fileAddr = `files/users/`
  let oldFile = profile.ava
  let newFile = `${profile.login}_${Date.now()}.png`
  let query = [{login}, {ava:newFile}]

  let sections1 = [
    { txt:"Informacja",          component: (profile)=> <Information props={{profile}} />, act:true   },
    { txt:"Historja aktywnośći", component: (profile)=> <Activity props={{login, ProFn}} />           }
  ]
  
  let sections2 = [
    { txt:"Bezpieczeństwo",      component: (profile)=> <Security props={{}} />                       },
    { txt:"Ochrona danych",      component: (profile)=> <Protection props={{}} /> }
  ]

  const [sections, setSections] = useState(full ? [...sections1, ...sections2] : sections1)

  let OPEN_SECTION = (i)=> setSections(
    sections.map( (el, nr)=> (nr === i) ? {...el, act:true} : {...el, act:false} )
  )

  return(
    <>
    {
      !profile
      ?
      <ScreenSaver />
      :
      <div className="ProfileSection flex stretch wrap">

        <ProfileAva props={{query, fileAddr, oldFile, newFile, profile, ProFn, dl}} />
      
        <div className="ProfileInfo">
        {
          sections.map( (el, i)=>{

            let classes = `ProfileTheme${el.act ? `Act txtYlw` : ``} bold`
            
            return(
              <section key={`ProfileInfo_${el.txt}_${el.i}`}>

                <div className={classes} onClick={ ()=> OPEN_SECTION(i) }>
                  {el.txt}
                </div>

                { el.act && <div>{el.component(profile)}</div> }

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