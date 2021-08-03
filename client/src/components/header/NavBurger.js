import React from 'react'


export const NavBurger = ({ props:{active, TOGGLE_MENU} })=>{

	let BtnClick = ()=> TOGGLE_MENU({active: active ? false : `nav`})

	let act = active ? `icoBurgerExit` : `mainMenuOff`
	let src = `https://files.bzdrive.com/img/ico/${act}.png`

	return(
		<div className="navBurger flex" onClick={ ()=> BtnClick() } >
			<img className="imgBtn" src={src} alt="burger" />
		</div>
	)
}