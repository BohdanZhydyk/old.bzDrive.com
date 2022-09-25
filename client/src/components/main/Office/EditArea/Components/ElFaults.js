import React from 'react'
import { errFaults } from "../../../../../state/functions"


export const ElFaults = ({ props:{car, print, AreaFn} })=>{

  let CHANGE_TEXTAREA = (e)=> AreaFn({type:`CHG_CAR_FAULTS`, value:e.target.value})

  let classes = `title bold flex start`
  let placeholder = car?.faults ? car.faults : "wprowadź dane..."

  return(
    <section className="ElFaults flex wrap">

      <div className={classes}>
        {"Opis i zakres uszkodzenia"}
      </div>

      {
        !print
        ?
        <textarea className="FaultsTxt" placeholder={placeholder} onChange={ (e)=> CHANGE_TEXTAREA(e) }>
          {car?.faults ? car.faults : ""}
        </textarea>
        :
        <div className="FaultsTxt">
        {
          (!car?.faults || car?.faults === "")
          ? ""
          : car?.faults.split('\n').map( (el, l)=>{
            let key = `FaltsLine_${l}_${Math.floor(Math.random() * 5)}`
              return (<div className="FaltsLine flex start" key={key}>{el}</div>)
            })
        }
        </div>
      }

    </section>
  )
}