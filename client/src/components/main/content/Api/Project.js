import React from 'react'


const queries = [
	{"method": "GET", "link": ""},
	{"method": "POST", "link": ""},
	{"method": "UPDATE", "link": ""},
	{"method": "DELETE", "link": ""}
]

export const Project = ({project})=>{

	let link = "https://"+project.link[0]+project.link[1]+project.link[2]+project.link[3]

	return(
		<div>
			<div className="queryProject flex start" >{ link }</div>
			<div className="queries">
				{
					queries.map( (query, index)=>{
						return(
							<div className={`line color${query.method} flex start`} key={ link+query.method+query.link + index } >
								<div className={`method color${query.method}`} >{ query.method }</div>
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
