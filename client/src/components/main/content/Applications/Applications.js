import React from 'react'
import './Applications.scss'

import { AddrLine } from './AddrLine'

import { Switch, Route } from 'react-router-dom'
import { AppBtns } from './AppBtns'
import { Restaurant } from './apps/Restaurant/Restaurant'
import { Unsplash } from './apps/Unsplash/Unsplash'
import { Error } from './../Error/Error'


export const Applications = ()=>{

	const apps = [
		{
			link:"restaurant",
			txt:"bzRestaurant",
			component:<Restaurant />
		},
		{
			link:"unsplash",
			txt:"Unsplash",
			component:<Unsplash />
		}
	]

	return(
		<div className="flex wrap">

			<AddrLine apps={apps} />

			<Switch>

				<Route exact path="/apps" component={ ()=> <AppBtns apps={apps} /> } />

				{ apps.map( (app, index)=>
					<Route
						exact path={`/apps/${app.link}`}
						key={`apps${index}${app.txt}`}
						component={ ()=> app.component }
					/>
				)}

				<Route path="/apps/*" component={ ()=> <Error /> }	/>

			</Switch>

		</div>
	)
}
