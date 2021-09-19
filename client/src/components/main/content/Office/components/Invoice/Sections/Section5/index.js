import React from 'react'
import './Section5.scss'

import { bzCalc, bzIntToWord, inputDateToStandart } from '../../../../../../../../store/functions'


const Section5 = ({ props:{printMode, line, articles, officeFn} }) => {

  let payDate = printMode
    ? `${line.pay.date.day}.${line.pay.date.month}.${line.pay.date.year}`
    : `${line.pay.date.year}-${line.pay.date.month}-${line.pay.date.day}`

  let  PAY_METHOD = (method)=> officeFn({ type:"PAY_METHOD", payload:method })
  let  PAY_DATE = (date)=> officeFn({ type:"PAY_DATE", payload:inputDateToStandart(date.target.value) })

  let chk = line.pay.method === "gotówka"

  let sum = 0

  articles.map( (el, nr)=>{
    sum = bzCalc( "+", sum, el.sum )
    return nr
  })

  if( isNaN(sum) ) sum = (0).toFixed(2)

  return(
    <div className="section5 flex">

      <div className="nothing"></div>

      <div className="payments">

        <div className={`amount1${printMode} flex bold`}>
          <div className="name flex start">{`Do zapłaty:`}</div>
          <div className="data flex start">{`${sum} zł`}</div>
        </div>

        <div className={`amount2 flex`}>
          <div className="name flex start">{`Kwota słownie:`}</div>
          <div className="data flex start">{bzIntToWord(sum)}</div>
        </div>

        <div className={`amount2 flex`}>
          <div className="name flex start">{`Sposób płatności:`}</div>
          <div className="data flex start">
            {
              printMode
              ?
              line.pay.method
              :
              <form className="flex">
                <div className="radio" onClick={ ()=> PAY_METHOD('gotówka') }>
                  <input type="radio" id="html1" name="fav_language" value={'gotówka'} checked={chk} />
                  <label for="html1">{'gotówka'}</label>
                </div>
                <div className="radio" onClick={ ()=> PAY_METHOD('przelew') }>
                  <input type="radio" id="html2" name="fav_language" value={'przelew'} checked={!chk} />
                  <label for="html2">{'przelew'}</label>
                </div>
              </form>
            }
          </div>
        </div>

        {
          line.pay.method &&
          <div className={`amount2 flex`}>
            <div className="name flex start">{`Termin płatności:`}</div>
            <div className="data flex start">
            {
              printMode
              ?
              payDate
              :
              <input
                className="dateInput"
                type="date"
                name="trip-start"
                value={payDate}
                onChange={ (e)=> PAY_DATE(e) }>
              </input>
            }
            </div>
          </div>
        }

      </div>

    </div>
  )
}

export default Section5