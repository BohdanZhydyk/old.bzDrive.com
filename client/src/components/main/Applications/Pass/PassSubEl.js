import React from "react"

import { Input } from "../../../All/Input"


export const PassSubEl = ({ props:{subEl, PassFn} })=>{

  let inputs = [
    {
      form:`USERNAME`.toUpperCase(),
      type:"text",
      legend:"userName",
      // style:"infoName",
      val:( subEl?.userName ? subEl.userName : "" ),
      // error: errBrand( info?.brand !== "Marka" ? info.brand : "" )
    },
    {
      form:`LOGIN`.toUpperCase(),
      type:"text",
      legend:"login",
      // style:"infoName",
      val:( subEl?.login ? subEl.login : "" ),
      // error: errBrand( info?.brand !== "Marka" ? info.brand : "" )
    },
    {
      form:`PASS`.toUpperCase(),
      type:"password",
      legend:"password",
      // style:"infoName",
      val:( subEl?.pass ? subEl.pass : "" ),
      // error: errBrand( info?.brand !== "Marka" ? info.brand : "" )
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