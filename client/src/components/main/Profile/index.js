import { useState, useEffect } from 'react'

import './Profile.scss'
import { bzGetUser } from './../../../state/functions'
import { ScreenSaver } from '../../All/ScreenSaver'
import { Information } from './Information'
import { Security } from './Security'
import { Protection } from './Protection'


const ProfileApp = ()=>{

  const [profile, setProfile] = useState(false)

  const [infos, setInfos] = useState([
    {name:"role", type:"text", val:bzGetUser().role, holder:"role", error:false},
    {name:"login", type:"text", val:bzGetUser().login, holder:"login", error:false},
    {name:"email", type:"text", val:bzGetUser().email, holder:"email", error:false},
    {name:"lang", type:"text", val:bzGetUser().lang, holder:"lang", error:false},
    {name:"sex", type:"text", val:bzGetUser().sex, holder:"sex", error:false}
  ])

  const [inputs, setInputs] = useState([
    {name:"pass", type:"password", val:"", holder:"stare hasło", error:false},
    {name:"pass1", type:"password", val:"", holder:"nowe hasło", error:false},
    {name:"pass2", type:"password", val:"", holder:"powtórż nowe hasło", error:false}
  ])

  useEffect( ()=>{ !profile && setProfile( bzGetUser() ) },[])

  let profFn = (action)=>{
    let type = action.type
    let payload = action.payload
    switch(type){
      case "Change-email":
        setInfos( infos.map( (el)=> el.name === 'email' ? {...el, val:payload} : {...el} ) )
        break
      case "Change-pass":
        setInputs( inputs.map( (el)=> el.name === 'pass' ? {...el, val:payload} : {...el} ) )
        break
      case "Change-pass1":
        setInputs( inputs.map( (el)=> el.name === 'pass1' ? {...el, val:payload} : {...el} ) )
        break
      case "Change-pass2":
        setInputs( inputs.map( (el)=> el.name === 'pass2' ? {...el, val:payload} : {...el} ) )
        break
      default: break
    }
  }

  return(
    <div className="flex column">
    {
      !profile
      ? <ScreenSaver />
      :
      <div className="profile flex stretch wrap">

        <div className="profileAva flex wrap">

          <img src={`https://files.bzdrive.com/img/users/${profile.login ? profile.login : `man`}.png`} alt="ava" />
        
          <div className="downloadAva flex">zmienic avatarkę...</div>

        </div>
      
        <div className="profileInfo">

          <div className="profileTheme bold">Informacja</div>

          <Information props={{infos, profFn}} />

          <div className="profileTheme">Bezpieczeństwo</div>

          <Security props={{inputs, profFn}} />

          <div className="profileTheme">Historja aktywnośći</div>

          <div className="profileTheme">Ochrona danych</div>

          <Protection props={{profFn}} />

        </div>

      </div>
    }

    </div>
  )
}

export default ProfileApp