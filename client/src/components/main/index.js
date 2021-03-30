import React from 'react'
import { Switch, Route } from 'react-router-dom'
import './Main.scss'

import News from './content/News'
import Api from './content/Api'
import CV from './content/CV'
import Applications from './content/Applications'
import About from './content/About'

import Profile from './content/Profile'
import Statistic from './content/Statistic'

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
						switch(to){
							case "/": return <Route exact path={to} component={ ()=> <News content={route.content} user={state.user} fn={fn} /> } key={`Route${index}`} />
							case "/api": return <Route path={to} component={ ()=> <Api content={route.content} user={state.user} fn={fn} /> } key={`Route${index}`} />
							case "/cv": return <Route path={to} component={ ()=> <CV content={route.content} user={state.user} fn={fn} /> } key={`Route${index}`} />
							case "/apps": return <Route path={to} component={ ()=> <Applications content={route.content} user={state.user} fn={fn} /> } key={`Route${index}`} />
							case "/about": return <Route path={to} component={ ()=> <About content={route.content} user={state.user} fn={fn} /> } key={`Route${index}`}	/>
							
							case "/profile":
								return (state.user.role === "admin" || state.user.role === "user")
									? <Route path={to} component={ ()=> <Profile content={route.content} user={state.user} fn={fn} /> } key={`Route${index}`}	/>
									: <Route component={ ()=> <Error /> } key={`Route${index}`}	/>
							
							case "/statistic":
								return (state.user.role === "admin")
									? <Route path={to} component={ ()=> <Statistic content={route.content} user={state.user} fn={fn} /> } key={`Route${index}`}	/>
									: <Route component={ ()=> <Error /> } key={`Route${index}`}	/>

							case "": return <Loader key={`Route${index}`} />
							default: return <Route component={ ()=> <Error /> } key={`Route${index}`}	/>
						}

					})
				}
				</Switch>
				</div>
		</main>
	)
}

export default Main