import React from 'react'


export const FooterTop = ({projects})=>{
  return (
    <div className="footerTop flex">
    {
      projects
      ?
      projects.map( (project, index)=>{
        return(
          <a className="projectBtn flex" target="_blank" rel="noreferrer" key={ project.name + index }
            href={ "https://"+project.link[0]+project.link[1]+project.link[2]+project.link[3] } >

            <img className="imgBtn" alt={ project.name }
                src={`https://files.bzdrive.com/img/${project.name}/logo/logo${project.name}.gif`} />

            <span className="projectName flex" >
              <span>{ project.link[0] }</span><span className="txtOrg">{ project.link[1] }</span>
              <span>{ project.link[2] }</span><span className="txtOrg">{ project.link[3] }</span>
            </span>

          </a>
        )
      })
      :
      <>
      {
        [1,2,3].map( (item, index)=>{
          return (
            <div className="projectBtn flex" key={`projBtn${index}`}>
              <div className="imgBtn noData"></div>
              <span className="projectName flex noData" >--------</span>
            </div>
          )
        })
      }
      </>
    }
		</div>
  )
}