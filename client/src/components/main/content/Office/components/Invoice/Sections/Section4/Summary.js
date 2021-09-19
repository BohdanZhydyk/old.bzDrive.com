import React from 'react'

import { bzCalc} from '../../../../../../../../store/functions'
import { Comments } from './Comments'


export const Summary = ({ props:{printMode, articles, comments, officeFn} }) => {

  let sumNetto = 0, sumVAT = 0, sumBrutto = 0

  articles.map( (el, nr)=>{
    sumNetto = bzCalc( '+', sumNetto, el.netto )
    sumVAT = bzCalc( '+', sumVAT, el.vat )
    sumBrutto = bzCalc( '+', sumBrutto, el.sum )
  })

  return(
    <div className="summary flex stretch">

      <Comments props={{printMode, comments}} />

      <div>
        <div className={`TXT cellTop${printMode} flex`}>Razem</div>
      </div>

      <div>
        <div className={`PRN cellTop${printMode} flex`}>Kwota netto, zł</div>
        <div className="PRN cell flex">{sumNetto}</div>
      </div>

      <div>
        <div className={`PRV cellTop${printMode} flex`}>Kwota VAT, zł</div>
        <div className="PRV cell flex">{sumVAT}</div>
      </div>

      <div>
        <div className={`SUM cellTop${printMode} flex`}>Wartość brutto, zł</div>
        <div className="SUM cell flex">{sumBrutto}</div>
      </div>
      
    </div>
  )
}