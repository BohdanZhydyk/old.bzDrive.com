import React from "react"


export const BtnsArea = ({ props:{query, dealer, setDealer, act, setAct, AreaFn} })=>{

  let icoSettings = "https://bzdrive.com/files/ico/icoSettings.png"
  let icoSave = "https://bzdrive.com/files/ico/icoSave.png"
  let icoCancel = "https://bzdrive.com/files/ico/icoCancel.png"

  let SETTINGS = ()=>{
    !dealer && AreaFn({type:"GET_DEALER", query})
    setAct(true)
  }
  let SAVE = ()=> AreaFn({type:"SAVE_DEALER", dealer})
  let CANCEL = ()=> setAct(false)

  return(
    <div className="BtnsArea flex">
      {
        !act &&
        <img className="imgBtn" src={icoSettings} onClick={ SETTINGS } alt="settings" title="ustawienia" />
      }
      {
        act && dealer &&
        <img className="imgBtn" src={icoSave} onClick={ SAVE } alt="save" title="zachować" />
      }
      {
        act &&
        <img className="imgBtn" src={icoCancel} onClick={ CANCEL } alt="cancel" title="zamknąć" />
      }
    </div>
  )
}