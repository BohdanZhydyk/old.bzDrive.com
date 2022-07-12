import React from 'react'
import { errFaults } from "../../../../../state/functions"


export const ElFaults = ({ props:{car, print, AreaFn} })=>{

  let CHANGE_TEXTAREA = (e)=> AreaFn({type:`CHG_CAR_FAULTS`, value:e.target.value})

  let classes = `title bold flex start ${errFaults( car?.faults ? car?.faults : "" ) ? `txtOrg` : ``}`

  let faults = car?.faults !== "Opis i zakres uszkodzenia"
  let placeholder = faults ? car.faults : "wprowadź dane..."

  return(
    <section className="ElFaults flex wrap">

      <div className={classes}>
        {"Opis i zakres uszkodzenia"}
      </div>

      {
        !print
        ?
        <textarea className="FaultsTxt" placeholder={placeholder} onChange={ (e)=> CHANGE_TEXTAREA(e) }>
          {faults ? car.faults : ""}
        </textarea>
        :
        <div className="FaultsTxt">{faults ? car.faults : ""}</div>
      }

    </section>
  )
}