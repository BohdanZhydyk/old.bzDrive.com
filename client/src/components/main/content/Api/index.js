import React from 'react'
import './index.scss'
import { Project } from './Project'


function ApiApp({state}){
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

export default ApiApp