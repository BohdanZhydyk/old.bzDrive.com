import React, { useState } from "react"

import { UnixToYYYYMMDD } from "../../../../state/functions"
import EditArea from "./../EditArea"


export const Order = ({ props:{mode, week, zl, ReloadFn, officeFn} }) => {

  const [show, setShow] = useState(false)

  let CANCEL = ()=> setShow(false)

  const Day = (unix)=> new Date(unix).getDay() !== 0 ? new Date(unix).getDay() : 7

  let car = `${zl.car.brand} - ${zl.car.model}`

  let ava = `https://bzdrive.com/files/dealers/${zl?.dealer?.img}`

  let day = Day(zl.date.unix)
  let dayTo = Day(zl.dateTo.unix)

  let firstDayUnix = week[0].unix
  let lastDayUnix = week[week.length - 1].unix

  if( (UnixToYYYYMMDD(zl.date.unix) <= UnixToYYYYMMDD(firstDayUnix)) ){ day = 1 }
  if( (UnixToYYYYMMDD(zl.dateTo.unix) >= UnixToYYYYMMDD(lastDayUnix)) ){ dayTo = 7 }

  let widthZl = (dayTo - day) + 1

  let beforeStyles = {width:`calc( (100% / 7) * ${day - Day(firstDayUnix)})`}
  let carStyles = {
    opacity: zl.status === "edited" ? 1 : 0.5,
    maxWidth:"100%",
    width:`calc( (100% / 7) * ${widthZl})`,
    backgroundColor:zl.car.color,
    backgroundImage:`linear-gradient(0deg, ${zl.car.color}, #2229 30% 70%, ${zl.car.color})`
  }

  let statusStiles = (status)=>{
    switch(status){
      case "done": return `#fd09`
      case "deleted": return `#f009`
      default: return `#0000`
    }
  }

  let lines = `--------------------------------------------------`
  let name = `${zl?.buyer?.name ? `klient: ${zl.buyer.name}\n` : ``}`
  let tel = `${zl?.buyer?.contacts?.tel ? `tel: ${zl.buyer.contacts.tel}\n` : ``}`
  let faults = `\n${zl?.car?.faults ? `${lines}\n${zl.car.faults}\n${lines}\n` : ``}`
  let brutto = `\n${zl?.brutto ? `brutto: ${zl.brutto} zł` : ``}`
  let title = `${name}${tel}${faults}${brutto}`

  return(
    <div className="Order flex start wrap">

      <div style={beforeStyles}></div>

      <div className="Car flex start" style={carStyles} title={title} onClick={ ()=>setShow(!show) }>

        <div className="StatusLine flex" style={{backgroundColor:statusStiles(zl.status)}}></div>

        <div className="CarName flex start">
          <img className="OrderAva" src={ava} alt="ava" />
          <span>{car}</span>
        </div>
        
      </div>

      { show && <EditArea props={{mode, line:zl, CANCEL, ReloadFn, officeFn}}/> }

    </div>
  )
}