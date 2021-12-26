import React from "react"

import { Cell } from "./../Cell"
import EditArea from "../EditArea"


export const FZ = ({ props:{mode,table, officeFn} })=>{

  let top = {
    nr:"Faktura Nr.",
    dealer:{
      nip:"NIP",
      name:"Sprzedawca"
    },
    brutto:"Cena brutto"
  }

  let cell = (line, n)=>{

    let nr = line?.nr
    let nip = line?.dealer?.nip
    let name = line?.dealer?.name
    let brutto = line?.brutto

    return {
      nr:     {txt:nr,      cl:"small",   align:"",       line, n},
      nip:    {txt:nip,     cl:"small",   align:"",       line, n},
      name:   {txt:name,    cl:"big",     align:"start",  line, n},
      brutto: {txt:brutto,  cl:"small",   align:"end",    line, n}
    }
  }

  return(
    <>
    {
      [top, ...table].map( (line, n)=>
        <div className="line flex stretch wrap" key={n+line._id}>

          <div>
            { line?.nr && <Cell props={ cell(line, n).nr }/> }
            { line?.dealer?.nip && <Cell props={ cell(line, n).nip }/> }
          </div>

          { line?.dealer?.name && <Cell props={ cell(line, n).name }/> }

          { line?.brutto && <Cell props={ cell(line, n).brutto }/> }

          <EditArea props={{mode, line, n, officeFn}}/>
          
        </div>
      )
    }
    </>
  )
}