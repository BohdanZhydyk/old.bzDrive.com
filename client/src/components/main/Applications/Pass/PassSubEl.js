import React from "react"

import { Input } from "../../../All/Input"


export const PassSubEl = ({ props:{subEl, PassFn} })=>{

  let inputs = [
    {
      form:`USERNAME`.toUpperCase(),
      type:"text",
      legend:"userName",
      val:( subEl?.userName ? subEl.userName : "" )
    },
    {
      form:`LOGIN`.toUpperCase(),
      type:"text",
      legend:"login",
      val:( subEl?.login ? subEl.login : "" )
    },
    {
      form:`PASS`.toUpperCase(),
      type:"password",
      legend:"password",
      img: "Show",
      val:( subEl?.pass ? subEl.pass : "" )
    }
  ]
  return(
    <div  className="PassSubEl flex wrap">
    
      { inputs.map( (el, i)=> <Input props={{input:el, Fn:PassFn}} key={`INPUT_${el.form}_${i}`}/> ) }

      <fieldset className={`textAreaWrapper`}>

        <legend>{`info`}</legend>

        <textarea>
          { subEl?.info ? subEl.info : "" }
        </textarea>

      </fieldset>
      
    </div>
  )
}