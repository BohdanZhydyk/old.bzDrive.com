import React from 'react'


export const Logo = ({projects})=>{
	return (
		<>
    {
			projects
			?
			<a className="headerL flex start" target="_blank" rel="noreferrer"
				href={`https://${projects[1].link[0]}${projects[1].link[1]}${projects[1].link[2]}${projects[1].link[3]}`}
			>
				<img className="imgBtn" alt="logo"
						src={`https://files.bzdrive.com/img/${projects[1].name}/logo/logo${projects[1].name}.gif`} />
				<div className="logo">
					<span>{ projects[1].link[0] }</span><span className="txtOrg">{ projects[1].link[1] }</span>
					<span>{ projects[1].link[2] }</span><span className="txtOrg">{ projects[1].link[3] }</span>
				</div>
			</a>
			:
			<div className="headerL flex start" >
				<div className="noData noDataImg"></div>
				<span className="noData noDataTxt"></span>
			</div>
		}
		</>
	)
}