import React, { useState } from 'react'

import { Input } from './../../All/Input'


export const Activity = ({ props:{} })=>{

  // const [infos, setInfos] = useState([
  //   {form:`ROLE`, type:"text", legend:"role", val:profile.role},
  //   {form:`LOGIN`, type:"text", legend:"login", val:profile.login},
  //   {form:`EMAIL`, type:"text", legend:"email", val:profile.email},
  //   {form:`LANG`, type:"text", legend:"lang", val:profile.lang},
  //   {form:`SEX`, type:"text", legend:"sex", val:profile.sex}
  // ])
  
  // let Fn = (action)=>{
  //   let type = action.type
  //   let payload = action.payload
  //   switch(type){
  //     case "Change-email":
  //       setInfos( infos.map( (el)=> el.name === 'email' ? {...el, val:payload} : {...el} ) )
  //       break
  //     default: break
  //   }
  // }

  return(
    <section className="ProfileSection">

      <div>activity info...</div>
    
      {/* { infos.map( (input, i)=> <Input props={{input, Fn}} key={`ProfInfos${i}`} /> ) }

      <div className="ProfileBtn flex">Potwierdzić</div> */}

    </section>
  )
}