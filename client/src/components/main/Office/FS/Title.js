import React from "react"

import { translate } from "./../../../../state/translate"
import { DigLen } from "./../../../../state/functions"


export const Title = ({ props:{mode, searchSt, lang, from, to} })=>{

  const MonthNames = translate(lang, "MonthNames")

  let F = from.toString()
  let T = to.toString()

  let Txt = `${translate(lang, mode)}`
  let From = `${F[6]}${F[7]} ${MonthNames[parseInt(`${F[4]}${F[5]}`) - 1]} ${F[0]}${F[1]}${F[2]}${F[3]}`
  let To = `${T[6]}${T[7]} ${MonthNames[parseInt(`${T[4]}${T[5]}`) - 1]} ${T[0]}${T[1]}${T[2]}${T[3]}`

  return(
    <span className="title flex bold">
      { `${Txt}${`: ${From} - ${To}`}` }
    </span>
  )
}