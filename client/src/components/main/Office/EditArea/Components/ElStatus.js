import React from "react"

import { bzGetUser } from "../../../../../state/functions"


export const ElStatus = ({ props:{mode, status, user, car, print, AreaFn} })=>{

  const btns = status
  ? [
      {status:"edited", txt:{act:"Otwarte", dis:"Otworzyć"}},
      {status:"done", txt:{act:"Zamknięte", dis:"Zamknąć"}},
      // {status:"saved", txt:{act:"Zapisane", dis:"Zapisać"}},
      {status:"deleted", txt:{act:"Usunięte", dis:"Usunąć"}}
    ]
  : [{status:"new", txt:{act:"Nowe", dis:"Nowe"}}]

  let CHG_STATUS = (st)=> st !== "new" && AreaFn({type:"CHG_STATUS", value:st})
  let CHG_COLOR = ()=> AreaFn({type:"CHG_COLOR"})
  let userOk = ()=> (bzGetUser().login === user) || bzGetUser().role === "admin"

  let CarColor = {
    backgroundColor:car.color,
    backgroundImage:`linear-gradient(0deg, ${car.color}, #2229 30% 70%, ${car.color})`
  }

  return(
    <span className="ElStatus flex start wrap">

      {
        (userOk() && !print && mode === "ZL") &&
        btns.map( (btn, n)=>{

          let clAct = status === btn.status ? `BtnAct_${status.toUpperCase()}` : ``
          let classes = `OrderStatusBtn bold flex ${clAct}`

          return(
            <span className={classes} onClick={ ()=> CHG_STATUS(btn.status) }>
              {status === btn.status ? btn.txt.act : btn.txt.dis}
            </span>
          )
        })
      }

      {
        (userOk() && !print && mode === "ZL") &&
        <span className="OrderStatusBtn bold flex" onClick={ ()=> CHG_COLOR() } style={CarColor}>
          {`carColor`}
        </span>
      }

    </span>
  )
}