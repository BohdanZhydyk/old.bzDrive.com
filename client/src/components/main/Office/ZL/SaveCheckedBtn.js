import React, { useState } from "react"

import { AlertBox } from "../../../All/AlertBox"


export const SaveCheckedBtn = ({ props:{mode, searchSt, role, salary, setSalary, ReloadFn, officeFn} })=>{

  const [err, setErr] = useState( false )

  let CLOSE = ()=> setErr( false )

  let SAVE_ALL = ()=>{
    if(role === "admin"){
      setSalary( false )
      officeFn( {type:"SAVE_ALL", mode, payload:salary, ReloadFn} )
    }
    else{ setErr( `Nie masz uprawnien do edytowania dokumentów !` ) }
  }

  return(
    <div className="SaveCheckedBtn flex">

      <div className="EmptyBefore Cell flex"></div>

      { err && <AlertBox props={{err, CLOSE}}/> }
      
      {
        !searchSt &&
        <div className="Btn Cell bold flex" onClick={ ()=> SAVE_ALL() }>
          {`Zamknąć zaznaczone`}
        </div>
      }

      <div className="EmptyAfter Cell flex"></div>

    </div>
  )
}