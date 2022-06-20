import React, { useState } from 'react'

import './Finance.scss'
import { LinesEl } from './LinesEl'
import { NamesEl } from './NamesEl'


const Finance = ()=>{

  let wzor = {
    year:'2021',
    month:'12',
    bz:{
      name:'bzDrive',
      in:{netto:'0.00', vat:'0.00'},
      out:{netto:'0.00', vat:'0.00'},
      salary:'0.00'
    },
    vb:{
      name:'V&B-Masters',
      in:{netto:'0.00', vat:'0.00'},
      out:{netto:'0.00', vat:'0.00'},
      salary:'0.00'
    },
    ce:{
      name:'Centrala',
      in:{netto:'0.00', vat:'0.00'},
      out:{netto:'0.00', vat:'0.00'},
      salary:'0.00'
    }
  }

  // name:"Nazwa wydzialu",
  // in:{netto:"Dostawa opodatkowana netto", vat:"Dostawa opodatkowana vat"}, Ewidencja dostaw
  // out:{netto:'Nabycie towarow netto', vat:'Nabycie towarow vat'}, Nabycie towarow i uslug (co z Wartosc zakupow nieopodatkowanych)
  // salary:'Wydatki razem', Ksiega przychodow i rozchodow

  // w centrali powinni byc uslugi Ksiegowej i BHP

  let [fin, setFin] = useState([
    {
      year:'2022',
      month:'02',
      bz:{
        name:'bzDrive',
        in:{netto:'6837.36', vat:'1572.64'},
        out:{netto:'13848.15', vat:'2994.81'},
        salary:'0.00'
      },
      vb:{
        name:'V&B-Masters',
        in:{netto:'0.00', vat:'0.00'},
        out:{netto:'0.00', vat:'0.00'},
        salary:'0.00'
      },
      ce:{
        name:'Centrala',
        in:{netto:'0.00', vat:'0.00'},
        out:{netto:'706.80', vat:'162.57'},
        salary:'0.00'
      }
    },
    {
      year:'2022',
      month:'01',
      bz:{
        name:'bzDrive',
        in:{netto:'11357.72', vat:'2612.28'},
        out:{netto:'4586.00', vat:'1049.26'},
        salary:'5999.01'
      },
      vb:{
        name:'V&B-Masters',
        in:{netto:'0.00', vat:'0.00'},
        out:{netto:'173.90', vat:'40.00'},
        salary:'0.00'
      },
      ce:{
        name:'Centrala',
        in:{netto:'0.00', vat:'0.00'},
        out:{netto:'0.00', vat:'0.00'},
        salary:'427.25'
      }
    },
    {
      year:'2021',
      month:'12',
      bz:{
        name:'bzDrive',
        in:{netto:'12818.35', vat:'2948.23'},
        out:{netto:'8556.97', vat:'1968.10'},
        salary:'0.00'
      },
      vb:{
        name:'V&B-Masters',
        in:{netto:'2500.00', vat:'200.00'},
        out:{netto:'0.00', vat:'0.00'},
        salary:'0.00'
      },
      ce:{
        name:'Centrala',
        in:{netto:'0.00', vat:'0.00'},
        out:{netto:'0.00', vat:'0.00'},
        salary:'427.25'
      }
    },
    {
      year:'2021',
      month:'11',
      bz:{
        name:'bzDrive',
        in:{netto:'3932.84', vat:'904.56'},
        out:{netto:'5396.65', vat:'1241.20'},
        salary:'7453.14'
      },
      vb:{
        name:'V&B-Masters',
        in:{netto:'3000.00', vat:'240.00'},
        out:{netto:'0.00', vat:'0.00'},
        salary:'0.00'
      },
      ce:{
        name:'Centrala',
        in:{netto:'0.00', vat:'0.00'},
        out:{netto:'0.00', vat:'0.00'},
        salary:'337.50'
      }
    }
  ])

  return(
    <div className="Finance flex stretch">

      {/* <div className="names flex column">
      </div>

      <div className="verticalLine"></div>

      <div className="lines flex column">
        <div className="scale flex">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div> */}

      <div className="names flex column">
      {
        fin.map( (line, n)=>
          <section>
            <div className="date">{`${line.month}/${line.year}`}</div>
            <div className="dashedLine"></div>
            <NamesEl props={{el:line.bz}} />
            <div className="dashedLine"></div>
            <NamesEl props={{el:line.vb}} />
            <div className="dashedLine"></div>
            <NamesEl props={{el:line.ce}} />
            <div className="dashedLine"></div>
          </section>
        )
      }
      </div>

      <div className="verticalLine"></div>

      <div className="lines flex column">
      {
        fin.map( (line, n)=>
          <section>
            <div className="date"></div>
            <div className="dashedLine"></div>
            <LinesEl props={{el:line.bz}} />
            <div className="dashedLine"></div>
            <LinesEl props={{el:line.vb}} />
            <div className="dashedLine"></div>
            <LinesEl props={{el:line.ce}} />
            <div className="dashedLine"></div>
          </section>
        )
      }
      </div>

    </div>
  )
}

export default Finance