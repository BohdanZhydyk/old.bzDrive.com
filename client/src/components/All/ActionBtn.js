import React from "react"


let Title = (name)=>{
  switch(name){
    case "Edit":    return `edytować`
    case "Save":  return `zahować`
    case "Cancel":  return `zamknąć`
    case "Print":  return `drukować`
    case "Delete":  return `usunąć`
    case "Att":  return `uwaga!`
    case "More":  return `więcej`
    case "Plus":  return `dodać`
    default: return
  }
}

// let editImg = "https://files.bzdrive.com/img/ico/icoEdit.png"
// let saveImg = "https://files.bzdrive.com/img/ico/icoSave.png"
// let cancelImg = "https://files.bzdrive.com/img/ico/icoCancel.png"
// let printImg = "https://files.bzdrive.com/img/ico/icoPrint.png"
// let deleteImg = "https://files.bzdrive.com/img/ico/icoDelete.png"
// let attImg = "https://files.bzdrive.com/img/ico/icoAtt.png"
// let moreImg = "https://files.bzdrive.com/img/ico/icoMore.png"
// let plusImg = "https://files.bzdrive.com/img/ico/icoPlus.png"

const ActionBtn = ({ props:{name, title = Title(name), click} })=>{

  let src = `https://files.bzdrive.com/img/ico/ico${name}.png`

  return(
    <img className="imgBtn" src={src} title={title} alt={name} onClick={click} />
  )
}

export default ActionBtn