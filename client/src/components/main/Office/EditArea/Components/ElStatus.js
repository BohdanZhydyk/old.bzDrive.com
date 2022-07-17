import React from "react"

import { bzGetUser } from "../../../../../state/functions"


export const ElStatus = ({ props:{mode, status, dealer, print, AreaFn} })=>{

  const btns = status
  ? [
      {status:"edited", txt:{act:"Otwarte", dis:"Otworzyć"}},
      {status:"done", txt:{act:"Zamknięte", dis:"Zamknąć"}},
      // {status:"saved", txt:{act:"Zapisane", dis:"Zapisać"}},
      {status:"deleted", txt:{act:"Usunięte", dis:"Usunąć"}}
    ]
  : [{status:"new", txt:{act:"Nowe", dis:"Nowe"}}]

  let CHG_STATUS = (st)=> st !== "new" && AreaFn({type:"CHG_STATUS", value:st})
  let userOk = ()=> (bzGetUser().login === dealer.user) || bzGetUser().role === "admin"

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
    </span>
  )
}