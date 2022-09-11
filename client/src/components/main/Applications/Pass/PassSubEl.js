import React from "react"

import { Input } from "../../../All/Input"


export const PassSubEl = ({ props:{newEl, subEl, id, inputNr, ElFn} })=>{

  const USERNAME = {
    inputNr,
    form:`USERNAME`.toUpperCase(),
    type:"text",
    legend:"userName",
    val:( subEl?.userName ? subEl.userName : "" )
  }

  const LOGIN = {
    inputNr,
    form:`LOGIN`.toUpperCase(),
    type:"text",
    legend:"login",
    val:( subEl?.login ? subEl.login : "" )
  }

  const PASS = {
    id,
    inputNr,
    form:`PASS`.toUpperCase(),
    type:( subEl?.pass ? "text" : subEl?.pass?.length === 0 ? "text" : "password" ),
    legend:"password",
    img: "Show",
    val:( subEl?.pass ? subEl.pass : subEl?.pass?.length === 0 ? "" : "??????????" )
  }

  let DEL_LINE = ()=> ElFn({type:`DEL_LINE`, nr:inputNr})

  return(
    <div  className="PassSubEl flex wrap">

      <div className="Inputs flex wrap">
      
        <Input props={{input:USERNAME, Fn:ElFn}} key={`INPUT_${USERNAME.form}_${inputNr[0]}${inputNr[1]}`}/>

        <Input props={{input:LOGIN, Fn:ElFn}} key={`INPUT_${LOGIN.form}_${inputNr[0]}${inputNr[1]}`}/>

        <Input props={{input:PASS, Fn:ElFn}} key={`INPUT_${PASS.form}_${inputNr[0]}${inputNr[1]}`}/>

      </div>

      <div className="LineBtn flex end">
        <img
          className="imgBtn"
          src="https://bzdrive.com/files/ico/icoDelete.png"
          onClick = { ()=> DEL_LINE() }
          title="usunąć linię"
          alt="delete"
        />
      </div>
      
    </div>
  )
}