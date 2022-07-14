import React from "react"

import { TwoDig } from './../../../../state/functions'
import { translate } from "./../../../../state/translate"


export const Title = ({ props:{mode, lang, calendar} })=>{
  
  // const lang = bzGetUser().lang

  const MonthNames = translate(lang, "MonthNames")

  let first = calendar && calendar[0].week[0]
  let last = calendar && calendar[calendar.length - 1].week[calendar[calendar.length - 1].week.length - 1]
  let from = `: ${TwoDig(first.day)} ${MonthNames[parseInt(first.month - 1)]} ${first.year}`
  let to = ` - ${TwoDig(last.day)} ${MonthNames[parseInt(last.month - 1)]} ${last.year}`

  return(
    <span className="title flex bold">
      {`${translate(lang, mode)}${from}${to}`}
    </span>
  )
}