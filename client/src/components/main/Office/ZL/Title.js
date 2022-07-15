import React from "react"

import { DigLen } from './../../../../state/functions'
import { translate } from "./../../../../state/translate"


export const Title = ({ props:{mode, lang, calendar} })=>{
  
  // const lang = bzGetUser().lang

  const MonthNames = translate(lang, "MonthNames")

  let first = calendar && calendar[0].week[0]
  let last = calendar && calendar[calendar.length - 1].week[calendar[calendar.length - 1].week.length - 1]
  let from = `: ${DigLen(first.day, 2)} ${MonthNames[parseInt(first.month - 1)]} ${DigLen(first.year, 4)}`
  let to = ` - ${DigLen(last.day, 2)} ${MonthNames[parseInt(last.month - 1)]} ${DigLen(last.year, 4)}`

  return(
    <span className="title flex bold">
      {`${translate(lang, mode)}${from}${to}`}
    </span>
  )
}