import { bzGetUser } from "../../../../../../state/functions"


export const EditAreaBtns = ({ props:{mode, status, car, client, dealer, buyer, edit, id, elFunc, AreaFn} })=>{

  let Status = mode === "KL"
    ? `client`
    : status
      ? status
      : `saved`

  let roleOk = ()=> (bzGetUser().role === "admin")
  let userOk = ()=> (bzGetUser().login === dealer.user)

  let SAVE = ()=>{
    elFunc("Save")
    AreaFn({ form:"SaveDoc", status:Status })
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
  let done = (status === "done")
  let deleted = (status === "deleted")

  let deleteImg = "https://files.bzdrive.com/img/ico/icoDelete.png"
  let printImg = "https://files.bzdrive.com/img/ico/icoPrint.png"
  let saveImg = "https://files.bzdrive.com/img/ico/icoSave.png"
  let editImg = "https://files.bzdrive.com/img/ico/icoEdit.png"
  let attImg = "https://files.bzdrive.com/img/ico/icoAtt.png"
  let cancelImg = "https://files.bzdrive.com/img/ico/icoCancel.png"

  let errors = true

  let imgBtns = [
    {
      is: ( !deleted && userOk() ) || roleOk(),
      src: (edit ? (errors ? saveImg : attImg) : editImg),
      click: ()=> edit ? (errors ? SAVE() : ()=>{}) : elFunc("Edit"),
      title: (edit ? `zahować` : `edytować`),
      alt: "save-edit"
    },
    {
      is: !edit && (saved || edited || done),
      src: printImg,
      click: ()=> PRINT(),
      title: `drukować`,
      alt: "print"
    },
    {
      is: ( saved || edited || done ) && ( userOk() || roleOk() ),
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