import React from 'react'


export const NoData = ({ props:arr })=>{
  return(
    <>
    {
      arr.map( (el, i)=>{
        let key = Math.random(1000000000)
        switch(el){
          case "Img": return <div className="noData noDataImg" key={key + i}></div>
          case "Txt": return <div className="noData noDataTxt" key={key + i}></div>
          default: break
        }
      })
    }
    </>
  )
}