import React from 'react'

import { Line } from './Line'


export const Info = ({info, nr}) => {
  return(
    <div className="rectangle" key={`Rect${nr}`}>

      <div className="bold">{info.name}</div>

      { info.lines.map( (line, index)=> <Line line={line} index={index} nr={nr}/>) }

      <div className="nip bold">{`NIP: ${info.nip}`}</div>

    </div>
  )
}