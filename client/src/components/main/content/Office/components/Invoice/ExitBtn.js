import React from 'react'


export const ExitBtn = ({ props:{officeFn} })=>{

  const EXIT_PRINT_MODE = ()=> officeFn({type:"EXIT_PRINT_MODE"})

  return(
    <div className="closeBtn"  onClick={ ()=> EXIT_PRINT_MODE() }>
      <img src="https://files.bzdrive.com//img/ico/icoExit.png" alt="close" />
    </div>
  )
}