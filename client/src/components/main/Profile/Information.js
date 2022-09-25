import React, { useState } from 'react'

import { Input } from './../../All/Input'


export const Information = ({ props:{profile} })=>{

  const [infos, setInfos] = useState([
    {form:`LOGIN`, type:"text", legend:"login", val:profile.login},
    {form:`EMAIL`, type:"text", legend:"email", val:profile.email},
    {form:`ROLE`, type:"text", legend:"role", val:profile.role},
    {form:`SEX`, type:"text", legend:"sex", val:profile.sex},
    {form:`LANG`, type:"text", legend:"lang", val:profile.lang}
  ])
  
  let Fn = (action)=>{
    let type = action.type
    let value = action.value

    console.log(action)
    switch(type){
      case "CHG_EMAIL":
        setInfos( infos.map( (el)=> el.form === 'EMAIL' ? {...el, val:value} : {...el} ) )
        break
      default: break
    }
  }

  return(
    <section className="ProfileSection">
    
      { infos.map( (input, i)=> <Input props={{input, Fn}} key={`ProfInfos${i}`} /> ) }

      <div className="ProfileBtn flex">Potwierdzić</div>

    </section>
  )
}