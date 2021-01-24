import React from 'react'
import { NavLink } from 'react-router-dom'


export const MenuBtn = ({btn})=>{  
	return(
    <NavLink to={ btn.to } className="menuItem flex" >
      <span>{ btn.name }</span>
    </NavLink>
	)
}