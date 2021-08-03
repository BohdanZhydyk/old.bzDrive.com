import React from 'react'


export const Cells = ({ props:{
  invoiceNr, dealer, buyer, netto, priceVAT, brutto,
  number, article, price, quantity,
  name, nip, contacts, addr
  } })=>{
  
  return(
    <div className="lineData flex stretch">
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
      { quantity && <Cell props={quantity} /> }
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

const Cell = ({ props:{cl, data, nr} })=>{

  let classes = `flex ${cl} cell ${ nr === "top" && `black` }`

  return( <div className={classes}>{data}</div> )
}