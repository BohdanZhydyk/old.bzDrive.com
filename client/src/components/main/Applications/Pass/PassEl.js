import React from "react"

import { PassSubEl } from "./PassSubEl"


export const PassEl = ({ props:{el, n, PassFn} })=>{

  let OPEN_CLOSE_EL = ()=> PassFn({type:"OPEN_CLOSE_EL", n, edit:!el.edit})

  return(
    <>

      <div className={`PassEl ${el.edit ? `edit` : ``} flex`} onClick={ ()=> OPEN_CLOSE_EL() }>

        <img src={`https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${el.siteData[0].link}&size=32`} alt="im" />
        
        <span>{el.siteName}</span>

      </div>
      
      {
        el.edit &&
        <div className="EditPannel flex column">
        {
          el.siteData.map( (subEl, k)=> <PassSubEl props={{subEl, PassFn}} key={`PassSubEl${k}`}/> )
        }
        </div>
      }

    </>
  )

}