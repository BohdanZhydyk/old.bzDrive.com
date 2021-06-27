import React from 'react'

import { ModeBtn } from './ModeBtn'


const ModeBtns = ({ props:{btnsMode, names, officeFn} })=>{
  return(
    <div className="flex wrap">
      { names.map( (btn, index)=> <ModeBtn props={{btnsMode, btn, officeFn}} key={`ModeBtn${index}`} /> ) }
    </div>
  )
}

export default ModeBtns