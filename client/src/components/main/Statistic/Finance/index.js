import React, { useState, useEffect } from 'react'

import './Finance.scss'
import {
  GET_FIN, EDIT_FIN, CHG_MONTH, CHG_YEAR,
  CHG_IN, CHG_ART, CHG_OUT, CHG_ZUS, PLUS_FIN, SAVE_FIN
} from "./action"
import { bzCalc } from '../../../../state/functions'
import { ScreenSaver } from '../../../All/ScreenSaver'
import { FinElEdit } from './FinElEdit'
import { LeftSide } from './LeftSide'
import { RightSide } from './RightSide'


const Finance = ()=>{

  let [fin, setFin] = useState(false)

  const finFn = (action)=>{
    switch(action.type){
      case "GET_FIN":     GET_FIN(fin, setFin);             break
      case "EDIT_FIN":    EDIT_FIN(action, fin, setFin);    break
      case "CHG_MONTH":   CHG_MONTH(action, fin, setFin);   break
      case "CHG_YEAR":    CHG_YEAR(action, fin, setFin);    break
      case "CHG_IN":      CHG_IN(action, fin, setFin);      break
      case "CHG_ART":     CHG_ART(action, fin, setFin);     break
      case "CHG_OUT":     CHG_OUT(action, fin, setFin);     break
      case "CHG_ZUS":     CHG_ZUS(action, fin, setFin);     break
      case "PLUS_FIN":    PLUS_FIN(action, fin, setFin);    break
      case "SAVE_FIN":    SAVE_FIN(action, fin, setFin);    break
      default: return
    }
  }
  
  useEffect( ()=>{ !fin && finFn({ type:"GET_FIN" }) },[])

  return(
    <>
    {
      !fin
      ?
      <ScreenSaver />
      :
      <div className="Finance flex column">

        <div className="PlusElEditBtn flex end">
          <img
            className="imgBtn"
            src="https://bzdrive.com/files/ico/icoPlus.png"
            alt="plus"
            title="Dodać"
            onClick = { ()=> finFn({ type:"PLUS_FIN" }) }
          />
        </div>

        {
          fin.map( (el, i)=>{

            let finDate = `${el.date.month} / ${el.date.year}`
            let In = el.in
            let Out = bzCalc("+", el.art, el.out)
            let ZUS = el.ZUS
            let VAT = bzCalc("*", bzCalc("-", In, Out), "0.23")
            let Sum = bzCalc("-", bzCalc("-", In, Out), ZUS)

            let ok =
              el.date.month !== "00" &&
              el.date.year !== "0000" &&
              el.in !== "0.00" &&
              el.art !== "0.00" &&
              el.out !== "0.00" &&
              el.ZUS !== "0.00"

            return(
              <div className="FinElement flex stretch wrap" key={`FinElement${i}`}>

                <FinElEdit props={{fin, el, i, ok, finFn}} />

                {ok && <LeftSide props={{i, finDate, In, Out, ZUS, VAT, Sum}} />}
        
                {ok && <RightSide props={{In, Out, ZUS, VAT, Sum}} />}

              </div>
            )
          })
        }
      </div>
    }
    </>
  )
}

export default Finance