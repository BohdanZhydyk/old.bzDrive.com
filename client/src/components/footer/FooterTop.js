import React from 'react'
import { createUseStyles } from 'react-jss'


const useStyles = createUseStyles({
	footerTop:{
    justifyContent:'space-evenly',
    padding:'1vw 0',
    borderBottom:'2px solid #999',
    backgroundImage:'linear-gradient(#3339,#000e,#111e)'
  },
  projectBtn:{
    width:'18%',
    fontSize:'1.2vw',
    border:'1px solid #999',
    borderRadius:'0.5vw',
    '&:hover':{
      fontSize:'1.5vw'
    }
  },
  projectName:{
    width:'70%'
  }
})

export const FooterTop = ({projects})=>{

	const styles = useStyles()

  return (
    <div className={styles.footerTop + " flex"}>
    {
      projects
      ?
      projects.map( (project, index)=>{
        return(
          <a className={styles.projectBtn + " flex"} target="_blank" rel="noreferrer" key={ project.name + index }
            href={ "https://"+project.link[0]+project.link[1]+project.link[2]+project.link[3] } >

            <img className="imgBtn" alt={ project.name }
                src={`https://files.bzdrive.com/img/${project.name}/logo/logo${project.name}.gif`} />

            <span className={styles.projectName + " flex"} >
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
            <div className={styles.projectBtn + " flex"} key={`projBtn${index}`}>
              <div className="imgBtn noData"></div>
              <span className={styles.projectName + " flex noData"} >--------</span>
            </div>
          )
        })
      }
      </>
    }
		</div>
  )
}