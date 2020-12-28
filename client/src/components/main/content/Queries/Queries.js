import React from 'react'
import { createUseStyles } from 'react-jss'

import { Project } from './Project'


const useStyles = createUseStyles({
	queryL:{
		width:'30%'
	},
	queryR:{
		width:'65%',
		padding:'1vw',
		border:'0.1vw solid #999',
		borderRadius:'0.5vw',
		backgroundColor:'#222'
	},
	queryProject:{
		width:'90%',
		minHeight:'2vw',
		margin:'0.5vw 0',
		padding:'0 1vw',
		backgroundColor:'#111',
		border:'0.1vw solid #999',
		borderRadius:'0.5vw'
	}
})

export const Queries = ({state})=>{
  
  const styles = useStyles()

	return(
		<div className="flex stretch">
			<div className={styles.queryL} >
			{
				state.projects.map( (project, index)=>{
					return(
						<Project project={project} key={project.name + index} />
					)
				})
			}
			</div>
			<div className={styles.queryR} >
			{
				state.queryHtml &&
				<div>
					<div className={styles.queryProject + " flex start"}>{ state.queryHtml.query }</div>
					<div dangerouslySetInnerHTML={{__html:state.queryHtml.html}}></div>
				</div>
			}
			</div>
		</div>
	)
}
