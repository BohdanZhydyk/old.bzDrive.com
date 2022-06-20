import React from 'react'
import { NormalizeNr } from "../../../../../../state/functions"

import { Input } from "./Input"


export const ElHead = ({ props:{mode, dealer, place, date, dateTo, status, edit, nr, AreaFn} })=>{

  let done = status === "done"

  let DONE_CLICK = ()=> AreaFn({form:"DoneStatus", value: done ? "edited" : "done"})

  let placeInput = {
    form:"Place",
    type:"text",
    legend:"Miejscowość",
    style:" end",
    val:place,
    important:true
  }

  let dateInput = {
    form:"Date",
    type:"date",
    legend:"Data wystawienia",
    style:" end",
    val:date,
    important:true
  }

  let toInput = {
    form:"DateTo",
    type:"date",
    legend:"Naprawic do",
    style:" end",
    val:dateTo,
    important:true
  }

  return(
    <section className="ElHead flex wrap">

      <div className="logo flex start bold">

        <img className="imgBtnBig" src={dealer.img} alt={`Logo-${dealer.id}`} />

        <span>{dealer.shortname}</span>

        {
          mode === "ZL" &&
          <div className="contacts">
            <div>{`${dealer.contacts.tel}`}</div>
            <div>{`${dealer.contacts.www}`}</div>
            <div>{`${dealer.contacts.email}`}</div>
            <div>{`${dealer.addr.zip}, ${dealer.addr.town}, ${dealer.addr.street}`}</div>
          </div>
        }

      </div>

      <div className="placeDate flex wrap end">

        {
          (edit && mode === "ZL") &&
          <span className="orderDone bold flex" onClick={ ()=> DONE_CLICK() }>
            { done ? `Wroćić do naprawy` : `Zamknąć zlecenie` }
          </span>
        }

        <DocNr props={{mode, nr}} />

        <div className="placeDateInputs flex wrap end">
          
          <Input props={{input:placeInput, edit, AreaFn}} />

          <Input props={{input:dateInput, edit, AreaFn}} />

          { mode === "ZL" && <Input props={{input:toInput, edit, AreaFn}} /> }

        </div>

      </div>

    </section>
  )
}

const DocNr = ({ props:{mode, nr} })=>{

  let docName = ()=>{
    switch(mode){
      case "FS": return `Faktura Nr`
      case "ZL": return `Zlecenie Naprawy Nr`
      default: break
    }
  }

  return(
    <section className="DocNr flex bold">
    {
      nr?.year &&
      <>
        <span className="docName flex end">
          { docName() }
        </span>

        <span className="Number flex">
          { NormalizeNr(mode, nr) }
        </span>
      </>
    }
    </section>
  )
}