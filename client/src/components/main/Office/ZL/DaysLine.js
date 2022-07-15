import React, { useState } from "react"

import { DigLen, IsSameDay, IsSameMonth } from "../../../../state/functions"
import EditArea from "./../EditArea"


export const DaysLine = ({ props:{mode, week, lang, translate, ReloadFn, officeFn} })=>{

  const MonthNames = translate(lang, "MonthNames")

  const [showNew, setShowNew] = useState(false)
  let SHOW_AREA = (active)=> active && setShowNew(!showNew)
  let CANCEL = ()=> setShowNew(!showNew)

  return(
    <>

    {
      week.map( (day, n)=>{

        let sameDay = IsSameDay( day.unix, Date.now() )
        let sameMonth = IsSameMonth( day.unix, Date.now() )

        let ActiveMonth = sameMonth ? `ActiveMonth` : ``
        let HoliDay = (day.weekday === 6 || day.weekday === 7) ? `HoliDay` : ``
        let DayActive = sameDay ? `DayActive` : ``
        let classes = `${ActiveMonth} ${HoliDay} ${DayActive} Day flex column start`

        return(
          <div className={classes} key={`CalendarDay${n+day.unix}`}>

            <div className="DayLine flex" onClick={ ()=>SHOW_AREA(sameDay) }>
              { `${DigLen(day.day, 2)} ${MonthNames[parseInt(day.month - 1)]} ${DigLen(day.year, 4)}` }
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