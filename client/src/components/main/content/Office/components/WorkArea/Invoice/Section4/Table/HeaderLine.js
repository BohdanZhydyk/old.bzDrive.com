import React from 'react'


export const HeaderLine = () => {
  return(
    <div className="tr headerTr flex bold" key={`TableHeaderLine`}>
      <div className="NOR cell flex">{`Lp.`}</div>
      <div className="ART cell flex">{`Artykul towaru`}</div>
      <div className="SER cell flex">{`Nazwa towaru / usługi`}</div>
      <div className="QUA cell flex">{`Ilość`}</div>
      <div className="PRN cell flex">{`Kwota netto`}</div>
      <div className="VAT cell flex">{`VAT`}</div>
      <div className="PRV cell flex">{`Kwota VAT`}</div>
      <div className="PRG cell flex">{`Kwota brutto`}</div>
    </div>
  )
}