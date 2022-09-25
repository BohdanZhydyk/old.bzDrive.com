import React, { useState } from "react"

import "./../Office.scss"
import { NormalizeNr, nip_sanitize } from "./../../../../state/functions"
import { Cell } from "./../Cell"
import EditArea from "./../EditArea"


export const Invoice = ({ props:{mode, line, n, ReloadFn, officeFn} })=>{

  const [show, setShow] = useState(false)

  let CANCEL = ()=> setShow(false)

  let cell = (line, n)=>{

    let user = n === 0    ? "Wlasciciel"    : line?.dealer?.shortName
    let nr = n === 0      ? "Faktura Nr."   : NormalizeNr(line?.nr)
    let nip = n === 0     ? "NIP"           : nip_sanitize(line?.buyer?.nip)
    let name = n === 0    ? "Nabywca"       : line?.buyer?.name
    let brutto = n === 0  ? "Cena brutto"   : line?.brutto

    return {
      user:   {txt:user,    cl:"small",   align:"start",  line, n, cb:()=>setShow(!show) },
      nr:     {txt:nr,      cl:"small",   align:"",       line, n},
      name:   {txt:name,    cl:"big",     align:"start",  line, n},
      nip:    {txt:nip,     cl:"small",   align:"",       line, n},
      brutto: {txt:brutto,  cl:"small",   align:"end",    line, n}
    }
  }

  return(
    <div className="line flex stretch wrap">

      <div>
        <Cell props={ cell(line, n).user }/>
        <Cell props={ cell(line, n).nr }/>
      </div>

      <Cell props={ cell(line, n).name }/>

      <div>
        <Cell props={ cell(line, n).nip }/>
        <Cell props={ cell(line, n).brutto }/>
      </div>

      { show && <EditArea props={{mode, line, CANCEL, ReloadFn, officeFn}}/> }

    </div>
  )
}