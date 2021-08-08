import React from 'react'
import './index.scss'

import { AddrLine } from './AddrLine'

import { Switch, Route } from 'react-router-dom'
import { AppBtns } from './AppBtns'
import Bistro from './apps/Bistro'
import Unsplash from './apps/Unsplash'
import Error from './../Error'


const ApplicationsApp= ()=>{

	const apps = [
		{link:"bistro", txt:"Bistro", component:<Bistro />},
		{link:"unsplash", txt:"Unsplash", component:<Unsplash />}
	]

	let ROUTE = (app, index)=>{
		let path = `/apps/${app.link}`
		let key = `apps${index}${app.txt}`
		return <Route exact path={path} key={key} component={ ()=> app.component } />
	}

	return(
		<div className="flex wrap">

			<AddrLine apps={apps} />

			<Switch>

				<Route exact path="/apps" component={ ()=> <AppBtns apps={apps} /> } />

				{ apps.map( (app, index)=> ROUTE(app, index) ) }

				<Route path="/apps/*" component={ ()=> <Error /> }	/>

			</Switch>

		</div>
	)
}

export default ApplicationsApp