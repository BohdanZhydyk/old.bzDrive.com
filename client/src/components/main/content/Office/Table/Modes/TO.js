import React from "react"

import { Cell } from "./../Cell"
import EditArea from "../EditArea"


export const TO = ({ props:{mode, table, officeFn} })=>{

  let top = {
    number:"Nr.",
    article:"Towar / Usługa",
    brutto:"Cena brutto"
  }

  let cell = (line, n)=>{

    let number = line?.number
    let article = line?.article
    let brutto = line?.brutto

    return {
      number:   {txt:number,    cl:"small",   align:"",      line, n},
      article:  {txt:article,   cl:"big",   align:"start",      line, n},
      brutto:   {txt:brutto,    cl:"small",   align:"end",   line, n}
    }
  }

  return(
    <>
    {
      [top, ...table].map( (line, n)=>
        <div className="line flex stretch wrap" key={n+line._id}>

          { line?.number && <Cell props={ cell(line, n).number }/> }

          { line?.article && <Cell props={ cell(line, n).article }/> }

          { line?.brutto && <Cell props={ cell(line, n).brutto }/> }

          <EditArea props={{mode, line, n, officeFn}}/>
          
        </div>
      )
    }
    </>
  )
}