import React, { useState } from "react"


export const SaveCheckedBtn = ({ props:{mode, role, salary, setSalary, ReloadFn, officeFn} })=>{

  const [err, setErr] = useState( false )
  let errTxt = `Nie masz uprawnien do edytowania dokumentów !`

  let SAVE_ALL = ()=>{
    if(role === "admin"){
      setSalary( false )
      officeFn( {type:"SAVE_ALL", mode, payload:salary, ReloadFn} )
    }
    else{ setErr( !err ) }
  }

  return(
    <div className="SaveCheckedBtn flex">

      <div className="EmptyBefore Cell txtOrg bold flex">{err && errTxt}</div>
      
      <div className="Btn Cell bold flex" onClick={ ()=> SAVE_ALL() }>
        {`Zamknąć zaznaczone`}
      </div>

      <div className="EmptyAfter Cell flex"></div>

    </div>
  )
}