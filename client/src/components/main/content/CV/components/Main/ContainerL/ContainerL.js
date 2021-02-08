import * as React from 'react'
import './ContainerL.scss'


export const ContainerL = ({ data: {name, lines} })=>{
  return (
    <div className="containerL flex wrap" >
      <div className="name" >{name}</div>
      {
        lines.map( (line, index)=>{
          return (
            <div className="line flex wrap" key={line.key + index}>
              <img className="img" src={`https://oldapi.bzdrive.com/img/CV/ico/${line.key}.png`} alt="img"/>
              <span className="key" >{line.key}</span>
              {
                line.link
                ?
                <a className="value" href={line.link} target="_blank" rel="noreferrer">{line.value}</a>
                :
                <span className="value">{line.value}</span>
              }
            </div>
          )
        })
      }
    </div>
  )
}