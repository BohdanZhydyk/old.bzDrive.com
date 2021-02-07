import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { Header } from './components/header/Header'
import { Main } from './components/main/Main'
import { Footer } from './components/footer/Footer'


function App({state, fn}){

	console.log('state', state)

	return(
		<>
		<BrowserRouter>
			
			<Header project={state.projects ? state.projects[0] : false} auth={state.auth} user={state.user} fn={fn} />
		
			<Main state={state} fn={fn} />
		
			<Footer projects={state.projects ? state.projects : false} copyright={state.copyright ? state.copyright : false} />
			
		</BrowserRouter>
		</>
	)
}

export default App;
