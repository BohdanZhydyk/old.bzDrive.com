import React, { useState, useEffect } from "react"

import "./../Office.scss"
import "./ZL.scss"

import { bzGetUser } from './../../../../state/functions'
import { translate } from "./../../../../state/translate"
import { officeFn } from "../actions"
import {
  GetDay,
  Calendar
} from "./ZL_Logic"
import { ScreenSaver } from "./../../../All/ScreenSaver"
import { WeekDaysPannel } from "./WeekDaysPannel"
import { Week } from "./Week"


const ZL = ()=>{

  const mode = "ZL"
  
  const lang = bzGetUser().lang
  
  const [calendar, setCalendar] = useState( false )
  
  useEffect( ()=>{ !calendar && setCalendar( Calendar() ) },[])
  
  let ReloadFn = ()=>{ setCalendar(false); setCalendar( Calendar() ) }

  const MonthNames = translate(lang, "MonthNames")

  let first = calendar && calendar[0][0]
  let last = calendar && calendar[calendar.length - 1][calendar[calendar.length - 1].length - 1]
  let from = `: ${first.day} ${MonthNames[parseInt(first.month - 1)]} ${first.year}`
  let to = ` - ${last.day} ${MonthNames[parseInt(last.month - 1)]} ${last.year}`

  // console.log("calendar", calendar)

  return(
    <div className="office flex column">
    {
      !calendar
      ? <ScreenSaver />
      :
      <div className="ZL flex column">

        <span className="title flex bold">{`${translate(lang, mode)}${from}${to}`}</span>

        <WeekDaysPannel props={{lang, translate}}/>

        {
          calendar.map( (week, w)=>{

            let props = {mode, week, GetDay, lang, translate, ReloadFn, officeFn}
            let key = `WeekKey${w}`

            return <Week props={props} key={key} />

          })
        }

      </div>
    }
    </div>
  )
}

export default ZL