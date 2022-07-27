import React from 'react'
import { NormalizeNr, DigLen } from "../../../../../state/functions"

import { Input } from "./../../../../All/Input"


export const ElHead = ({ props:{mode, dealer, place, date, dateTo, nr, print, AreaFn} })=>{

  let placeInput = {form:"PLACE", type:"text", legend:"Miejscowość", val:place, style:" end"}
  let fromInput = {form:"FROM_DATE", type:"date", legend:"Data wystawienia", val:date, style:" end"}
  let toInput = {form:"TO_DATE", type:"date", legend:"Naprawic do", val:dateTo, style:" end"}

  return(
    <section className="ElHead flex end wrap">

      {
        print &&
        <div className="logo flex start bold">

          <img className="imgBtnBig" src={dealer.img} alt={`Logo-${dealer.id}`} />

          <span>{dealer.shortname}</span>

          { mode === "ZL" && <Contacts props={{dealer}} /> }

        </div>
      }

      <div className="placeDate flex wrap end">

        <DocNr props={{mode, print, nr, AreaFn}} />

        <div className="placeDateInputs flex wrap end">
          
          <Input props={{input:placeInput, print, Fn:AreaFn}} />

          <Input props={{input:fromInput, print, Fn:AreaFn}} />

          { mode === "ZL" && <Input props={{input:toInput, print, Fn:AreaFn}} /> }

        </div>

      </div>

    </section>
  )
}

const Contacts = ({ props:{dealer} })=>{
  return(
    <div className="contacts">
      <div>{`${dealer.contacts.tel}`}</div>
      <div>{`${dealer.contacts.www}`}</div>
      <div>{`${dealer.contacts.email}`}</div>
      <div>{`${dealer.addr.zip}, ${dealer.addr.town},`}</div>
      <div>{`${dealer.addr.street}`}</div>
    </div>
  )
}

const DocNr = ({ props:{mode, print, nr, AreaFn} })=>{

  let docName = ()=>{
    switch(mode){
      case "FS": return `Faktura Nr`
      case "ZL": return `Zlecenie Naprawy Nr`
      default: break
    }
  }

  let CHG_NR = (val)=> val < 10000 && AreaFn({ type:"CHG_NR", sign:parseInt(val) })

  return(
    <section className="DocNr flex bold">
    {
      <>
        <span className="docName flex end">{ docName() }</span>

        {
          mode === "FS" && !print
          ?
          <span className="Number flex">
            <span>{ NormalizeNr(nr, true) }</span>
            <input type="number" value={ DigLen(nr?.sign, 4) } onChange={ (e)=> CHG_NR(e.target.value) } />
          </span>
          :
          <span className="Number flex">{ NormalizeNr(nr) }</span>
        }
      </>
    }
    </section>
  )
}