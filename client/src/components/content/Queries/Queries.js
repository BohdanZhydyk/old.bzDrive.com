import React from 'react'
import { Project } from './Project'
import './Queries.css'


export const Queries = ({state})=>{
	return(
		<div className="flex stretch">
			<div className="queryL">
			{
				state.projects.map( (project)=>{
					return(
						<Project project={project} key={project.name} />
					)
				})
			}
			</div>
			<div className="queryR">
			{
				state.queryHtml &&
				<div>
					<div className="queryProject flex start" >{ state.queryHtml.query }</div>
					<div dangerouslySetInnerHTML={{__html:state.queryHtml.html}}></div>
				</div>
			}
			</div>
		</div>
	)
}
