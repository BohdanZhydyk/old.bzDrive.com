import React from 'react'


export const Line = ({line, nr}) => {
  return(
    <div className="tr flex" key={`TableLine${nr}`}>

      <div className="NOR cell flex">{`${nr + 1}.`}</div>
      <div className="ART cell flex start">{line.ART}</div>
      <div className="SER cell flex start">{line.SER}</div>
      <div className="QUA cell flex end">{line.QUA}</div>
      <div className="PRN cell flex end">{line.PRN}</div>
      <div className="VAT cell flex end">{`${line.VAT}%`}</div>
      <div className="PRV cell flex end">{line.PRV}</div>
      <div className="PRG cell flex end">{line.PRG}</div>

    </div>
  )
}