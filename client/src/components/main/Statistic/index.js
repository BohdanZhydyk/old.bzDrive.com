import React, { useState, useEffect } from 'react'

import './Statistic.scss'
import Traffic from './Traffic'
import Finance from './Finance'


const Statistic = ()=>{

  const [menu, setMenu] = useState([
    {txt:"Page traffic statistics", component:<Traffic/>},
    {txt:"Financial statistics", component:<Finance/>}
  ])

  let OPEN_SECTION = (n)=>{
    setMenu(
      menu.map( (el, k)=>
        (n === k)
        ? {...el, active:!el.active}
        : {...el, active:false}
      )
    )
  }

  return(
    <div className="Statistic flex column">
      {
        menu.map( (el, n)=>{
          return(
            <section className="StatSection flex column" key={`StatSection${n}`}>

              <div className="SatatHeader flex start" onClick={ ()=>OPEN_SECTION(n) }>
                {el.txt}
              </div>

              { el.active && el.component }

            </section>
          )
        })
      }
    </div>
  )
}

export default Statistic