import React, { useState, useEffect } from "react"

import "./Pass.scss"
import { bzGetUser } from "../../../../state/functions"
import { GET_PASS, SAVE_PASS, DEL_PASS } from "./actions"
import { ScreenSaver } from "../../../All/ScreenSaver"
import { PassEl } from "./PassEl"


const PassApp = ()=>{

  const user = bzGetUser()
  const login = user.login

  const [pass, setPass] = useState(false)

  const PassFn = (action)=>{
    switch(action.type){
      case "GET_PASS":        GET_PASS(action, setPass);                break
      case "SAVE_PASS":       SAVE_PASS(action, login, setPass);        break
      case "DEL_PASS":        DEL_PASS(action, login, setPass);         break
      default: break
    }
  }

  useEffect( ()=>{ !pass && PassFn({ type:"GET_PASS", query:{"user":login} }) },[])

  // console.log("pass", pass)

  return(
    <div className="Pass flex column">

      <div className="title flex">
        <span>{ `Passwords for:` }</span>
        <span className="txtOrg bold flex">{ login }</span>
      </div>
      
      <div className="PassTable flex start wrap">
      {
        !pass
        ? <ScreenSaver />
        : pass.map( (el, n)=> <PassEl props={{el, n, PassFn}} key={`PassEl${n}`} /> )
      }
      </div>

    </div>
  )
}

export default PassApp