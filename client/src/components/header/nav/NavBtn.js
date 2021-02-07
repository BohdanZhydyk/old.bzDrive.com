import React from 'react'
import { NavLink } from 'react-router-dom'


export const NavBtn = ({btn})=>{  
	return(
    <NavLink to={ btn.to } className="navItem flex" >
      <span>{ btn.name }</span>
    </NavLink>
	)
}