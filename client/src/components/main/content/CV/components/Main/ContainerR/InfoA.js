import * as React from 'react'


export const InfoA = ({tag})=>{
  return (
    <div className="siteItem flex wrap" >
      <a className="siteLink flex start" href={`https://${tag.name}`} target="_blank" rel="noreferrer">
        <img className="img" src={`https://oldapi.bzdrive.com/img/CV/ico/web-site.png`} alt="site"/>
        <span>{`https://${tag.name}`}</span>
      </a>
      <a className="githubLink flex start" href={`https://github.com/BohdanZhydyk/${tag.name}`} target="_blank" rel="noreferrer">
        <img className="img" src={`https://oldapi.bzdrive.com/img/CV/ico/GitHub.png`} alt="github"/>
        <span>{`https://github.com/BohdanZhydyk/${tag.name}`}</span>
      </a>
    </div>
  )
}