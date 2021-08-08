import React from 'react'


export const ExitBtn = ({ props:{invoiceNr, officeFn} })=>{

  const EXIT_PRINT_EDIT_MODE = ()=>{
    document.title = `bzDrive.com`
    officeFn({type:"EXIT_PRINT_EDIT_MODE"})
  }

  document.title = `bzDrive.com Faktura Nr-${invoiceNr}`

  return(
    <div className="closeBtn"  onClick={ ()=> EXIT_PRINT_EDIT_MODE() }>
      <img src="https://files.bzdrive.com//img/ico/icoExit.png" alt="close" />
    </div>
  )
}