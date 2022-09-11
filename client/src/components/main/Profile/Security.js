import React, { useState } from 'react'
import { Input } from './../../All/Input'


export const Security = ({ props:{} })=>{

  const [inputs, setInputs] = useState([
    {form:`PASS`, type:"password", legend:"stare hasło", val:""},
    {form:`PASS1`, type:"password", legend:"nowe hasło", val:""},
    {form:`PASS2`, type:"password", legend:"powtórż nowe hasło", val:""}
  ])

  let Fn = (action)=>{
    let type = action.type
    let payload = action.payload
    switch(type){
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
    <section className="ProfileSection">

      { inputs.map( (input, i)=> <Input props={{input, Fn}} key={`ProfInputs${i}`} /> ) }

      <div className="ProfileBtn flex">Zmienić hasło</div>

    </section>
  )
}