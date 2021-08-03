import React from 'react'

import { ModeBtn } from './ModeBtn'


const ModeBtns = ({ props:{mode, names, officeFn} })=>{
  return(
    <div className="flex wrap">

      { names.map( (btn, index)=> <ModeBtn props={{mode, btn, officeFn}} key={`ModeBtn${index}`} /> ) }
      
    </div>
  )
}

export default ModeBtns