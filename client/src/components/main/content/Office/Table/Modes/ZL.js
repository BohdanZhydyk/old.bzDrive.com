import React from "react"

import { NormalizeNr } from "../../../../../../store/functions"
import { Cell } from "./../Cell"
import EditArea from "../EditArea"


export const ZL = ({ props:{mode, table, officeFn} })=>{

  let top = {
    nr:"Zlecenie Nr.",
    buyer:{
      contacts:{
        tel:"Telefon"
      }
    },
    car:{
      brand:"Marka",
      model:"Model",
      numbers:"Nr. Rej.",
      faults:"Opis i zakres uszkodzenia"
    },
    brutto:"Cena brutto"
  }

  let cell = (line, n)=>{

    let nr = n === 0 ? line?.nr : NormalizeNr(mode, line?.nr)
    let tel = line?.buyer?.contacts?.tel
    let car = `${line?.car?.brand} / ${line?.car?.model} / ${line?.car?.numbers}`
    let faults = line?.car?.faults
    let brutto = line?.brutto

    return {
      nr:     {txt:nr,      cl:"small",   align:"",       line, n},
      tel:    {txt:tel,     cl:"small",   align:"",       line, n},
      car:    {txt:car,     cl:"big",     align:"start",  line, n},
      faults: {txt:faults,  cl:"big",     align:"start",  line, n},
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
            { line?.buyer?.contacts?.tel && <Cell props={ cell(line, n).tel }/> }
          </div>

          <div>

            <div className={`flex ${n !== 0 ? `txtYlw` : ``}`}>
              { line?.car?.brand && <Cell props={ cell(line, n).car }/> }
            </div>

            { line?.car?.faults && <Cell props={ cell(line, n).faults }/> }

          </div>

          { line?.brutto && <Cell props={ cell(line, n).brutto }/> }

          <EditArea props={{mode, line, n, officeFn}}/>
          
        </div>
      )
    }
    </>
  )
}