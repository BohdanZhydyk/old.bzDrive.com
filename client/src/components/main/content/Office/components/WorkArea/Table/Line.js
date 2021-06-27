import React from 'react'

import { Invoice } from './Cells/Invoice'
import { Dealer } from './Cells/Dealer'
import { Buyer } from './Cells/Buyer'
import { Netto } from './Cells/Netto'
import { Vat } from './Cells/Vat'
import { PriceVAT } from './Cells/PriceVAT'
import { Brutto } from './Cells/Brutto'
import { Nip } from './Cells/Nip'
import { Addr } from './Cells/Addr'
import { Contacts } from './Cells/Contacts'
import { Number } from './Cells/Number'
import { Article } from './Cells/Article'
import { Quantity } from './Cells/Quantity'

import { LineBtns } from './Cells/LineBtns'


export const Line = ({ props:{line, nr, officeFn} })=>{
  return(
    <div className="line flex stretch">
    {
      line &&
      <>

        { line.invoiceNr && <Invoice data={line.invoiceNr} nr={nr}/> }
        { line.dealer && <Dealer data={line.name} nr={nr}/> }
        { line.buyer && <Buyer data={line.buyer} nr={nr}/> }
        { line.number && <Number data={line.number} nr={nr}/> }
        { line.article && <Article data={line.article} nr={nr}/> }
        { line.quantity && <Quantity data={line.quantity} nr={nr}/> }
        { line.netto && <Netto data={line.netto} nr={nr}/> }
        { line.VAT && <Vat data={line.VAT} nr={nr}/> }
        { line.priceVAT && <PriceVAT data={line.priceVAT} nr={nr}/> }
        { line.brutto && <Brutto data={line.brutto} nr={nr}/> }
        { line.nip && <Nip data={line.nip} nr={nr}/> }
        { line.addr && <Addr data={line.addr} nr={nr}/> }
        { line.contacts && <Contacts data={line.contacts} nr={nr}/> }

        <LineBtns nr={nr} officeFn={officeFn}/>

      </>
    }
    </div>
  )
}