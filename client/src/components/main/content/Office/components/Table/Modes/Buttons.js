import React from 'react'

import { bzCalc} from '../../../../../../../store/functions'


export const Buttons = ({ props:{line, officeFn} }) => {

  let netto = 0, priceVAT = 0, brutto = 0
  
  line.articles.map( (el, nr)=>{
    netto = bzCalc( '+', netto, el.netto )
    priceVAT = bzCalc( '+', priceVAT, el.vat )
    brutto = bzCalc( '+', brutto, el.sum )
  })

  let obj = {
    status: line._id ? "edited" : "saved",
    _id: line._id,
    place: line.place,
    date: line.date,
    dealer: line.dealer,
    buyer: line.buyer,
    invoiceNr: line.invoiceNr,
    articles: line.articles,
    comments: line.comments,
    netto,
    priceVAT,
    brutto,
    pay: line.pay
  }

  let EXIT_PRINT_EDIT_MODE= ()=> officeFn({ type:"EXIT_PRINT_EDIT_MODE" })
  let SAVE = ()=> officeFn({ type:"SAVE", payload:obj })

  let btns = [
    {act:"cancel", click: ()=>EXIT_PRINT_EDIT_MODE()},
    {act:"save", click: ()=>SAVE ()},
  ]

  let key = `Btns${Math.random(1000)}`

  return(
    <div className="buttons flex">
      { btns.map( (btn, nr)=> <Btn props={{act:btn.act, click:btn.click}} key={nr+key}/> ) }
    </div>
  )
}

const Btn = ({ props:{act, click} })=>{

  let cl = (act === "cancel") ? "red" : "green"
  let img = (act === "cancel") ? "icoCancel" : "icoCheck"
  let txt = (act === "cancel") ? "Anulować" : "Potwierdzić"

  return(
    <button className={`flex bold ${cl}`} onClick={ ()=> click() }>
      <img className="imgBtn" src={`https://files.bzdrive.com/img/ico/${img}.png`} alt={act} />
      <span>{txt}</span>
    </button>
  )
}