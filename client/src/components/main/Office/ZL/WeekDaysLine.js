import React, { useState } from "react"

import EditArea from "./../EditArea"


export const WeekDaysLine = ({ props:{mode, week, GetDay, lang, translate, ReloadFn, officeFn} })=>{

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
        let DayActive = day.active ? `DayActive` : ``
        let classes = `${ActiveMonth} ${HoliDay} ${DayActive} Day flex column start`

        let key = `CalendarDay${n+day.unix}`

        let dayLine = `${day.day} ${MonthNames[parseInt(day.month - 1)]} ${day.year}`

        return(
          <div className={classes} key={key}>

            <div className="DayLine flex" onClick={ ()=>SHOW_AREA(day.active) }>
              { dayLine }
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