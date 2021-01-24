import React from 'react'


export const Logo = ({project})=>{
	return (
		<>
    {
			project
			?
			<a className="headerL flex start" target="_blank" rel="noreferrer"
				href={`https://${project.link[0]}${project.link[1]}${project.link[2]}${project.link[3]}`}
			>
				<img className="imgBtn" alt="logo"
						src={`https://files.bzdrive.com/img/${project.name}/logo/logo${project.name}.gif`} />
				<span>{ project.link[0] }</span><span className="txtOrg">{ project.link[1] }</span>
	 			<span>{ project.link[2] }</span><span className="txtOrg">{ project.link[3] }</span>
			</a>
			:
			<div className="headerL flex start" >
				<div className="imgBtn noData"></div>
				<span className="noData">-----------------</span>
			</div>
		}
		</>
	)
}