import React from "react"

import { Input } from "../../../All/Input"


export const InputsPannel = ({ props:{siteName, link, n, ElFn} })=>{

  const SITENAME = {
    form:`SITENAME`.toUpperCase(),
    type:"text",
    legend:"siteName",
    val:siteName
  }

  const LINK = {
    form:`LINK`.toUpperCase(),
    type:"text",
    legend:"link",
    val:link
  }

  return(
    <div className="InputsPannel flex wrap">

      <Input props={{input:SITENAME, Fn:ElFn}} key={`INPUT_${SITENAME.form}_${n}`}/>

      <Input props={{input:LINK, Fn:ElFn}} key={`INPUT_${LINK.form}_${n}`}/>

    </div>
  )

}