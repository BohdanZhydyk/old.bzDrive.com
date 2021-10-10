import React from 'react'


export const RedLine = ({artFn}) => {
  return(
    <div className="redLine flex end">
      <div className="btn delete flex" onClick={ ()=> artFn({type:"DELETE"}) }>Potwierdzić</div>
      <div className="btn cancel flex" onClick={ ()=> artFn({type:"CANCEL"}) }>Anulować</div>
    </div>
  )
}