import React from "react"

import { Cell } from "./../Cell"
import EditArea from "../EditArea"


export const KL = ({ props:{mode, table, officeFn} })=>{

  let top = {
    nip:"NIP",
    name:"Nabywca",
    contacts:{
      tel:"Telefon"
    }
  }

  let cell = (line, n)=>{

    let nip = line?.nip
    let name = line?.name
    let tel = line?.contacts?.tel

    return {
      nip:    {txt:nip,     cl:"small",   align:"",       line, n},
      name:   {txt:name,    cl:"big",     align:"start",  line, n},
      tel:    {txt:tel,     cl:"small",   align:"end",    line, n}
    }
  }

  return(
    <>
    {
      [top, ...table].map( (line, n)=>
        <div className="line flex stretch wrap" key={n+line._id}>

          { line?.nip && <Cell props={ cell(line, n).nip }/> }

          { line?.name && <Cell props={ cell(line, n).name }/> }

          { line?.contacts?.tel && <Cell props={ cell(line, n).tel }/> }

          <EditArea props={{mode, line, n, officeFn}}/>

        </div>
      )
    }
    </>
  )
}