import React from 'react'
import { HeaderMenu } from './HeaderMenu'
import './Header.css'


export const Header = ({project, menu})=>{	
	return(
		<header className="header flex">
		{
			project
			?
			<div className="headerL flex start">
				<img className="imgBtn" src={ project.img } alt="logo" />
				<span>{ project.link[0] }</span><span className="txtOrg">{ project.link[1] }</span>
	 			<span>{ project.link[2] }</span><span className="txtOrg">{ project.link[3] }</span>
			</div>
			:
			<div className="headerL flex start">
				<div className="imgBtn noData"></div>
				<span className="noData">-----------------</span>
			</div>
		}
		{
			menu
			?
			<div className="headerR flex end">
				<img className="imgBtn" alt="menu"
				src={ menu.img.act === "Off" ? menu.img.linkOff : menu.img.linkOn } />
					{ menu.img.act === "Off" && <HeaderMenu menu={ menu } /> }
			</div>
			:
			<div className="headerR flex end">
				<div className="imgBtn noData"></div>
			</div>
		}
		</header>
	)
}
