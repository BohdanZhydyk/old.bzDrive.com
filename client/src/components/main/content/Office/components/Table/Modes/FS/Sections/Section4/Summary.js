import React from 'react'

import { bzCalc} from '../../../../../../../../../../store/functions'
import { Comments } from './Comments'


export const Summary = ({ props:{pri, articles, comments, officeFn} }) => {

  let sumNetto = 0, sumVAT = 0, sumBrutto = 0

  articles.map( (el, nr)=>{
    sumNetto = bzCalc( '+', sumNetto, el.netto )
    sumVAT = bzCalc( '+', sumVAT, el.vat )
    sumBrutto = bzCalc( '+', sumBrutto, el.sum )
  })

  return(
    <div className="summary flex stretch">

      <Comments props={{pri, comments}} />

      <div>
        <div className={`TXT cellTop${pri} flex`}>Razem</div>
      </div>

      <div>
        <div className={`PRN cellTop${pri} flex`}>Kwota netto, zł</div>
        <div className="PRN cell flex">{sumNetto}</div>
      </div>

      <div>
        <div className={`PRV cellTop${pri} flex`}>Kwota VAT, zł</div>
        <div className="PRV cell flex">{sumVAT}</div>
      </div>

      <div>
        <div className={`SUM cellTop${pri} flex`}>Wartość brutto, zł</div>
        <div className="SUM cell flex">{sumBrutto}</div>
      </div>
      
    </div>
  )
}