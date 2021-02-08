import * as React from 'react'


export const InfoImg = ({tag})=>{
  return (
    <div className="line flex wrap">
      {
        tag.value.map( (image, key)=>{
          return (
            <div className="imgContainer flex column" key={tag.key + key}>
              <img className="img" src={`https://oldapi.bzdrive.com/img/CV/ico/${image}.png`} alt="img"/>
              <span>{image}</span>
            </div>
          )
        })
      }
    </div>
  )
}