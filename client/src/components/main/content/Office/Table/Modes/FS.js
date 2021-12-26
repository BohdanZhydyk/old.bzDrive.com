import React from "react"

import { NormalizeNr } from "../../../../../../store/functions"
import { Cell } from "./../Cell"
import EditArea from "../EditArea"


export const FS = ({ props:{mode, table, officeFn} })=>{

  let top = {
    nr:"Faktura Nr.",
    buyer:{
      nip:"NIP",
      name:"Nabywca"
    },
    brutto:"Cena brutto"
  }

  let cell = (line, n)=>{

    let nr = n === 0 ? line?.nr : NormalizeNr(mode, line?.nr)
    let nip = line?.buyer?.nip
    let name = line?.buyer?.name
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
        <div className="line flex stretch wrap" key={`FS_Line${n}${line._id}`}>

          <div>
            { line?.nr && <Cell props={ cell(line, n).nr }/> }
            { line?.buyer?.nip && <Cell props={ cell(line, n).nip }/> }
          </div>

          { line?.buyer?.name && <Cell props={ cell(line, n).name }/> }

          { line?.brutto && <Cell props={ cell(line, n).brutto }/> }

          <EditArea props={{mode, line, n, officeFn}}/>

        </div>
      )
    }
    </>
  )
}