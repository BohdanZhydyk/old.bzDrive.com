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
    case "Show":  return `pokazać`
    default: return
  }
}

// let editImg = "https://bzdrive.com/files/ico/icoEdit.png"
// let saveImg = "https://bzdrive.com/files/ico/icoSave.png"
// let cancelImg = "https://bzdrive.com/files/ico/icoCancel.png"
// let printImg = "https://bzdrive.com/files/ico/icoPrint.png"
// let deleteImg = "https://bzdrive.com/files/ico/icoDelete.png"
// let attImg = "https://bzdrive.com/files/ico/icoAtt.png"
// let moreImg = "https://bzdrive.com/files/ico/icoMore.png"
// let plusImg = "https://bzdrive.com/files/ico/icoPlus.png"
// let showImg = "https://bzdrive.com/files/ico/icoShow.png"

const ActionBtn = ({ props:{name, title = Title(name), click} })=>{

  let src = `https://bzdrive.com/files/ico/ico${name}.png`

  return(
    <img className="imgBtn" src={src} title={title} alt={name} onClick={click} />
  )
}

export default ActionBtn