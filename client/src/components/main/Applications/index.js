import './AplicationsApp.scss'
import { NavLink } from 'react-router-dom'


const ApplicationsApp = ()=>{

	const apps = [
		{link:"cv", txt:"CV"},
		{link:"bistro", txt:"Bistro"},
		{link:"unsplash", txt:"Unsplash"}
	]

	let arr = (app, index)=>{
    return {to:`/apps/${app.link}`, key:`appBtn${index}${app.txt}`}
  }

	return(
		<div className="AplicationsApp flex wrap">

			<div className="applications flex wrap">
				{
					apps.map( (app, index)=>
						<NavLink className="appBtn flex" exact to={arr(app, index).to} key={arr(app, index).key} >
							{app.txt}
						</NavLink>
					)
				}
			</div>

		</div>
	)
}

export default ApplicationsApp