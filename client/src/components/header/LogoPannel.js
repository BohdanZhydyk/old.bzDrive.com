import React from 'react'

import { ScreenSaver } from '../ScreenSaver'


export const LogoPannel = ({ props:{logo} })=>{

	let href = logo && `https://${logo.link[0]}${logo.link[1]}${logo.link[2]}${logo.link[3]}`

	return (
		<div className={`logo flex start`}>
    {
			logo
			?
			<a className="flex" href={href} target="_blank" rel="noreferrer" >

				<img className="imgBtn" src={logo.img} alt="logo" />

				<span className="flex">
					<span>{ logo.link[0] }</span><span className="txtOrg">{ logo.link[1] }</span>
					<span>{ logo.link[2] }</span><span className="txtOrg">{ logo.link[3] }</span>
				</span>

			</a>
			: <ScreenSaver arr={["Img","Txt"]} />
		}
		</div>
	)
}