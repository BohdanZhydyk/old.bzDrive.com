import React from 'react'
import { SumArray, bzPriceToWord, bzDateTo_DD_MM_YYYY } from "../../../../../state/functions"
import { Input } from "./../../../../All/Input"


export const ElAmount = ({ props:{mode, nr, articles, print, AreaFn} })=>{

  let payDateEdit = {form:"TO_DATE", type:"date", legend:`Data`, val:nr.to}
  let payDate = bzDateTo_DD_MM_YYYY( nr ? nr.to.toString() : `--------` )
  let payMethod = nr.method === 0 ? 'gotówka' : 'przelew'
  let sum = SumArray(articles.map( (el)=> el.SUM ) )

  let amount = (mode === "FS" || mode === "FZ")
  ? [
      { txt: `Do zapłaty`, content: `${sum} zł` },
      { txt: `Kwota słownie`, content: bzPriceToWord(sum) },
      { txt: `Sposób płatności`, content: print ? payMethod : <Method props={{ method:(nr.method), AreaFn }} /> },
      { txt: `Termin płatności`, content: print ? payDate : <Input props={{ input:payDateEdit, print, Fn:AreaFn }} /> }
    ]
  : [
      { txt: `Do zapłaty`, content: `${sum} zł` },
      { txt: `Kwota słownie`, content: bzPriceToWord(sum) }
    ]

  return(
    <section className="ElAmount flex end">
      <div className="right">
      {
        amount.map( (el, i)=>{
          return(
            <div className={`flex start ${i === 0 && `amount bold`}`} key={`Amount${i}`}>

              <div className={`txt flex start`}>{ `${el.txt}:` }</div>

              <div className={`bold flex start ${i !== 0 && `func`}`}>{ el.content }</div>

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

  let MethodZero = 'gotówka'
  let MethodOne = 'przelew'

  return(
    <form className="flex">

      <div className="radio">

        <input type="radio" id="html1" name="fav_language"
          value={MethodZero} checked={method === 0} onChange={ ()=> CHANGE_INPUT(0) }
        />

        <label htmlFor="html1">{MethodZero}</label>

      </div>

      <div className="radio">

        <input type="radio" id="html2" name="fav_language"
          value={MethodOne} checked={method !== 0} onChange={ ()=> CHANGE_INPUT(1) }
        />

        <label htmlFor="html2">{MethodOne}</label>

      </div>
      
    </form>
  )
}