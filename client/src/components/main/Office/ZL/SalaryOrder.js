import React, { useState } from "react"

import EditArea from "../EditArea"


export const SalaryOrder = ({ props:{mode, order, obj, CHECK_ORDER, ReloadFn, officeFn} })=>{

  const [show, setShow] = useState(false)

  let CANCEL = ()=> setShow(false)

  let check = ()=> CHECK_ORDER(order._id)

  let emptyStyle = mode ? obj.style : {...obj.style, borderColor:"#0000"}

  let img = `https://files.bzdrive.com/img/ico/ico${order?.chk ? `Check` : `Empty`}.png`

  return(
    <div className="SalaryOrder flex wrap stretch">

      <span className="OrderNr Cell flex start" style={emptyStyle}>{obj.nr}</span>

      <span className="Car Cell flex start" style={emptyStyle} onClick={ ()=>setShow(!show) }>{obj.car}</span>

      <a
        className="Tel Cell flex"
        style={obj.style}
        href={`tel: ${obj.tel}`}
        rel="noreferrer"
      >
        {obj.tel}
      </a>

      <span className="Brutto Cell flex end" style={obj.style}>{`${obj.brutto} zł`}</span>

      {
        mode
        ? <img className="imgBtn" src={img} alt="check" onClick={ ()=> check() } />
        : <div className="imgBtn flex"></div>
      }

      { mode && show && <EditArea props={{mode, line:order, CANCEL, ReloadFn, officeFn}}/> }

    </div>
  )
}