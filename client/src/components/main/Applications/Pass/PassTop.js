import React from "react"


export const PassTop = ({ props:{el, newEl, edit, setEdit, element, setElement} })=>{

  let OPEN_CLOSE_EL = ()=>{
    setEdit( !edit )
    !edit && setElement(el)
  }

  let image = !newEl && `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${element.link}&size=32`
  let classes = `PassEl ${edit ? `edit` : ``} ${newEl ? `PassElNew` : ``} flex`
  let title = edit ? "zwinąć" : (element?.info ? element.info : "rozwinąć")

  return(
    <div className={classes} title={title} onClick={ ()=> OPEN_CLOSE_EL() }>

      { !newEl && <img src={image} alt="siteIcon" /> }
      
      <span>{!newEl ? el.siteName : "New"}</span>

    </div>
  )

}