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


const Main = ({state,fn})=>{

	let active = state?.drive?.auth?.active ? state?.drive?.auth?.active : false

	let TOGGLE_MENU = ()=> active && fn({ app:"drive", type:"TOGGLE_MENU", payload:true })

	return(
		<main onClick={ ()=> TOGGLE_MENU() }>

			<div className={ active ? "filter-blur" : "filter" } >

			{
				state
				?
				<Switch>
					<Route exact path="/" component={ ()=> <Workshop /> } />
					<Route path="/news" component={ ()=> <News /> } />
					<Route path="/apps" component={ ()=> <Applications /> } />
					<Route path="/statistic" component={ ()=> <Statistic /> }	/>
					<Route path="/cv" component={ ()=> <CV /> }	/>
					<Route path="/office" component={ ()=> <Office /> }	/>
					<Route path="/profile" component={ ()=> <Profile /> }	/>
					<Route component={ ()=> <Error /> }	/>
				</Switch>
				: <Loader />
			}

			</div>
		</main>
	)
}

export default Main