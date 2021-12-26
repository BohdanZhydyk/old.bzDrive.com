import React, { useState } from "react"

import {
  getUser,
  errName,
  errZIP,
  errTown,
  errStreet,
  errNIP,
  errBrand,
  errModel,
  errFaults,
  errNumbers,
  errTel
} from "../../../../../../../store/functions"


export const EditAreaBtns = ({ props:{mode, status, car, dealer, buyer, edit, id, elFunc, AreaFn} })=>{

  let roleOk = ()=> (getUser().role === "admin")
  let userOk = ()=> (getUser().login === dealer.user)

  let SAVE = ()=>{
    elFunc("Save")
    AreaFn({ form:"SaveDoc", status:(status ? `edited` : `saved`) })
  }

  let PRINT = ()=>{
    AreaFn({ form:"PrintDoc" })
  }

  let DELETE = ()=>{
    elFunc("Delete")
    AreaFn({ form:"SaveDoc", status:`deleted` })
  }

  let saved = (status === "saved")
  let edited = (status === "edited")
  let deleted = (status === "deleted")

  let deleteImg = "https://files.bzdrive.com/img/ico/icoDelete.png"
  let printImg = "https://files.bzdrive.com/img/ico/icoPrint.png"
  let saveImg = "https://files.bzdrive.com/img/ico/icoSave.png"
  let editImg = "https://files.bzdrive.com/img/ico/icoEdit.png"
  let attImg = "https://files.bzdrive.com/img/ico/icoAtt.png"
  let cancelImg = "https://files.bzdrive.com/img/ico/icoCancel.png"

  let errors = mode === "FS"
  ?
  (
    !errName(buyer?.name) &&
    !errZIP(buyer?.addr?.zip) &&
    !errTown(buyer?.addr?.town) &&
    !errStreet(buyer?.addr?.street) &&
    !errNIP(buyer?.nip)
  )
  :
  (
    !errBrand(car?.brand) &&
    !errModel(car?.model) &&
    !errNumbers(car?.numbers) &&
    !errFaults(car?.faults) &&
    !errTel(buyer?.contacts?.tel)
  )

  let imgBtns = [
    {
      is: ( !deleted && userOk() ) || roleOk(),
      src: (edit ? (errors ? saveImg : attImg) : editImg),
      click: ()=> edit ? (errors ? SAVE() : ()=>{}) : elFunc("Edit"),
      title: (edit ? `zahować` : `edytować`),
      alt: "save-edit"
    },
    {
      is: !edit && (saved || edited),
      src: printImg,
      click: ()=> PRINT(),
      title: `drukować`,
      alt: "print"
    },
    {
      is: ( saved || edited ) && ( userOk() || roleOk() ),
      src: deleteImg,
      click: ()=> DELETE(),
      title: `wymazać`,
      alt: "delete"
    },
    {
      is: true,
      src: cancelImg,
      click: ()=> elFunc("Minus"),
      title: `zamknąć`,
      alt: "cancel"
    }
  ]

  return(
    <div className={`editAreaBtns flex end`}>

      <div className="btns flex">

      {
        imgBtns.map( (img, i)=>{

          let key = `EditAreaBtn${id}${i}`

          return(
            img.is
            ?
            <img
              className="imgBtn"
              src={img.src}
              onClick={ img.click }
              alt={img.alt}
              title={img.title}
              key={key}
            />
            :
            <></>
          )
        })
      }
      </div>

    </div>
  )
}