import React from 'react'
import { NavLink } from 'react-router-dom'

export const HeaderMenu = ({ menu, fn })=>{
	return(
		<div className="headerMenu">
			<div className="headerMenuInputs">
				{
					menu.auth.inputs.map( (input)=>{
						return(
							input.act === "y" &&
							<div className={ `headerMenuInput ${input.name}Input` } key={ input.name } >
								<div className="inputName" >
									{ input.name }<span className="inputErr txtOrg"> - error</span>
								</div>
								<input type={ input.type } placeholder={ `enter ${input.name} here...` } />
							</div>
						)
					})
				}
			</div>
			<div className="headerMenuBtns flex wrap">
				{
					menu.auth.btns.map( (btn)=>{
						return( btn.act === "y" &&
							<span className="headerMenuBtn headerMenuBtnActive" key={ btn.txt }
									onClick={ ()=>{fn("MENU_CHG_FORM",btn.txt)} } >
								{ btn.txt }
							</span>
						)
					})
				}
				{
					menu.auth.btns.map( (btn)=>{
						return( btn.act === "n" &&
							<span className="headerMenuBtn" key={ btn.txt }
									onClick={ ()=>{fn("MENU_CHG_FORM",btn.txt)} } >
								{ btn.txt }
							</span>
						)
					})
				}
			</div>
			<div className="headerMenuItems">
				{
					menu.menuItems.map( (item, index)=>{
						return(
							<NavLink to={ item.to } className="headerMenuItem flex" key={ index+item.to } >
								<span>{ item.name }</span>
							</NavLink>
						)
					})
				}
			</div>
		</div>
	)
}
