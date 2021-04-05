import React from 'react'


export const Language = ({lang})=>{
  return(
    <>
    {
      lang
      ?
      <div className="langPannel flex">
        <img className="imgBtn" src={`https://files.bzdrive.com/img/ico/lng/lng${lang}.png`} alt="lng" />
      </div>
      :
      <div className="noData noDataImg"></div>
    }
    </>
  )
}