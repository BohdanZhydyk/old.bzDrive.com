import React from 'react'


export const LangBtn = ({ props:{lang, active, TOGGLE_MENU} })=>{

  let CLK = ()=> TOGGLE_MENU({active: active ? false : `lang`})

  let src = lang && `https://files.bzdrive.com/img/ico/lng/lng${lang}.png`

  return(
    <>
    {
      lang
      ?
      <div className="langPannel flex" onClick={ ()=> CLK() } >
        <img className="imgBtn" src={src} alt="lng" />
      </div>
      :
      <div className="noData noDataImg"></div>
    }
    </>
  )
}