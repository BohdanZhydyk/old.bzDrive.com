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
          <div className="tech flex column" key={`tech${data.name}${index}`} >

            <img src={`https://bzdrive.com/files/CV/ico/tech/${item}.png`} alt="img" />

            <span>{item}</span>

          </div>
        )
      }
      </div>

    </a>
  )
}