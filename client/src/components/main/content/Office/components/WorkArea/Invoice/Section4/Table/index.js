import React from 'react'

import { HeaderLine } from './HeaderLine'
import { Line } from './Line'


const Table = ({}) => {

  const table = [
    {
      ART:"000001",
      SER:"Usługa remontowa 1",
      QUA:"1",
      PRN:"77.00",
      VAT:"23",
      PRV:"23.00",
      PRG:"100.00"
    },
    {
      ART:"000002",
      SER:"Usługa remontowa 2",
      QUA:"1",
      PRN:"77.00",
      VAT:"23",
      PRV:"23.00",
      PRG:"100.00"
    },
    {
      ART:"000003",
      SER:"Usługa remontowa 3",
      QUA:"1",
      PRN:"77.00",
      VAT:"23",
      PRV:"23.00",
      PRG:"100.00"
    },
    {
      ART:"000004",
      SER:"Usługa remontowa 4",
      QUA:"1",
      PRN:"77.00",
      VAT:"23",
      PRV:"23.00",
      PRG:"100.00"
    },
    {
      ART:"000005",
      SER:"Usługa remontowa 5",
      QUA:"1",
      PRN:"77.00",
      VAT:"23",
      PRV:"23.00",
      PRG:"100.00"
    }
  ]

  return(
    <div className="table flex wrap">

      <HeaderLine />

      { table.map( (line, nr)=> <Line line={line} nr={nr} key={`InvoiceLine${nr}`} /> ) }

    </div>
  )
}

export default Table