import React from 'react'


export const Button = ({ props:{ forms, active, fn} })=>{

  let classes = active ? "btn btnActive" : "btn"

  let BTN_CLICK = (txt)=>
    active
    ? fn({ app:"drive", type:"SEND_FORM", payload:txt })
    : fn({ app:"drive", type:"TOGGLE_FORM", payload:txt })

  return(
    <>
    {
      forms.map( (btn)=>
        btn.active === active &&
        <span className={classes} onClick={ ()=> BTN_CLICK(btn.txt) } key={`FormBtn${btn.txt}`} >
          {btn.txt}
        </span>
      )
    }
    </>
  )

}
