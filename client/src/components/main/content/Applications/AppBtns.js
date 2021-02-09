import React from 'react'
import { NavLink } from 'react-router-dom'


export const AppBtns = ({apps})=>{
  return(
    <div className="applications flex wrap">
      { apps.map( (app, index)=>
        <NavLink
          className="appBtn flex"
          exact to={`/apps/${app.link}`}
          key={`appBtn${index}${app.txt}`}
        >
          {app.txt}
        </NavLink>
      )}
    </div>
  )
}
