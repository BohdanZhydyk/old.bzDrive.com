import React from 'react'
import { SummaryAll, bzPriceToWord } from "../../../../../state/functions"
import { Input } from "./../../../../All/Input"


export const ElAmount = ({ props:{mode, pay, articles, print, AreaFn} })=>{

  let payDateEdit = {form:"PAYDATE", type:"date", legend:`Data`, val:pay.date}
  let YYYY = pay.date.year
  let MM = pay.date.month < 10 ? `0${pay.date.month}` : `${pay.date.month}`
  let DD = pay.date.day < 10 ? `0${pay.date.day}` : `${pay.date.day}`
  let payDate = `${DD}.${MM}.${YYYY}`

  let amount = (mode === "FS")
  ?
  [
    { txt: `Do zapłaty`, content: `${ SummaryAll(articles).sum } zł` },
    { txt: `Kwota słownie`, content: bzPriceToWord( SummaryAll(articles).sum ) },
    { txt: `Sposób płatności`, content: print ? pay.method : <Method props={{ method:(pay.method === `gotówka`), AreaFn }} /> },
    { txt: `Termin płatności`, content: print ? payDate : <Input props={{ input:payDateEdit, print, Fn:AreaFn }} /> }
  ]
  :
  [
    { txt: `Do zapłaty`, content: `${ SummaryAll(articles).sum } zł` },
    { txt: `Kwota słownie`, content: bzPriceToWord( SummaryAll(articles).sum ) }
  ]

  return(
    <section className="ElAmount flex end">
      <div className="right">
      {
        amount.map( (el, i)=>{
          return(
            <div className={`flex start ${i === 0 && `amount bold`}`} key={`Amount${i}`}>

              <div className={`txt flex start`}>
                { `${el.txt}:` }
              </div>

              <div className={`bold flex start ${i !== 0 && `func`}`}>
                { el.content }
              </div>

            </div>
          )
        })
      }
      </div>
    </section>
  )
}

const Method = ({ props:{method, AreaFn} })=>{

  let CHANGE_INPUT = (method)=> AreaFn({type:"CHG_METHOD", value:method})

  return(
    <form className="flex">

      <div className="radio">

        <input type="radio" id="html1" name="fav_language"
          value={'gotówka'} checked={method} onChange={ ()=> CHANGE_INPUT('gotówka') }
        />

        <label htmlFor="html1">{'gotówka'}</label>

      </div>

      <div className="radio">

        <input type="radio" id="html2" name="fav_language"
          value={'przelew'} checked={!method} onChange={ ()=> CHANGE_INPUT('przelew') }
        />

        <label htmlFor="html2">{'przelew'}</label>

      </div>
      
    </form>
  )
}