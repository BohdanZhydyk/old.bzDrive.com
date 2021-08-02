import React from 'react'


export const Cells = ({ props:{
  invoiceNr, dealer, buyer, netto, priceVAT, brutto,
  number, article, price, quantity,
  name, nip, contacts, addr
  } })=>{
  
  return(
    <div className="lineData flex stretch">
      { invoiceNr && <Cell props={invoiceNr} /> }
      { dealer && <Cell props={dealer} /> }
      { buyer && <Cell props={buyer} /> }
      { netto && <Cell props={netto} /> }
      { priceVAT && <Cell props={priceVAT} /> }
      { brutto && <Cell props={brutto} /> }

      { number && <Cell props={number} /> }
      { article && <Cell props={article} /> }
      { price && <Cell props={price} /> }
      { quantity && <Cell props={quantity} /> }

      { name && <Cell props={name} /> }
      { nip && <Cell props={nip} /> }
      { contacts && <Cell props={contacts} /> }
      { addr && <Cell props={addr} /> }
    </div>
  )
}

const Cell = ({ props:{cl, data, nr} })=>{

  let classes = `flex ${cl} cell ${ nr === "top" && `black` }`

  return( <div className={classes}>{data}</div> )
}