import React from 'react'
import { Switch, Route } from 'react-router-dom'
import './Main.scss'

import Workshop from './content/Workshop'
import News from './content/News'
import Applications from './content/Applications'

import Statistic from './content/Statistic'
import CV from './content/CV'
import Profile from './content/Profile'
import Office from './content/Office'

import Loader from './content/Loader'
import Error from './content/Error'


const Main = ({state, fn})=>{

	let active = state.drive.auth.active
	let TOGGLE_MENU = ()=> active && fn({ app:"drive", type:"TOGGLE_MENU", payload:true })

	return(
			<main onClick={ ()=> TOGGLE_MENU() } >
				<div className={ active ? "filter-blur" : "filter" } >

				<Switch>
				{
					state.drive.nav.map( (route, index)=>{

						let to = route.to

						let content = route.content
						let user = 		state.user
						let pr = 			{content, user, fn}
						let key = 		`Route${index}`
						let ro = 			state.user.role
						let role1 = 	(ro === "admin" || ro === "master")
						let role2 = 	(ro === "admin" || ro === "master" || ro === "user")

						let WORKSHOP = 	<Route exact path={to} component={ ()=> <Workshop props={pr} /> } key={key} />
						let NEWS = 			<Route path={to} component={ ()=> <News props={pr} /> } key={key} />
						let APPL = 			<Route path={to} component={ ()=> <Applications props={pr} /> } key={key} />
						let STAT = 			<Route path={to} component={ ()=> <Statistic props={pr} /> } key={key}	/>
						let CIVI = 				<Route path={to} component={ ()=> <CV props={pr} /> } key={key}	/>
						let OFFICE = 		<Route path={to} component={ ()=> <Office props={pr} /> } key={key}	/>
						let PROFILE = 	<Route path={to} component={ ()=> <Profile props={pr} /> } key={key}	/>
						let ERR = 			<Route component={ ()=> <Error /> } key={key}	/>
						let LOADER = 		<Loader key={key} />

						switch(to){
							case "/": 					return WORKSHOP
							case "/news": 			return NEWS
							case "/apps": 			return APPL
							case "/statistic": 	return (role1) ? STAT 		: ERR
							case "/cv": 				return (role1) ? CIVI 		: ERR
							case "/office": 		return (role1) ? OFFICE 	: ERR
							case "/profile": 		return (role2) ? PROFILE 	: ERR
							case "": 						return LOADER
							default: 						return ERR
						}

					})
				}
				</Switch>

				</div>
		</main>
	)
}

export default Main