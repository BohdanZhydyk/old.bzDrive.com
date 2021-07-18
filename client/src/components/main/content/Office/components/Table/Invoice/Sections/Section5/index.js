import React from 'react'
import './Section5.scss'

import { bzCalc, bzIntToWord } from '../../../../../../../../../store/functions'

import { Amount } from './Amount'
import { Buttons } from './Buttons'


const Section5 = ({ props:{articles, officeFn} }) => {

  let sum = 0

  articles.map( (el, nr)=>{
    let articleSum = bzCalc("*", el.price, el.quantity)
    sum = bzCalc( "+", sum, articleSum )
    return nr
  })

  if( isNaN(sum) ) sum = (0).toFixed(2)



  return(
    <div className="section5 flex">

      <div className="nothing"></div>

      <div className="payments">

        <Amount props={{ cl:"amount1 flex bold", name:"Do zapłaty", data:`${sum} zł` }} />

        <Amount props={{ cl:"amount2 flex", name:"Kwota słownie", data:bzIntToWord(sum) }} />

        <Amount props={{ cl:"amount2 flex", name:"Sposób płatności", data:"method" }} />

        <Amount props={{ cl:"amount2 flex", name:"Termin płatności", data:"payed" }} />

        <Buttons props={{officeFn}} />

      </div>

    </div>
  )
}

export default Section5