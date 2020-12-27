import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Queries } from './../content/Queries/Queries'
import { Contacts } from './../content/Contacts'
import { About } from './../content/About'

export const Main = ({state})=>{
	return(
		<main>
			<Switch>
				<Route exact path="/">
				{ state.projects && <Queries state={ state } /> }
				</Route>				
				<Route path="/contacts"	><Contacts /></Route>
				<Route path="/about"	><About /></Route>
			</Switch>
		</main>
	)
}
