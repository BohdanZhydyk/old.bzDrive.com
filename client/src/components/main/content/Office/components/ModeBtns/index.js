import React from 'react'

import './ModeBtns.scss'
import { ModeBtn } from './ModeBtn'


const ModeBtns = ({ props:{mode, btns, officeFn} })=>{
  return(
    <div className="modeBtns flex wrap">

      { btns.map( (btn, index)=> <ModeBtn props={{mode, btn, officeFn}} key={`ModeBtn${index}`} /> ) }
      
    </div>
  )
}

export default ModeBtns