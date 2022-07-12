import React from 'react'


export const SliderBtn = ({dir, id, icon, actions})=>{
  return(
    <div className="slideChg flex"
				onClick={ ()=> actions( {type:"SLIDER_BTN", payload:{id, dir}} ) }
    >
      <img src={icon} alt={dir} />
    </div>
  )
}