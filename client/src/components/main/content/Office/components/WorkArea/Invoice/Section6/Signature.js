import React from 'react'


export const Signature = ({sig, index}) => {

  return(
    <div className="signature buyer" key={`Signature${index}`}>
      <div className="signLine flex"></div>
      <div className="flex">{sig}</div>
    </div>
  )
}