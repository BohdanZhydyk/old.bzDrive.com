import React from 'react'

import { Invoice } from './Cells/Invoice'
import { Dealer } from './Cells/Dealer'
import { Buyer } from './Cells/Buyer'
import { Netto } from './Cells/Netto'
import { Brutto } from './Cells/Brutto'
import { LineBtns } from './Cells/LineBtns'


export const Line = ({btnsMode, line, nr, officeFn})=>{
  return(
    <div className="line flex" key={`TableLine${nr}`}>
    {
      line &&
      <>

        { line.invoice && <Invoice data={line.invoice} nr={nr}/> }
        { line.dealer && <Dealer data={line.dealer} nr={nr}/> }
        { line.buyer && <Buyer data={line.buyer} nr={nr}/> }
        { line.netto && <Netto data={line.netto} nr={nr}/> }
        { line.brutto && <Brutto data={line.brutto} nr={nr}/> }

        <LineBtns btnsMode={btnsMode} nr={nr} officeFn={officeFn}/>

      </>
    }
    </div>
  )
}