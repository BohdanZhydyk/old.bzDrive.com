import React from 'react'


export const SliderEditImg = ({ props:{img, n, i, sliderFn} })=>{

  let btnL = "https://bzdrive.com/files/ico/sliderBtnL.png"
  let btnR = "https://bzdrive.com/files/ico/sliderBtnR.png"
  let btnDel = "https://bzdrive.com/files/ico/icoDelete.png"

  let MOVE_IMG = (from, to)=> sliderFn({type:"MOVE_IMG", folder:n, from, to})

  return(
    <div className="SliderEditImg flex start">

      <img className="EditedImg" src={img} alt="sliderImg" />

      <div className="btnsLine flex between">
        <img className="btnL imgBtn" onClick={ ()=>MOVE_IMG(i, i-1) } src={btnL} alt="left" />
        <img className="btnDel imgBtn" src={btnDel} alt="delete" />
        <img className="btnR imgBtn" onClick={ ()=>MOVE_IMG(i, i+1) } src={btnR} alt="right" />
      </div>

    </div>
  )
}