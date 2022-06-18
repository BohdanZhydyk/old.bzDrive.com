import { NavLink, Routes, Route } from 'react-router-dom'


export const AddrLine = ({apps})=>{
	return(
    <div className="addrLine">

      <span>address line:</span>

      <NavLink exact to="/apps" className="addrItem">{` / apps`}</NavLink>

      <Routes>
        { apps.map( (app, index)=>
          <Route path={`/apps/${app.link}`} key={`addrItem${index}${app.txt}`} component={ ()=>
              <NavLink exact to={`/apps/${app.link}`} className="addrItem">
                {` / ${app.txt}`}
              </NavLink>
            }
          />
        )}
      </Routes>

    </div>
	)
}
