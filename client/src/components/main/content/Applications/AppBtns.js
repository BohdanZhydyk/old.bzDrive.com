import React from 'react'
import { NavLink } from 'react-router-dom'


export const AppBtns = ({apps})=>{

  let arr = (app,index)=>{
    return {to:`/apps/${app.link}`, key:`appBtn${index}${app.txt}`}
  }

  return(
    <div className="applications flex wrap">
      {
        apps.map( (app, index)=>
          <NavLink className="appBtn flex" exact to={arr(app,index).to} key={arr(app,index).key} >
            {app.txt}
          </NavLink>
      )}
    </div>
  )
}
