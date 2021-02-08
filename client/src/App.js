import React from 'react'
import { HashRouter } from 'react-router-dom'

import { Header } from './components/header/Header'
import { Main } from './components/main/Main'
import { Footer } from './components/footer/Footer'


function App({state, fn}){

	console.log('state', state)

	return(
		<HashRouter>
			
			<Header projects={state.projects} auth={state.auth} user={state.user} nav={state.nav} fn={fn} />
		
			<Main state={state} fn={fn} />
		
			<Footer projects={state.projects} copyright={state.copyright} />
			
		</HashRouter>
	)
}

export default App;
