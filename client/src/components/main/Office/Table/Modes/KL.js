import React from 'react'
import { Cell } from "./../Cell"
import EditArea from "../EditArea"


export const KL = ({ props:{mode, table, officeFn} })=>{

  let cell = (line, n)=>{

    let nip = n === 0 ? "NIP" : line?.client?.nip
    let name = n === 0 ? "Nabywca" : line?.client?.name
    let tel = n === 0 ? "Telefon" : line?.client?.contacts?.tel

    return {
      nip:    {txt:nip,     cl:"small",   align:"",       line, n},
      name:   {txt:name,    cl:"big",     align:"start",  line, n},
      tel:    {txt:tel,     cl:"small",   align:"end",    line, n}
    }
  }

  return(
    <>
    {
      [ {}, ...table ].map( (line, n)=>
        <div className="line flex stretch wrap" key={n+line._id}>

          <Cell props={ cell(line, n).nip }/>

          <Cell props={ cell(line, n).name }/>

          <Cell props={ cell(line, n).tel }/>

          <EditArea props={{mode, line, n, officeFn}}/>

        </div>
      )
    }
    </>
  )
}