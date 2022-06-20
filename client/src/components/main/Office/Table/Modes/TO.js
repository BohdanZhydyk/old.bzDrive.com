import React from 'react'
import { Cell } from "./../Cell"
import EditArea from "../EditArea"


export const TO = ({ props:{mode, table, officeFn} })=>{

  let cell = (line, n)=>{

    let number = n === 0 ? "Nr." : line?.number
    let article = n === 0 ? "Towar / Usługa" : line?.article
    let brutto = n === 0 ? "Cena brutto" : line?.brutto

    return {
      number:   {txt:number,    cl:"small",   align:"",      line, n},
      article:  {txt:article,   cl:"big",   align:"start",      line, n},
      brutto:   {txt:brutto,    cl:"small",   align:"end",   line, n}
    }
  }

  return(
    <>
    {
      [ {}, ...table ].map( (line, n)=>
        <div className="line flex stretch wrap" key={n+line._id}>

          <Cell props={ cell(line, n).number }/>

          <Cell props={ cell(line, n).article }/>

          <Cell props={ cell(line, n).brutto }/>

          <EditArea props={{mode, line, n, officeFn}}/>
          
        </div>
      )
    }
    </>
  )
}