import React from 'react'

import { Switch, Route } from 'react-router-dom'
import { News } from './content/News/News'
import { Api } from './content/Api/Api'
import { CV } from './content/CV/CV'
import { Contacts } from './content/Contacts/Contacts'
import { About } from './content/About/About'
import { Error } from './content/Error/Error'


export const Routes = ({state, fn})=>{
	return(
    <Switch>

			<Route exact path="/" component={ ()=> <News state={ state } /> } />
			<Route path="/api" component={ ()=> <Api state={ state } /> } />
			<Route path="/cv" component={ ()=> <CV state={ state } /> } />
			<Route path="/contacts" component={ ()=> <Contacts state={ state } /> } />
			<Route path="/about" component={ ()=> <About handShake={state.auth.handShake} /> }	/>
			<Route component={ ()=> <Error /> }	/>

    </Switch>
	)
}
