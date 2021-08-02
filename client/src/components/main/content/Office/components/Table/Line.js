import React from 'react'

import { Cells } from './Cells'
import { LineBtns } from './LineBtns'


export const Line = ({ props:{mode, line, nr, officeFn} })=>{

  let top = (nr === "top")

  let color = line?.status

  let invoiceNrData = top ? `Faktura Nr.` : line?.invoiceNr
  let dealerData = top ? `Sprzedawca` : line?.dealer?.name
  let buyerData = top ? `Nabywca` : line?.buyer?.name
  let nameData = top ? `Nazwa` : line?.name
  let nettoData = top ? `Kwota Netto` : line?.netto
  let priceVATData = top ? `Kwota VAT` : line?.priceVAT
  let bruttoData = top ? `Kwota Brutto` : line?.brutto
  let numberData = top ? `Artykul` : line?.number
  let articleData = top ? `Towar / Material / Usluga` : line?.article
  let priceData = top ? `Cena Brutto` : line?.price
  let quantityData = top ? `Iłość` : line?.quantity
  let nipData = top ? `NIP` : line?.nip

  let contactsData = top
    ? `Kontakty`
    : <div>
        <div>{`tel.: ${line?.contacts?.tel},`}</div>
        <div>{`e-mail: ${line?.contacts?.email},`}</div>
        <div>{`www: ${line?.contacts?.www}`}</div>
      </div>

  let addrData = top
    ? `Adres`
    : <div>
        <span>{`${line?.addr?.zip} `}</span>
        <span>{`${line?.addr?.town}, `}</span>
        <span>{`${line?.addr?.street}`}</span>
      </div>

  let invoiceNr = {cl:`invoice ${color}`, data:invoiceNrData, nr}
  let dealer = {cl:`dealer ${color} ${!top && "start"}`, data:dealerData, nr}
  let buyer = {cl:`buyer ${color} ${!top && "start"}`, data:buyerData, nr}
  let name = {cl:`name ${color} ${!top && "start"}`, data:nameData, nr}
  let netto = {cl:`netto ${color}`, data:nettoData, nr}
  let priceVAT = {cl:`priceVAT ${color}`, data:priceVATData, nr}
  let brutto = {cl:`brutto ${color}`, data:bruttoData, nr}
  let number = {cl:`number ${color}`, data:numberData, nr}
  let article = {cl:`article ${color} ${!top && "start"}`, data:articleData, nr}
  let price = {cl:`price ${color}`, data:priceData, nr}
  let quantity = {cl:`quantity ${color}`, data:quantityData, nr}
  let nip = {cl:`nip ${color}`, data:nipData, nr}
  let contacts = {cl:`contacts ${color}`, data:contactsData, nr}
  let addr = {cl:`addr ${color}`, data:addrData, nr}

  return(
    <div className="line flex wrap">

      { mode === "FA" && <Cells props={{invoiceNr, dealer, buyer, netto, priceVAT, brutto}} /> }
      { mode === "TO" && <Cells props={{number, article, price, quantity}} /> }
      { (mode === "KL" || mode === "SP") && <Cells props={{name, nip, contacts, addr}} /> }

      <LineBtns props={{line, nr, officeFn}} />

    </div>
  )
}