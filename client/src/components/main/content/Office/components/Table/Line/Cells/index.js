import React from 'react'

import './Cell.scss'
import { Cell } from './Cell'


const Cells = ({ props:{
  invoiceNr, dealer, buyer, netto, priceVAT, brutto, number, article, name, nip, contacts, addr
  } })=>{
  
  return(
    <div className="cells flex stretch">

      { invoiceNr && <Cell props={invoiceNr} /> }
      { number && <Cell props={number} /> }
      { article && <Cell props={article} /> }

      {
        (dealer || buyer) &&
        <div>
          <Cell props={dealer} />
          <Cell props={buyer} />
        </div>
      }
      
      { netto && <Cell props={netto} /> }
      {/* { quantity && <Cell props={quantity} /> } */}
      { priceVAT && <Cell props={priceVAT} /> }
      { brutto && <Cell props={brutto} /> }

      {
        (name || addr) &&
        <div>
          <Cell props={name} />
          <Cell props={addr} />
        </div>
      }

      { nip && <Cell props={nip} /> }
      { contacts && <Cell props={contacts} /> }
      
    </div>
  )
}

export default Cells