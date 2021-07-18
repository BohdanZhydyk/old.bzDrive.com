import React from 'react'

import { bzCalc} from './../../../../../../../../../../store/functions'


export const Article = ({ props:{el = "top", index = "top", officeFn} }) => {

  let top = (el === "top" ? true : false)

  let n = el.quantity
  let brutto = bzCalc( '*', el.price, n )
  let netto = bzCalc( 'VAT', brutto, el.VAT )
  let vat = bzCalc( '-', brutto, netto )

  let NOR = (top ? `Lp.` : `${index + 1}.`)
  let ART = (top ? `Artykul towaru` : el.number)
  let SER = (top ? `Nazwa towaru / usługi` : el.article)
  let QUA = (top ? `Ilość` : n)
  let PRN = (top ? `Kwota netto` : netto)
  let VAT = (top ? `VAT` : `${el.VAT} %`)
  let PRV = (top ? `Kwota VAT` : vat)
  let PRG = (top ? `Kwota brutto` : brutto)

  return(
    <div className={`tr flex ${top && `headerTr bold`}`}>

      <div className="NOR cell flex">{NOR}</div>
      <div className="ART cell flex">{ART}</div>
      <div className={`SER cell flex ${!top && `start`}`}>{SER}</div>
      <div className="QUA cell flex">{QUA}</div>
      <div className="PRN cell flex">{PRN}</div>
      <div className="VAT cell flex">{VAT}</div>
      <div className="PRV cell flex">{PRV}</div>
      <div className="PRG cell flex">{PRG}</div>

    </div>
  )
}