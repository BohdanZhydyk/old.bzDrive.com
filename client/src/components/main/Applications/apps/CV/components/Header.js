import React from 'react'


export const Header = ({ props:{data, handlePrint} })=>{

  let printImg = "https://files.bzdrive.com/img/ico/icoPrint.png"
  
  return (
    <div className="header boxShadow flex">

      <span className="hdrLR flex"></span>

      <span className="hdrC flex">{data.author}</span>

      <span className="hdrLR flex" onClick={ ()=> handlePrint() } >
        <img className="imgBtn" src={printImg} title="Print CV" alt="print" />
      </span>
      
    </div>
  )
}