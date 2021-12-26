import React from "react"

import { Input } from "./Input"
import { NormalizeNr } from "../../../../../../../store/functions"


export const ElHead = ({ props:{mode, dealer, place, date, edit, nr, AreaFn} })=>{

  let placeInput = {
    form:"Place",
    type:"text",
    legend:"Miejscowość",
    style:"-short end",
    val:place,
    important:true
  }

  let dateInput = {
    form:"Date",
    type:"date",
    legend:"Data wystawienia",
    style:"-short end",
    val:date,
    important:true
  }

  return(
    <section className="ElHead flex wrap">

      <div className={`logo flex start bold`}>

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

      <div className="placeDate flex wrap">

        <DocNr props={{mode, nr}} />

        <div className="placeDateInputs flex wrap end">
          <Input props={{input:placeInput, edit, AreaFn}} />
          <Input props={{input:dateInput, edit, AreaFn}} />
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
      nr.year &&
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