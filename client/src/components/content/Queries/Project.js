import React from 'react'


export const Project = ({project})=>{

	let link = "https://"+project.link[0]+project.link[1]+project.link[2]+project.link[3]

	return(
		<div>
			<div className="queryProject flex start" >{ link }</div>
			<div className="queryQueries">
				{
					project.queries.map( (query)=>{
						return(
							<div className={ `queryLine color${ query.method } flex start` } key={ link+query.method+query.link } >
								<div className={ `queryMethod color${ query.method }`} >{ query.method }</div>
								<div className="queryLink" >
									{ query.link }
								</div>
							</div>
						)
					})
				}
			</div>
		</div>
	)
}

export default Project