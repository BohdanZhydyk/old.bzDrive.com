import React, { useState } from "react"

import { DigLen, IsSameDay, IsSameMonth } from "../../../../state/functions"
import EditArea from "./../EditArea"


export const DaysLine = ({ props:{mode, week, user, translate, ReloadFn} })=>{

  const MonthNames = translate(user.lang, "MonthNames")

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
        let title = sameDay ? `Dodać nowe zlecenie` : ``

        return(
          <div className={classes} key={`CalendarDay${n+day.unix}`} title={title}>

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
        <EditArea props={{mode, line:false, CANCEL, ReloadFn}}/>
      </div>
    }

    </>
  )
}