import React from 'react'

import Info from './Info'


export const ElInfo = ({ props:{mode, car, client, dealer, buyer, print, AreaFn} })=>{

  let infos = (mode)=>{
    switch(mode){
      case "FS":
        return [
          {name:"Dealer", title:"Sprzedawca", arr:dealer},
          {name:"Buyer", title:"Nabywca", arr:buyer}
        ]
      case "ZL":
        return [
          {name:"Car", title:"Opis pojazdu", arr:car},
          {name:"Buyer", title:"Dane klienta", arr:buyer}
        ]
      case "KL":
        return [
          {name:"Client", title:"Dane klienta", arr:client}
        ]
      default: return []
    }
  }

  return(
    <section className="ElInfo flex stretch between wrap">

    {
      infos(mode).map( (el, i)=>{
        return( <Info props={{i, el, print, AreaFn}} key={`Rect${el.title}_${i}`} /> )
      })
    }

    </section>
  )
}