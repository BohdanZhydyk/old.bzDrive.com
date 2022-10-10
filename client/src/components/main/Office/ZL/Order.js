import React, { useState } from "react"

import { SumArray } from "../../../../state/functions"
import EditArea from "./../EditArea"


export const Order = ({ props:{mode, week, zl, ReloadFn} }) => {

  const [show, setShow] = useState(false)

  let CANCEL = ()=> setShow(false)

  const Day = (date)=>{
    let D = date.toString()
    let newDate = `${D[0]}${D[1]}${D[2]}${D[3]}.${D[4]}${D[5]}.${D[6]}${D[7]}`
    return( new Date(newDate).getDay() !== 0 ? new Date(newDate).getDay() : 7 )
  }

  let car = `${zl.car.brand} - ${zl.car.model}`

  let ava = `https://bzdrive.com/files/dealers/${zl?.dealer?.img}`

  let day = Day(zl.nr.from)
  let dayTo = Day(zl.nr.to)

  let firstDay = week[0].YYYYMMDD
  let lastDay = week[week.length - 1].YYYYMMDD

  let startDay = Day(week[0].YYYYMMDD)

  if( (zl.nr.from <= firstDay) ){ day = 1 }
  if( (zl.nr.to >= lastDay) ){ dayTo = 7 }

  let widthZl = (dayTo - day) + 1

  let beforeStyles = {width:`calc( (100% / 7) * ${day - startDay})`}
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
  let brutto = `\n${zl?.articles ? `brutto: ${SumArray(zl.articles.map( el=> el.SUM ) )} zł` : ``}`
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

      { show && <EditArea props={{mode, line:zl, CANCEL, ReloadFn}}/> }

    </div>
  )
}