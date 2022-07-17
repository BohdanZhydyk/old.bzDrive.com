import React from "react"

import { translate } from "./../../../../state/translate"
import { DigLen } from "./../../../../state/functions"


export const Title = ({ props:{mode, searchSt, lang, from, to} })=>{

  const MonthNames = translate(lang, "MonthNames") 

  let Txt = `${translate(lang, mode)}`
  let From = `${DigLen(from.day, 2)} ${MonthNames[parseInt(from.month - 1)]} ${DigLen(from.year, 4)}`
  let To = `${DigLen(to.day, 2)} ${MonthNames[parseInt(to.month - 1)]} ${DigLen(to.year, 4)}`

  return(
    <span className="title flex bold">
      {`${Txt}${ (!from || !to) || (isNaN(from.year) || isNaN(to.year)) ? `` : `: ${From} - ${To}` }`}
    </span>
  )
}