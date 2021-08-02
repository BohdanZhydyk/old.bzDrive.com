import React from 'react'

import { bzCalc} from './../../../../../../../../../store/functions'
import { Input } from './Input'


export const Article = ({ props:{printMode, el = "top", index = "top", officeFn} }) => {
  
  let LINE_CLICK = ()=>
    officeFn({ type:"LINE_CLICK", payload: {act: top ? "plus" : "delete", nr:index} })

  let top = (el === "top" ? true : false)

  let number = el.number ? el.number : ""
  let article = el.article ? el.article : ""
  
  let price = el.price ? el.price : (0).toFixed(2)
  let quantity = el.quantity ? el.quantity : (0)
  let VAT = `${el.VAT ? el.VAT : 23}`
  let sum = bzCalc( '*', price, quantity )
  let netto = bzCalc( 'VAT', sum, VAT )
  let vat = bzCalc( '-', sum, netto )
  
  let InputNumber = <Input props={{ printMode, nr:index, el:"number", val:number, officeFn }} />
  let InputArticle = <Input props={{ printMode, nr:index, el:"article", cl:true, val:article, officeFn }} />
  let InputPrice = <Input props={{ printMode, nr:index, el:"price", val:price, officeFn }} />
  let InputQuantity = <Input props={{ printMode, nr:index, el:"quantity", val:quantity, officeFn }} />
  let InputVAT = <Input props={{ printMode, nr:index, el:"VAT", val:VAT, officeFn }} />

  let txtNOR = top ? `Lp.` : `${index + 1}.`
  let txtART = top ? `Artykul towaru` : InputNumber
  let txtSER = top ? `Nazwa towaru / usługi` : InputArticle
  let txtPRG = top ? `Cena, zł` : InputPrice
  let txtQUA = top ? `Ilość` : InputQuantity
  let txtVAT = top ? `VAT, %` : InputVAT
  let txtPRN = top ? `Kwota netto, zł` : netto
  let txtPRV = top ? `Kwota VAT, zł` : vat
  let txtSUM = top ? `Kwota brutto, zł` : sum

  let classes = {
    NOR:`NOR cell${printMode} flex`, ART:`ART cell${printMode} flex`,
    SER:`SER cell${printMode} flex ${!top && `start`}`, PRG:`PRG cell${printMode} flex`,
    QUA:`QUA cell${printMode} flex`, PRN:`PRN cell${printMode} flex`,
    VAT:`VAT cell${printMode} flex`, PRV:`PRV cell${printMode} flex`,
    SUM:`SUM cell${printMode} flex`
  }
  let src = `https://files.bzdrive.com/img/ico/ico${top ? `Plus` : `Delete`}.png`

  return(
    <div className={`tr flex ${top && `headerTr${printMode} bold`} stretch`}>

      <div className={classes.NOR}>{txtNOR}</div>
      <div className={classes.ART}>{txtART}</div>
      <div className={classes.SER}>{txtSER}</div>
      <div className={classes.PRG}>{txtPRG}</div>
      <div className={classes.QUA}>{txtQUA}</div>
      <div className={classes.VAT}>{txtVAT}</div>
      <div className={classes.PRN}>{txtPRN}</div>
      <div className={classes.PRV}>{txtPRV}</div>
      <div className={classes.SUM}>{txtSUM}</div>

      {
        !printMode &&
        <div className="flex">
          <img src={src} onClick={ ()=> LINE_CLICK() } alt={top ? `Plus` : `Delete`} />
        </div>
      }
      
    </div>
  )
}