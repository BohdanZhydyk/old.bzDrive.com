import React from "react"

import { Input } from "./Input"
import { Button } from "./Button"


export const FormPannel = ({ props:{inputs, forms, lang, authFn} })=>{

  let KEY_DOWN = (e)=> (e.key === "Enter") && authFn({ type:"SEND_FORM" })

  return(
    <form className="authPannel flex wrap" onKeyDown={ (e)=> KEY_DOWN(e) } >
      <Inputs props={{inputs, lang, authFn}} />
			<Btns props={{forms, lang, authFn}} />
		</form>
  )
}

const Inputs = ({ props:{inputs, lang, authFn} })=>{
  return(
    <div className="inputs" >
    {
      inputs?.map( (input, nr)=>{
        return <Input props={{input, lang, authFn}} key={`Input${input.name}${nr}`} />
      })
    }
    </div>
  )
}

const Btns = ({ props:{forms, lang, authFn} })=>{
  return(
    <div className="btns flex wrap" >
    {
      forms?.map( (btn, nr)=>{
        return <Button props={{btn, lang, authFn}} key={`FormBtn${btn.action}${nr}`} />
      })
    }
    </div>
  )
}