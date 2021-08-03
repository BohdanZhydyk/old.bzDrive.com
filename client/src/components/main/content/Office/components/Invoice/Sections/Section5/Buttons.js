import React from 'react'

import { bzCalc} from '../../../../../../../../store/functions'


export const Buttons = ({ props:{line, officeFn} }) => {

  let netto = 0, priceVAT = 0, brutto = 0
  
  line.articles.map( (el, nr)=>{
    netto = bzCalc( '+', netto, el.netto )
    priceVAT = bzCalc( '+', priceVAT, el.vat )
    brutto = bzCalc( '+', brutto, el.sum )
  })

  let EXIT_EDIT_MODE= ()=> officeFn({ type:"EXIT_EDIT_MODE" })
  let SAVE_INVOICE= ()=> officeFn({ type:"SAVE_INVOICE", payload:{...line, netto, priceVAT, brutto} })

  return(
    <div className="buttons flex">

      <button className="flex bold red" onClick={ ()=> EXIT_EDIT_MODE() }>Anulować</button>

      <button className="flex bold green" onClick={ ()=> SAVE_INVOICE() }>Potwierdzić</button>
      
    </div>
  )
}