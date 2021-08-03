import React from 'react'


export const LogoPannel = ({info})=>{

	let href = info && `https://${info.link[0]}${info.link[1]}${info.link[2]}${info.link[3]}`

	return (
		<>
    {
			info
			?
			<a className="logo flex start" href={href} target="_blank" rel="noreferrer" >

				<img className="imgBtn" src={info.img} alt="logo" />

				<div className="flex">
					<span>{ info.link[0] }</span><span className="txtOrg">{ info.link[1] }</span>
					<span>{ info.link[2] }</span><span className="txtOrg">{ info.link[3] }</span>
				</div>

			</a>
			:
			<div className="logo imgBtn flex start" >
				<div className="noData noDataImg"></div>
				<span className="noData noDataTxt"></span>
			</div>
		}
		</>
	)
}