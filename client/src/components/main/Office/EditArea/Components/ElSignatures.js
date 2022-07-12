import React from 'react'


export const ElSignatures = ({ props:{sign} }) => {
  return(
    <div className="ElSignatures flex wrap">

      {
        sign.map( (sig, i)=>{

          return(
            <div className="signature" key={`Signature${i}`}>

              <div className="signLine flex"></div>

              <div className="flex">{sig.txt}</div>

            </div>
          )
        })
      }
      
    </div>
  )
}