import React from 'react'

import { Switch, Route } from 'react-router-dom'
import News from './content/News'
import Api from './content/Api'
import CV from './content/CV'
import Applications from './content/Applications'
import About from './content/About'
import Error from './content/Error'


export const Routes = ({state, fn})=>{
	return(
    <Switch>

			<Route exact path="/" component={ ()=> <News /> } />
			<Route path="/api" component={ ()=> <Api state={ state } /> } />
			<Route path="/cv" component={ ()=> <CV state={ state } /> } />
			<Route path="/apps" component={ ()=> <Applications state={ state } /> } />
			<Route path="/about" component={ ()=> <About handShake={state.auth.handShake} /> }	/>
			<Route component={ ()=> <Error /> }	/>

    </Switch>
	)
}
