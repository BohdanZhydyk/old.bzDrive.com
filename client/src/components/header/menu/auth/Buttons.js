import React from 'react'


export const Buttons = ({auth, fn})=>{
	return(
    <div className="btns flex wrap" >
      {
        auth.forms.map( (btn, index)=>{
          return( btn.act === "y" &&
            <span className="btn btnActive" key={ btn.txt + index }
                onClick={ ()=>fn({ app:"drive", type:"SEND_FORM", payload:btn.txt }) } >
              { btn.txt }
            </span>
          )
        })
      }
      {
        auth.forms.map( (btn, index)=>{
          return( btn.act === "n" &&
            <span className="btn" key={ btn.txt + index }
                onClick={ ()=>fn({ app:"drive", type:"TOGGLE_FORM", payload:btn.txt }) } >
              { btn.txt }
            </span>
          )
        })
      }
    </div>
	)
}
