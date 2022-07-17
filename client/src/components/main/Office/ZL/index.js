import React, { useState, useEffect } from "react"

import "./../Office.scss"
import "./ZL.scss"

import { bzGetUser } from './../../../../state/functions'
import { translate } from "./../../../../state/translate"
import { officeFn } from "../actions"
import { Calendar } from "./CalendarLogic"
import { Title } from "./Title"
import { ScreenSaver } from "./../../../All/ScreenSaver"
import { DaysPannelTop } from "./DaysPannelTop"
import { AddWeekBtn } from "./AddWeekBtn"
import { Week } from "./Week"
import { Salary } from "./Salary"


const ZL = ()=>{

  const mode = "ZL"
  
  const user = bzGetUser()
  const lang = user.lang
  const role = user.role
  
  const [calendar, setCalendar] = useState( false )
  
  useEffect( ()=>{ !calendar && setCalendar( Calendar() ) },[])
  
  let ReloadFn = ( NewCalendar = Calendar() )=>{ setCalendar(false); setCalendar( NewCalendar ) }

  // console.log("calendar", calendar)

  return(
    <div className="office flex column">
    {
      !calendar
      ? <ScreenSaver />
      :
      <div className="ZL flex column">

        <Title props={{mode, lang, calendar}}/>

        <div className="horizontalLine"></div>

        <AddWeekBtn props={{act:"MINUS_WEEK", calendar, setCalendar, officeFn}}/>

        <DaysPannelTop props={{lang, translate}}/>

        {
          calendar.map( (line, l)=>{

            let props = {mode, line, user, translate, ReloadFn, officeFn}
            let key = `WeekKey${l}${line.week[0].unix}`

            return <Week props={props} key={key} />

          })
        }

        <AddWeekBtn props={{act:"PLUS_WEEK", calendar, setCalendar, officeFn}}/>

        <div className="horizontalLine"></div>

        <Salary props={{mode, lang, role, calendar, ReloadFn, officeFn}} />

      </div>
    }
    </div>
  )
}

export default ZL