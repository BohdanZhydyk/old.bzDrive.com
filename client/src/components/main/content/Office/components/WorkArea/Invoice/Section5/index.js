import React from 'react'
import './Section5.scss'


const Section5 = ({}) => {
  return(
    <div className="section5 flex">

      <div className="nothing"></div>

      <div className="payments">
        <div className="amount1 flex bold">
          <div className="name flex start">Do zapłaty:</div>
          <div className="data flex start">100.99 zł</div>
        </div>
        <div className="amount2 flex">
          <div className="name flex start bold">Kwota słownie:</div>
          <div className="data flex start">sto złotych 99 / 100</div>
        </div>
        <div className="amount2 flex">
          <span className="name flex start bold">Sposób płatności:</span>
          <span className="data flex start">gotówka / przelew</span>
        </div>
        <div className="amount2 flex">
          <span className="name flex start bold">Termin płatności:</span>
          <span className="data flex start">zapłacono / data</span>
        </div>
      </div>

    </div>
  )
}

export default Section5