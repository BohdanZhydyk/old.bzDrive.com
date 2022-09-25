import React from 'react'

import { translate } from '../../../../state/translate'


export const Hint = ({ props:{user} })=>{

  let lang = user.lang

  return(
    <div className="Hint flex column start">

      <div className="HintTitle flex bold">{ translate(lang, "SettingsHintTitle") }</div>

      { translate(lang, "SettingsHintTxt").map( (txt, i)=> <p key={`SettingsHintTxt${i}`}>{txt}</p> ) }

    </div>
  )
}