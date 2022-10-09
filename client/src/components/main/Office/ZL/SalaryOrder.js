import React, { useState } from "react"

import EditArea from "../EditArea"


export const SalaryOrder = ({ props:{mode, order, obj, CHECK_ORDER, ReloadFn, officeFn} })=>{

  const [show, setShow] = useState(false)

  let CANCEL = ()=> setShow(false)

  let check = ()=> CHECK_ORDER(order._id)

  let emptyStyle = mode ? obj.style : {...obj.style, borderColor:"#0000"}

  let statusStiles = (status)=>{
    switch(status){
      case "done": return `#fd09`
      case "deleted": return `#f009`
      default: return `#0000`
    }
  }

  let title = `\n${order?.car?.faults ? `${order.car.faults}` : ``}`
  let img = `https://bzdrive.com/files/ico/ico${order?.chk ? `Check` : `Empty`}.png`
  let ava = order && `https://bzdrive.com/files/dealers/${order?.dealer?.img}`

  return(
    <div className="SalaryOrder flex wrap stretch" title={title}>

      <div className={`StatusLine flex`} style={{backgroundColor:statusStiles(obj.status)}}></div>

      <span className="OrderNr Cell flex start" style={emptyStyle}>
        { ava && <span className="OrderAva flex"><img src={ava} alt="ava" /></span> }
        <span>{obj.nr}</span>
      </span>

      <span className="Car Cell flex start" style={emptyStyle} onClick={ ()=>setShow(!show) }>{obj.car}</span>

      <span className="Tel Cell flex column" style={obj.style}>
        {
          obj.name &&
          obj.mode
          ? <a href={`tel: ${obj.name}`} rel="noreferrer">{obj.name}</a>
          : <span className="txtWht">{obj.name}</span>
        }
        {obj.tel && <a href={`tel: ${obj.tel}`} rel="noreferrer">{obj.tel}</a>}
      </span>

      <span className="Brutto Cell flex end" style={obj.style}>{`${obj.sum} zł`}</span>

      {
        mode
        ? <img className="imgBtn" src={img} alt="check" onClick={ ()=> check() } />
        : <div className="imgBtn flex"></div>
      }

      { mode && order && show && <EditArea props={{mode, line:order, CANCEL, ReloadFn, officeFn}}/> }

    </div>
  )
}