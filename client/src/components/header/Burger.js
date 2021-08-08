import React from 'react'

import { ScreenSaver } from '../ScreenSaver'


export const Burger = ({ props:{burger,active,TOGGLE_MENU} })=>{

	let ImgClick = ()=> TOGGLE_MENU({active: active ? false : `nav`})

	let act = active ? `icoBurgerExit` : `mainMenuOff`
	let src = `https://files.bzdrive.com/img/ico/${act}.png`

	return(
		<div className="Burger flex">
		{
      burger
      ?
			<div className="flex" onClick={ ()=> ImgClick() } >
				<img className="imgBtn" src={src} alt="burger" />
			</div>
      : <ScreenSaver arr={["Img"]} />
    }
		</div>
		
	)
}