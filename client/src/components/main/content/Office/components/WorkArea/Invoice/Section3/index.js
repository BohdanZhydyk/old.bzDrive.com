import React from 'react'
import './Section3.scss'

import { Info } from './Info'


const Section3 = ({}) => {

  const data = [
    {
      name:"Sprzedawca",
      lines: [
        {name:"", txt:""},
        {name:"", txt:"V&B Masters VITALII OROKHIVSKYI, bzDrive VITALII OROKHIVSKYI"},
        {name:"", txt:"ul. Żołnierzy Dywizji Kościuszkowskiej 1c"},
        {name:"", txt:"81-453 Gdynia"},
        {name:"tel:", txt:"695-755-766"},
        {name:"www:", txt:"bzdrive.com"},
        {name:"e-mail:", txt:"biuro@bzdrive.com"},
        {name:"Nr konta:", txt:"44 1160 2202 0000 0004 9611 5533"},
        {name:"", txt:""}
      ],
      nip:"6040204338"
    },
    {
      name:"Nabywca",
      lines: [
        {name:"", txt:""},
        {name:"nazwa firmy", txt:""},
        {name:"ulica", txt:""},
        {name:"kod pocztowy, miejscowosc", txt:""},
        {name:"tel:", txt:""},
        {name:"www:", txt:""},
        {name:"e-mail:", txt:""},
        {name:"Nr konta:", txt:""},
        {name:"", txt:""}
      ],
      nip:"000-000-00-00"
    }
  ]

  return(
    <div className="section3 flex">
      { data.map( (info, nr)=> <Info info={info} nr={nr}/>) }
    </div>
  )
}

export default Section3