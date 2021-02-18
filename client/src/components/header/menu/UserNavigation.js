import React from 'react'
import { NavLink } from 'react-router-dom'


export const UserNavigation = ({menu, fn})=>{
  return(
    <>
    {
      menu.map( (btn, index)=>{
        return(
          <NavLink
            to={btn.to}
            className="menuBtn flex start"
            key={`userMenu${index}`}
            onClick={ ()=>fn({ app:"drive", type:"TOGGLE_MENU", payload:true }) }
          >
            <span>{btn.name}</span>
          </NavLink>
        )
      })
    }
    </>
  )
}