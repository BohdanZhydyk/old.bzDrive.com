import React from 'react'


export const Project = ({data})=>{
  return (
    <a className="project" href={data.link} target="_blank" rel="noreferrer" >
      <div className="projName flex between">
        <span>{data.name}</span>
        <div>{data.link}</div>
      </div>
      <p className="description">{data.description}</p>
      <div className="technologies flex">
      {
        data.tech.map( (item, index)=>
          <div className="tech flex column">
            <img
              src={`https://files.bzdrive.com/img/CV/ico/tech/${item}.png`}
              key={`tech${data.name}${index}`}
              alt="img"
            />
            <span>{item}</span>
          </div>
        )
      }
      </div>
    </a>
  )
}