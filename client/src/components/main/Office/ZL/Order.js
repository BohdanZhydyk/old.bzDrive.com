import React, { useState } from "react"

import EditArea from "./../EditArea"


export const Order = ({ props:{mode, week, zl, ReloadFn, officeFn} }) => {

  const [show, setShow] = useState(false)

  let CANCEL = ()=> setShow(false)

  const Day = (u)=> new Date(u).getDay() !== 0 ? new Date(u).getDay() : 7

  let car = `${zl.car.brand} - ${zl.car.model}`

  let day = Day(zl.date.unix)
  let dayTo = Day(zl.dateTo.unix)

  let firstDayUnix = week[0].unix
  let lastDayUnix = week[week.length - 1].unix

  if( (zl.date.unix <= firstDayUnix) ){ day = 1 }
  if( (zl.dateTo.unix >= lastDayUnix) ){ dayTo = 7 }

  let widthZl = (dayTo - day) + 1

  let orderStyles = {
    display: (
      zl.status === "edited"
      && firstDayUnix > Date.now()
      && firstDayUnix - 84600000 > zl.dateTo.unix
    ) ? `none` : `flex`
  }
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

  // let afterStyles = {width:`calc( (100% / 7) * ${Day(lastDayUnix) - dayTo})`}

  return(
      <div className="Order flex start wrap" style={orderStyles}>

        <div style={beforeStyles}></div>

        <div className="Car flex start" style={carStyles} onClick={ ()=>setShow(!show) }>

          <div className="StatusLine flex" style={{backgroundColor:statusStiles(zl.status)}}></div>

          <div className="CarName flex start">
            {car}
          </div>
          
        </div>

        {/* <div className="After" style={afterStyles}></div> */}

        { show && <EditArea props={{mode, line:zl, CANCEL, ReloadFn, officeFn}}/> }

      </div>
  )
}