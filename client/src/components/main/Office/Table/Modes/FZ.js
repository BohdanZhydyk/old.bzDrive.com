import React from 'react'
import { Cell } from "./../Cell"
import EditArea from "../EditArea"


export const FZ = ({ props:{mode, table, officeFn} })=>{

  let cell = (line, n)=>{

    let nr = n === 0 ? "Faktura Nr." : line?.nr
    let nip = n === 0 ? "NIP" : line?.dealer?.nip
    let name = n === 0 ? "Sprzedawca" : line?.dealer?.name
    let brutto = n === 0 ? "Cena brutto" : line?.brutto

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
      [ {}, ...table ].map( (line, n)=>
        <div className="line flex stretch wrap" key={n+line._id}>

          <div>
            <Cell props={ cell(line, n).nr }/>
            <Cell props={ cell(line, n).nip }/>
          </div>

          <Cell props={ cell(line, n).name }/>

          <Cell props={ cell(line, n).brutto }/>

          <EditArea props={{mode, line, n, officeFn}}/>
          
        </div>
      )
    }
    </>
  )
}