import React from 'react'


export const Logo = ({info})=>{
	return (
		<>
    {
			info
			?
			<a className="logo flex start" target="_blank" rel="noreferrer"
				href={`https://${info.link[0]}${info.link[1]}${info.link[2]}${info.link[3]}`}
			>
				<img className="imgBtn" alt="logo" src={info.img} />
				<div className="flex">
					<span>{ info.link[0] }</span><span className="txtOrg">{ info.link[1] }</span>
					<span>{ info.link[2] }</span><span className="txtOrg">{ info.link[3] }</span>
				</div>
			</a>
			:
			<div className="logo flex start" >
				<div className="noData noDataImg"></div>
				<span className="noData noDataTxt"></span>
			</div>
		}
		</>
	)
}