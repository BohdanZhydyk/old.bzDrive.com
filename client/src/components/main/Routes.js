import React from 'react'

import { Switch, Route } from 'react-router-dom'
import News from './content/News'
import Api from './content/Api'
import CV from './content/CV'
import Applications from './content/Applications'
import About from './content/About'

import Profile from './content/Profile'
import Statistic from './content/Statistic'

import Error from './content/Error'


export const Routes = ({state, fn})=>{
	return(
    <Switch>

			<Route exact path="/" component={ ()=> <News state={state.news} user={state.user} fn={fn} /> } />
			<Route path="/api" component={ ()=> <Api state={ state.api } fn={fn} /> } />
			<Route path="/cv" component={ ()=> <CV state={ state.cv } fn={fn} /> } />
			<Route path="/apps" component={ ()=> <Applications state={ state.app } fn={fn} /> } />
			<Route path="/about" component={ ()=> <About state={state.about} fn={fn} /> }	/>

			<Route path="/profile" component={ ()=> <Profile state={state.user} fn={fn} /> }	/>
			<Route path="/statistic" component={ ()=> <Statistic state={state.statistic} fn={fn} /> }	/>

			<Route component={ ()=> <Error /> }	/>

    </Switch>
	)
}
