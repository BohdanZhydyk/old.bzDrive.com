import React from 'react'
import './Documentation.scss'
import { Project } from './Project'


export const Documentation = ({state})=>{
	return(
		<div className="flex stretch">
			<div className="queryL" >
			{
				state.projects.map( (project, index)=>{
					return(
						<Project project={project} key={project.name + index} />
					)
				})
			}
			</div>
			<div className="queryR" >
			{
				state.queryHtml &&
				<div>
					<div className="queryProject flex start">{ state.queryHtml.query }</div>
					<div dangerouslySetInnerHTML={{__html:state.queryHtml.html}}></div>
				</div>
			}
			</div>
		</div>
	)
}
