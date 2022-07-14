import React, { useState } from "react"

import { TwoDig } from "../../../../state/functions"
import EditArea from "./../EditArea"


export const DaysLine = ({ props:{mode, week, GetDay, lang, translate, ReloadFn, officeFn} })=>{

  const MonthNames = translate(lang, "MonthNames")

  const [showNew, setShowNew] = useState(false)
  let SHOW_AREA = (active)=> active && setShowNew(!showNew)
  let CANCEL = ()=> setShowNew(!showNew)

  return(
    <>

    {
      week.map( (day, n)=>{

        let ActiveMonth = parseInt(day.month) === parseInt( GetDay().month ) ? `ActiveMonth` : ``
        let HoliDay = (day.weekday === 6 || day.weekday === 7) ? `HoliDay` : ``
        let DayActive = parseInt(day.unix / 1000000) === parseInt(Date.now() / 1000000) ? `DayActive` : ``
        let classes = `${ActiveMonth} ${HoliDay} ${DayActive} Day flex column start`

        return(
          <div className={classes} key={`CalendarDay${n+day.unix}`}>

            <div className="DayLine flex" onClick={ ()=>SHOW_AREA(DayActive) }>
              { `${TwoDig(day.day)} ${MonthNames[parseInt(day.month - 1)]} ${day.year}` }
            </div>

          </div>
        )
      })
    }

    {
      showNew &&
      <div className="Order flex">
        <EditArea props={{mode, line:false, CANCEL, ReloadFn, officeFn}}/>
      </div>
    }

    </>
  )
}